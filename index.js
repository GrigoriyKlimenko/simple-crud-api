const http = require("http");
require('dotenv').config({ path: './src/.env' })
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    if (req.url === "/person" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("Hello, world!");
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server port ${PORT}`);
});