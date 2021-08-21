CREATE TABLE posts(
	id SERIAL PRIMARY KEY UNIQUE,
	author VARCHAR(50) NOT NULL,
	tags VARCHAR[],
	featured_img TEXT,
	created_on DATE
); 