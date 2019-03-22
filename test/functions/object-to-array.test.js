const test = QUnit.test;
QUnit.module('convert object to array');

import objectToArray from '../../src/object-to-array.js';

test('converts library/wishlist object into array', assert => {
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

    const result = objectToArray(object);

    assert.deepEqual(result, expected);
});