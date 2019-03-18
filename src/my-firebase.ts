import * as firebase from 'firebase/app';
import 'firebase/auth';

import config from './config';

const app = firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
});

export const firestore = app.firestore();
export const auth = app.auth();

export default app;