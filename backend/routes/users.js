const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    email,
    password,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/email/:email").get((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addCart/:id").put((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.cart.push(req.body.productID);
      user
        .save()
        .then(() => res.json("Cart updated!"))
        .catch((err) => res.status(400).json("Error: " + err, user));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/removeCart/:id").put((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.cart = user.cart.filter((item) => item !== req.body.productID);
      user
        .save()
        .then(() => res.json("Cart updated!"))
        .catch((err) => res.status(400).json("Error: " + err, user));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
