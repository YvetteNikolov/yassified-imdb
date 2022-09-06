/**
 * Get request to fetch the
 *
 * @param {int} id
 * @returns {int}
 */
const fetchFemaleRating = async (id) => {
  try {
    const response = await fetch('https://www.imdb.com/title/' + id + '/ratings/');

    if (!response.ok) {
      console.log('Error: ' + response.status);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const selector = '#main > section > div > div.allText > div > table:nth-child(11) > tbody > tr:nth-child(4) > td:nth-child(2) > div.bigcell'

    const ratingElement = doc.querySelector(selector);

    if (!ratingElement) {
      console.log("Could not find rating element");
    }

    return ratingElement.innerText;

  } catch (e) {
    console.log("Something went wrong: ", e);
  }
}

export default fetchFemaleRating;
