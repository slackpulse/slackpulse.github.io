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
            'DISPLAY PORT.': '表示ポータブル',
            'CALCULATED PORT.': '算出ポータブル',
            'DISPLAYED': '表示',
            'CALCULATED': '算出',
            'SKATER': 'スケート可能',
            'TIER': '段階',
            'YES': 'はい',
            'NO': 'いいえ',
            'CLEAR': 'クリア',
            'TWEET': 'ツイートする',
            'SAVE': '保存',
            'Error': 'エラー',
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
        headPortable: {
            get: function () {
                return this.$store.state.portability.headPortable;
            },
            set: function (value) {
                this.$store.dispatch('setPortability', {key: 'headPortable', value: value})
            },
        },
        torsoPortable: {
            get: function () {
                return this.$store.state.portability.torsoPortable;
            },
            set: function (value) {
                this.$store.dispatch('setPortability', {key: 'torsoPortable', value: value})
            },
        },
        pantsPortable: {
            get: function () {
                return this.$store.state.portability.pantsPortable;
            },
            set: function (value) {
                this.$store.dispatch('setPortability', {key: 'pantsPortable', value: value})
            },
        },
        weaponPortable: {
            get: function () {
                return this.$store.state.portability.weaponPortable;
            },
            set: function (value) {
                this.$store.dispatch('setPortability', {key: 'weaponPortable', value: value})
            },
        },
        additionalRate: {
            get: function () {
                return this.$store.state.portability.additionalRate;
            },
            set: function (value) {
                this.$store.dispatch('setPortability', {key: 'additionalRate', value: value})
            },
        },
        histories: function () {
            return this.$store.state.portabilityHistories;
        },
        sum: function () {
            return this.headPortable + this.torsoPortable + this.pantsPortable + this.weaponPortable;
        },
        isValid: function () {
            if (this.additionalRate < 0) {
                return false;
            }
            if (this.headPortable < 0 || 1000 < this.headPortable) {
                return false;
            }
            if (this.torsoPortable < 0 || 1000 < this.torsoPortable) {
                return false;
            }
            if (this.pantsPortable < 0 || 1000 < this.pantsPortable) {
                return false;
            }
            if (this.weaponPortable < 0 || 1000 < this.weaponPortable) {
                return false;
            }
            return true;
        },
        portable: function () {
            if (!this.isValid) {
                return this.t('Error');
            }
            var result = this.sum;
            // 固定値???
            if (this.additionalRate === 2) {
                addition = 24;
            } else if (this.additionalRate === 5) {
                addition = 60;
            } else if (this.additionalRate === 7) {
                addition = 86;
            } else if (this.additionalRate === 10) {
                addition = 119;
            } else if (this.additionalRate === 12) {
                addition = 86 + 61;
            } else if (this.additionalRate === 17) {
                addition = 86 + 119;
            } else if (this.additionalRate === 30) {
                addition = 357;
            } else {
                addition = 1190 * (this.additionalRate / 100);
            }
            result += addition;

            console.log('addition', addition);
            console.log('portable', result);
            return Math.floor(result);
        },
        skating: function () {
            return 3311 <= this.portable;
        },
        tier: function () {
            if (this.portable < 3311) {
                return 0;
            } else if (this.portable < 3361) {
                return 1;
            } else if (this.portable < 3411) {
                return 2;
            } else if (this.portable < 3461) {
                return 3;
            } else if (this.portable < 3511) {
                return 4;
            } else if (this.portable < 3561) {
                return 5;
            }
            return 6;
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
            this.$store.dispatch('loadPortabilityHistories');
        },
        clear: function () {
            this.$store.dispatch('clearPortability');
        },
        save: function () {
            if (!this.isValid) {
                return;
            }
            this.$store.dispatch('savePortability', {
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
        },
        remove: function (uuid) {
            this.$store.dispatch('removePortability', uuid);
        },
    },
};
