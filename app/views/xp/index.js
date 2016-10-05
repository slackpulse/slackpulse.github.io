var _ = require('lodash');

var EXP_PER_WAPON = 350;

var REQUIRED_RANK_ONE = [
    0,
    2,
    3,
    4,
    6,
    9,
    12,
    15,
    20,
    26,
    33,
    42,
    53,
    66,
    82,
    101,
    123,
    150,
    181,
    218,
    262,
    313,
    372,
    440,
    520,
    614,
    722,
    846,
    988,
    1154,
    1345,
    1564,
    1813,
    2099,
    2428,
    2806,
    3235,
    3724,
    4281,
    4913,
];

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            money: 1000000,
            currentLevel: 1,
            targetLevel: 30,
        };
    },
    ready: function () {},
    computed: {
        weaponCount: function () {
            return parseInt(this.money / 4500, 10);
        },
        levelResult: function () {
            var that = this;
            var currentValue = REQUIRED_RANK_ONE[this.currentLevel - 1];
            var foundIndex = _.findIndex(REQUIRED_RANK_ONE, function (value, index) {
                return that.weaponCount < value - currentValue;
            });

            if (foundIndex && 0 < foundIndex) {
                return foundIndex;
            }
            return 40;
        },
        moneyResult: function () {
            var that = this;
            var targetValue = REQUIRED_RANK_ONE[this.targetLevel - 1];
            var currentValue = REQUIRED_RANK_ONE[this.currentLevel - 1];
            return parseInt((targetValue - currentValue) * 4500, 10);
        },
    },
};
