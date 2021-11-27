const http = require("http");
const PORT = 5000;

const server = http.createServer(async (req, res) => {
    if (req.url === "/person" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("Hello, world!");
        res.end();
    }
});

server.listen(PORT, () => {});