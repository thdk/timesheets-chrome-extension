import firebase from 'firebase/app';
import 'firebase/auth';

import config from './config';

firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
});

firebase.auth().onAuthStateChanged(user => {
    console.log({backgroundUser: user});
});