const http = require('http');
require('dotenv').config({ path: './src/.env' })
const PORT = process.env.PORT || 5000;
const reqHendler = require('./src/controller');
const parseData = require('./src/parseData');
const { processData } = require('./src/processData');

const server = http.createServer(async (req, res) => {
    try {
        //GET all persons
        if (req.url === "/person" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            const data = await new reqHendler().getAllPersons();
            res.end(JSON.stringify(data));
        }

        //GET person by id
        else if (req.url.match(/\/person\/([0-9]+)/) && req.method === "GET") {
            try {
                const id = req.url.split("/")[2];
                const data = await new reqHendler().getPerson(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(data));
            }

            catch (error) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: error }));
            }
        }

        //DELETE person
        else if (req.url.match(/\/person\/([0-9]+)/) && req.method === "DELETE") {
            try {
                const id = req.url.split("/")[2];
                await new reqHendler().deletePerson(id);
                res.writeHead(204, { "Content-Type": "application/json" });
                res.end();
            } catch (error) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: error }));
            }
        }

        // PUT - update person
        else if (req.url.match(/\/person\/([0-9]+)/) && req.method === "PUT") {

        }

        // POST - add person
        else if (req.url === "/person" && req.method === "POST") {
            let personData = await processData(req);
            let person = await new reqHendler().addPerson(parseData(personData));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(person));
        }

        //Non-existing endpoint
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Non-existing endpoint" }));
        }
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
    }

});

server.listen(PORT, () => {
    console.log(`Server port ${PORT}`);
});