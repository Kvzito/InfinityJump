# Ejemplo de base de datos para el juego Infinity Jump

```sql
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
