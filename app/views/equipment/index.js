var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            equipments: [],
            searchRegion: 'HEADGEAR',
            searchStar: 6,
        };
    },
    route: {
        data: function (transition) {
            transition.next();
        },
    },
    ready: function () {
        this.getEquipments();
    },
    computed: {
        filteredEquipments: function () {
            var that = this;
            return _.chain(this.equipments)
                .filter(function (equipment) {
                    var isTarget = true;
                    if ('ALL' !== that.searchRegion && that.searchRegion !== equipment.region) {
                        isTarget = false;
                    }
                    if (that.searchStar && that.searchStar !== equipment.star) {
                        isTarget = false;
                    }
                    return isTarget;
                })
                .value();
        },
    },
    methods: {
        getEquipments: function () {
            var that = this;
            this.$root.remoteService.getEquipments()
                .tap(function (data) {
                    that.$set('equipments', data);
                    console.log(that.equipments);
                });
        },
    },
    filters: {
        regionFilter: function (value) {
            if (value === 'HEADGEAR') {
                return 'ヘッドギア';
            }
            if (value === 'TORSO') {
                return '胴';
            }
            if (value === 'LEGS') {
                return '脚';
            }
            return '';
        },
    },
};
