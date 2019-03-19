import { auth } from '../firebase/firebase.js';

export function makeHeaderTemplate() {
    const html = `
    <header>
        <a href="index.html"><img src="./assets/marvel-us-logo-color.svg" alt="MarvelUS"></a>
    </header>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

export function makeProfileTemplate(user) {
    let html = null;

    if(!user) {
        html = /*html*/`
        <nav>
            <a href="/auth.html" id="login">Log In/Sign Up</a>
        </nav>
        `;
    } else {
        html = /*html*/`
        <nav>
            <div id="profile-header">
                <ul>
                    <li><a href="./wishlist.html">Wishlist</a></li>
                    <li><a href="./library.html">Library</a></li>
                    <li><span id="user-name-display">${user.displayName}</span></li>
                    <ul id="drop-down">
                        <li><a href="./user-profile.html">User Profile</a></li>
                        <li><span id="log-out">Log Out</span></li>
                    </ul>
                </ul>
            </div>
        </nav>
        `;
    }

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const headerContainer = document.getElementById('header-container');
export default function loadHeader(options) {
    const headerHtml = makeHeaderTemplate();
    headerContainer.appendChild(headerHtml);
    //const header = headerHtml.querySelector('header');
    if(options && options.skipAuth) {
        return;
    }

    auth.onAuthStateChanged(user => {
        if(user) {
            const userDom = makeProfileTemplate(user);
            const signOutButton = userDom.querySelector('#log-out');

            signOutButton.addEventListener('click', () => {
                auth.signOut();
                // window.location = './index.html';
            });
            headerContainer.appendChild(userDom);
        } else {

// WHILE LOOP?

            const userDom = makeProfileTemplate();
            headerContainer.appendChild(userDom);
        }
    });
}
