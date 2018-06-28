const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const {buildItemObject} = require('../test-utils');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video')

describe('Server path: /videos', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
     await mongoose.disconnect();
  });
  describe('POST', () => {
    it('responds with created status', async () => {
      // Setup
      const itemToCreate = buildItemObject();

      // Exercise
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(itemToCreate);

      // Verification
      assert.equal(response.status, 201);
    });
    it('creates object in database after posting', async() => {
      // Setup
      const itemToCreate = buildItemObject();

      // Exercise
      const response = await request(app)
       .post('/videos')
       .type('form')
       .send(itemToCreate);

     // Verification
     const createdItem = await Video.findOne(itemToCreate);
     assert.isOk(createdItem, 'Item was not created successfully in the database');
    });
  });
});
