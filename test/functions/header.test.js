const test = QUnit.test;

QUnit.module('header');

function makeHeaderTemplate() {
    const html = `
    <header>
        <a href="index.html"><img src="./assets/marvel-us-logo-color.svg" alt="MarvelUS"></a>
    </header>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

test('static header html?', assert => {
    // arrange
    const expected = `
    <header>
        <a href="index.html"><img src="./assets/marvel-us-logo-color.svg" alt="MarvelUS"></a>
    </header>
    `;
    // act
    const results = makeHeaderTemplate();
    // assert
    assert.htmlEqual(results, expected);
});




test('make profile html without user', assert => {
    // arrange

    // act

    // assert
    assert.htmlEqual
});