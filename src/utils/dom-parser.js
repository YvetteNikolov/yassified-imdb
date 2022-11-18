/**
 * Parse HTML source code from a string into a DOM Document
 *
 * @param {HTMLDocument} html
 *
 * @returns {HTMLDocument}
 */
const getDOMFromString = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc;
};

/**
 * Get a rating element from the DOM
 *
 * @param {HTMLDocument} dom
 * @param {string} selector
 *
 * @returns {string}
 */
const getRatingFromDOM = (dom, selector) => {
  const ratingElement = dom.querySelector(selector);

  if (!ratingElement) {
    console.log('Yassified IMDb ratings: could not find rating element in DOM');
    return '';
  }

  return ratingElement.innerText;
};

export { getDOMFromString, getRatingFromDOM };
