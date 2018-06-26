const {assert} = require('chai');

describe('User visits landing page', () => {
  describe('without existing videos', () => {
    it('videos container is empty', () => {
      // Setup
      browser.url('/');

      // Exercise & Verification
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
});
