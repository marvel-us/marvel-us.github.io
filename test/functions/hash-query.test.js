const test = QUnit.test;

QUnit.module('Hash Query');

function writeToQuery(existingQuery, searchOptions) {
    const keyword = searchOptions.keyword;
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('name', keyword);
    return searchParams.toString();
}

test('write search term to empty hash', assert => {
    // arrange
    const searchOptions = {
        keyword: 'thor',
    };

    const existingQuery = '';
    const expected = 'name=thor';

    // act
    const result = writeToQuery(existingQuery, searchOptions);

    // assert
    assert.equal(result, expected);
});

test('write search to existing query', assert => {
    // arrange
    const searchOptions = {
        keyword: 'hulk',
    };

    const existingQuery = 'name=thor';
    const expected = 'name=hulk';

    // act
    const result = writeToQuery(existingQuery, searchOptions);

    // assert
    assert.equal(result, expected);
});


// write page to hash query

function writePageToQuery(existingQuery, searchOptions) {
    const page = searchOptions.page;
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('page', page);
    return searchParams.toString();
}

test('write page 1 to existing query', assert => {
    // arrange
    const searchOptions = {
        page: 1
    };

    const existingQuery = 'name=hulk';

    const expected = 'name=hulk&page=1';
    // act
    const results = writePageToQuery(existingQuery, searchOptions);
    // assert
    assert.equal(results, expected);
});


// read search options from hash query