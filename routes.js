// Route handlers
const express = require("express");
const router = express.Router();
const userAPI = require("./API/userAPI");
const User = require("./models/user");
const blogAPI = require("./API/blogAPI");
const Blog = require("./models/blogs");
const jwt = require("jsonwebtoken");
const checkAuthentication = require("./authentication");
const checkAdmin = require("./adminAuthorization");

router.use("/user", userAPI);
router.use("/blog", blogAPI);

router.get("/", function(req, res) {
  res.send("Welcom, please login");
});

router.get("/checkToken", function(req, res) {
  res.sendStatus(200);
});

router.get("/home", function(req, res) {
  res.send("Home Page (login successfully)");
});

// Route to signup page
router.get("/signup", function(req, res) {
  res.send("Signup Page");
});

router.post("/signup", function(req, res, next) {
  User.findOne({ _id: req.body._id }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.redirect("/signup");
    }
    let newUser = new User(req.body);
    // if (req.body.admin) {
    //   newUser.admin = true;
    // }
    newUser.save();
    res.status(201).send(newUser);
  });
});

// route to login page
router.get("/login", function(req, res) {
  res.send("Login Page");
});

router.post("/login", function(req, res) {
  const { _id, password } = req.body;
  User.findOne({ _id }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect username or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect username or password"
          });
        } else {
          // Issue token
          const payload = { _id };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1h"
          });
          res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .send(user);
        }
      });
    }
  });
});

// get the following people by user id
router.get("/:userId/following", function(req, res) {
  User.find({ following: req.params.following }, function(err, following) {
    if (err) {
      res.send(err);
    }
    res.json(following);
  });
});

//route to blog list by id
router.get("/allblogs/:userid", function(req, res) {
  Blog.find({ userId: req.params.userid }, function(err, blogs) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200);
    res.json(blogs);
  });
});

module.exports = router;
