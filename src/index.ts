import DutyChain from './dutyChain';
import { pagingLogic } from './utils';

class PageSplicing {
  private dutyChains: DutyChain[] = [];
  constructor() {
    this.dutyChains = [];
  }
  public get chain() {
    return this.dutyChains;
  }

  private get head() {
    return this.dutyChains[0];
  }

  private get tail() {
    return this.dutyChains.slice(-1)[0]
  }

  public get utils() {
    return {
      pagingLogic: (getData, getCount) => {
        return async (offset, pageSize, next) => {
          return await pagingLogic(getData, getCount, offset, pageSize, next)
        }
      },
    }
  }

  public emptyChain() {
    this.dutyChains = []
  }

  public next(handler: Function) {
    const nextChain = new DutyChain(handler);

    if (this.head) {
      this.head.setNext(nextChain);
    }
    this.dutyChains.unshift(nextChain);

    return this;
  }

  public async start(pageIndex, pageSize) {
    if (!this.tail) throw new Error('duty chain is empty!');
    const ret = await this.tail.handleRequest(pageIndex, pageSize);

    return ret
  }
}

export default PageSplicing;
