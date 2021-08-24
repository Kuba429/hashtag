CREATE TABLE posts(
	id SERIAL PRIMARY KEY UNIQUE,
    content TEXT NOT NULL,
	author VARCHAR(50) NOT NULL,
	tags VARCHAR[],
	featured_img TEXT,
	created_on DATE
); 