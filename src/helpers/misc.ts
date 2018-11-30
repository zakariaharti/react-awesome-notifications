export class Timer{
  constructor(
    private delay: number | any,
    private callback: () => void
  ){}

  private timerId: any;
  private start: any;
  private remaining = this.delay;

  public pause = () => {
    clearTimeout(this.timerId);
    // @ts-ignore
    this.remaining -= new Date() - this.start;
  }

  public resume = () => {
    this.start = new Date();
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.callback,this.remaining);
  }

  public getRemaining = () => this.remaining;
}
