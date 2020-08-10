// Route handlers
const express = require("express");
const userAPI = express.Router();
const checkAuthentication = require('../authentication');
const checkAdmin = require("../adminAuthorization");
const User = require("../models/user");

// RETREIVE all users
userAPI.get("/", checkAuthentication, checkAdmin, function(req, res) {
  User.find({}, function(err, user_list) {
    res.json(user_list);
  });
});

// RETRIEVE a specific user
userAPI.get("/:userId", checkAuthentication, function(req, res, next) {
  User.findById(req.params.userId, function(err, users) {
    res.json(users);
  });
});

//UPDATE user information (exclusive following)
userAPI.patch("/:userId", checkAuthentication, function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (req.body._id) {
      delete req.body._id;
    }
    if (req.body.following) {
      delete req.body.following;
    }
    for (let field in req.body) {
      user[field] = req.body[field];
    }
    user.save();
    res.json(user);
  });
});

// Follow
userAPI.patch("/:userId/follow/:followingId", checkAuthentication, function(
  req,
  res
) {
  User.findById(req.params.userId, function(err, user) {
    user.following.push({ _id: req.params.followingId });
    user.save();
    res.json(user);
  });
});

// Unfollow
userAPI.patch("/:userId/unfollow/:followingId", checkAuthentication, function(
  req,
  res
) {
  User.findById(req.params.userId, function(err, user) {
    user.following.pull({ _id: req.params.followingId });
    user.save();
    res.json(user);
  });
});

//DELETE a user
userAPI.delete("/:userId", checkAuthentication, checkAdmin, function(
  req,
  res
) {
  User.findByIdAndRemove(req.params.userId, function(err, target) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(target);
    }
  });
});

// check whether following
userAPI.get("/:userId/isfollowing/:followingId", checkAuthentication, function(
  req,
  res
) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
    }
    if (user) {
      for (let i in user.following) {
        if (user.following[i]._id == req.params.followingId) {
          return res.send(true);
        }
      }
      return res.send(false);
    } else {
      res.send("User doesn't exist.");
    }
  });
});

module.exports = userAPI;