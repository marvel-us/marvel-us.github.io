import { writeSearchToQuery } from './hash-query-component.js';
import clearResultsList from './clear-results-list.js';

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    clearResultsList();

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