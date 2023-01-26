const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
require("./config/passport");

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

// 設定routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  return res.render("index");
});

app.listen(port, () => {
  console.log("伺服器正在聆聽" + port + "...");
});
