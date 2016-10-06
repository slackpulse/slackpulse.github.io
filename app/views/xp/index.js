var _ = require('lodash');

var DRAW_COST = 4000;
var XP_PER_WEAPON_1 = 350;
var XP_PER_WEAPON_2 = 800;
var XP_PER_WEAPON_3 = 1750;
var FUSION_COST_PER_WEAPON_1 = 500;
var FUSION_COST_PER_WEAPON_2 = 800;
var FUSION_COST_PER_WEAPON_3 = 1300;
var PROBABILITY_DRAW_RANK_1 = 82.25;
var PROBABILITY_DRAW_RANK_2 = 12.5;
var PROBABILITY_DRAW_RANK_3 = 5.25;

var REQUIRED_XP = [
    0,
    379,
    834,
    1385,
    2057,
    2884,
    3910,
    5192,
    6808,
    8861,
    11489,
    14625,
    18388,
    22929,
    28439,
    35162,
    43028,
    52270,
    63176,
    76100,
    91480,
    109259,
    129883,
    153889,
    181928,
    214790,
    252472,
    295807,
    345787,
    403597,
    470657,
    547105,
    634474,
    734575,
    849548,
    981931,
    1132186,
    1303326,
    1498169,
    1719315,
];

var p1 = (PROBABILITY_DRAW_RANK_1 / 100);
var p2 = (PROBABILITY_DRAW_RANK_2 / 100);
var p3 = (PROBABILITY_DRAW_RANK_3 / 100);

var expXp1 = p1 * XP_PER_WEAPON_1;
var expXp2 = p2 * XP_PER_WEAPON_2;
var expXp3 = p3 * XP_PER_WEAPON_3;

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            money: 1000000,
            currentLevel: 1,
            targetLevel: 30,
            mixRank: '3',
        };
    },
    computed: {
        expectedXp: function () {
            var result = 0;
            if (this.mixRank === '1') {
                result = expXp1 / (DRAW_COST + FUSION_COST_PER_WEAPON_1);
            }
            if (this.mixRank === '2') {
                result = expXp1 / (DRAW_COST + FUSION_COST_PER_WEAPON_1) +
                    expXp2 / (DRAW_COST + FUSION_COST_PER_WEAPON_2);
            }
            if (this.mixRank === '3') {
                result = expXp1 / (DRAW_COST + FUSION_COST_PER_WEAPON_1) +
                    expXp2 / (DRAW_COST + FUSION_COST_PER_WEAPON_2) +
                    expXp3 / (DRAW_COST + FUSION_COST_PER_WEAPON_3);
            }
            return result * parseInt(this.money, 10);
        },
        expectedMoney: function () {
            var result = 0;
            if (this.mixRank === '1') {
                result = (DRAW_COST + FUSION_COST_PER_WEAPON_1) / (p1 * XP_PER_WEAPON_1);
            }
            if (this.mixRank === '2') {
                result = (p1 * (DRAW_COST + FUSION_COST_PER_WEAPON_1) +
                    p2 * (DRAW_COST + FUSION_COST_PER_WEAPON_2)) /
                    (p1 * XP_PER_WEAPON_1 + p2 * XP_PER_WEAPON_2);
            }
            if (this.mixRank === '3') {
                result = (p1 * (DRAW_COST + FUSION_COST_PER_WEAPON_1) +
                    p2 * (DRAW_COST + FUSION_COST_PER_WEAPON_2) +
                    p3 * (DRAW_COST + FUSION_COST_PER_WEAPON_3)) /
                    (p1 * XP_PER_WEAPON_1 + p2 * XP_PER_WEAPON_2 + p3 * XP_PER_WEAPON_3);
            }
            console.log('expectedMoney', result);
            return result;
        },
        levelResult: function () {
            var that = this;
            var currentValue = REQUIRED_XP[this.currentLevel - 1];
            var foundIndex = _.findIndex(REQUIRED_XP, function (value, index) {
                return that.expectedXp <= value - currentValue;
            });
            if (_.sum(REQUIRED_XP) < that.expectedXp) {
                return 40;
            }
            if (foundIndex && 0 < foundIndex) {
                return foundIndex;
            }
            if (that.expectedXp <= _.last(REQUIRED_XP)) {
                return this.currentLevel;
            }
            return 40;
        },
        moneyResult: function () {
            var targetValue = REQUIRED_XP[this.targetLevel - 1];
            var currentValue = REQUIRED_XP[this.currentLevel - 1];

            if (parseInt(this.targetLevel, 10) < parseInt(this.currentLevel, 10)) {
                return 0;
            }
            if (40 < parseInt(this.targetLevel, 10)) {
                return 0;
            }
            return Math.floor((targetValue - currentValue) * this.expectedMoney);
        },
    },
};
