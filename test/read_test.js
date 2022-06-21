const assert = require("assert");
const User = require("../src/User");

describe("Test for Read case", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("read user", (done) => {
    User.findOne({ name: "Joe" }).then((user) => {
      assert(user._id.toString() === joe._id.toString());
      done();
    });
  });
});
