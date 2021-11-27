const http = require('http');
require('dotenv').config({ path: './src/.env' })
const PORT = process.env.PORT || 5000;
const reqHendler = require("./controller");

const server = http.createServer(async (req, res) => {
    //GET all persons
    if (req.url === "/person" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const data = await new reqHendler().getAllPersons();
        res.end(JSON.stringify(data));
    }
    
    //GET person by id
    else if (req.url.match(/\/person\/\/([0-9]+)/) && req.method === "GET") {

    }

    //DELETE person
    else if (req.url.match(/\/person\/([0-9]+)/) && req.method === "DELETE") {

    }

    // PUT - update person
    else if (req.url.match(/\/person\/([0-9]+)/) && req.method === "PUT") {

    }

    // POST - add person
    else if (req.url === "/person" && req.method === "POST") {

    }

});

server.listen(PORT, () => {
    console.log(`Server port ${PORT}`);
});