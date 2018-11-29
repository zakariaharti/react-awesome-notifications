export class Timer{
  constructor(
    private delay: number | any,
    private callback: () => void
  ){}

  private timerId: NodeJS.Timer;
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
    this.timerId = setTimeout(this.callback,this.delay);
  }

  public getRemaining = () => this.remaining;
}
