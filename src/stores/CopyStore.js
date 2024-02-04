import { makeAutoObservable } from 'mobx';

class CopyStore {
  copied=false;

  constructor() {
    makeAutoObservable(this);
  }

  setCopied(text) {
    navigator.clipboard.writeText(text);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}

export default new CopyStore();
