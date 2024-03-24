const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/user")

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}))

mongoose.connect("mongodb://127.0.0.1:27017/learning-backend")
.then(() => console.log("Connected Successfully with Mongoose"))
.catch((err) => console.log("Error: ", err))

app.use("/api/user", userRouter)

app.listen(3003, () => {
    console.log("Server started on PORT 3002");
})