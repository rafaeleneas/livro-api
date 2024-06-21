------------------------------------
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR NOT null,
    email varchar not null,
    password varchar not null,
    phone varchar not null,   
    address varchar not null
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    name VARCHAR NOT null,
    value numeric not null,
    stock numeric not null,
    author_id INT NOT NULL,
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors (author_id)
);

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR NOT null,   
    email varchar not null,
    phone varchar not null    
);

CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    value numeric not null,
    date date not null,
    client_id INT NOT NULL,
    book_id INT NOT NULL,
    CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES clients (client_id),
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES books (book_id)
);