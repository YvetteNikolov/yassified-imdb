/**
 * Internal dependencies
 */
import { SVGFemaleIcon, SVGMaleIcon } from '../utils/icons';
import fetchIMDbRatingPage from '../api/api';
import { getRatingFromDOM, getDOMFromString } from '../utils/dom-parser';
import {
  RATING_FEMALE_ALL_AGES,
  RATING_MALE_ALL_AGES,
} from '../constants/selectors';
import { IMDB_TITLE_URL } from '../constants/urls';

export default () => {
  const events = () => {
    if (!isIMDbPage()) return;

    renderRatingPlaceholder();
    updateRating();
  };

  /**
   * Check if the current page is an IMDb title page. Get the ID from the movie after
   * the slash, e.g. https://www.imdb.com/title/tt0111161/
   *
   * @returns {boolean}
   */
  const isIMDbPage = () => {
    const url = window.location.href;
    const id = window.location.pathname.split('/')[2];

    return url.includes(IMDB_TITLE_URL) && id.startsWith('tt');
  };

  /**
   * Get the title ID of the URL
   *
   * @returns {number}
   */
  const getID = () => {
    const id = window.location.pathname.split('/')[2];

    return id;
  };

  /**
   * Renders the yassified rating placeholder
   */
  const renderRatingPlaceholder = () => {
    const IMDbRatings = document.querySelectorAll(
      '[data-testid="hero-rating-bar__aggregate-rating"]'
    );

    if (!IMDbRatings) {
      console.log('Could not find rating elements');
      return;
    }

    const IMDbRatingDesktop = IMDbRatings[0]; // There are two ratings. We want the first one. The second one is for mobile.

    if (!IMDbRatingDesktop) {
      console.log('Could not find desktop rating element');
      return;
    }

    IMDbRatingDesktop.appendChild(createPlaceholder());
  };

  /**
   * Creates the yassified rating element
   *
   * @returns {HTMLElement}
   */
  const createPlaceholder = () => {
    const yassifiedRating = document.createElement('a');
    yassifiedRating.href = `${IMDB_TITLE_URL}${getID()}/ratings/`;
    yassifiedRating.target = '_blank';
    yassifiedRating.classList.add('yassified-rating');

    yassifiedRating.appendChild(createPlaceholderChild('female'));
    yassifiedRating.appendChild(createPlaceholderChild('male'));
    return yassifiedRating;
  };

  /**
   * Create the child element of the yassified rating element
   *
   * @param {string} gender
   * @returns {HTMLElement}
   */
  const createPlaceholderChild = (gender) => {
    const yassifiedRating = document.createElement('span');
    yassifiedRating.classList.add(`yassified-rating__${gender}`);
    yassifiedRating.innerHTML =
      gender === 'female' ? SVGFemaleIcon : SVGMaleIcon;
    yassifiedRating.innerHTML +=
      '<span class="yassified-rating__number">-</span>';
    yassifiedRating.innerHTML +=
      '<span class="yassified-rating__small">/10</span>';

    return yassifiedRating;
  };

  /**
   * Updates the yassified rating element with fetched data.
   */
  const updateRating = async () => {
    const page = await fetchIMDbRatingPage(getID());
    const dom = getDOMFromString(page);

    const femaleRating = await getRatingFromDOM(dom, RATING_FEMALE_ALL_AGES);
    const maleRating = await getRatingFromDOM(dom, RATING_MALE_ALL_AGES);

    updateRatingChild(femaleRating, 'female');
    updateRatingChild(maleRating, 'male');
  };

  const updateRatingChild = (rating, gender) => {
    const yassifiedRating = document.querySelector(
      `.yassified-rating__${gender} .yassified-rating__number`
    );

    if (!yassifiedRating) return;

    yassifiedRating.innerHTML = rating.replace(',', '.');
  };

  events();
};
