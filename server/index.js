require("dotenv").config();

const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const db = require("./models");
const LoggerMiddleware = require("./middleware/logger");
const errorHandlerMiddleware = require("./middleware/error-handler");
const usersRouter = require("./controllers/users");
const sessionsRouter = require("./controllers/sessions");
const tripsRouter = require("./controllers/trips");
const sectionsRouter = require("./controllers/tripSections");
const ideasRouter = require("./controllers/ideas");

const app = express();
const PORT = process.env.HTTP_PORT || 3000;

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
  })
);
app.use(express.static("client"));
app.use(express.json());

app.use(LoggerMiddleware);
app.use(
  "/api",
  tripsRouter,
  sectionsRouter,
  ideasRouter,
  usersRouter,
  sessionsRouter
);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
