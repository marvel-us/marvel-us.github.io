import { auth, wishlistByUserRef, libraryByUserRef } from '../firebase/firebase.js';
import clearResultsList from './clear-results-list.js';

export function makeResultListTemplate(comic) {
    const html = /*html*/ `
    <div id="result-card">
        <div style="background-image: url(${comic.thumbnail.path}.${comic.thumbnail.extension})" id="result-card-image">
            <div id="result-card-h2">
                <h2>${comic.title}</h2>
                <span id="comic-codes" hidden="true">${comic.upc} ${comic.id}</span>
            </div>
        </div>
        <div id="result-card-bottom">
          <span id="result-information">Issue: ${comic.issueNumber}<br>${comic.series.name}</span>
          <span id="result-user-control">
            <img src="assets/icons/library-noselect.svg" id="library-icon" alt="library">  
            <img src="assets/icons/wishlist-noselect.svg" id="wishlist-icon" alt="wishlist">
          </span>
        </div>
    </div>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const resultsList = document.getElementById('results-list');

export default function loadComicList(comics) {
    clearResultsList();

    comics.forEach(comic => {
        const html = makeResultListTemplate(comic);
        
        const library = html.getElementById('library-icon');
        const wishlist = html.getElementById('wishlist-icon');

        if(window.location.pathname === '/library.html') {
            wishlist.hidden = true;
        }
        if(window.location.pathname === '/wishlist.html') {
            library.hidden = true;
        }

        const userId = auth.currentUser.uid; 
        
        const userLibraryRef = libraryByUserRef.child(userId);
        const userLibraryComicRef = userLibraryRef.child(comic.id);
        userLibraryComicRef.once('value')
            .then(snapshot => {
                const value = snapshot.val();
                let inLibrary = false;
                if(value) {
                    addToLibrary();
                } else {
                    removeFromLibrary();
                }
                
                function addToLibrary() {
                    inLibrary = true;
                    library.src = 'assets/icons/library-select.svg';
                }
                
                function removeFromLibrary() {
                    inLibrary = false;
                    library.src = 'assets/icons/library-noselect.svg';
                }
                
                library.addEventListener('click', () => {
                    if(inLibrary) {
                        userLibraryComicRef.remove();
                        removeFromLibrary();
                    } else {
                        userLibraryComicRef.set({
                            id: comic.id,
                            title: comic.title,
                            series: { name: comic.series.name },
                            thumbnail: { path: comic.thumbnail.path, extension: comic.thumbnail.extension },
                            issue: comic.issueNumber,
                            images: { path: comic.images[0].path, extension: comic.images[0].extension },
                            upc: comic.upc,
                            prices: { price: comic.prices[0].price }
                        });
                        addToLibrary();
                    }
                });
            });

        const userWishlistRef = wishlistByUserRef.child(userId);
        const userWishlistComicRef = userWishlistRef.child(comic.id);
        userWishlistComicRef.once('value')
            .then(snapshot => {
                const value = snapshot.val();
                let inWishlist = false;
                if(value) {
                    addToWishlist();
                } else {
                    removeFromWishlist();
                }
                
                function addToWishlist() {
                    inWishlist = true;
                    wishlist.src = 'assets/icons/wishlist-select.svg';
                }
                
                function removeFromWishlist() {
                    inWishlist = false;
                    wishlist.src = 'assets/icons/wishlist-noselect.svg';
                }
                
                wishlist.addEventListener('click', () => {
                    if(inWishlist) {
                        userWishlistComicRef.remove();
                        removeFromWishlist();
                    } else {
                        userWishlistComicRef.set({
                            id: comic.id,
                            title: comic.title,
                            series: { name: comic.series.name },
                            thumbnail: { path: comic.thumbnail.path, extension: comic.thumbnail.extension },
                            issue: comic.issueNumber,
                            images: { path: comic.images[0].path, extension: comic.images[0].extension },
                            upc: comic.upc,
                            prices: { price: comic.prices[0].price },     
                        });
                        addToWishlist();
                    }
                });
            });

        
        resultsList.appendChild(html);

    });
}