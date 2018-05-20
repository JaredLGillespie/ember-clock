import Controller from '@ember/controller';

let timer;
let lastUpdate = (new Date()).getTime();

export default Controller.extend({
    actions: {
        hourInc() {
            this.set('hours', Math.min(this.get('hours') + 1, 99));
        },
        minuteInc() {
            this.set('minutes', Math.min(this.get('minutes') + 1, 99) % 60);
        },
        secondInc() {
            this.set('seconds', Math.min(this.get('seconds') + 1, 99) % 60);
        },
        hourDec() {
            this.set('hours', (Math.max(this.get('hours') - 1, 0)) % 99);
        },
        minuteDec() {
            this.set('minutes', (Math.max(this.get('minutes') - 1, 0)) % 60);
        },
        secondDec() {
            this.set('seconds', (Math.max(this.get('seconds') - 1, 0)) % 60);
        },
        start() {
            if (timer != null || ((this.get('hours') == 0) && (this.get('minutes') == 0) && (this.get('seconds') == 0))) return;
            this.set('isStopped', false);
            
            lastUpdate = (new Date()).getTime();
            this.set('timeRemaining', this.get('hours') * 1000 * 60 * 60 + this.get('minutes') * 1000 * 60 + this.get('seconds') * 1000 + 500);

            timer = setInterval(() => {
                if (this.get('timeRemaining') <= 0) {
                    clearInterval(timer);
                    timer = null;
                    this.set('isStopped', true);
                    this.set('timeRemaining', 0);
                    this.set('hours', 0);
                    this.set('minutes', 0);
                    this.set('seconds', 0);
                } else {
                    let now = (new Date()).getTime();
                    let diff = now - lastUpdate;
                    let tr = this.get('timeRemaining') - diff;
                    lastUpdate = now;
                    if (tr < 500) {
                        this.set('isStopped', true);
                        this.set('timeRemaining', 0);
                        this.set('hours', 0);
                        this.set('minutes', 0);
                        this.set('seconds', 0);
                        clearInterval(timer);
                        timer = null;
                    } else {
                        this.set('timeRemaining', tr);
                        let hours = Math.floor(tr / (1000 * 60 * 60));
                        let minutes = Math.floor((tr - hours * 1000 * 60 * 60) / (1000 * 60));
                        let seconds = Math.floor((tr - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / (1000));
        
                        this.set('hours', hours);
                        this.set('minutes', minutes);
                        this.set('seconds', seconds);
                    }
                }
            }, 1000);
        },
        reset() {
            this.set('isStopped', true);
            this.set('timeRemaining', 0);
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
    timeRemaining: 0
});