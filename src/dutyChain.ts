export default class DutyChain {
  next: any;
  fn: Function;
  constructor(fn) { 
    this.fn = fn;
  }

  async handleRequest(...outer) {
    const next = async (...args) => {
      if (!this.next || !this.next.handleRequest) return;

      const result = await this.next.handleRequest(...args)
      console.log(result);
      return result;
    }
    return await this.fn(...outer, next);
  }

  setNext(successor) {
    this.next = successor;

    return this.next;
  }
}