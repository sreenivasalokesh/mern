const assert = require("assert");
const User = require("../src/User");

//joe.set().save()                  (instance update) - when you need to set each attribute seperately before calling save for update
//joe.update()                      (instance update) - when you want to update the record at once
//User.updateOne()                  (Model update) -
//User.findOneAndUpdate()           (Model update) - when you want to find by an attribute value and update
//User.findByIdAndUpdate()          (Model update) - when you want to do an update based on the id

describe("Tests for update scenario", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("Instance based set and save update", (done) => {
    joe.set("name", "Rockey");
    assertName(joe.save(), done, "Rockey");
  });

  it("Instance based update", (done) => {
    assertName(joe.update({ name: "Alex" }), done, "Alex");
  });

  function assertName(operation, done, name) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        console.log(users);
        assert(users[0].name === name);
        done();
      });
  }

  it("class based update -1", (done) => {
    //updateOne
    assertName(User.updateOne({ name: "Joe" }, { name: "Alex" }), done, "Alex");
  });

  it("class based update -2", (done) => {
    //findOneAndUpdate
    assertName(
      User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }),
      done,
      "Alex"
    );
  });

  it("class based update -3", (done) => {
    //findByIdAndUpdate
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done, "Alex");
  });
});
