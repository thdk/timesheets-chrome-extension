export interface IRootStore {
    loginStore: LoginStore;
}

import LoginStore from './loginstore';
import { isObservable } from 'mobx';

export class RootStore implements IRootStore {

public readonly loginStore: LoginStore;

  constructor() {
    this.loginStore = new LoginStore();
  }
}

const rootStore = new RootStore();
(window as any)["store"]  = rootStore;
(window as any)["isObservable"]  = isObservable;

export default rootStore;