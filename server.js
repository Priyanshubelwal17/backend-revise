const { time, error } = require("console");
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" })
    if (req.url === "/hello") {
        res.end(JSON.stringify({ message: "Hello Priyanshu!" }))
    } else if (req.url === "/time") {
        res.end(JSON.stringify({ time: new Date().toLocaleString() }))
    } else {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ error: "Not Found" }))
    }


});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
})