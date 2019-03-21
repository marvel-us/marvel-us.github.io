// import { auth } from './firebase.js';

import loadComicList from './comics/comic-list-components.js';
import loadHeader from './shared/header.js';
import { makeCharacterSearchUrl, makeComicSearchUrl } from './comics/make-search-url.js';
import './comics/search-components.js';
import { readFromQuery } from './comics/hash-query-component.js';
import { updateSearchTerm } from './comics/search-components.js';
import updatePaging from './comics/paging-component.js';

loadHeader();

if(window.location.hash) {
    fetchSearchResults();
}

window.addEventListener('hashchange', () => {
    fetchSearchResults();
});


function fetchSearchResults() {
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
                    const pagingInfo = {
                        page: searchOptions.page,
                        totalPages: Math.ceil(results.data.total / 20)
                    };
                    updatePaging(pagingInfo);

                    const dom = document.getElementById('results-list');
                    const comicImage = dom.querySelectorAll('#result-card-image');

                    comicImage.forEach(comic => {
                        const comicCodes = comic.querySelector('#comic-codes');
                        const splitCodes = comicCodes.textContent.split(' ');
                        comic.addEventListener('click', () => {
                            event.preventDefault();
                            if(splitCodes[0]) {
                                window.location = `/detail.html#upc=${splitCodes[0]}`;
                            }
                            else {
                                window.location = `/detail.html#id=${splitCodes[1]}`;
                            }
                            
                        });
    
                    });
                });
        });
}