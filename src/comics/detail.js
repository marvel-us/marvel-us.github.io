import loadHeader from '../shared/header.js';
import { makeComicUpcSearchUrl, makeComicIdSearchUrl } from './make-search-url.js';
import { makeDetailImageTemplate, makeDetailInfoTemplate } from './detail-info.js';
import { auth, wishlistByUserRef, libraryByUserRef } from '../firebase/firebase.js';

loadHeader();

const currentHashQuery = window.location.hash.slice(1);

const splitQuery = currentHashQuery.split('=');
const comicCodeType = splitQuery[0];
const comicCode = splitQuery[1];
const backButton = document.getElementById('back-button');

backButton.addEventListener('click', () => {
    event.preventDefault();
    window.history.back();
}); 

const comicImage = document.getElementById('comic-image');

if(comicCodeType === 'upc') {
    const upcUrl = makeComicUpcSearchUrl(comicCode);
    fetch(upcUrl)
        .then(response => response.json())
        .then(results => {
            if(results.data.count === 0) {
                const h3 = document.createElement('h3');
                h3.textContent = 'Comic not found.';
                comicImage.appendChild(h3);
            } else {
                const comic = results.data.results[0];
                makeDetailImageTemplate(comic);
                makeDetailInfoTemplate(comic);
                makeIconsWork(comic);
            }
        });
} else {
    const idUrl = makeComicIdSearchUrl(comicCode);
    fetch(idUrl)
        .then(response => response.json())
        .then(results => {
            if(results.data.count === 0) {
                const h3 = document.createElement('h3');
                h3.textContent = 'Comic not found.';
                comicImage.appendChild(h3);
            } else {
                const comic = results.data.results[0];
                makeDetailImageTemplate(comic);
                makeDetailInfoTemplate(comic);
                makeIconsWork(comic);
            }
        });
}



function makeIconsWork(comic) {
    const library = document.getElementById('library-icon');
    const wishlist = document.getElementById('wishlist-icon');

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
                        issue: comic.issueNumber
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
                        issue: comic.issueNumber
                    });
                    addToWishlist();
                }
            });
        });
}