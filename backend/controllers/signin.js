const handleSignin = (req, res, db, bcrypt, saltRounds) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Incorrect form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      bcrypt.compare(password, data[0].hash, function (err, result) {
        if (err) {
          return res.status(400).json("wrong credentials");
        }
        if (result) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
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
