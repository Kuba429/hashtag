CREATE TABLE users(
    id SERIAL PRIMARY KEY UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on DATE

)