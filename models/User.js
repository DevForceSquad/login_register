const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { default: isEmail } = require("validator/lib/isEmail");
const schema = mongoose.Schema;
var userSchema = new schema({
  email: {
    type: String,
    required: [true, "Email is needed"],
    unique: true,
    validate: [isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is needed"],
    minlength: [8, "Password need to be 8 characteres length"],
  },
});
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password,user.password);
    if (match) {
      return user._id;
    }
    throw Error("Invalid password");
  }
  throw Error("This email is not registered yet");
};
userSchema.pre("save", async function (next) {
  const salt  = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
