const test = QUnit.test;
QUnit.module('convert object to array');

test('converts library/wishlist object into array', assert => {
    //arrange
    const object = {
        abc: { id: 'abc', name: 'megan' },
        def: { id: 'def', name: 'payton' },
        ghi: { id: 'ghi', name: 'jared' }
    };
    
    const expected = [
        { id: 'abc', name: 'megan' },
        { id: 'def', name: 'payton' },
        { id: 'ghi', name: 'jared' }
    ];

    //act
    const result = objectToArray(object);

    //assert
    assert.deepEqual(result, expected);
});