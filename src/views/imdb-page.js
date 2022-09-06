/**
 * Internal dependencies
 */
import fetchFemaleRating from "../api";
import { SVGFemaleIcon, SVGMaleIcon } from "../utils/icons";

export default () => {
  const ratingButton = document.querySelector('[data-testid="hero-rating-bar__aggregate-rating__score"] span');

  const events = () => {
    if (!isIMDbPage() || !ratingButton) return;

    // Put extra div in the DOM next to the rating button with a spinner
    // renderYassifiedRatingMobile();
    renderYassifiedRatingDesktop();


    // Get the female and male ratings and place them in the div


    // Get the ID from the movie, after the slash https://www.imdb.com/title/tt0111161/
    // const id = window.location.pathname.split('/')[2];
    // console.log(id);

    // // Check if the id starts with tt
    // if (!id.startsWith('tt')) {
    //   console.log('Not a movie page');
    // }

    // fetchFemaleRating(id);

  }

  /**
   * Check if the current page is an IMDb page. Get the ID from the movie after
   * the slash, e.g. https://www.imdb.com/title/tt0111161/
   *
   * @returns {boolean}
   */
  const isIMDbPage = () => {
    const id = window.location.pathname.split('/')[2];

    return id.startsWith('tt') ? true : false;
  }

  /**
   * TODO: add a rating for mobile views (other element)
   */
  const renderYassifiedRatingMobile = () => { }

  /**
   * Renders the yassified rating element on screens > 975px
   */
  const renderYassifiedRatingDesktop = () => {
    const IMDbRatings = document.querySelectorAll('[data-testid="hero-rating-bar__aggregate-rating"]');

    if (!IMDbRatings) {
      console.log('Could not find rating elements');
      return;
    }

    const IMDbRatingDesktop = IMDbRatings[0]; // The first one is the desktop one

    if (!IMDbRatingDesktop) {
      console.log('Could not find desktop rating element');
      return;
    }

    IMDbRatingDesktop.appendChild(createRatingElement());
  }


  const createRatingElement = () => {
    const yassifiedRating = document.createElement('span');
    yassifiedRating.classList.add('yassified-rating');
    // Append a span to the yassified rating element
    const yassifiedRatingFemale = document.createElement('span');
    yassifiedRatingFemale.classList.add('yassified-rating__female');
    yassifiedRatingFemale.innerHTML = SVGFemaleIcon;
    yassifiedRatingFemale.innerHTML += '<span>8.6</span>'
    yassifiedRatingFemale.innerHTML += '<span class="yassified-rating__small">/10</span>'
    yassifiedRating.appendChild(yassifiedRatingFemale);
    // Append another span to the yassified rating element
    const yassifiedRatingMale = document.createElement('span');
    yassifiedRatingMale.classList.add('yassified-rating__male');
    yassifiedRatingMale.innerHTML = SVGMaleIcon;
    yassifiedRatingMale.innerHTML += '<span>8.2</span>'
    yassifiedRatingMale.innerHTML += '<span class="yassified-rating__small">/10</span>'
    yassifiedRating.appendChild(yassifiedRatingMale);

    // Make the two spans children of the yassifiedRating


    return yassifiedRating;
  }

  events();
}
