const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: (name) => name.length > 6,
    required: [true, "name is required"],
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
