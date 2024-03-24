const express = require("express")
// const users = require("./MOCK_DATA.json")
const mongoose = require("mongoose")

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}))

// app.use((req, res, next) => {
//     console.log("Hello")
//     // return res.json({msg: "Hello From Middleware1"})
//     next()
// })

// app.use((req, res, next) => {
//     console.log("Hello2")
//     // return res.json({msg: "Hello From Middleware2"})
//     next()
// })

mongoose.connect("mongodb://127.0.0.1:27017/learning-backend")
.then(() => console.log("Connected Successfully with Mongoose"))
.catch((err) => console.log("Error: ", err))

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String, 
        required: false,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('user', userSchema)

app.get("/api/users", async(req, res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
})

app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({})
    const data = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
        </ul>
    `
    res.send(data)
})

app.get("/api/users/:id", async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user)return res.status(404).json({Error: "User not found" })
    return res.json(user)
})

app.post("/api/users", async (req, res) => {
    try {
        const body = req.body;
        if (
            !body ||
            !body.first_name ||
            !body.last_name ||
            !body.email ||
            !body.gender ||
            !body.job_title
        ) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Attempt to create a new user
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title,
        });

        console.log(result);

        return res.status(201).json({ msg: "Success" });
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Handle other errors
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Server Error" });
    }
});


app.listen(3002, () => {
    console.log("Server started on PORT 3002");
})