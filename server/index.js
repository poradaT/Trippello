require("dotenv").config();

const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");

const LoggerMiddleware = require("./middleware/logger");
const errorHandlerMiddleware = require("./middleware/error-handler");

const db = require("./models");

const sessionsRouter = require("./controllers/sessions");
const usersRouter = require("./controllers/users");

const tripsRouter = require("./controllers/trips");
const sectionsRouter = require("./controllers/tripSections");
const ideasRouter = require("./controllers/ideas");
const commentsRouter = require("./controllers/comments");

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
app.use(cors());

app.use(LoggerMiddleware);

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  "/api",
  sessionsRouter,
  usersRouter,
  tripsRouter,
  sectionsRouter,
  ideasRouter,
  commentsRouter
);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
