import { writeSearchToQuery } from "./hash-query-component.js";


// get elm by id - form daddy

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', event => {
    event.preventDefault();

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