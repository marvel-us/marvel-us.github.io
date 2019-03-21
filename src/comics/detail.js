import loadHeader from '../shared/header.js';
import { makeComicUpcSearchUrl, makeComicIdSearchUrl } from './make-search-url.js';

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
            console.log(results);
            return results;
        });
    }
    else {
        const idUrl = makeComicIdSearchUrl(comicCode);
        fetch(idUrl)
        .then(response => response.json())
        .then(results => {
            console.log(results);
            return results;
        });
}