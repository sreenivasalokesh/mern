const assert = require("assert");
const UserWithSubdocumentPost = require("../src/UserWithSubdocumentPost");

describe("", () => {
  it("create with subdocument", () => {
    const joe = new UserWithSubdocumentPost({
      name: "Joe",
      posts: [{ title: "My first post" }],
    });
    joe
      .save()
      .then(() => UserWithSubdocumentPost.findOne({ name: "Joe" }))
      .then((user) => assert(user.posts[0].title === "My first post"));
  });

  it("create with subdocument -2", () => {
    console.log("create with subdocument -2");
    const joe = new UserWithSubdocumentPost({
      name: "Joe",
    });
    joe
      .save()
      .then(() => UserWithSubdocumentPost.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "My second post" });
        return user.save();
      })
      .then((user) => assert(user.posts[0].title === "My second post"));
  });

  it("delete  subdocument", () => {
    console.log("create with subdocument -2");
    const joe = new UserWithSubdocumentPost({
      name: "Joe",
    });
    joe
      .save()
      .then(() => UserWithSubdocumentPost.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "My second post" });
        return user.save();
      })
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then((user) => assert(user.posts.length === 0));
  });
});
