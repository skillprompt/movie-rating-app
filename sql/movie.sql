CREATE TABLE IF NOT EXISTS movies
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  release_year INT,
  genre VARCHAR(100)
);