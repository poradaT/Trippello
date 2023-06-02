DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS ideas CASCADE;
DROP TABLE IF EXISTS friendships CASCADE;
DROP TABLE IF EXISTS trip_collaborators CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE friendships (
  PRIMARY KEY (user_id, friend_id),
  user_id INT NOT NULL, 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
  friend_id INT NOT NULL,
        FOREIGN KEY (friend_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  user_id INT,
        CONSTRAINT fk_trips_users
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE trip_collaborators (
  PRIMARY KEY (trip_id, collaborator_id),
  trip_id INT,
        FOREIGN KEY (trip_id) 
        REFERENCES trips(id) 
        ON DELETE CASCADE,
  collaborator_id INT,
        FOREIGN KEY (collaborator_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
);

CREATE TABLE ideas (
  id SERIAL PRIMARY KEY,
  trip_id INT,
        CONSTRAINT fk_ideas_trips
        FOREIGN KEY(trip_id)
        REFERENCES trips(id)
        ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_data BYTEA
);