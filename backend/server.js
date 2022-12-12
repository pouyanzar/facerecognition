const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const saltRounds = 10;
const PORT = process.env || 3000;
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "pouyan",
    password: "",
    database: "smart-brain",
  },
});

db.select("*")
  .from("users")
  .then((data) => console.log(data));

app.get("/", (req, res) => {
  res.json(database.users);
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
