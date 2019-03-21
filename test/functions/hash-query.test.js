import { writeSearchToQuery, writePageToQuery, readFromQuery, writeIdSearch, writeUpcSearch } from '../../src/comics/hash-query-component.js';

const test = QUnit.test;

QUnit.module('Hash Query');

test('write search term to empty hash', assert => {
    const searchOptions = {
        keyword: 'thor',
    };
    const existingQuery = '';
    const expected = 'name=thor&page=1';

    const result = writeSearchToQuery(existingQuery, searchOptions);

    assert.equal(result, expected);
});

test('write search to existing query', assert => {
    const searchOptions = {
        keyword: 'hulk',
    };
    const existingQuery = 'name=thor';
    const expected = 'name=hulk&page=1';

    const result = writeSearchToQuery(existingQuery, searchOptions);

    assert.equal(result, expected);
});

test('write page 1 to existing query', assert => {
    const page = 1;
    const existingQuery = 'name=hulk';
    const expected = 'name=hulk&page=1';

    const results = writePageToQuery(existingQuery, page);

    assert.equal(results, expected);
});

test('read options from query', assert => {
    const existingUrl = 'name=hulk&page=1';
    const expected = {
        keyword: 'hulk',
        page: 1
    };

    const result = readFromQuery(existingUrl);

    assert.deepEqual(result, expected);
});

test('write hash for upc search', assert => {
    const existingQuery = 'name=hulk&page=1';
    const upcCode = '75960608855301111';
    const expected = 'upc=75960608855301111';

    const result = writeUpcSearch(existingQuery, upcCode);

    assert.equal(result, expected);
});

test('write hash for id search', assert => {
    const existingQuery = 'name=hulk&page=1';
    const upcCode = '22253';
    const expected = 'id=22253';

    const result = writeIdSearch(existingQuery, upcCode);

    assert.equal(result, expected);
});