const test = QUnit.test;

QUnit.module('search');


function makeCharacterSearchUrl(searchOptions) {
    const offset = (searchOptions.page - 1) * 20;
    const baseURL = `https://gateway.marvel.com:443/v1/public/characters?name=${searchOptions.searchTerm}&apikey=698ecfea67de32ae8e6a3b78e74af2b3`;

    return baseURL.toString();
}

test('make search url', assert => {
    const searchOptions = {
        searchTerm: 'thor',
        page: 1
    }

    const expected = 'https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=698ecfea67de32ae8e6a3b78e74af2b3';
    const result = makeCharacterSearchUrl(searchOptions);

    assert.equal(result, expected);

});