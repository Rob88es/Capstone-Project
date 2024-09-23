USE incity;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(18) NOT NULL,
    loggen_in BOOLEAN DEFAULT FALSE
);

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE eventos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    texto TEXT,
    inicia DATETIME,
    finaliza DATETIME,
    like_count INT DEFAULT 0,
    image VARCHAR(255),
    user_id INT,
    categoria_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


CREATE TABLE likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    evento_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (evento_id) REFERENCES eventos(id)
);

INSERT INTO categorias (categoria) VALUES
('Conciertos'), ('Cine'), ('Vida nocturna'), ('Gastronomía'), ('Negocios'), ('Teatro/show'), ('Turismo');