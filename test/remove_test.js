const assert = require("assert");
const User = require("../src/User");

//joe.remove                        (instance remove) - do this remove when you have a live instance
//User.remove                       (Model remove) - removes all entries that has joe as name
//User.findOneAndRemove             (Model remove) - removes the first entry that has joe as name
//User.findByIdAndRemove            (Model remove) - remove by a specific id

describe("remove tests", () => {
  let joe;

  beforeEach((done) => {
    //run this beofre each test
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("instance remove", (done) => {
    //remove when you have a live instance
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class remove -1", (done) => {
    //remove - remove all entries that has joe name
    User.remove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class remove -2", (done) => {
    //findOneAndRemove - remove the first entry that has joe as name
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class remove -3", (done) => {
    // findByIdAndRemove - remove by a specific id
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
