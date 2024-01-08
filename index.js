const express = require("express");
const path = require("path");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");

const app = express(); //creating an application
const PORT = 8002;

//connection to mongodb
connectToMongoDb("mongodb://localhost:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json()); //parses incoming bodies
app.use(express.urlencoded({ extended: false })); //to parse form data

app.use("/url", urlRoute);
app.use("/", staticRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log("Server Started at PORT" + PORT);
});
