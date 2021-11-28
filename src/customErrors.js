class PersonValidationError extends Error {
    constructor(field) {
        super(`Data validation error, wrong type or empty field ${field}`);
        this.name = "DataValidationError";
    }
}
class IDValidationError extends Error {
    constructor() {
        super(`ID validation error`);
        this.name = "IDValidationError";
    }
}
class IDExistenceError extends Error {
    constructor(id) {
        super(`Person with id ${id} not found`);
        this.name = "IDExistenceError";
    }
}

module.exports = {
    PersonValidationError,
    IDValidationError,
    IDExistenceError
}