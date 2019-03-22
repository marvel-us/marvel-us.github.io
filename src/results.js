import loadComicList, { loadComicListWithNoUser } from './comics/comic-list-components.js';
import loadHeader from './shared/header.js';
import { makeCharacterSearchUrl, makeComicSearchUrl, makeComicUpcSearchUrl, makeComicIdSearchUrl } from './comics/make-search-url.js';
import './comics/search-components.js';
import { readFromQuery } from './comics/hash-query-component.js';
import { updateSearchTerm } from './comics/search-components.js';
import updatePaging from './comics/paging-component.js';
import { auth } from './firebase/firebase.js';

loadHeader();

if(window.location.hash) {
    auth.onAuthStateChanged(user => {
        if(user) {
            fetchSearchResults();
        } else {
            fetchSearchResults();
        }
    });
} 

window.addEventListener('hashchange', () => {
    fetchSearchResults();
});

const resultsList = document.getElementById('results-list');

function fetchSearchResults() {
    const existingQuery = window.location.hash.slice(1);
    const searchOptions = readFromQuery(existingQuery);
    const url = makeCharacterSearchUrl(searchOptions);
    updateSearchTerm(searchOptions.keyword);

    fetch(url)
        .then(response => response.json())
        .then(results => {
            if(results.data.count === 0) {
                const noResultsSpan = document.createElement('span');
                noResultsSpan.classList.add('no-result');
                noResultsSpan.textContent = 'No results found';
                resultsList.appendChild(noResultsSpan);
            }
            return results.data.results[0].id;
        })
        .then(characterId => {
            const comicUrl = makeComicSearchUrl(characterId, searchOptions);
            fetch(comicUrl)
                .then(response => response.json())
                .then(results => {
                    const comicList = results.data.results;

                    if(!auth.currentUser) {
                        loadComicListWithNoUser(comicList);
                    } else {
                        loadComicList(comicList);
                    }

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
                            } else if(splitCodes[2] !== '0') {
                                window.location = `/detail.html#digitalId=${splitCodes[2]}`;
                            } else {
                                window.location = `/detail.html#ean=${splitCodes[4]}_${splitCodes[5]}_${splitCodes[6]}`;
                            }
                        });
                    });
                });
        });
}