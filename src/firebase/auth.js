import { auth, usersRef } from './firebase.js';

const ui = new firebaseui.auth.AuthUI(auth);

auth.onAuthStateChanged(user => {
    if(user) {
        window.location = 'index.html';
    }
});

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: './index.html',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
        signInSuccessWithAuthResult(authResult) {
            const user = authResult.user;
            usersRef.child(user.uid)
                .update({
                    uid: user.uid,
                    displayName: user.displayName,
                });
            return true;
        }
    }
});