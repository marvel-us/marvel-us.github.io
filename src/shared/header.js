import { auth } from '../firebase/firebase.js';

export function makeHeaderTemplate() {
    const html = `
    <header>
        <a href="index.html"><img src="./assets/marvel-us-logo-white.svg" alt="MarvelUS"></a>
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
                <ul class="profile-header-ul">
                    <li class="nav-li"><a href="/wishlist.html">Wishlist</a></li>
                    <li class="nav-li"><a href="/library.html">Library</a></li>
                    <li class="nav-li"><span id="user-name-display">${user.displayName}</span></li>
                    <li class="nav-line-break"></li>
                    <li class="nav-li" id="log-out-nav"><a href="#"><span id="log-out">Log Out</span></a></li>
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
    if(options && options.skipAuth) {
        return;
    }

    auth.onAuthStateChanged(user => {
        if(user) {
            const userDom = makeProfileTemplate(user);
            const signOutButton = userDom.querySelector('#log-out');

            signOutButton.addEventListener('click', () => {
                auth.signOut();
                window.location = './index.html';
            });
            headerContainer.appendChild(userDom);
        } else {
            const userDom = makeProfileTemplate();
            headerContainer.appendChild(userDom);
        }
    });
}
