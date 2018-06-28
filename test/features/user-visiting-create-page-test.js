const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits create page', () => {
  describe('posts a new item', () => {
    it('is rendered', () => {
      // Setup
      const itemToCreate = buildItemObject();
      browser.url('/videos/create.html');

      // Exercise
      browser.setValue('form input[name=title]', itemToCreate.title);
      browser.setValue('form textarea', itemToCreate.description);
      browser.click('form button[type=submit]');

      // Verification
      assert.include(browser.getText('body'), itemToCreate.title);
      assert.include(browser.getText('body'), itemToCreate.description);
    });
  });
});
