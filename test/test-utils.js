const {jsdom} = require('jsdom');

// Create and return a sample Item object
const buildItemObject = (options = {}) => {
  const title = options.title || 'My favorite Video';
  const description = options.description || 'Just the best video';
  return {title, description};
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  buildItemObject,
  parseTextFromHTML,
};
