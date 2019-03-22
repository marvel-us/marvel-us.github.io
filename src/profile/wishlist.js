import { auth, wishlistByUserRef } from '../firebase/firebase.js';
import loadComics from '../comics/comic-list-components.js';
import loadHeader from '../shared/header.js';
import objectToArray from '../object-to-array.js';

loadHeader();

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userWishlistRef = wishlistByUserRef.child(userId);
    
    userWishlistRef.on('value', snapshot => {
        const value = snapshot.val();
        const dom = document.getElementById('results-list');

        if(!value) {
            const noResultsSpan = document.createElement('span');
            noResultsSpan.classList.add('no-result');
            noResultsSpan.textContent = 'No results found';
            dom.appendChild(noResultsSpan);
        }

        const comics = objectToArray(value);
        loadComics(comics);

        const comicImage = dom.querySelectorAll('#result-card-image');
        
        comicImage.forEach(comic => {
            const comicCodes = comic.querySelector('#comic-codes');
            const splitCodes = comicCodes.textContent.split(' ');
            comic.addEventListener('click', () => {
                event.preventDefault();

                if(splitCodes[0]) {
                    window.location = `/detail.html#upc=${splitCodes[0]}`;
                }
                else {
                    window.location = `/detail.html#id=${splitCodes[1]}`;
                }        
            });       
        });
    });
});