export interface IRootStore {
    loginStore: LoginStore;
}

import LoginStore from './loginstore';

export class RootStore implements IRootStore {

public readonly loginStore: LoginStore;

  constructor() {
    this.loginStore = new LoginStore();
  }
}

const rootStore = new RootStore();
(window as any)["store"]  = rootStore;

export default rootStore;