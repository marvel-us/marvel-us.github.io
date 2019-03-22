import { makeHeaderTemplate, makeProfileTemplate } from '../../src/shared/header.js';
const test = QUnit.test;

QUnit.module('header');

test('static header html?', assert => {
    const expected = `
    <header>
        <a href="index.html"><img src="./assets/marvel-us-logo-white.svg" alt="MarvelUS"></a>
    </header>
    `;
    
    const results = makeHeaderTemplate();
    
    assert.htmlEqual(results, expected);
});

test('make profile html without user', assert => {
    const expected = `
    <nav>
        <a href="/auth.html" id="login">Log In/Sign Up</a>
    </nav>
    `;
    
    const results = makeProfileTemplate();
    
    assert.htmlEqual(results, expected);
});


test('make profile html with user', assert => {
    const user = {
        displayName: 'Tom Hanks'
    };
    const expected = `
        <nav>
            <div id="profile-header">
                <ul class="profile-header-ul">
                    <li class="nav-li"><a href="/wishlist.html">Wishlist</a></li>
                    <li class="nav-li"><a href="/library.html">Library</a></li>
                    <li class="nav-li"><span id="user-name-display">Tom Hanks</span></li>
                    <li class="nav-line-break"></li>
                    <li class="nav-li" id="log-out-nav"><a href="#"><span id="log-out">Log Out</span></a></li>
                </ul>
            </div>
        </nav>
    `;
    
    const results = makeProfileTemplate(user);

    assert.htmlEqual(results, expected);
});