/**
 * Get request to get API
 *
 * @param {int} id
 * @returns
 */
const fetchFemaleRating = async (id) => {
  try {
    const response = await fetch('https://www.imdb.com/title/' + id + '/ratings/');

    console.log(response);

    if (!response.ok) {
      throw new Error('Error: could not fetch endpoint.');
    }

    // Get webpage
    const data = await response.text();

    console.log(data);

    return data;

  } catch (e) {
    console.log("Er is iets misgegaan: ", e);
    return false;
  }
}

export default fetchFemaleRating;
