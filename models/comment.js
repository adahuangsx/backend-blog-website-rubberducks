// Data Model for comments
//by HSX

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
/**
 * Comment design:
 * One blog can have a bunch of comments, but 
 * each comment can only be replied by the author,
 * and be decided if it's hidden.
 * Both blogs and comments can have a thumbup number.
 */
const commentSchema = new Schema({
    userName: { type: String, default: "unknown"},  
    userId: String,
    createdTime:  { type: Date, default: Date.now },
    content: {type: String},
    thumbup: {type: Number, default: 0},
    hidden: {type: Boolean, default: true}
});

// Export model
module.exports = mongoose.model("comment", commentSchema);