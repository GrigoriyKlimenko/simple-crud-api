# Simple CRUD api

First of all run `npm i`

To start server in development mode write `npm run start:dev`

To build and start server in production mode write `npm run start:prod`

Path to production bundle: `/public/app.js`

To start tests write `npm run test`


After starting you can send requsts to http://localhost:3000
The PORT value is stored in a .env file

API path `/person`:
* **GET** `/person` or `/person/${personId}` return all persons or person with corresponding `personId`
* **POST** `/person` is used to create record about new person and store it in database
* **PUT** `/person/${personId}` is used to update record about existing person
* **DELETE** `/person/${personId}` is used to delete record about existing person from database
