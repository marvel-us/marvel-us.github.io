const test = QUnit.test;

QUnit.module('html template');

import { makeResultListTemplate } from '../../src/comics/comic-list-components.js';

test('result list for index html template', assert => {
    const comic = {
        title: 'Ant-Man (2003) #2',
        thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc69f33cafc0', extension: 'jpg' },
        issueNumber: 2,
        series: { resourceURI: 'http://gateway.marvel.com/v1/public/series/551', name: 'Ant-Man (2003 - 2004)' },
        id: '5678',
        upc: '1234'
    };

    const expected = /*html*/ `
    <div id="result-card">
        <div style="background-image: url(http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc69f33cafc0.jpg)" id="result-card-image">
            <div id="result-card-h2">
                <h2>Ant-Man (2003) #2</h2>
                <span id="comic-codes" hidden="true">1234 5678</span>
            </div>
        </div>

        <div id="result-card-bottom">
            <span id="result-information">Issue: 2<br>Ant-Man (2003 - 2004)</span>
            <span id="result-user-control">
            <img src="assets/icons/library-noselect.svg" id="library-icon" alt="Add to library" title="Add to library">  
            <img src="assets/icons/wishlist-noselect.svg" id="wishlist-icon" alt="Add to wishlist" title="Add to wishlist">
            </span>
        </div>
    </div>`;
    
    const result = makeResultListTemplate(comic);
 
    assert.htmlEqual(result, expected);
});


