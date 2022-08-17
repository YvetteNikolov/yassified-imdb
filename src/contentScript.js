'use strict';

/**
 * Internal dependencies
 */
// import fetchFemaleRating from "./api";

const contentScript = () => {
  const ratingButton = document.querySelector('.rating-bar__base-button .ipc-button');

  const events = () => {
    // Test
    const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
    console.log(
      `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
    );

    // First, check if the current page is a page of IMDb
    if (!ratingButton) return;

    // Get the rating span
    const rating = ratingButton.querySelector('[data-testid="hero-rating-bar__aggregate-rating__score"] span');

    if (!rating) return;

    const ratingValue = rating.innerText;

    // Get the ID from the movie, after the slash https://www.imdb.com/title/tt0111161/
    const id = window.location.pathname.split('/')[2];
    console.log(id);

    // Check if the id starts with tt
    if (!id.startsWith('tt')) {
      console.log('Not a movie page');
    }

    const femaleRating = getFemaleRating(id);
  }

  events();
}

contentScript();

