DROP DATABASE fotosDB IF EXISTS;
CREATE DATABASE fotosDB;
USE fotosDB;

CREATE TABLE fotos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(500),
    titulo VARCHAR(30),
    descripcion VARCHAR(500),
    fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    likes int,
    dislikes int
)