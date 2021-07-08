import './sass/main.scss';

class CountdownTimer {
  constructor({ selector, targetDate }) {
      this.selector = document.querySelector(`${selector}`);
      this.targetDate = targetDate;
      this.timer();
  };

  timerComponents(time) {
      
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const sec = this.pad(Math.floor((time % (1000 * 60)) / 1000));

      return {days, hours, mins, sec }
  }

  pad(value) {
      return String(value).padStart(2, "0");
  };

  timer() {
      const intervalId = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = this.targetDate - currentTime;
          const times = this.timerComponents(deltaTime)
          if (deltaTime <= 0) {
              clearInterval(intervalId);
              return
          }
          const fields = [...this.selector.children];
          fields.map((el) => {
              const value = el.firstElementChild.dataset.value;
               if (value === "days") {
                  el.firstElementChild.textContent = times.days;
              };
               if (value === "hours") {
                  el.firstElementChild.textContent = times.hours;
              };
               if (value === "mins") {
                  el.firstElementChild.textContent = times.mins;
              };
               if (value === "secs") {
                  el.firstElementChild.textContent = times.sec;
              };
          })
      }, 1000)
  }
};






new CountdownTimer({
selector: '#timer-1',
targetDate: new Date("Aug 20, 2090 10:00:00"),
});