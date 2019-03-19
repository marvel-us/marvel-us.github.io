const test = QUnit.test;

QUnit.module('search');

import makeCharacterSearchUrl from '../../src/make-search-url.js';

test('make search url, page 1', assert => {
    const searchOptions = {
        keyword: 'thor',
        page: 1
    };

    const expected = 'https://gateway.marvel.com/v1/public/characters?name=thor&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
    const result = makeCharacterSearchUrl(searchOptions);

    assert.equal(result, expected);

});

test('make search url, page 3', assert => {
    const searchOptions = {
        keyword: 'thor',
        page: 3
    };

    const expected = 'https://gateway.marvel.com/v1/public/characters?name=thor&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
    const result = makeCharacterSearchUrl(searchOptions);

    assert.equal(result, expected);

});