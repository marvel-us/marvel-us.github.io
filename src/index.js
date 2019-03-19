import loadHeader from './shared/header.js';
import './comics/search-components.js';

const searchForm = document.getElementById('search-form');

loadHeader();

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const formDaddy = new FormData(searchForm);
    const searchTerm = formDaddy.get('search-term');

    window.location = `/results.html#name=${searchTerm}`;
});