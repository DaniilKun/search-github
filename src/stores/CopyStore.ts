import { makeAutoObservable } from 'mobx';

class CopyStore {
  copied: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCopied(text: string) {
    navigator.clipboard.writeText(text);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}

export default new CopyStore();
