import * as React from 'react';
import { observer } from 'mobx-react';
import store from "./stores/";
import { SignOutButton } from './components/SignOutButton/SignOutButton';
import { Login } from './components/login2';

export const App = observer(() => {
    const isLoading = store.loginStore.authenticatedUser === undefined;
    if (isLoading) return <>Loading...</>;

    const isLoggedIn = !!store.loginStore.authenticatedUser;
    return isLoggedIn
        ? <SignOutButton></SignOutButton>
        : <Login></Login>;
});
