// Data Model for Users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const SALT_FACTOR = 10;

const UserSchema = new Schema(
  {
    _id: {type: String, required: true},
    password: {type: String, required: true},
    following: [{_id: String}],
    nickname: String,
    description: String,
    gender: {type: String, enum: ['Male', 'Female', 'Other', 'Animal Crossing Islander']},
    creatDate: {type: Date, default: Date.now},
    admin: {type: Boolean, default: false},
    avatarURL: {type: String, default: "https://cdn.glitch.com/b88fea2e-5f13-4eea-bb38-75778c7cbad1%2Frubber%20duck%20avatar.png"}
  }
);

var noop = function() {};
UserSchema.pre("save", function(done) {
  var user = this;
  if (!user.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) { return done(err); }
      user.password = hashedPassword;
      done();
    }); 
  });
});

// checking password function
UserSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

// Export model
module.exports = mongoose.model("user", UserSchema);