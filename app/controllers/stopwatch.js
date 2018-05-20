import Controller from '@ember/controller';

let timer;
let lastUpdate = (new Date()).getTime();

export default Controller.extend({
    actions: {
        start() {
            if (timer != null) return;
            this.set('isStopped', false);

            lastUpdate = (new Date()).getTime();

            timer = setInterval(() => {
                let now = (new Date()).getTime();
                let diff = now - lastUpdate;

                lastUpdate = now;
                this.set('totalTime', this.get('totalTime') + diff);

                let tt = this.get('totalTime')
                let hours = Math.floor(tt / (1000 * 60 * 60));
                let minutes = Math.floor((tt - hours * 1000 * 60 * 60) / (1000 * 60));
                let seconds = Math.floor((tt - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / (1000));

                this.set('hours', hours);
                this.set('minutes', minutes);
                this.set('seconds', seconds);
            }, 1000);
        },
        reset() {
            lastUpdate = (new Date()).getTime();
            this.set('totalTime', 0);
            this.set('hours', 0);
            this.set('minutes', 0);
            this.set('seconds', 0);
        },
        stop() {
            clearInterval(timer);
            timer = null;
            this.set('isStopped', true);
        }
    },
    isStopped: true,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalTime: 0
});