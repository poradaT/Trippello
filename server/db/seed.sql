TRUNCATE TABLE comments, ideas, sections, trip_members, trips, users CASCADE;

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
  (1, 'Landmarks'),
  (2, 'Attractions'),
  (2, 'Hotels'),
  (2, 'Beaches'),
  (3, 'Trails'),
  (3, 'Campsites'),
  (3, 'Scenic Spots');

INSERT INTO ideas (section_id, name, description, photo_url) VALUES
  (3, 'Eiffel Tower', 'Must-visit landmark in Paris', NULL),
  (1, 'Louvre Museum', 'Famous art museum in Paris', NULL),
  (1, 'Notre Dame Cathedral', 'Iconic Gothic cathedral in Paris', NULL),
  (2, 'Le Jules Verne', 'Fine dining restaurant with a view of the Eiffel Tower', NULL),
  (2, 'Le Procope', 'Historic restaurant serving traditional French cuisine', NULL),
  (2, 'Café de Flore', 'Renowned café known for its literary history', NULL),
  (6, 'Paradise Beach', 'Beautiful sandy beach with crystal clear water', NULL),
  (4, 'Sunset Point', 'Scenic spot to watch breathtaking sunsets', NULL),
  (4, 'Water Sports Adventure', 'Exciting water activities for thrill-seekers', NULL),
  (5, 'Beachfront Resort', 'Luxurious hotel by the beach', NULL),
  (5, 'Ocean View Villa', 'Private villa with stunning ocean views', NULL),
  (5, 'Boutique Hotel', 'Charming hotel with personalized service', NULL),
  (7, 'Mountain View Trail', 'Scenic trail with panoramic views', NULL),
  (9, 'Nature Photography Expedition', 'Capture stunning shots of wildlife and landscapes', NULL),
  (8, 'Adventure Camping', 'Camp in the wilderness and explore hidden trails', NULL),
  (8, 'Riverside Campground', 'Campsite by the river with stunning natural surroundings', NULL),
  (7, 'Hiking Trail Exploration', 'Discover hidden gems along picturesque hiking trails', NULL),
  (8, 'Outdoor Yoga Retreat', 'Relax and rejuvenate amidst nature with guided yoga sessions', NULL);
  
INSERT INTO comments (user_id, idea_id, comment, comment_date) VALUES
  (1, 1, 'I loved visiting the Eiffel Tower!', '2023-06-12'),
  (2, 1, 'Me too! It was an amazing experience.', '2023-06-13'),
  (1, 1, 'The view from the top of the Eiffel Tower is breathtaking.', '2023-06-14'),
  (2, 2, 'The Louvre Museum is a must-see for art enthusiasts.', '2023-06-11'),
  (3, 3, 'Le Jules Verne offers an incredible dining experience.', '2023-07-06'),
  (2, 4, 'Paradise Beach is so relaxing!', '2023-07-07'),
  (1, 4, 'I enjoyed the beachfront view from the resort.', '2023-07-09'),
  (3, 5, 'The Mountain View Trail offers stunning vistas.', '2023-07-10'),
  (2, 5, 'Dont forget to bring your camera for breathtaking photos!', '2023-07-11'),
  (3, 6, 'The riverside campground provides a peaceful retreat.', '2023-07-12');


INSERT INTO trip_members (user_id, trip_id) VALUES
  (1, 1),
  (2, 1),
  (2, 2),
  (3, 3);