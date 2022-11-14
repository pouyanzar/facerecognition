const handleSignin = (req, res, db, bcrypt, saltRounds) => {
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      bcrypt.compare(req.body.password, data[0].hash, function (err, result) {
        if (err) {
          return res.status(400).json("wrong credentials");
        }
        if (result) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then((user) => {
              res.json(user[0]);
            })
            .catch((err) => res.status(400).json("unable to get user"));
        }
        return res.status(400).json("wrong credentials");
      });
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = { handleSignin };
