import { makeAutoObservable } from 'mobx';

class Store {
  laneID: number;
  constructor() {
    makeAutoObservable(this);
    this.laneID = 0;
  }
}

import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

export default new Store();
