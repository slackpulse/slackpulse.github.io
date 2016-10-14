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
            searchRegion: 'HEADGEAR',
            searchStar: 6,
        };
    },
    mounted: function () {
        this.$nextTick(function () {
        });
    },
    watch: {
        '$route': function (to, from) {
            if (to.name === 'equipments') {
                this.$root.title = 'Afterpulse Equipments';
                this.getEquipments();
            }
        },
    },
    computed: {
        equipments: function () {
            return this.$store.state.equipments;
        },
        filteredEquipments: function () {
            var that = this;
            return _.chain(this.equipments)
                .filter(function (equipment) {
                    var isTarget = true;
                    if ('ALL' !== that.searchRegion && that.searchRegion !== equipment.region) {
                        isTarget = false;
                    }
                    if (that.searchStar && parseInt(that.searchStar, 10) !== parseInt(equipment.star, 10)) {
                        isTarget = false;
                    }
                    return isTarget;
                })
                .value();
        },
    },
    methods: {
        getEquipments: function () {
            if (this.equipments && 0 < this.equipments.length) {
                return;
            }
            this.$store.dispatch('loadEquipments');
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
