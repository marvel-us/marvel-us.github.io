import { auth, libraryByUserRef } from '../firebase/firebase.js';
import loadComics from '../comics/comic-list-components.js';
import loadHeader from '../shared/header.js';

loadHeader();

auth.onAuthStateChanged(user => {
    const userId = user.id;
    const userLibraryRef = libraryByUserRef.child(userId);
    userLibraryRef.once('value')
    .then(snapshot => {
        const value = snapshot.val();
        console.log(value);
    });
});