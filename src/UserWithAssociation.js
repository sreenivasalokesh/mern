const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./PostSchema");

const UserWithAssociationSchema = new Schema({
  name: String,
  posts: [PostSchema],
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "blogpost" }], //blogpost is the name mentioned for the model in BlogPost.js
});

UserWithAssociationSchema.virtual("postCount").get(function () {
  //virtual field
  return this.posts.length;
});

UserWithAssociationSchema.pre("remove", function () {
  //exeucte this middleware function before the actual event "remove", it can also be "save"
  const BlogPosts = mongoose.model("blogpost");
  BlogPosts.remove({ _id: { $in: this.blogPosts } }) //used in to find a list of blogposts and delete
    .then(() => next());
});

const UserWithAssociation = mongoose.model(
  "userWithAssociation",
  UserWithAssociationSchema
);

module.exports = UserWithAssociation;
