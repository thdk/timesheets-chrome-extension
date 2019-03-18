import { auth } from "../my-firebase";
import { computed, observable } from "mobx";
import { Undefined, UndefinedValue, isUndefinedValue } from 'mobx-undefined-value';

export default class LoginStore {
    @observable
    private _authenticatedUser: any | Undefined;

    constructor() {
        auth.onAuthStateChanged(user => {
            this._authenticatedUser = user ? user : UndefinedValue;
        });
    }

    @computed
    public get authenticatedUser() {
        return isUndefinedValue(this._authenticatedUser) ? undefined : this._authenticatedUser;
    }
}