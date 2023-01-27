const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
require("./config/passport");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

let port = 8080;

mongoose
  .connect("mongodb://127.0.0.1:27017/GoogleDB")
  .then(() => {
    console.log("成功連結mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extende: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 設定routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  return res.render("index");
});

app.listen(port, () => {
  console.log("伺服器正在聆聽" + port + "...");
});
