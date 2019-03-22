import { auth, wishlistByUserRef, libraryByUserRef } from '../firebase/firebase.js';
import clearResultsList from './clear-results-list.js';

export function makeResultListTemplate(comic) {
    let comicImage = null;

    if(comic.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
        comicImage = 'assets/no-comic-image.jpg';
    } else {
        comicImage = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    }

    const html = /*html*/ `
    <div id="result-card">
        <div style="background-image: url(${comicImage})" id="result-card-image">
            <div id="result-card-h2">
                <h2>${comic.title}</h2>
                <span id="comic-codes" hidden="true">${comic.upc} ${comic.id} ${comic.digitalId} ean ${comic.ean}</span>
            </div>
        </div>
        <div id="result-card-bottom">
          <span id="result-information">Issue: ${comic.issueNumber}<br>${comic.series.name}</span>
          <span id="result-user-control">
            <img src="assets/icons/library-noselect.svg" id="library-icon" class="library-icon" alt="Add to library" title="Add to library">  
            <img src="assets/icons/wishlist-noselect.svg" id="wishlist-icon" alt="Add to wishlist" title="Add to wishlist">
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
                        let imageObject = {};
                        if(comic.images.length === 0) {
                            imageObject = {
                                path: 'assets/comic-image-placeholder',
                                extension: 'jpg'
                            };
                        } else {
                            imageObject = {
                                path: comic.images[0].path, 
                                extension: comic.images[0].extension 
                            };
                        }

                        userLibraryComicRef.set({
                            id: comic.id,
                            title: comic.title,
                            series: { name: comic.series.name },
                            thumbnail: { path: comic.thumbnail.path, extension: comic.thumbnail.extension },
                            issueNumber: comic.issueNumber,
                            images: imageObject,
                            upc: comic.upc,
                            prices: { price: comic.prices[0].price },
                            ean: comic.ean,
                            digitalId: comic.digitalId
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
                        let imageObject = {};
                        if(comic.images.length === 0) {
                            imageObject = {
                                path: 'assets/comic-image-placeholder',
                                extension: 'jpg'
                            };
                        } else {
                            imageObject = {
                                path: comic.images[0].path, 
                                extension: comic.images[0].extension 
                            };
                        }

                        userWishlistComicRef.set({
                            id: comic.id,
                            title: comic.title,
                            series: { name: comic.series.name },
                            thumbnail: { path: comic.thumbnail.path, extension: comic.thumbnail.extension },
                            issueNumber: comic.issueNumber,
                            images: imageObject,
                            upc: comic.upc,
                            prices: { price: comic.prices[0].price },
                            ean: comic.ean,
                            digitalId: comic.digitalId   
                        });
                        addToWishlist();
                    }
                });
            });
                
        resultsList.appendChild(html);
    });
}

export function loadComicListWithNoUser(comics) {
    clearResultsList();

    comics.forEach(comic => {
        const html = makeResultListTemplate(comic);
        const libraryIcon = html.getElementById('library-icon');
        libraryIcon.classList.add('hidden');
        const wishlistIcon = html.getElementById('wishlist-icon');
        wishlistIcon.classList.add('hidden');

        resultsList.appendChild(html);
    });
}