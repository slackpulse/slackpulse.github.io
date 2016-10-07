var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {
    locales: {
        'ja': {
            'EQUIPMENTS': '装備データ',
            'POSITION': '部位',
            'GRADE': '星',
            'HEAD': '頭',
            'HEADGEAR': 'ヘッドギア',
            'TORSO': '胴体',
            'LEG': '脚',
            'ALL': '全て',
        },
    },
    template: require('./template.html'),
    data: function () {
        return {
            equipments: [],
            searchRegion: 'HEADGEAR',
            searchStar: 6,
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getEquipments();
        });
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
            if (!this.$root.remoteService) {
                return [];
            }
            this.$root.remoteService.getEquipments()
                .tap(function (data) {
                    that.equipments = data;
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
