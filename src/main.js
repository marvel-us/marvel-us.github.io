import loadComicList from './comics/comic-list-components.js';
import loadHeader from './shared/header.js';


// open local host and you should be able to play with this

loadHeader();
// https://gateway.marvel.com:443/v1/public/comics?characters=storm&apikey=
const API_KEY = '8fc44adf47a9e16e282456f1eaed601b';
let baseUrl = 'https://gateway.marvel.com:443/v1/public/comics?';

let characterId = null;

fetch('https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=698ecfea67de32ae8e6a3b78e74af2b3')
    .then(response => response.json())
    .then(results => {
        return results.data.results[0].id
    })
    .then(character => {
        console.log(character);
        fetch('https://gateway.marvel.com:443/v1/public/comics?characters=1009664&apikey=698ecfea67de32ae8e6a3b78e74af2b3')
        .then(response => response.json())
        .then(results => {
            console.log('character: ', results);
            const comicList = results.data.results;
            loadComicList(comicList);
        });
    })

