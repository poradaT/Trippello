TRUNCATE TABLE users;
TRUNCATE TABLE friendships;
TRUNCATE TABLE trips;
TRUNCATE TABLE trip_collaborators;
TRUNCATE TABLE ideas;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE friendships_id_seq RESTART WITH 1;
ALTER SEQUENCE trips_id_seq RESTART WITH 1;
ALTER SEQUENCE trip_collaborators_id_seq RESTART WITH 1;
ALTER SEQUENCE ideas_id_seq RESTART WITH 1;

INSERT INTO users (user_name, first_name, last_name, email, password_hash) VALUES
  ('Bon', 'Bonne', 'Porada', 'bon@gmail.com', 'password1'),
  ('Mike', 'Michael', 'Miller', 'mike@gmail.com', 'password2'),
  ('AJ', 'Varunya', 'Sam', 'aj@gmail.com', 'password3');

INSERT INTO friendships (user_id, friend_id) VALUES
  (1, 2),
  (1, 3),
  (2, 3);

INSERT INTO trips (user_id, name) VALUES
  (1, 'Trip to Paris'),
  (2, 'Beach Vacation'),
  (3, 'Hiking Adventure');

INSERT INTO trip_collaborators (trip_id, collaborator_id) VALUES
  (1, 2),
  (1, 3),
  (2, 1),
  (3, 1),
  (3, 2);

INSERT INTO ideas (trip_id, name, description, image_data) VALUES
  (1, 'Eiffel Tower', 'Must-visit landmark in Paris', NULL),
  (1, 'Louvre Museum', 'Famous art museum in Paris', NULL),
  (2, 'Sunny Beach', 'Relaxing beach with white sand', NULL),
  (2, 'Water Sports', 'Try out exciting water activities', NULL),
  (3, 'Mountain Peak', 'Breathtaking view from the summit', NULL),
  (3, 'Nature Trail', 'Explore scenic hiking trails', NULL);
