const UserWithAssociation = require("../src/UserWithAssociation");
const BlogPost = require("../src/BlogPost");
const Comment = require("../src/Comment");

describe("test association", () => {
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

  it("test association create", () => {});
});
