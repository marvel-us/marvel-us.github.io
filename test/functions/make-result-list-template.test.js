const test = QUnit.test;

QUnit.module('html template');

import { makeResultListTemplate } from '../../src/comics/comic-list-components.js';

test('result list for index html template', assert => {
    // arrange
    const comic = {
        title: 'Ant-Man (2003) #2',
        thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc69f33cafc0', extension: 'jpg' },
        issueNumber: 2,
        series: { resourceURI: 'http://gateway.marvel.com/v1/public/series/551', name: 'Ant-Man (2003 - 2004)' }
    };

    const expected = /*html*/ `
    <li>
        <h2>Ant-Man (2003) #2</h2>
        <p>Issue: 2</p>
        <img src="http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc69f33cafc0.jpg" alt="Cover of Ant-Man (2003) #2">
        <p>Series: Ant-Man (2003 - 2004)</p>
    </li>
    `;
    // act
    const result = makeResultListTemplate(comic);
    // assert
    assert.htmlEqual(result, expected);
});


