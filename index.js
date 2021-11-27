const http = require('http');
require('dotenv').config({ path: './src/.env' })
const PORT = process.env.PORT || 5000;
const reqHendler = require("./controller");

const server = http.createServer(async (req, res) => {
    if (req.url === "/person" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const data = await new reqHendler().getAllPersons();
        res.end(JSON.stringify(data));
    }
});

server.listen(PORT, () => {
    console.log(`Server port ${PORT}`);
});