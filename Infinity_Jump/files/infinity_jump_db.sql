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
    mejora_1 INT NOT NULL DEFAULT 0,
    mejora_2 INT NOT NULL DEFAULT 0,
    mejora_3 INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    UNIQUE (id_usuario, intento)  -- Evita que se repita el número de intento y usuario.
) ENGINE=InnoDB;

CREATE TABLE Inventario (
	id_inventario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    cantidad_mejora_1 INT NOT NULL DEFAULT 0,
    cantidad_mejora_2 INT NOT NULL DEFAULT 0,
    cantidad_mejora_3 INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
) ENGINE=InnoDB;

ALTER TABLE Inventario ADD CONSTRAINT unq_inventario_usuario UNIQUE (id_usuario);



-- Insertar usuarios dummie
INSERT INTO Usuarios (usuario, contrasena) VALUES
('jugador1', 'pass123'),
('jugador2', 'clave456'),
('jugador3', 'segura789'),
('jugador4', 'password000'),
('jugador5', 'xyz123'),
('jugador6', 'abc456'),
('jugador7', 'qwerty789'),
('jugador8', 'pass999'),
('jugador9', 'secure555'),
('jugador10', 'mypass777');


-- Insertar partidas dummie
INSERT INTO Partidas (id_usuario, intento, nivel, plataformas_alcanzadas, mejora_1, mejora_2, mejora_3) VALUES
(1, 1, "Bosque", 5, 2, 5, 1),
(1, 2, "Carny", 79, 2, 5, 1),
(2, 1, "Bosque", 8, 2, 5, 1),
(2, 2, "Bosque", 5, 2, 5, 0),
(2, 3, "Bosque", 10, 2, 5, 1),
(2, 4, "Bosque", 20, 2, 5, 1),
(2, 5, "Bosque", 40, 2, 5, 1),
(2, 6, "Bosque", 80, 2, 5, 1),
(2, 7, "Bosque", 160, 2, 0, 1),
(2, 8, "Bosque", 320, 2, 5, 1),
(2, 9, "Espacio", 640, 2, 5, 1),
(3, 1, "Bosque", 10, 2, 0, 1),
(3, 2, "Bosque", 12, 2, 5, 1),
(4, 1, "Bosque", 13, 2, 5, 1),
(5, 1, "Bosque", 85, 0, 5, 1),
(5, 2, "Bosque", 16, 2, 5, 1),
(6, 1, "Bosque", 18, 0, 0, 0),
(7, 1, "Bosque", 19, 2, 5, 1),
(8, 1, "Magik", 20, 0, 5, 1),
(9, 1, "Bosque", 22, 2, 0, 0),
(10, 1, "Bosque", 24, 2, 5, 1);

-- Insertar inventarios dummie
INSERT INTO Inventario (id_usuario, cantidad_mejora_1, cantidad_mejora_2, cantidad_mejora_3) VALUES
(1, 3, 1, 0),
(2, 1, 0, 5),
(3, 1, 1, 1),
(4, 0, 0, 3),
(5, 0, 0, 1),
(6, 4, 0, 3),
(7, 1, 0, 0),
(8, 0, 0, 0),
(9, 0, 3, 0),
(10, 5, 0, 0);




-- VISTAS NECESARIAS PARA APARTADO DE ESTADÍSTICAS EN LA PÁGINA WEB --


-- Vista a llamar cada que alguien busque los últimos 100 intentos de cierto usuario.
CREATE OR REPLACE VIEW HistorialIntentos AS
SELECT u.usuario AS Jugador, p.intento AS Intento, p.nivel AS Nivel, p.plataformas_alcanzadas AS Plataformas, p.mejora_1 AS Mejora_1, p.mejora_2 AS Mejora_2, p.mejora_3 AS Mejora_3
FROM Partidas p
JOIN Usuarios u ON p.id_usuario = u.id_usuario;

-- Vista útil para graficar cual es la mejora permanente que más suelen escoger los usuarios.
CREATE OR REPLACE VIEW UsoMejoras AS
SELECT
    SUM(cantidad_mejora_1) AS Total_Mejora_1,
    SUM(cantidad_mejora_2) AS Total_Mejora_2,
    SUM(cantidad_mejora_3) AS Total_Mejora_3
FROM Inventario;


-- Vista para establecer un leaderboard en base a diferentes estadísticas.
CREATE OR REPLACE VIEW GlobalRanking AS
SELECT
    u.usuario AS Jugador,
    p.intento AS Mejor_Intento,
    p.plataformas_alcanzadas AS Saltos_Completados,
    p.nivel AS Nivel_Alcanzado,
    p.mejora_1 AS Mejora_1,
    p.mejora_2 AS Mejora_2,
    p.mejora_3 AS Mejora_3
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
                ORDER BY plataformas_alcanzadas DESC, nivel DESC, intento ASC
            ) AS rn
        FROM Partidas
    ) sub
    WHERE rn = 1
) mejores ON p.id_partida = mejores.id_partida
JOIN Usuarios u ON p.id_usuario = u.id_usuario
ORDER BY p.plataformas_alcanzadas DESC, p.nivel DESC, p.intento ASC
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


-- TRIGGERS NECESARIOS --

DELIMITER $$

CREATE TRIGGER crear_inventario_usuario
AFTER INSERT ON Usuarios
FOR EACH ROW
BEGIN
    INSERT INTO Inventario (id_usuario, cantidad_mejora_1, cantidad_mejora_2, cantidad_mejora_3)
    VALUES (NEW.id_usuario, 0, 0, 0);
END$$

DELIMITER ;



-- REVISIÓN DE VISTAS -- 

SELECT * FROM globalranking;

SELECT * FROM historialintentos;

SELECT * FROM usuariosregistrados;

SELECT * FROM usomejoras;

SELECT * FROM historialintentos WHERE Jugador="jugador1";

SELECT * FROM historialintentos WHERE Jugador="jugador2";

SELECT * FROM partidas;

SELECT * FROM inventario;

SELECT * FROM nivelesmascomunes;


