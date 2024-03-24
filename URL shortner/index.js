const express = require("express")
const urlRoute = require("./routes/url")
const {connectToMongoDB} = require("./connect")
const URL = require("./models/url")

const app = express()

app.use(express.json())

connectToMongoDB('mongodb://127.0.0.1:27017/urlShortner')
.then(() => console.log("MongoDB connected Successfully"))
.catch(() => console.log("Error in connecting to MongoDB"))

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  try {
      const shortId = req.params.shortId;
      const entry = await URL.findOneAndUpdate(
          { shortId },
          { $push: { visitHistory: { timestamp: Date.now() } } },
          { new: true }
      );
      console.log(entry);
      res.redirect(entry.redirectUrl);
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server Error" });
  }
});


app.listen(3005, () => {
    console.log("Server started on port 3005");
})