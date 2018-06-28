const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video')

describe('User visits landing page', () => {
  describe('without existing videos', () => {
    it('videos container is empty', () => {
      // Setup
      browser.url('/');

      // Exercise & Verification
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
  describe('with a video', () => {
    it('should render it in the list', () => {
      // setup
      const itemToCreate = buildItemObject();
      const newVideo = new Video(itemToCreate);
      newVideo.save();
      browser.url('/');

      // Exercise and Verification
      assert.equal(browser.getText('#videos-container'), newVideo.title);
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
