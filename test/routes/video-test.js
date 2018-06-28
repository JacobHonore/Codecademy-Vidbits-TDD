const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const {buildItemObject, parseTextFromHTML} = require('../test-utils');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video')

describe('Server path: /videos', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

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
  describe('GET', () => {
    it('renders existing videos', async () => {
      // Setup
      const itemToCreate = buildItemObject();
      const newVideo = new Video(itemToCreate);
      newVideo.save();

      // Exercise
      const response = await request(app)
        .get('/videos/');

      // Verification
      assert.include(parseTextFromHTML(response.text, 'body'), newVideo.title);
    });
  });
});
