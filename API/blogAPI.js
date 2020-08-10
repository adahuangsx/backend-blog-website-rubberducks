// Route handlers
const express = require("express");
const router = express.Router();
//import data models
const Blogs = require("../models/blogs");
const Comment = require("../models/comment");
const checkAuthentication = require("../authentication");
const checkAdmin = require("../adminAuthorization");

// RETREIVE all blogs
router.get("/", function(req, res) {
  Blogs.find({}, function(err, all_blogs) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200);
    res.json(all_blogs);
  });
});

// RETRIEVE any blogs
router.get("/:blogId", function(req, res) {
  Blogs.findById(req.params.blogId, function(err, blog) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200);
    res.json(blog);
  });
});

// router.patch("/:blogId", function(req, res) {
//   router.findById(req.params.blogId, function(err, blog) {
//     if (req.body._id) {
//       delete req.body._id;
//     }
//     for (let field in req.body) {
//       blog[field] = req.body[field];
//     }
//     blog.save();
//     res.json(blog);
//   });
// });

// Create blogs(auth)
router.post("/", checkAuthentication, function(req, res) {
  let blog = new Blogs(req.body);
  // blog.userId = req.user._id;r
  blog.save();
  res.status(201).send(blog);
});

// //Edit blogs(auth)
// router.put("/:id", function(req, res) {
//   Blogs.findById(req.params.id, function(err, blog) {
//     let blogs = new Blogs(req.body);
//     let request_title = req.body.title;
//     let request_content = req.body.content;
//     let request_date = req.body.date;
//     let request_nickname = req.body.nickame;
//     let request_tags = req.body.tags;
//     if (
//       request_title == null ||
//       request_content == null ||
//       request_nickname == null ||
//       request_tags == null ||
//       request_date == null
//     ) {
//       res.status(400);
//       res.render("error", {
//         error:
//           "Your request body is not completed. Please check the request body"
//       });
//     } else {
//       blog.title = req.body.title;
//       blog.content = req.body.content;
//       blog.nickname = req.body.nickname;
//       blog.tags = req.body.tags;
//       blog.save();
//       res.status(201);
//       res.json(blog);
//     }
//   });
// });

router.patch("/:blogId", checkAuthentication, function(req, res) {
  Blogs.findById(req.params.blogId, function(err, blog) {

    for (let field in req.body) {
      blog[field] = req.body[field];
    }
    blog.save();
    res.json(blog);
  });
});

//DELETE a blog(auth)
router.delete("/:id", checkAuthentication, function(req, res) {
  Blogs.findById(req.params.id, function(err, blog) {
    blog.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("Remove success");
      }
    });
  });
});

//by HSX
//add a comment to a blogId
router.post("/addcomment/:blogId", checkAuthentication, function(req, res) {
  Blogs.findById(req.params.blogId, function(err, blog) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    let newComment = new Comment(req.body);
    newComment.save(); // new a comment and save into Comment Table
    blog.comments.push(newComment);
    blog.save(); // save this comment to the blog
    res.json(blog.comments);
  });
});

module.exports = router;
