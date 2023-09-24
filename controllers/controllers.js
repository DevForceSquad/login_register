const User = require('../models/User');

module.exports.signin_get = (req, res) => {
  res.render("signin");
};
module.exports.signin_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(201).json({ user });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};
module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await User.create({ email, password });
    res.status(201).json({ user });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(400).json({ errors });
  }
};
let errorHandler = (error) => {
    let errors = { email: "", password: "" };
    if (error.message === "This email is not registered yet") {
      errors["email"] = "This email don't belong to any account";
      return errors;
    }
    if (error.message === "Invalid password") {
      errors["password"] = "Email and password dont'match";
      return errors;
    }
  
    if (error.code === 11000) {
      errors["email"] = "Email already registered";
      return errors;
    }
    if (error.message.includes("User validation failed")) {
      Object.values(error.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
      return errors;
    }
  };