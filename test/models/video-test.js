const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video')

async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
}

describe('Model: Video', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('#title', () => {
    it('should be a string', () => {
      // Setup
      const notString = 1;
      const item = new Video({title: notString});

      // Verification
      assert.strictEqual(item.title, notString.toString());
    });
  });
  describe('#description', () => {
    it('should be a string', () => {
      // Setup
      const notString = 1;
      const item = new Video({description: notString});

      // Verification
      assert.strictEqual(item.description, notString.toString());
    });
  });
});
