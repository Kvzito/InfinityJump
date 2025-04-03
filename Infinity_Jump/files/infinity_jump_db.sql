CREATE DATABASE infinity_jump_db;

USE infinity_jump_db;

CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Partidas (
    id_partida INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    intento INT NOT NULL,
    nivel INT NOT NULL,
    tiempo TIME NOT NULL,
    plataformas_alcanzadas INT NOT NULL,
    monedas_obtenidas INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    UNIQUE (id_usuario, intento)  -- Permite múltiples intentos por usuario
) ENGINE=InnoDB;

CREATE TABLE Mejoras (
    id_mejora INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo ENUM('Temporal', 'Permanente') NOT NULL,
    efecto VARCHAR(100) NOT NULL,
    precio INT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Inventario (
    id_usuario INT NOT NULL,
    id_mejora INT NOT NULL,
    cantidad INT DEFAULT 1,
    PRIMARY KEY (id_usuario, id_mejora),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_mejora) REFERENCES Mejoras(id_mejora)
) ENGINE=InnoDB;

CREATE TABLE Niveles (
    id_nivel INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    cantidad_plataformas INT NOT NULL,
    dificultad ENUM('Fácil', 'Medio', 'Difícil') NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Enemigos (
    id_enemigo INT PRIMARY KEY AUTO_INCREMENT,
    id_nivel INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    vida INT NOT NULL,
    danio INT NOT NULL,
    FOREIGN KEY (id_nivel) REFERENCES Niveles(id_nivel)
) ENGINE=InnoDB;

-- Insertar usuarios
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
('jugador10', 'mypass777'),
('jugador11', 'random111'),
('jugador12', 'safekey123'),
('jugador13', 'hidden321'),
('jugador14', 'letmein123'),
('jugador15', 'newpass456'),
('jugador16', 'lockit789'),
('jugador17', 'code890'),
('jugador18', 'data555'),
('jugador19', 'encrypt999'),
('jugador20', 'hashed123'),
('jugador21', 'passcode123'),
('jugador22', 'private456'),
('jugador23', 'keypass789'),
('jugador24', 'safety000'),
('jugador25', 'access111'),
('jugador26', 'login222'),
('jugador27', 'userpass333'),
('jugador28', 'mypassword444'),
('jugador29', 'testpass555'),
('jugador30', 'tryme666'),
('jugador31', 'secret777'),
('jugador32', 'hidden888'),
('jugador33', 'lockdown999'),
('jugador34', 'gateway123'),
('jugador35', 'codebreaker456'),
('jugador36', 'unhackable789'),
('jugador37', 'trustme000'),
('jugador38', 'protection111'),
('jugador39', 'safeguard222'),
('jugador40', 'mysecure333');

-- Insertar niveles
INSERT INTO Niveles (nombre, cantidad_plataformas, dificultad) VALUES
('Bosque Encantado', 100, 'Fácil'),
('Cielo Desconocido', 150, 'Medio'),
('Cosmos', 200, 'Difícil');

-- Insertar mejoras
INSERT INTO Mejoras (nombre, descripcion, tipo, efecto, precio) VALUES
('Turbo', 'Aumenta la velocidad del auto', 'Temporal', 'Velocidad +20%', 50),
('Blindaje', 'Reduce el daño recibido', 'Permanente', 'Daño -10%', 100),
('Imán de Monedas', 'Atrae monedas cercanas', 'Temporal', 'Radio +50%', 75),
('Doble Salto', 'Permite un segundo salto en el aire', 'Permanente', 'Salto adicional', 150);

-- Insertar enemigos
INSERT INTO Enemigos (id_nivel, nombre, vida, danio) VALUES
(1, 'Flor macabra', 50, 5),
(2, 'Mago Desterrado', 75, 15),
(3, 'La cosa', 100, 20);

-- Insertar partidas
INSERT INTO Partidas (id_usuario, intento, nivel, tiempo, plataformas_alcanzadas, monedas_obtenidas) VALUES
(1, 1, 1, '00:02:30', 5, 10),
(1, 2, 2, '00:03:15', 7, 14),
(2, 1, 2, '00:03:45', 8, 15),
(3, 1, 3, '00:04:10', 10, 20),
(3, 2, 4, '00:05:00', 12, 25),
(4, 1, 4, '00:05:20', 13, 30),
(5, 1, 5, '00:06:00', 15, 35),
(5, 2, 6, '00:06:30', 16, 40),
(6, 1, 6, '00:07:10', 18, 45),
(7, 1, 7, '00:07:30', 19, 50),
(8, 1, 8, '00:08:00', 20, 55),
(9, 1, 9, '00:08:15', 22, 60),
(10, 1, 10, '00:09:00', 24, 65),
(11, 1, 1, '00:02:40', 6, 12),
(12, 1, 2, '00:03:50', 9, 17),
(13, 1, 3, '00:04:20', 11, 22),
(14, 1, 4, '00:05:10', 13, 28),
(15, 1, 5, '00:06:20', 15, 33),
(16, 1, 6, '00:07:00', 17, 38),
(17, 1, 7, '00:07:40', 19, 43),
(18, 1, 8, '00:08:30', 21, 48),
(19, 1, 9, '00:09:10', 23, 53),
(20, 1, 10, '00:09:30', 25, 58),
(21, 1, 1, '00:02:50', 5, 10),
(22, 1, 2, '00:03:40', 8, 14),
(23, 1, 3, '00:04:15', 10, 18),
(24, 1, 4, '00:05:05', 12, 22),
(25, 1, 5, '00:06:15', 14, 26),
(26, 1, 6, '00:07:05', 16, 30),
(27, 1, 7, '00:07:50', 18, 34),
(28, 1, 8, '00:08:40', 20, 38),
(29, 1, 9, '00:09:20', 22, 42),
(30, 1, 10, '00:09:50', 24, 46),
(31, 1, 1, '00:02:20', 6, 14),
(32, 1, 2, '00:03:30', 8, 18),
(33, 1, 3, '00:04:25', 10, 22),
(34, 1, 4, '00:05:15', 12, 26),
(35, 1, 5, '00:06:10', 14, 30),
(36, 1, 6, '00:07:10', 16, 34),
(37, 1, 7, '00:07:55', 18, 38),
(38, 1, 8, '00:08:35', 20, 42),
(39, 1, 9, '00:09:25', 22, 46),
(40, 1, 10, '00:09:55', 24, 50);

-- Insertar inventario
INSERT INTO Inventario (id_usuario, id_mejora, cantidad) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 3),
(4, 4, 1);

SELECT * FROM usuarios;

CREATE VIEW HistorialPartidas AS
SELECT u.usuario, p.intento, p.nivel, p.tiempo, p.plataformas_alcanzadas, p.monedas_obtenidas
FROM Partidas p
JOIN Usuarios u ON p.id_usuario = u.id_usuario
ORDER BY u.usuario, p.intento;


CREATE OR REPLACE VIEW RankingJugadores AS
SELECT u.id_usuario, u.usuario, MIN(p.tiempo) AS mejor_tiempo, MAX(p.plataformas_alcanzadas) AS Plataformas_totales
FROM Usuarios u
JOIN Partidas p ON u.id_usuario = p.id_usuario
GROUP BY u.usuario
ORDER BY Plataformas_totales DESC, mejor_tiempo ASC
LIMIT 5;


SELECT * FROM HistorialPartidas;
SELECT * FROM RankingJugadores;

