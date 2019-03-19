// import { auth } from './firebase.js';

import loadComicList from './comics/comic-list-components.js';
import loadHeader from './shared/header.js';
import { makeCharacterSearchUrl, makeComicSearchUrl } from './comics/make-search-url.js';

loadHeader();

// make query functions to obtain searchOptions object
const searchOptions = {
    keyword: 'hulk',
    page: 1
};

const offset = (searchOptions.page - 1) * 20;

const url = makeCharacterSearchUrl(searchOptions);

fetch(url)
    .then(response => response.json())
    .then(results => {
        console.log(results);
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


