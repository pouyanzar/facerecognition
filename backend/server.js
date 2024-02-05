const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const saltRounds = 10;
const PORT = process.env.PORT || 3000;
const db = knex({
  client: "pg",
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
  },
});

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/signin", (req, res) =>
  signin.handleSignin(req, res, db, bcrypt, saltRounds)
);

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt, saltRounds)
);

app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));

app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageUrl", (req, res) => image.handleApiCall(req, res));
app.listen(PORT || 3000, () => {
  console.log(`app is running on port ${PORT}`);
});
