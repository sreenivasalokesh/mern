const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://mongo:mongo@localhost:27017/admin");
  mongoose.connection
    .once("open", () => {
      console.log("Connection with mongo is successful!");
      done();
    })
    .on("error", (e) => console.log("Some issues connecting to mongo"));
});

beforeEach((done) => {
  //console.log(mongoose.connection);
  const { users, userwithsubdocposts } = mongoose.connection.collections;
  users.drop(() => {
    userwithsubdocposts.drop(() => {
      done();
    });
  });
  // mongoose.connection.collections.users.drop(() => {
  //   done();
  // });
});
