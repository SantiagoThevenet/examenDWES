CREATE DATABASE fotosDB;
USE fotosDB;

CREATE TABLE fotos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(500),
    titulo VARCHAR(30),
    fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    likes int,
    dislikes int
)