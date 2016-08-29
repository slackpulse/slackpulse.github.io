var _ = require('lodash');

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) {
        strong = myStrong;
    }
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16);
}

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            headPortable: 952,
            torsoPortable: 880,
            pantsPortable: 928,
            weaponPortable: 660,
            additionalRate: 0,
            histories: [],
        };
    },
    ready: function () {
        this.loadHistories();
    },
    route: {
        data: function (transition) {
            console.log('query:', transition.to.query);
            var head = _.get(transition, 'to.query.head', 0);
            if (_.has(transition, 'to.query.head')) {
                this.headPortable = parseInt(head, 10);
            }
            var torso = _.get(transition, 'to.query.torso', 0);
            if (_.has(transition, 'to.query.torso')) {
                this.torsoPortable = parseInt(torso, 10);
            }
            var pants = _.get(transition, 'to.query.pants', 0);
            if (_.has(transition, 'to.query.pants')) {
                this.pantsPortable = parseInt(pants, 10);
            }
            var weapon = _.get(transition, 'to.query.weapon', 0);
            if (_.has(transition, 'to.query.weapon')) {
                this.weaponPortable = parseInt(weapon, 10);
            }
            var additionalRate = _.get(transition, 'to.query.rate', 0);
            if (_.has(transition, 'to.query.rate')) {
                this.additionalRate = parseInt(additionalRate, 10);
            }
            transition.next();
        },
    },
    computed: {
        additionalRateValue: function () {
            if (!this.additionalRate) {
                return 0;
            }
            return parseInt(this.additionalRate, 10);
        },
        sum: function () {
            return parseInt(this.headPortable, 10) + parseInt(this.torsoPortable, 10) + parseInt(this.pantsPortable, 10) + parseInt(this.weaponPortable, 10);
        },
        pantsAddition: function () {
            return parseInt(this.pantsPortable) * this.additionalRateValue / 100;
        },
        pantsAdditionWithoutOnesPlace: function () {
            return Math.floor(this.pantsAddition / 10) * 10;
        },
        pantsAdditionOnesPlace: function () {
            return this.pantsAddition % 10;
        },
        weaponAddition: function () {
            return parseInt(this.weaponPortable, 10) * this.additionalRateValue / 100;
        },
        weaponAdditionWithoutOnesPlace: function () {
            return Math.floor(this.weaponAddition / 10) * 10;
        },
        weaponAdditionOnesPlace: function () {
            return this.weaponAddition % 10;
        },
        isValid: function () {
            if (10 < this.additionalRateValue || this.additionalRateValue < 0) {
                return false;
            }
            return this.headPortable && this.torsoPortable && this.pantsPortable && this.weaponPortable;
        },
        portable: function () {
            if (!this.isValid) {
                return '計算不可';
            }

            var result;
            if (10 === this.additionalRateValue) {
                result = this.sum + 118;
                return result;
            }
            result = this.sum + this.pantsAdditionWithoutOnesPlace + this.weaponAdditionWithoutOnesPlace;

            console.log('sum', this.sum);
            console.log('pantsAdditionWithoutOnesPlace', this.pantsAdditionWithoutOnesPlace);
            console.log('weaponAdditionWithoutOnesPlace', this.weaponAdditionWithoutOnesPlace);
            console.log('pantsAdditionOnesPlace', this.pantsAdditionOnesPlace);
            console.log('weaponAdditionOnesPlace', this.weaponAdditionOnesPlace);

            if (5 <= this.pantsAdditionOnesPlace) {
                result += this.pantsAdditionOnesPlace;
            }
            if (5 <= this.weaponAdditionOnesPlace) {
                result += this.weaponAdditionOnesPlace;
            }
            return Math.floor(result);
        },
        skating: function () {
            if (this.additionalRate && 0 < this.additionalRateValue) {
                return 3315 <= this.portable;
            }
            return 3311 <= this.portable;
        },
        shareURL: function () {
            var compiled = _.template([
                window.location.protocol + '//' + window.location.host + '/#!/',
                '?head={{ head }}',
                '&torso={{ torso }}',
                '&pants={{ pants }}',
                '&weapon={{ weapon }}',
                '&rate={{ rate }}',
            ].join(''));

            var text = this.scating ? 'スケートできるよ！' : 'ポータブルは' + this.sum;
            if (this.scating && 10 <= this.additionalRate) {
                text = 'スケートできるかも？';
            }

            return [
                'https://twitter.com/intent/tweet',
                '?url=' + encodeURIComponent(compiled({
                    head: this.headPortable,
                    torso: this.torsoPortable,
                    pants: this.pantsPortable,
                    weapon: this.weaponPortable,
                    rate: this.additionalRate,
                })),
                '&via=slackpulse',
                '&hashtags=アフパル',
                '&text=' + text,
            ].join('');
        },
    },
    methods: {
        loadHistories: function () {
            var stored = window.localStorage.getItem('histories');
            if (!stored) {
                this.histories = [];
            } else {
                this.histories = JSON.parse(stored);
            }
            return;
        },
        clear: function () {
            this.histories.splice(0, this.histories.length);
            window.localStorage.clear();
        },
        save: function () {
            if (!this.isValid) {
                return;
            }
            this.histories.push({
                uuid: getUniqueStr(),
                headPortable: this.headPortable,
                torsoPortable: this.torsoPortable,
                pantsPortable: this.pantsPortable,
                weaponPortable: this.weaponPortable,
                additionalRate: this.additionalRate,
                sum: this.sum,
                portable: this.portable,
                skating: this.skating,
            });
            this.histories = _.uniqBy(this.histories, function (record) {
                var key = record.headPortable + '';
                key += record.torsoPortable;
                key += record.pantsPortable;
                key += record.weaponPortable;
                key += record.additionalRate;
                console.log(key);
                return key;
            });
            window.localStorage.setItem('histories', JSON.stringify(this.histories));
        },
        remove: function (uuid) {
            this.histories = _.reject(this.histories, {
                uuid: uuid
            });
            window.localStorage.setItem('histories', JSON.stringify(this.histories));
        },
    },
};
