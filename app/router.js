'use strict';

var _ = require('lodash');
var VueRouter = require('vue-router');

var Portable = require('./views/portable');
var Xp = require('./views/xp');
var Equipment = require('./views/equipment');

var routeConfig = {
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
            path: '/equipments',
            component: Equipment,
            name: 'equipments',
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
};
var router = new VueRouter(routerConfig);

module.exports = router;
