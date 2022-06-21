const assert = require("assert");
const User = require("../src/User");

describe("Test for create", () => {
  let eshwara, adi, bala, chandra, dodda;
  beforeEach((done) => {
    eshwara = new User({ name: "eshwara" });
    adi = new User({ name: "adi" });
    bala = new User({ name: "bala" });
    chandra = new User({ name: "chandra" });
    dodda = new User({ name: "dodda" });

    Promise.all([
      eshwara.save(),
      adi.save(),
      bala.save(),
      chandra.save(),
      dodda.save(),
    ]).then(() => done());
  });

  it("skip, limit, sort test", (done) => {
    User.find({}) //find every record
      .sort({ name: 1 }) //sort on name, ascending
      .skip(2) //skip first 2 records
      .limit(1) //limit result to 1 record
      .then((users) => {
        //the result of limit is always an array , though we limit to 1 record here
        assert(users[0].name === "chandra");
        done();
      });
  });
});
