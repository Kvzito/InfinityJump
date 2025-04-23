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
    nivel INT NOT NULL,
    plataformas_alcanzadas INT NOT NULL,
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
INSERT INTO Partidas (id_usuario, intento, nivel, plataformas_alcanzadas) VALUES
(1, 1, 1, 5),
(1, 2, 2, 79),
(2, 1, 1, 8),
(3, 1, 1, 10),
(3, 2, 2, 12),
(4, 1, 2, 13),
(5, 1, 2, 85),
(5, 2, 1, 16),
(6, 1, 1, 18),
(7, 1, 1, 19),
(8, 1, 1, 20),
(9, 1, 1, 22),
(10, 1, 1, 24);

-- Insertar inventarios dummie
INSERT INTO Inventario (id_usuario, cantidad_mejora_1, cantidad_mejora_2, cantidad_mejora_3) VALUES
(1, 0, 1, 0),
(2, 0, 0, 0),
(3, 0, 0, 0),
(4, 0, 0, 0),
(5, 0, 0, 1),
(6, 0, 0, 0),
(7, 0, 0, 0),
(8, 0, 0, 0),
(9, 0, 0, 0),
(10, 0, 0, 0);


-- VISTAS NECESARIAS PARA APARTADO DE ESTADÍSTICAS EN LA PÁGINA WEB --


-- Vista a llamar cada que alguien busque los últimos 100 intentos de cierto usuario.
CREATE VIEW HistorialIntentos AS
SELECT u.usuario AS Jugador, p.intento AS Intento, p.nivel AS Nivel, p.plataformas_alcanzadas AS Saltos_completados, i.cantidad_mejora_1 AS Mejora_1, i.cantidad_mejora_2 AS Mejora_2, i.cantidad_mejora_3 AS Mejora_3
FROM Partidas p
JOIN Usuarios u ON p.id_usuario = u.id_usuario
JOIN Inventario i ON p.id_usuario = i.id_usuario
ORDER BY u.usuario, p.intento
LIMIT 100;

-- Vista útil para graficar cual es la mejora permanente que más suelen escoger los usuarios.
CREATE VIEW UsoMejoras AS
SELECT
    SUM(cantidad_mejora_1) AS Total_Mejora_1,
    SUM(cantidad_mejora_2) AS Total_Mejora_2,
    SUM(cantidad_mejora_3) AS Total_Mejora_3
FROM Inventario;


-- Vista para establecer un leaderboard en base a diferentes estadísticas.
CREATE VIEW GlobalRanking AS
SELECT
    u.usuario AS Jugador,
    p.intento AS Mejor_Intento,
    p.plataformas_alcanzadas AS Saltos_Completados,
    p.nivel AS Nivel_Alcanzado,
    i.cantidad_mejora_1 AS Mejora_1,
    i.cantidad_mejora_2 AS Mejora_2,
    i.cantidad_mejora_3 AS Mejora_3
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
JOIN Inventario i ON p.id_usuario = i.id_usuario
ORDER BY p.plataformas_alcanzadas DESC, p.nivel DESC, p.intento ASC
LIMIT 10;

-- Vista para ver los diferentes usuarios registrados sin comprometer sus contraseñas
CREATE VIEW UsuariosRegistrados AS
SELECT
	u.id_usuario,
    u.usuario
FROM usuarios u
ORDER BY u.id_usuario DESC;

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
