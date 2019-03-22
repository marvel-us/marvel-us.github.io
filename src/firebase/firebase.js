const config = {
    apiKey: 'AIzaSyBAWpeiDGyxo8lQvbibyPT0Q07kJRbrv5A',
    authDomain: 'marvelus-4bb64.firebaseapp.com',
    databaseURL: 'https://marvelus-4bb64.firebaseio.com',
    projectId: 'marvelus-4bb64',
};

export const app = firebase.initializeApp(config);

const db = firebase.database();

export const auth = firebase.auth();
export const usersRef = db.ref('users');
export const wishlistByUserRef = db.ref('wishlist-by-user');
export const libraryByUserRef = db.ref('library-by-user');