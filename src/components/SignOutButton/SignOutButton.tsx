import * as React from 'react';
import store from "../../stores";

export const SignOutButton = () => (
    <a onClick={store.loginStore.signOut.bind(store.loginStore)}>Signout</a>
);
