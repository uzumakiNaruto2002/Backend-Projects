const express = require("express")
const users = require("./MOCK_DATA.json")

const app = express();

app.use((req, res, next) => {
    console.log("Hello")
    // return res.json({msg: "Hello From Middleware1"})
    next()
})

app.use((req, res, next) => {
    console.log("Hello2")
    // return res.json({msg: "Hello From Middleware2"})
    next()
})

app.get("/api/users", (req, res) => {
    return res.json(users)
})

app.get("/users", (req, res) => {
    const data = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(data)
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => id === user.id)
    return res.json(user)
})

app.listen(3002, () => {
    console.log("Server started on PORT 3002");
})