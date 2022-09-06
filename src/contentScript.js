'use strict';

/**
 * Internal dependencies
 */
import fetchFemaleRating from "./api";
import IMDbPage from './views/imdb-page';

const contentScript = () => {
  const app = () => {

    const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
    console.log(
      `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
    );

    IMDbPage();
  }

  app();
}

contentScript();

