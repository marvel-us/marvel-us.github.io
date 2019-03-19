// import { auth } from './firebase.js';

import loadComicList from './comics/comic-list-components.js';
import loadHeader from './shared/header.js';
import makeCharacterSearchUrl from './make-search-url.js';

loadHeader();

// make query functions to obtain searchOptions object
const searchOptions = {
    searchTerm: 'hulk',
    page: 1
};

const offset = (searchOptions.page - 1) * 20;

const url = makeCharacterSearchUrl(searchOptions);

// fetch(url)
//     .then(response => response.json())
//     .then(results => {
//         return results.data.results[0].id;
//     })
//     .then(characterId => {
//         fetch(`https://gateway.marvel.com:443/v1/public/comics?characters=${characterId}&offset=${offset}&apikey=698ecfea67de32ae8e6a3b78e74af2b3`)
//             .then(response => response.json())
//             .then(results => {
//                 const comicList = results.data.results;
//                 loadComicList(comicList);
//             });
//     });

