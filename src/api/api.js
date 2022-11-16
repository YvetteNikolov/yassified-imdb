/**
 * Internal dependencies
 */
import { IMDB_TITLE_URL } from '../constants/urls';

/**
 * GET request to the ratings page of the item
 *
 * @param {int} id
 * @returns {string}
 */
const fetchIMDbRatingPage = async (id) => {
  try {
    const response = await fetch(IMDB_TITLE_URL + id + '/ratings/');

    if (!response.ok) {
      console.log('Error: ' + response.status);
    }

    const html = await response.text();

    return html;
  } catch (error) {
    console.log(error);
  }
};

export default fetchIMDbRatingPage;
