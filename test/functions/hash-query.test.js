const test = QUnit.test;

QUnit.module('Hash Query');

function writeToQuery(existingQuery, searchOptions) {
    const query = searchOptions.keyword;
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('name', query);
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

test('writ search to existing query', assert => {
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