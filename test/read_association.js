const assert = require("assert");
const BlogPost = require("../src/BlogPost");
const Comment = require("../src/Comment");
const UserWithAssociation = require("../src/UserWithAssociation");

describe("Test for Read case", () => {
  let joe, blogpost, comment;

  beforeEach(() => {
    joe = new UserWithAssociation({ name: "Joe" });
    blogpost = new BlogPost({
      title: "joe's first post",
      content: "joe's simple content",
    });
    comment = new Comment({ content: "joe's first comment" });

    joe.blogPosts.push(blogpost);
    blogpost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogpost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("read user with association", (done) => {
    UserWithAssociation.findOne({ name: "Joe" })
      .populate("blogPosts") //used to populate blogpost association, without this only id of blog post is available, and with this the ehtore blogpost object is fecthed
      .then((users) => {
        console.log("#####users with blogposts: ", users);
        done();
      });
  });

  it("read user with association - multiple level", (done) => {
    UserWithAssociation.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment", //multilevel populate need model to be mentioned
          populate: {
            path: "user",
            model: "user",
          },
        },
      })
      .then((users) => {
        console.log("#####users with blogposts - multilevel: ", users);
        done();
      });
  });
});
