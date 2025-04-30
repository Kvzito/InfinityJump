CREATE DATABASE infinity_jump_db;

USE infinity_jump_db;

CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(30) UNIQUE NOT NULL,
    contrasena VARCHAR(30) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Partidas (
    id_partida INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    intento INT NOT NULL,
    nivel VARCHAR(30) NOT NULL,
    plataformas_alcanzadas INT NOT NULL,
    tiempo TIME NOT NULL,
    mejora_salto INT NOT NULL DEFAULT 0,
    mejora_danio INT NOT NULL DEFAULT 0,
    mejora_vida INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    UNIQUE (id_usuario, intento)  -- Evita que se repita el número de intento y usuario.
) ENGINE=InnoDB;


CREATE TABLE Inventario (
	id_inventario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    cantidad_mejora_salto INT NOT NULL DEFAULT 0,
    cantidad_mejora_danio INT NOT NULL DEFAULT 0,
    cantidad_mejora_vida INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
) ENGINE=InnoDB;


ALTER TABLE Inventario ADD CONSTRAINT unq_inventario_usuario UNIQUE (id_usuario);


-- VISTAS NECESARIAS PARA APARTADO DE ESTADÍSTICAS EN LA PÁGINA WEB --


-- Vista a llamar cada que alguien busque los últimos 100 intentos de cierto usuario.
CREATE OR REPLACE VIEW HistorialIntentos AS
SELECT u.usuario AS Jugador, p.intento AS Intento, p.nivel AS Nivel, p.plataformas_alcanzadas AS Plataformas, p.tiempo AS Tiempo, p.mejora_salto AS Mejora_Salto, p.mejora_danio AS Mejora_Danio, p.mejora_vida AS Mejora_Vida
FROM Partidas p
JOIN Usuarios u ON p.id_usuario = u.id_usuario;

-- Vista útil para graficar cual es la mejora permanente que más suelen escoger los usuarios.
CREATE OR REPLACE VIEW UsoMejoras AS
SELECT
    SUM(cantidad_mejora_salto) AS Total_Mejora_Salto,
    SUM(cantidad_mejora_danio) AS Total_Mejora_Danio,
    SUM(cantidad_mejora_vida) AS Total_Mejora_Vida
FROM Inventario;


-- Vista para establecer un leaderboard en base a diferentes estadísticas.
CREATE OR REPLACE VIEW GlobalRanking AS
SELECT
    u.usuario AS Jugador,
    p.intento AS Mejor_Intento,
    p.plataformas_alcanzadas AS Saltos_Completados,
    p.nivel AS Nivel_Alcanzado,
    p.tiempo AS Tiempo,
    p.mejora_salto AS Mejora_salto,
    p.mejora_danio AS Mejora_danio,
    p.mejora_vida AS Mejora_vida
FROM Partidas p
JOIN (
    -- Subconsulta que selecciona la mejor partida por usuario
    SELECT id_usuario, id_partida
    FROM (
        SELECT 
            id_usuario,
            id_partida,
            ROW_NUMBER() OVER (
                PARTITION BY id_usuario
                ORDER BY plataformas_alcanzadas DESC, nivel DESC, tiempo ASC, intento ASC
            ) AS rn
        FROM Partidas
    ) sub
    WHERE rn = 1
) mejores ON p.id_partida = mejores.id_partida
JOIN Usuarios u ON p.id_usuario = u.id_usuario
ORDER BY p.plataformas_alcanzadas DESC, p.nivel DESC, p.tiempo ASC, p.intento ASC
LIMIT 10;



-- Vista para ver los diferentes usuarios registrados sin comprometer sus contraseñas
CREATE VIEW UsuariosRegistrados AS
SELECT
	u.id_usuario,
    u.usuario
FROM usuarios u
ORDER BY u.id_usuario DESC;


-- Vista para obtener los niveles más comunes en orden

CREATE OR REPLACE VIEW NivelesMasComunes AS
WITH MejorPartidaPorJugador AS (
  SELECT 
    p.id_usuario,
    p.nivel,
    ROW_NUMBER() OVER (
      PARTITION BY p.id_usuario
      ORDER BY p.plataformas_alcanzadas DESC, p.nivel DESC, p.intento ASC
    ) as rn
  FROM Partidas p
)
SELECT 
  nivel, 
  COUNT(*) as veces
FROM (
  SELECT nivel
  FROM MejorPartidaPorJugador
  WHERE rn = 1
) mejores_niveles
GROUP BY nivel
ORDER BY veces DESC
LIMIT 3;

-- Vista con la que puedes buscar el inventario de un jugador por su puro usuario, sin necesidad de ID
CREATE OR REPLACE VIEW VistaInventario AS
SELECT 
    i.id_usuario,
    i.cantidad_mejora_salto AS cantidad_salto,
    i.cantidad_mejora_danio AS cantidad_danio,
    i.cantidad_mejora_vida AS cantidad_vida
FROM iNVENTARIO i;



-- TRIGGERS NECESARIOS --

DELIMITER $$

CREATE TRIGGER crear_inventario_usuario
AFTER INSERT ON Usuarios
FOR EACH ROW
BEGIN
    INSERT INTO Inventario (id_usuario, cantidad_mejora_salto, cantidad_mejora_danio, cantidad_mejora_vida)
    VALUES (NEW.id_usuario, 0, 0, 0);
END$$

DELIMITER ;


