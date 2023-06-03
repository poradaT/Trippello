TRUNCATE TABLE ideas, trip_sections, trip_collaborators, friendships, trips, users CASCADE;

ALTER SEQUENCE ideas_id_seq RESTART WITH 1;
ALTER SEQUENCE trip_sections_id_seq RESTART WITH 1;
ALTER SEQUENCE trip_collaborators_id_seq RESTART WITH 1;
ALTER SEQUENCE friendships_id_seq RESTART WITH 1;
ALTER SEQUENCE trips_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

INSERT INTO users (user_name, first_name, last_name, email, password_hash) VALUES
  ('Bon', 'Bonne', 'Porada', 'bon@gmail.com', 'password1'),
  ('Mike', 'Michael', 'Miller', 'mike@gmail.com', 'password2'),
  ('AJ', 'Varunya', 'Sam', 'aj@gmail.com', 'password3');

INSERT INTO friendships (user_id, friend_id) VALUES
  (1, 2),
  (1, 3),
  (2, 3);

INSERT INTO trips (user_id, name, start_date, end_date) VALUES
  (1, 'Trip to Paris', '2023-06-10', '2023-06-15'),
  (2, 'Beach Vacation', '2023-07-05', '2023-07-12'),
  (3, 'Hiking Adventure', '2023-08-20', '2023-08-25');

INSERT INTO trip_collaborators (trip_id, collaborator_id) VALUES
  (1, 2),
  (1, 3),
  (2, 1),
  (3, 1),
  (3, 2);

INSERT INTO trip_sections (trip_id, section_name) VALUES
  (1, 'Attractions'),
  (1, 'Cafes'),
  (1, 'Restaurants'),
  (1, 'Bars'),
  (1, 'Side Notes'),
  (2, 'Attractions'),
  (2, 'Cafes'),
  (2, 'Restaurants'),
  (2, 'Bars'),
  (2, 'Side Notes'),
  (3, 'Attractions'),
  (3, 'Cafes'),
  (3, 'Restaurants'),
  (3, 'Bars'),
  (3, 'Side Notes');

INSERT INTO ideas (trip_id, section_id, name, description, image_data) VALUES
  (1, 1, 'Eiffel Tower', 'Must-visit landmark in Paris', NULL),
  (1, 1, 'Louvre Museum', 'Famous art museum in Paris', NULL),
  (2, 6, 'Sunny Beach', 'Relaxing beach with white sand', NULL),
  (2, 6, 'Water Sports', 'Try out exciting water activities', NULL),
  (3, 11, 'Mountain Peak', 'Breathtaking view from the summit', NULL),
  (3, 11, 'Nature Trail', 'Explore scenic hiking trails', NULL);
