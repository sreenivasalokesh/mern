const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./PostSchema");

const UserWithSubdocumentPostSchema = new Schema({
  name: String,
  posts: [PostSchema],
});

UserWithSubdocumentPostSchema.virtual("postCount").get(function () {
  //virtual field
  return this.posts.length;
});

const UserWithSubdocumentPost = mongoose.model(
  "userWithSubdocPost",
  UserWithSubdocumentPostSchema
);

module.exports = UserWithSubdocumentPost;
