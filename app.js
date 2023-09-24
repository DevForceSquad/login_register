const express = require("express");
const expressLayout = require("express-layout");
const mongoose = require("mongoose");
const router = require('./router/router');
const URI = "mongodb://127.0.0.1:27017/login_register";
const app = express();
app.use(expressLayout());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);
app.set("layout", "/layout/_layout");
app.set("view engine", "ejs");
mongoose.connect(URI).then((res) => {
  app.listen(8000, () => {
    console.log("listening to localhost:8000");
  });
});
