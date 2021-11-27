const data = require("./data");

class Controller {
    async getAllPersons() {
        return new Promise((resolve, _) => resolve(data));
    }
    async getPerson(id) {
        return new Promise((resolve, reject) => {

            let person = data.find((person) => person.id == id);
            if (person) {
                resolve(person);
            } else {
                reject(`Person with id ${id} not found `);
            }
        });
    }
}
module.exports = Controller;