const fs = require("fs");
const { stringify } = require("querystring");

fs.writeFileSync("./test.txt", "This is a tester file")

fs.writeFile("./test1.txt", "This is a tester file with async", (err) => {})

const res = fs.readFileSync("./test.txt", "utf-8")

console.log(res);

fs.readFile("./test1.txt", "utf-8", (err, result) => {
    if(err){
        console.log("Error: ", err);
    }else{
        console.log(result);
    }
})

fs.copyFileSync("./test.txt", "./copy.txt")

fs.unlinkSync("./copy.txt")

fs.appendFileSync("./test.txt", `\n${Date.now()}`)