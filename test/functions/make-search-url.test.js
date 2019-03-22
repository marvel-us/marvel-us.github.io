const test = QUnit.test;

QUnit.module('search');

import { makeCharacterSearchUrl, makeComicSearchUrl, makeComicIdSearchUrl, makeComicUpcSearchUrl } from '../../src/comics/make-search-url.js';

test('make character search url', assert => {
    const searchOptions = {
        keyword: 'thor',
    };

    const expected = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=thor&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
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

test('make comic upc search', assert => {
    const characterUpc = '75960608855301111';
    const expected = 'https://gateway.marvel.com/v1/public/comics?upc=75960608855301111&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
    
    const results = makeComicUpcSearchUrl(characterUpc);
    
    assert.equal(results, expected);
});

test('make comic id search', assert => {
    const characterId = '22253';
    const expected = 'https://gateway.marvel.com/v1/public/comics?digitalId=22253&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
    
    const results = makeComicIdSearchUrl(characterId);
    
    assert.equal(results, expected);
});