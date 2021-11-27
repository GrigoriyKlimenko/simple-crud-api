const data = require('./data');
const uuid = require('uuid');

class Controller {
    async getAllPersons() {
        return new Promise((resolve, _) => resolve(data));
    }
    async getPerson(id) {
        return new Promise((resolve, reject) => {

            let person = data.find((person) => person.id === id);
            if (person) {
                resolve(person);
            } else {
                reject(`Person with id ${id} not found `);
            }
        });
    }
    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            let personIndex = data.findIndex((person) => person.id === id);
            if (personIndex < 0) {
                reject(`No person with id ${id} found`);
            }
            data.splice(personIndex, 1);
            resolve(`Person deleted successfully`);
        });
    }
    async addPerson(person) {
        return new Promise((resolve, reject) => {
            let newPerson = {
                id: uuid.v4(),
                ...person,
            };
            data.push(newPerson);
            resolve(newPerson);
        });
    }
    async updatePerson(id, personData) {
        return new Promise((resolve, reject) => {
            let personIndex = data.findIndex((person) => person.id === id);
            if (personIndex < 0) {
                reject(`No person with id ${id} found`);
            }
            const updatedPerson = Object.assign({id}, personData);
            data.splice(personIndex, 1, updatedPerson);
            resolve(updatedPerson);
        });
    }
}

module.exports = Controller;