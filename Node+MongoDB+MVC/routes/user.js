const express = require("express")

const app = express.Router()

app.get("/", async(req, res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
})

app.get("/:id", async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user)return res.status(404).json({Error: "User not found" })
    return res.json(user)
})

app.post("/", async (req, res) => {
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

module.exports = app
