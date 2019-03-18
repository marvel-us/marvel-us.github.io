import loadComicList from './comics/comic-list-components.js';
import loadHeader from './shared/header.js';


// open local host and you should be able to play with this

loadHeader();
// https://gateway.marvel.com:443/v1/public/comics?characters=storm&apikey=
const API_KEY = '698ecfea67de32ae8e6a3b78e74af2b3';
let baseUrl = 'https://gateway.marvel.com:443/v1/public/comics?';

// fetch('https://gateway.marvel.com/v1/public/comics?&apikey=698ecfea67de32ae8e6a3b78e74af2b3')
//     .then(response => response.json())
//     .then(results => {
//         console.log('character: ', results);
//         const comicList = results.data.results;
//         loadComicList(comicList);
//     });
fetch('https://gateway.marvel.com/v1/public/comics?title=ultimate&apikey=698ecfea67de32ae8e6a3b78e74af2b3')
    .then(response => response.json())
    .then(results => {
        console.log('character: ', results);
        const comicList = results.data.results;
        loadComicList(comicList);
    });

// fetch('https://gateway.marvel.com:443/v1/public/comics?series=storm&apikey=698ecfea67de32ae8e6a3b78e74af2b3')
//     .then(response => response.json())
//     .then(results => {
//         console.log('series: ', results.data.results);
//         const comicList = results.data.results;
//         loadComicList(comicList);
//     });

// fetch('https://gateway.marvel.com:443/v1/public/comics?title=storm&apikey=698ecfea67de32ae8e6a3b78e74af2b3')
//     .then(response => response.json())
//     .then(results => {
//         console.log(results.data.results);
//         const comicList = results.data.results;
//         loadComicList(comicList);
//     });