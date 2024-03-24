const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hey There!")
})

app.get("/about", (req, res) => {
    res.send("Hey There From About Page!")
})

app.listen(3000, () => {
    console.log("Server started at port 3000");
})