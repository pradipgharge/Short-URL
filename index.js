const express = require("express");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");

const urlRoute = require("./routes/url");

const app = express(); //creating an application
const PORT = 8001;

//connection to mongodb
connectToMongoDb("mongodb://localhost:27017/short-url");

//middlewares
app.use(express.json()); //parses incoming bodies
app.use("/url", urlRoute);

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
