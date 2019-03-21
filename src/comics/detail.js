import loadHeader from '../shared/header.js';
import { makeComicUpcSearchUrl, makeComicIdSearchUrl } from './make-search-url.js';
import { makeDetailImageTemplate, makeDetailInfoTemplate } from './detail-info.js';

loadHeader();

const currentHashQuery = window.location.hash.slice(1);

const splitQuery = currentHashQuery.split('=');
const comicCodeType = splitQuery[0];
const comicCode = splitQuery[1];

if(comicCodeType === 'upc') {
    const upcUrl = makeComicUpcSearchUrl(comicCode);
    fetch(upcUrl)
        .then(response => response.json())
        .then(results => {
            const comic = results.data.results[0];
            makeDetailImageTemplate(comic);
            makeDetailInfoTemplate(comic);
        });
}
else {
    const idUrl = makeComicIdSearchUrl(comicCode);
    fetch(idUrl)
        .then(response => response.json())
        .then(results => {
            const comic = results.data.results[0];
            makeDetailImageTemplate(comic);
            makeDetailInfoTemplate(comic);
        });
}