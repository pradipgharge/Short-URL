const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDb } = require("./connection");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8002;

//connection to mongodb
connectToMongoDb("mongodb://localhost:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json()); //parses incoming bodies
app.use(express.urlencoded({ extended: false })); //to parse form data
app.use(cookieParser()); //parse the cookies
app.use(checkForAuthentication); // it will run everytime.

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("Server Started at PORT" + PORT);
});
