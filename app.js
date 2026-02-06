const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "adminsecret",
  resave: false,
  saveUninitialized: false
}));

app.get("/login", (req, res) => res.render("admin/login"));

app.use("/", require("./routes/user"));
app.use("/admin", require("./routes/admin"));

app.listen(3000, () => console.log("Server running on port 3000"));