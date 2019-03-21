import { makeHeaderTemplate, makeProfileTemplate } from '../../src/shared/header.js';
const test = QUnit.test;

QUnit.module('header');

test('static header html?', assert => {
    // arrange
    const expected = `
    <header>
        <a href="index.html"><img src="./assets/marvel-us-logo-white.svg" alt="MarvelUS"></a>
    </header>
    `;
    // act
    const results = makeHeaderTemplate();
    // assert
    assert.htmlEqual(results, expected);
});

test('make profile html without user', assert => {
    // arrange
    const expected = `
    <nav>
        <a href="/auth.html" id="login">Log In/Sign Up</a>
    </nav>
    `;
    // act
    const results = makeProfileTemplate();
    // assert
    assert.htmlEqual(results, expected);
});


test('make profile html with user', assert => {
    const user = {
        displayName: 'Tom Hanks'
    };

    // arrange
    const expected = `
        <nav>
            <div id="profile-header">
                <ul class="profile-header-ul">
                    <li class="nav-li"><a href="/wishlist.html">Wishlist</a></li>
                    <li class="nav-li"><a href="/library.html">Library</a></li>
                    <li class="nav-li"><a href="/user-profile.html"><span id="user-name-display">Tom Hanks</span></a></li>
                    <li class="nav-line-break"></li>
                    <li class="nav-li" id="log-out-nav"><a href="#"><span id="log-out">Log Out</span></a></li>
                </ul>
            </div>
        </nav>
    `;
    // act
    const results = makeProfileTemplate(user);
    // assert
    assert.htmlEqual(results, expected);
});