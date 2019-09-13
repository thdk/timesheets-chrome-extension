// Import FirebaseAuth and firebase.
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app'
import config, { LoginProvider } from '../../config';
import * as firebaseui from 'firebaseui';

const { providers, tosUrl, privacyPolicyUrl } = config.firebaseAuth;

const getFirebaseAuthProvider = (provider: LoginProvider) => {
    switch (provider) {
        case LoginProvider.Google:
            return firebase.auth.GoogleAuthProvider.PROVIDER_ID;
        case LoginProvider.Facebook:
            return firebase.auth.FacebookAuthProvider.PROVIDER_ID;
        case LoginProvider.Email:
            return firebase.auth.EmailAuthProvider.PROVIDER_ID;
        case LoginProvider.Guest:
            return firebaseui.auth.AnonymousAuthProvider;
    }
}
// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: (_authResult: firebase.auth.UserCredential, _redirectUrl: string) => {
            return false;
        }
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: providers.map(getFirebaseAuthProvider),
    // Terms of service url/callback.
    tosUrl,
    // Privacy policy url/callback.
    privacyPolicyUrl
};

export const SignInScreen = () => (
    <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
);
