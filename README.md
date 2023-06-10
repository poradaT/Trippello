# Trippello

Trippello is a web application designed to simplify trip planning by providing a collaborative platform where users can gather and share ideas for their trips. Whether you're exploring a new city or embarking on an adventure in the great outdoors, Trippello empowers you and your friends to contribute ideas for attractions, hotels, restaurants, and more. With Trippello, planning your dream trip becomes a collaborative and enjoyable experience.

## Features

- Collaborative Trip Planning: Trippello allows you and your friends to contribute ideas for various aspects of your trip, including attractions, hotels, restaurants, and more. Everyone can add their suggestions and recommendations.
- Interactive Map: Trippello integrates a map feature that enables users to explore and visualize the locations of the suggested attractions, hotels, and restaurants. With the map, you can get a better understanding of the proximity of different places and plan your itinerary accordingly.
- Comments and Discussions: Users can engage in discussions and leave comments on each trip idea. This feature facilitates communication and enables users to provide additional information, tips, and insights for each suggested location.

## Technologies Used

This repository contains both the client-side and server-side code for Trippello. The application is built using the following technologies:

- Express: A fast and minimalist web application framework for Node.js, providing robust routing, middleware, and essential features for web development.
- React: A popular JavaScript library for building efficient and reusable user interfaces, offering a smooth and responsive user experience.
- Node.js: A runtime environment for executing JavaScript code outside of a browser, enabling server-side development and scalable web applications.
- PostgreSQL: A powerful and open-source relational database management system used by Trippello to store and manage user accounts, trip ideas, comments, and other data.

## User Stories

- As a user, I want to be able to create a trip and have my friends to contribute their ideas.
- As a user, I want to browse and explore trip ideas shared by others to gain inspiration for my own trips.
- As a user, I want to add attractions, hotels, restaurants, and other points of interest to a trip to create a comprehensive itinerary.
- As a user, I want to view the details and descriptions of each idea to make informed decisions.
- As a user, I want to leave comments and engage in discussions with other users regarding specific trip ideas.
- As a user, I want to search for specific locations or points of interest on the map to visualize their proximity to each other.

## Getting Started

### Prerequisites

- PostgreSQL: Make sure you have PostgreSQL installed on your system.
- Node.js: Install Node.js to run the server and client applications.
- Visual Studio Code: Recommend using Visual Studio Code as the code editor for this project.

### Database Setup

1. Create a PostgreSQL database named "trippello" by running the following command:
```createdb trippello```

2. Navigate to the server directory:
```cd server```

3. Import the database schema and seed data into the "trippello" database:
```sh
   psql -d trippello < db/schema.sql
   psql -d trippello < db/seed.sql
```

### Server Setup

1. Create a `.env` file in the server directory and configure the following environment variables:

```
PORT=3000
SECRET_KEY=YOUR_SECRET_KEY
DB_NAME=trippello
```

Replace `YOUR_SECRET_KEY` with your desired secret key.

2. Install the server dependencies:
```npm install```

3. Start the server using nodemon (for development):
```npm start```

Alternatively, you can use `node app.js` to start the server without nodemon.

### Client Setup

1. Navigate to the client directory:
```cd client```

2. Install the client dependencies:
```npm install```

3. Start the client development server:
```npm run dev```

This will launch the Trippello web application in your browser.


## Directory Structure

```text
trippello
├── README.md
├── client
└── server
```

---















