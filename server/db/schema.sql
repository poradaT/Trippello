DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS ideas CASCADE;
DROP TABLE IF EXISTS sections CASCADE;
DROP TABLE IF EXISTS trip_members CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  user_id INT,
  CONSTRAINT fk_trips_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_public BOOLEAN,
  is_active BOOLEAN
);

CREATE TABLE trip_members (
  id SERIAL PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  trip_id INT,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE sections (
  id SERIAL PRIMARY KEY,
  trip_id INT,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE ideas (
  id SERIAL PRIMARY KEY,
  section_id INT,
  FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  idea_id INT,
  FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
  comment TEXT,
  comment_date DATE
);