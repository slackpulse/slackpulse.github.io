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
    locales: {
        'ja': {
            'PORTABILITY CALCULATOR': 'ポータブル計算機',
            'HEAD': '頭',
            'HEADGEAR': 'ヘッドギア',
            'TORSO': '胴体',
            'LEG': '脚',
            'WEAPON': '武器',
            '+RATE(%)': '加算率(%)',
            'DISPLAYED PORTABILITY': '表示ポータブル',
            'CALCULATED PORTABILITY': '算出ポータブル',
            'DISPLAYED': '表示',
            'CALCULATED': '算出',
            'SKATER': 'スケート可能',
            'YES': 'はい',
            'NO': 'いいえ',
            'CLEAR': 'クリア',
            'TWEET': 'ツイートする',
            'SAVE': '保存',
            'Unable to calculate': '計算不可',
            'Skater': 'スケートできる!',
            'Not skater': 'スケートできません...',
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.loadHistories();
        });
    },
    beforeRouteEnter: function (route, redirect, next) {
        next(function (vm) {
            var head = _.get(route, 'query.head', 0);
            if (_.has(route, 'query.head')) {
                vm.headPortable = parseInt(head, 10);
            }
            var torso = _.get(route, 'query.torso', 0);
            if (_.has(route, 'query.torso')) {
                vm.torsoPortable = parseInt(torso, 10);
            }
            var pants = _.get(route, 'query.pants', 0);
            if (_.has(route, 'query.pants')) {
                vm.pantsPortable = parseInt(pants, 10);
            }
            var weapon = _.get(route, 'query.weapon', 0);
            if (_.has(route, 'query.weapon')) {
                vm.weaponPortable = parseInt(weapon, 10);
            }
            var additionalRate = _.get(route, 'query.rate', 0);
            if (_.has(route, 'query.rate')) {
                vm.additionalRate = parseInt(additionalRate, 10);
            }
        });
    },
    watch: {
        '$route': function (to, from) {
            if (to.name === 'portable') {
                this.$root.title = 'Afterpulse Portability Calculator';
            }
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
            if (this.additionalRateValue < 0) {
                return false;
            }
            return this.headPortable && this.torsoPortable && this.pantsPortable && this.weaponPortable;
        },
        portable: function () {
            if (!this.isValid) {
                return this.t('Unable to calculate.');
            }

            var result = this.sum;

            console.log('sum', this.sum);

            var addition = this.pantsAdditionWithoutOnesPlace + this.weaponAdditionWithoutOnesPlace;
            if (5 <= this.pantsAdditionOnesPlace) {
                addition += Math.floor(this.pantsAdditionOnesPlace);
            }
            if (5 <= this.weaponAdditionOnesPlace) {
                addition += Math.floor(this.weaponAdditionOnesPlace);
            }

            // 固定値???
            if (this.additionalRateValue === 5) {
                addition = 61;
            } else if (this.additionalRateValue === 7) {
                addition = 86;
            } else if (this.additionalRateValue === 10) {
                addition = 119;
            } else if (this.additionalRateValue === 12) {
                addition = 86 + 61;
            } else if (this.additionalRateValue === 17) {
                addition = 86 + 119;
            }
            result += addition;

            console.log('addition', addition);
            console.log('portable', result);
            return Math.floor(result);
        },
        skating: function () {
            if (5 <= this.additionalRateValue) {
                return 3311 <= this.portable;
            }
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

            var text = '';
            if (this.skating) {
                text += 'スケートできる！！';
            } else {
                text += 'スケートできません...';
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
                '&hashtags=アフパルポータブル計算機',
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
            if (this.histories) {
                this.histories.splice(0, this.histories.length);
            }
            window.localStorage.clear();
        },
        save: function () {
            if (!this.isValid) {
                return true;
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
            return true;
        },
        remove: function (uuid) {
            this.histories = _.reject(this.histories, {
                uuid: uuid
            });
            window.localStorage.setItem('histories', JSON.stringify(this.histories));
        },
    },
};
