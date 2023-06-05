TRUNCATE TABLE attachments, comments, ideas, sections, trip_members, trips, users CASCADE;

ALTER SEQUENCE ideas_id_seq RESTART WITH 1;
ALTER SEQUENCE sections_id_seq RESTART WITH 1;
ALTER SEQUENCE trips_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE trip_members_id_seq RESTART WITH 1;

INSERT INTO users (user_name, email, password_hash) VALUES
  ('Bon', 'bon@gmail.com', '$2a$10$BpGLz77zY0vgeWze/qgTYu6XcYmD7lW/wMMI3d2PRb00PuCxgOER.'),
  ('Mike', 'mike@gmail.com', '$2a$10$H0r9eXJMQojxDNV0fNNpveOJz1Kcwihb0s0XZzIANNWPUImfRCG/.'),
  ('AJ', 'aj@gmail.com', '$2a$10$IDgwFsDn892jyzAkxIvmc.Zg4SRyrqidv0J9wveKTLV5hyyLC5Wg2');

INSERT INTO trips (user_id, name, start_date, end_date, is_public, is_active) VALUES
  (1, 'Trip to Paris', '2023-06-10', '2023-06-15', true, true),
  (2, 'Beach Vacation', '2023-07-05', '2023-07-12', true, true),
  (3, 'Hiking Adventure', '2023-08-20', '2023-08-25', true, true);

INSERT INTO sections (trip_id, name) VALUES
  (1, 'Attractions'),
  (1, 'Restaurants'),
  (2, 'Attractions'),
  (2, 'Hotels'),
  (3, 'Trails'),
  (3, 'Campsites');

INSERT INTO ideas (section_id, name, description) VALUES
  (1, 'Eiffel Tower', 'Must-visit landmark in Paris'),
  (1, 'Louvre Museum', 'Famous art museum in Paris'),
  (2, 'Le Jules Verne', 'Fine dining restaurant with a view of the Eiffel Tower'),
  (3, 'Paradise Beach', 'Beautiful sandy beach with crystal clear water'),
  (4, 'Beachfront Resort', 'Luxurious hotel by the beach'),
  (5, 'Mountain View Trail', 'Scenic trail with panoramic views'),
  (6, 'Riverside Campground', 'Campsite by the river with stunning nature surroundings');

INSERT INTO comments (user_id, idea_id, comment, comment_date) VALUES
  (1, 1, 'I loved visiting the Eiffel Tower!', '2023-06-12'),
  (2, 1, 'Me too! It was an amazing experience.', '2023-06-13'),
  (1, 2, 'The Louvre Museum is a must-see for art enthusiasts.', '2023-06-11'),
  (3, 3, 'Le Jules Verne offers an incredible dining experience.', '2023-07-06'),
  (2, 4, 'Paradise Beach is so relaxing!', '2023-07-07');

INSERT INTO attachments (idea_id, filename, location) VALUES
  (1, 'eiffel_tower.jpg', '/attachments/eiffel_tower.jpg'),
  (2, 'louvre_museum.jpg', '/attachments/louvre_museum.jpg');

  INSERT INTO trip_members (user_id, trip_id) VALUES
  (1, 1),
  (2, 1),
  (2, 2),
  (3, 3);