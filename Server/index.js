const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true)
    const log = `${Date.now()}: ${req.method} ${myUrl.pathname} New req received\n`;
    // console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname){
            case "/":
                res.end("HomePage")
                break;
            case "/about":
                const userName = myUrl.query.name;
                res.end(`Hi, ${userName}`)
                break;
            default:
                res.end("404 Not Found")
        }
    })
})

myServer.listen(8000, () => console.log("server started"));