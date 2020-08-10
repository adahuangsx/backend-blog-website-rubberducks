// Data Model for micro blogs
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    // _id: {type: String, required: true}, commented by HSX
    title: String,
    content:String,
    nickname: String,
    userId:String,
    tags: [{type:String}],
    likesCnt:{type: Number, default:0},
    // commentCnt: String,
    //By HSX
    comments: [{
      nickname: { type: String, default: "unknown"},  
      userId: String,
      createdTime:  { type: Date, default: Date.now },
      content: {type: String},
      thumbup: {type: Number, default: 0},
      hidden: {type: Boolean, default: true}
    }],
    // watchCnt:String,
    date: {type: Date, default: Date.now}
  }
);

// Export model
module.exports = mongoose.model("blogs", blogSchema);