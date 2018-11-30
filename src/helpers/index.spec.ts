import { Timer } from './misc';

describe('test Timer class',() => {
  it('should start and pause timer',(done) => {
    let time: any;
    let timer = new Timer(20,() => {});

    timer.resume();

    setTimeout(() => {
      timer.pause();
      time = timer.getRemaining;
    }, 5);

    setTimeout(() => {
      expect(timer.getRemaining).toEqual(time);

      timer.resume();
    }, 10);

    setTimeout(() => {
      timer.pause();
      time = timer.getRemaining;
    }, 15);

    setTimeout(() => {
      // we add a short margin otherwise the test failed on Chrome
      expect(timer.getRemaining).toEqual(time);
      done();
    }, 20);
  });

  it('should call callback at the end', (done) => {
    const timer = new Timer(10, () => {
      done();
    });
    timer.resume();
  });
});
