String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

String.prototype.commify = function () {
    var num = parseInt(this, 10);
    return num.commify();
}

Number.prototype.commify = function () {
    var str = this.toString();
    str = str.reverse();
    str = str.replace(/(\d\d\d)(?=\d)(?!\d*\.)/g, '$1,');
    str = str.reverse();
    return str;
};

function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) {
        strong = myStrong;
    }
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
}

Vue.filter('commify', function (value) {
    return value ? value.commify() : '';
});

var app = new Vue({
    el: '#app',
    data: function () {
        return {
            headPortable: 1000,
            torsoPortable: 880,
            pantsPortable: 871,
            weaponPortable: 520,
            additionalRate: 5,
            histories: [],
        };
    },
    ready: function () {
        this.loadHistories();
    },
    computed: {
        sum: function () {
            return parseInt(this.headPortable, 10) + parseInt(this.torsoPortable, 10) + parseInt(this.pantsPortable, 10) + parseInt(this.weaponPortable, 10);
        },
        pantsAddition: function () {
            return parseInt(this.pantsPortable) * parseInt(this.additionalRate, 10) / 100;
        },
        pantsAdditionWithoutOnesPlace: function () {
            return Math.floor(this.pantsAddition / 10) * 10;
        },
        pantsAdditionOnesPlace: function () {
            return this.pantsAddition % 10;
        },
        weaponAddition: function () {
            return parseInt(this.weaponPortable, 10) * parseInt(this.additionalRate, 10) / 100;
        },
        weaponAdditionWithoutOnesPlace: function () {
            return Math.floor(this.weaponAddition / 10) * 10;
        },
        weaponAdditionOnesPlace: function () {
            return this.weaponAddition % 10;
        },
        isValid: function () {
            return this.headPortable && this.torsoPortable && this.pantsPortable && this.weaponPortable;
        },
        portable: function () {
            if (!this.isValid) {
                return '計算不可';
            }

            var result = this.sum + this.pantsAdditionWithoutOnesPlace + this.weaponAdditionWithoutOnesPlace;

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
            if (this.additionalRate && 0 < parseInt(this.additionalRate, 10)) {
                return 3315 <= this.portable;
            }
            return 3311 <= this.portable;
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
});
