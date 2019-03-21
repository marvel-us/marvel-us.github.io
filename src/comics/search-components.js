import { writeSearchToQuery } from './hash-query-component.js';

const searchForm = document.getElementById('search-form');
const resultsList = document.getElementById('results-list');

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    while(resultsList.firstChild) {
        resultsList.firstChild.remove();
    }
    const formDaddy = new FormData(searchForm);
    const existingQuery = window.location.hash.slice(1);
    const keyword = formDaddy.get('search-term');
    const searchOptions = {
        keyword: keyword
    };
    const newQuery = writeSearchToQuery(existingQuery, searchOptions);
    window.location.hash = newQuery;

});

const searchInput = searchForm.querySelector('input');

export function updateSearchTerm(keyword) {
    searchInput.value = keyword;
}