import Controller from '@ember/controller';
import { computed } from '@ember/object';

let timer;

export default Controller.extend({
    init() {
        this._super(...arguments)
        this.datetime = new Date();
        timer = setInterval(() => {
            this.set('datetime', new Date())
        }, 1000);
    },
    year: computed('datetime', function() {
        return this.get('datetime').getFullYear()
    }),
    month: computed('datetime', function() {
        return this.get('datetime').getMonth() + 1
    }),
    day: computed('datetime', function() {
        return this.get('datetime').getDate()
    }),
    hours: computed('datetime', function() {
        return this.get('datetime').getHours()
    }),
    minutes: computed('datetime', function() {
        return this.get('datetime').getMinutes()
    }),
    seconds: computed('datetime', function() {
        return this.get('datetime').getSeconds()
    }),
    willDestroy() {
        clearInterval(timer)
        timer = null;
    }
});