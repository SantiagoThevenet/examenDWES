DROP DATABASE fotosDB IF EXISTS;

CREATE DATABASE fotosDB;

USE fotosDB;

CREATE TABLE fotos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(500),
    titulo VARCHAR(30),
    descripcion VARCHAR(500),
    comment VARCHAR(250), 
    fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    likes int,
    dislikes int
);

INSERT INTO fotos (url, titulo, descripcion, likes, dislikes)
VALUES
    (
        "http://localhost:3000/images/download.jpeg",
        "Gato1",
        "GATO1",
        0,
        0
    );

INSERT INTO
    fotos (url, titulo, descripcion, likes, dislikes)
VALUES
    (
        "http://localhost:3000/images/download1.jpeg",
        "Gato2",
        "GATO2",
        0,
        0
    );
INSERT INTO
    fotos (url, titulo, descripcion, likes, dislikes)
VALUES
    (
        "http://localhost:3000/images/Sobrepeso-en-gatos.jpeg",
        "Gato2",
        "GATO2",
        0,
        0
    );