// import { auth } from './firebase.js';

import loadComicList from './comics/comic-list-components.js';
import loadHeader from './shared/header.js';
import { makeCharacterSearchUrl, makeComicSearchUrl } from './comics/make-search-url.js';
import './comics/search-components.js';
import { readFromQuery } from './comics/hash-query-component.js';
import { updateSearchTerm } from './comics/search-components.js';

loadHeader();



window.addEventListener('hashchange', () => {
    const existingQuery = window.location.hash.slice(1);
    const searchOptions = readFromQuery(existingQuery);
    const url = makeCharacterSearchUrl(searchOptions);
    updateSearchTerm(searchOptions.keyword);


    fetch(url)
        .then(response => response.json())
        .then(results => {
            return results.data.results[0].id;
        })
        .then(characterId => {
            const comicUrl = makeComicSearchUrl(characterId, searchOptions);
            fetch(comicUrl)
                .then(response => response.json())
                .then(results => {
                    const comicList = results.data.results;
                    loadComicList(comicList);
                });
        });
});



