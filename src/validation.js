const { PersonValidationError, IDValidationError} = require('./customErrors');

const validatePersonData = (data) => {
    if (!data.name || typeof data.name != 'string') {
        throw new PersonValidationError('name');
    }
    if (!data.age || typeof data.age != 'number') {
        throw new PersonValidationError('age');
    }
    if (!data.hobbies || !Array.isArray(data.hobbies)) {
        throw new PersonValidationError('hobbies');
    }
    data.hobbies.forEach( item => {
        if (typeof item != 'string') {
            throw new PersonValidationError('hobbies');
        }
    });
}

const validateID = (id) => {
    if (!id.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
        throw new IDValidationError();
    }
}

module.exports = {
    validatePersonData,
    validateID, 
}