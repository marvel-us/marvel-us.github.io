import { writePageToQuery } from './hash-query-component.js';

const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const currentPage = document.getElementById('current-page');
const totalPages = document.getElementById('total-pages');

let currentPageNum = 1;

export default function updatePaging(pagingInfo) {
    currentPageNum = pagingInfo.page;
    currentPage.textContent = currentPageNum;
    totalPages.textContent = pagingInfo.totalPages;
    nextButton.disabled = currentPageNum === pagingInfo.totalPages;
    previousButton.disabled = currentPageNum === 1;
}

previousButton.addEventListener('click', () => {
    currentPageNum--;
    const existingQuery = window.location.hash.slice(1);
    const newQuery = writePageToQuery(existingQuery, currentPageNum);
    window.location.hash = newQuery;
});

nextButton.addEventListener('click', () => {
    currentPageNum++;
    const existingQuery = window.location.hash.slice(1);
    const newQuery = writePageToQuery(existingQuery, currentPageNum);
    window.location.hash = newQuery;
});