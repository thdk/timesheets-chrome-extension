import * as React from 'react';
import { observer } from 'mobx-react';
import { Login } from './components/login2';

@observer
export class App extends React.Component {
    render() {
        return <><Login></Login></>;
    }
}