import loadComicList from './comics/comic-list-components.js';
import loadHeader from './shared/header.js';

loadHeader();

fetch('https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=698ecfea67de32ae8e6a3b78e74af2b3')
    .then(response => response.json())
    .then(results => {
        return results.data.results[0].id
    })
    .then(characterId => {
        fetch(`https://gateway.marvel.com:443/v1/public/comics?characters=${characterId}&apikey=698ecfea67de32ae8e6a3b78e74af2b3`)
        .then(response => response.json())
        .then(results => {
            const comicList = results.data.results;
            loadComicList(comicList);
        });
    })

