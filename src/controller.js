const data = require("./data");

class Controller {
    async getAllPersons() {
        return new Promise((resolve, _) => resolve(data));
    }
}
module.exports = Controller;