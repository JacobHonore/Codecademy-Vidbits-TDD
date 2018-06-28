const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const {buildItemObject, parseTextFromHTML} = require('../test-utils');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video')

describe('Server path: /', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders existing videos', async () => {
      // Setup
      const itemToCreate = buildItemObject();
      const newVideo = new Video(itemToCreate);
      newVideo.save();

      // Exercise
      const response = await request(app)
        .get('/');

      // Verification
      assert.include(parseTextFromHTML(response.text, 'body'), newVideo.title);
    });
  });
});
