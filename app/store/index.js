var _ = require('lodash');

var RemoteService = require('../remote-service');

var Vue = require('vue');

var state = {
    remoteService: null,
    equipments: [],
    portability: {
        headPortable: 952,
        torsoPortable: 880,
        pantsPortable: 928,
        weaponPortable: 660,
        additionalRate: 0,
    },
    portabilityHistories: [],
    xp: {
        currentLevel: 1,
        mixRank: 3,
        targetLevel: 30,
        money: 1000000,
    },
};

var types = {
    REMOTESERVICE_INIT: 'REMOTESERVICE_INIT',
    XP_SET_MONEY: 'XP_SET_MONEY',
    XP_SET_VALUES: 'XP_SET_VALUES',
    PORTABILITY_SET_VALUES: 'PORTABILITY_SET_VALUES',
    PORTABILITY_SAVE: 'PORTABILITY_SAVE',
    EQUIPMENTS_LOAD: 'EQUIPMENTS_LOAD',
};

var actions = {
    setMoney: function (context, value) {
        var moneyAsNumber = parseInt((value + '').replace(/,/g, ''), 10);
        context.commit(types.XP_SET_MONEY, moneyAsNumber)
    },
    setXPParams: function (context, payload) {
        var parsed = payload.value ? parseInt(payload.value, 10) : 0;
        context.commit(types.XP_SET_VALUES, {
            key: payload.key,
            value: parsed
        })
    },
    setPortability: function (context, payload) {
        var parsed = payload.value ? parseInt(payload.value, 10) : 0;
        context.commit(types.PORTABILITY_SET_VALUES, {
            key: payload.key,
            value: parsed
        })
    },
    loadPortabilityHistories: function (context) {
        var stored = window.localStorage.getItem('histories');
        context.commit(types.PORTABILITY_SAVE, stored ? JSON.parse(stored) : []);
    },
    savePortability: function (context, value) {
        var histories = _.cloneDeep(context.state.portabilityHistories);
        histories.push(value);
        histories = _.uniqBy(histories, function (record) {
            var key = record.headPortable + '';
            key += record.torsoPortable;
            key += record.pantsPortable;
            key += record.weaponPortable;
            key += record.additionalRate;
            return key;
        });
        window.localStorage.setItem('histories', JSON.stringify(histories));
        if (_.isFunction(ga)) {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Portable',
                eventAction: 'Save',
                eventLabel: JSON.stringify(value),
                eventValue: 1,
            });
        }
        context.commit(types.PORTABILITY_SAVE, histories);
    },
    removePortability: function (context, uuid) {
        var histories = _.cloneDeep(context.state.portabilityHistories);
        histories = _.reject(histories, {
            uuid: uuid
        });
        window.localStorage.setItem('histories', JSON.stringify(histories));
        context.commit(types.PORTABILITY_SAVE, histories);
    },
    clearPortability: function (context) {
        window.localStorage.setItem('histories', JSON.stringify([]));
        context.commit(types.PORTABILITY_SAVE, []);
    },
    createRemoteService: function (context) {
        context.commit(types.REMOTESERVICE_INIT, new RemoteService());
    },
    loadEquipments: function (context) {
        if (!context.state.remoteService) {
            return [];
        }
        context.state.remoteService.getEquipments()
            .tap(function (data) {
                context.commit(types.EQUIPMENTS_LOAD, data);
            });
    },
};

var mutations = {
    XP_SET_MONEY: function (state, value) {
        state.xp.money = 0;
        if (value < 0) {
            value = 0;
        }
        if (999999999 < value) {
            value = 999999999;
        }
        state.xp.money = value;
    },
    PORTABILITY_SET_VALUES: function (state, params) {
        state.portability[params.key] = 0; // 一旦リセットする
        var value = params.value;
        if (/Portable$/.test(params.key)) {
            if (params.value < 0) {
                value = 0;
            }
            if (1000 < params.value) {
                value = 1000;
            }
        }
        state.portability[params.key] = value;
    },
    PORTABILITY_SAVE: function (state, histories) {
        state.portabilityHistories.splice(0, state.portabilityHistories.length);
        state.portabilityHistories = state.portabilityHistories.concat(histories);
    },
    XP_SET_VALUES: function (state, params) {
        state.xp[params.key] = 0; // 一旦リセットする
        var value = params.value;
        if (params.key === 'currentLevel' || params.key === 'targetLevel') {
            if (params.value < 0) {
                value = 0;
            }
            if (40 < params.value) {
                value = 40;
            }
        }
        state.xp[params.key] = value;
    },
    REMOTESERVICE_INIT: function (state, service) {
        state.remoteService = service;
        console.log(state);
    },
    EQUIPMENTS_LOAD: function (state, equipments) {
        state.equipments = equipments;
    },
};

var getters = {
};

module.exports = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
};
