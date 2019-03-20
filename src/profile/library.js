import { auth, libraryByUserRef } from '../firebase/firebase.js';
import loadComics from '../comics/comic-list-components.js';
import loadHeader from '../shared/header.js';
import objectToArray from '../object-to-array.js';

loadHeader();

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    console.log(userId);
    const userLibraryRef = libraryByUserRef.child(userId);
    userLibraryRef.once('value')
    .then(snapshot => {
        const value = snapshot.val();
        const comics = objectToArray(value);
        loadComics(comics);
    });
});