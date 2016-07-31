'use strict';

var _ = require('lodash');
var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);

var Portable = require('./views/portable');
var Xp = require('./views/xp');

module.exports = function (app) {
    var App = Vue.extend(app);
    var router = new VueRouter({
        mode: 'html5',
        hashbang: true,
        history: false,
        linkActiveClass: 'v-link-active',
        saveScrollPosition: false,
        suppressTransitionError: true,
    });

    router.map({
        '/portable': {
            component: Portable,
            name: 'portable',
        },
        '/xp': {
            component: Xp,
            name: 'xp',
        },
        '*': {
            component: Portable,
            name: 'portable',
        },
    });

    router.alias({
        '/': '/portable',
    });

    router.start(App, 'body');
};
