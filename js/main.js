var app = new Vue({
    el: 'body',
    data: {
        headPortable: 1000,
        torsoPortable: 880,
        pantsPortable: 871,
        weaponPortable: 520,
        additionalRate: 5,
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
            if (this.additionalRate) {
                return 3315 <= this.portable ? 'はい' : 'いいえ';
            }
            return 3311 <= this.portable ? 'はい' : 'いいえ';
        },
    },
});

(function (b, o, i, l, e, r) {
    b.GoogleAnalyticsObject = l;
    b[l] || (b[l] = function () {
        (b[l].q = b[l].q || []).push(arguments)
    });
    b[l].l = +new Date;
    e = o.createElement(i);
    r = o.getElementsByTagName(i)[0];
    e.src = 'https://www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e, r)
}(window, document, 'script', 'ga'));
ga('create', 'UA-80136739-1', 'auto');
ga('send', 'pageview');
