const test = QUnit.test;

QUnit.module('detail page');

import { makeDetailImageTemplate } from '../../src/detail-info.js';

test('html for detail image', assert => {
    // arrange
    const comic = {
        images: [
            { path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/80/5c881a44ac87b', extension: 'jpg' },
            { path: 'http://i.annihil.us/u/prod/marvel/i/mg/6/60/5c23d886a2b36', extension: 'jpg' } 
        ] 
    };
    const expected = `
    <section id="comic-image-container">
        <div id="comic-image">
            <img src="http://i.annihil.us/u/prod/marvel/i/mg/9/80/5c881a44ac87b.jpg" alt="comic image">
        </div>
    </section>
    `;
    // act
    const results = makeDetailImageTemplate(comic);
    // assert
    assert.htmlEqual(results, expected);
});

test('html for detail info', assert => {
    // arrange
    const comic = {
        characters: [
            { resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009664', name: 'Thor' },
            { resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009664', name: 'Thor' },
            { resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009664', name: 'Thor' }
        ],
        creators: {
            available: 4,
            collectionURI: 'http://gateway.marvel.com/v1/public/comics/69933/creators',
            items: [
                { resourceURI: 'http://gateway.marvel.com/v1/public/creators/11463', name: 'Jason Aaron', role: 'writer' },
                { resourceURI: 'http://gateway.marvel.com/v1/public/creators/8933', name: 'Lee Garbett', role: 'penciller' },
                { resourceURI: 'http://gateway.marvel.com/v1/public/creators/12376', name: 'Wilson Moss', role: 'editor' },
                { resourceURI: 'http://gateway.marvel.com/v1/public/creators/11309', name: 'Mike Del Mundo', role: 'penciler (cover)' }
            ]
        },
        description: 'The heroes are on the hunt for the Cosmic Cube, but their search is interrupted once they encounter the Black Panther! Plus, the appearance of the Monster Generation and the mysterious Mr. Church...',
        images: [
            { path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/80/5c881a44ac87b', extension: 'jpg' },
            { path: 'http://i.annihil.us/u/prod/marvel/i/mg/6/60/5c23d886a2b36', extension: 'jpg' }
        ],
        series: {
            name: 'Thor (2018 - Present)',
            resourceURI: 'http://gateway.marvel.com/v1/public/series/24308'
        },
        title: 'Thor (2018) #11'

    };
    const expected = `
        <section id="comic-info-container">

            <div>
                <a href="./results.html">Back to Search</a>
            </div>

            <div>
                <h1>Thor (2018) #11</h1> 
            </div>

            <div id="characters-container">
                <h2>Characters in this Comic</h2>
                <ul id="all-characters">
                    <li class="character">Aaron Stack</li>
                    <li class="character">Black Panther</li>
                    <li class="character">Captain Marvel</li>
                    <li class="character">Daredevil</li>
                    <li class="character">Mephisto</li>
                    <li class="character">Storm</li>
                    <li class="character">Sue Storm</li>
                    <li class="character">Supreme Intelligence</li>
                    <li class="character">Thing</li>
                </ul>
            </div>

            <div id="creators-container">
                <h2>Creators of this Comic</h2>
                <ul id="all-creators">
                    <li class="creator">Doug Braithwaite - penciller</li>
                    <li class="creator">Todd Klein - letterer</li>
                    <li class="creator">Jim Krueger - Writer</li>
                    <li class="creator">Mike Marts - editor</li>
                    <li class="creator">Bill Reinhold - inker</li>
                    <li class="creator">Alex Ross - penciller - cover</li>
                </ul>
            </div>

            <div id="description-container">
                <h2>Description</h2>
                <p id="description">"The heroes are on the hunt for the Cosmic Cube, but their search is interrupted once they encounter the Black Panther! Plus, the appearance of the Monster Generation and the mysterious Mr. Church..."</p>
            </div>
            
            <div id="series-container">
                <h2>Series</h2>
                <p>Universe X (2000 - 2001)</p>
            </div>

    </section>
    `;
    // act
    const results = makeDetailInfoTemplate(comic);
    // assert
    assert.htmlEqual(results, expected);
});


