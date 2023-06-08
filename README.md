# Trippello

Trippello is a web application for managing and organizing your trips. This repository contains both the client-side and server-side code for Trippello.

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
```npm start```

This will launch the Trippello web application in your browser.


## Directory Structure

```text
trippello
├── README.md
├── client
└── server
```

---















