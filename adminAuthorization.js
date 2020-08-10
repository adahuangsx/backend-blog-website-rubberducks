const User = require('./models/user');

function checkAdmin(req, res, next) {
  User.findById(req._id, function(err, user) {
    if (err) {
      next(err);
    }
    if (user.admin) {
      next();
    } else {
      res.status(401).send("Administrator Privilege Needed");
    }
  });
}

module.exports = checkAdmin;