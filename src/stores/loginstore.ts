import { computed, observable } from "mobx";
import * as firebase from 'firebase/app';
import 'firebase/auth';

import config from '../config';

export const firebaseApp = firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
});

export default class LoginStore {
    @observable
    private _authenticatedUser: {value: firebase.User | null | undefined} = observable({ value: undefined});
    private readonly auth: firebase.auth.Auth;

    constructor() {
        this.auth = firebaseApp.auth();
        this.auth.onAuthStateChanged(user => {

            this._authenticatedUser.value = user;
        });
    }

    @computed
    public get authenticatedUser() {
        return this._authenticatedUser.value;
    }

    public signOut() {
        this.auth.signOut();
    }
}