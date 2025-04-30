USE infinity_jump_db;


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
INSERT INTO Partidas (id_usuario, intento, nivel, plataformas_alcanzadas, tiempo, mejora_salto, mejora_danio, mejora_vida) VALUES
(1, 1, "Bosque", 54, "00:03:34", 2, 5, 1),
(1, 2, "Carny", 79, "00:09:31", 2, 5, 1),
(2, 1, "Bosque", 8, "00:02:17", 2, 5, 1),
(2, 2, "Bosque", 5, "00:09:53", 2, 5, 0),
(2, 3, "Bosque", 10, "00:17:02", 2, 5, 1),
(2, 4, "Bosque", 20, "00:28:36", 2, 5, 1),
(2, 5, "Bosque", 40, "00:00:45", 2, 5, 1),
(2, 6, "Bosque", 80, "00:11:19", 2, 5, 1),
(2, 7, "Bosque", 160, "00:25:44", 2, 0, 1),
(2, 8, "Bosque", 320, "00:07:58", 2, 5, 1),
(2, 9, "Espacio", 640, "00:12:06", 2, 5, 1),
(3, 1, "Bosque", 10, "00:06:31", 2, 0, 1),
(3, 2, "Bosque", 12, "00:24:15", 2, 5, 1),
(4, 1, "Bosque", 13, "00:13:42", 2, 5, 1),
(5, 1, "Bosque", 85, "00:26:27", 0, 5, 1),
(5, 2, "Bosque", 16, "00:04:29", 2, 5, 1),
(6, 1, "Bosque", 18, "00:15:53", 0, 0, 0),
(7, 1, "Bosque", 19, "00:18:11", 2, 5, 1),
(8, 1, "Magik", 20, "00:14:08", 0, 5, 1),
(9, 1, "Bosque", 22, "00:03:46", 2, 0, 0),
(10, 1, "Bosque", 24, "00:20:01", 2, 5, 1);
-- Este específico va a igualarse con el mejor intento en el ranking y va a tener menor tiempo por lo que debería estar primero en el rank
INSERT INTO Partidas (id_usuario, intento, nivel, plataformas_alcanzadas, tiempo, mejora_salto, mejora_danio, mejora_vida) VALUES
(10, 2, "Espacio", 640, "00:03:34", 2, 5, 1);

-- Insertar inventarios dummie
INSERT INTO Inventario (id_usuario, cantidad_mejora_salto, cantidad_mejora_danio, cantidad_mejora_vida) VALUES
(1, 3, 1, 0),
(2, 1, 0, 5),
(3, 1, 1, 1),
(4, 0, 0, 3),
(5, 0, 0, 1),
(6, 4, 0, 3),
(7, 1, 0, 0),
(8, 0, 0, 0),
(9, 0, 3, 0),
(10, 5, 5, 5);