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
  describe('navigates to videos/create.html page', () => {
    it('contains the text Save a video', () => {
      // Setup
      browser.url('/');

      // Exercise
      browser.click('a[href="/videos/create.html"]');

      // Verification
      assert.include(browser.getText('body'), 'Save a video');
    });
  });
});
