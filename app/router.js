'use strict';

var _ = require('lodash');
var VueRouter = require('vue-router').default;

var Portable = require('./views/portable');
var Xp = require('./views/xp');
var Equipment = require('./views/equipment');

var routerConfig = {
    mode: 'hash',
    routes: [
        {
            path: '/portable',
            component: Portable,
            name: 'portable',
            alias: '/',
        },
        {
            path: '/xp',
            component: Xp,
            name: 'xp',
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
};
var router = new VueRouter(routerConfig);

router.beforeEach(function (to, from, next) {
    if (_.isFunction(ga)) {
        ga('send', {
            hitType: 'event',
            eventCategory: 'View',
            eventAction: 'Show',
            eventLabel: to.name,
            eventValue: 1,
        });
    }
    next();
});

module.exports = router;
