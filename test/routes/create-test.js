const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const {buildItemObject} = require('../test-utils');

describe('Server path: /videos', () => {
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
  });
});
