CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT FOREIGN KEY REFERENCES movies(id),
  user_id INT,
  rating INT ,
  review TEXT,
  CHECK (rating > 0 AND rating < 6)
);