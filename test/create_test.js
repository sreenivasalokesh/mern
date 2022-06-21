const assert = require("assert");
const User = require("../src/User");

describe("Test for create", () => {
  it("create test", (done) => {
    const joe = new User({ name: "Joe" });
    joe.save().then(() => {
      assert(!joe.isNew);
      done();
    });
  });
});
