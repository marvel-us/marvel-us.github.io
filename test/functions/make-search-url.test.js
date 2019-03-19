const test = QUnit.test;

QUnit.module('search');

import { makeCharacterSearchUrl, makeComicSearchUrl } from '../../src/comics/make-search-url.js';

test('make character search url', assert => {
    const searchOptions = {
        keyword: 'thor',
        // page: 1
    };

    const expected = 'https://gateway.marvel.com/v1/public/characters?name=thor&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
    const result = makeCharacterSearchUrl(searchOptions);

    assert.equal(result, expected);

});

test('make comic search url, page 1', assert => {
    const characterId = '123';

    const searchOptions = {
        page: 1,
    };

    const expected = 'https://gateway.marvel.com/v1/public/comics?characters=123&offset=0&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
    
    const result = makeComicSearchUrl(characterId, searchOptions);

    assert.equal(result, expected);
});

test('make comic search url, page 3', assert => {
    const characterId = '456';

    const searchOptions = {
        page: 3,
    };

    const expected = 'https://gateway.marvel.com/v1/public/comics?characters=456&offset=40&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
    
    const result = makeComicSearchUrl(characterId, searchOptions);

    assert.equal(result, expected);
});