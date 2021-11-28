const server = require('./index.js');
const supertest = require('supertest');
let testId;

describe('First scenario', () => {
    const request = supertest(server);
    test('Get non-existing endpoint', async () => {
        const response = await request.get(`/person/person`);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual(`Non-existing endpoint`);
    })
    test('Check get request, answer should be empty array', async () => {
        const response = await request.get('/person');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    })
    test('Send data, response should be data with uuid', async () => {
        const response = await request.post('/person').send({ "name": "Nick", "age": 22, "hobbies": ["fishing", "fighting"] });
        expect(response.statusCode).toBe(201);
        testId = response.body.id;
        expect(response.body.name).toEqual("Nick");
    })
    test('Get data by id', async () => {
        const response = await request.get(`/person/${testId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual("Nick");
    })
    server.close();
})
describe('Second scenario', () => {
    const request = supertest(server);
    test('Update person data', async () => {
        const response = await request.put(`/person/${testId}`)
            .send({ "name": "Mike", "age": 18, "hobbies": ["fighting"] });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ "id": testId, "name": "Mike", "age": 18, "hobbies": ["fighting"] });
    })
    test('Get updated data', async () => {
        const response = await request.get(`/person/${testId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ "id": testId, "name": "Mike", "age": 18, "hobbies": ["fighting"] });
    })
    test('Delete data', async () => {
        const response = await request.delete(`/person/${testId}`);
        expect(response.statusCode).toBe(204);
    })
    test('Get deleted data', async () => {
        const response = await request.get(`/person/${testId}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual(`Person with id ${testId} not found`);
    })
})
describe('Third scenario', () => {
    const request = supertest(server);
    let idArray = [];
    test('Add three identical entities', async () => {
        for (let i = 0; i <= 2; i++) {
            const response = await request.post(`/person`)
                .send({ "name": "Mike", "age": 18, "hobbies": ["fighting"] });
            expect(response.statusCode).toBe(201);
            let id = response.body.id;
            idArray.push(id);
            expect(response.body.name).toEqual("Mike");
        }
    })
    test('Are there duplicate ids', async () => {
        expect(idArray[0]).not.toBe(idArray[1]);
        expect(idArray[0]).not.toBe(idArray[2]);
        expect(idArray[1]).not.toBe(idArray[2]);
    })
    test('Get three identical objects with different IDs', async () => {
        idArray.forEach(async (id) => {
            const response = await request.get(`/person/${id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ "id": id, "name": "Mike", "age": 18, "hobbies": ["fighting"] });
        })
    })
    test('Update person with wrong data', async () => {
        const response = await request.put(`/person/${idArray[0]}`)
            .send({ "name": 1, "age": 18, "hobbies": ["fighting"] });;
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Data validation error, wrong type or empty field name');
    })
})
