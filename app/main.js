var Vue = require('vue');

global.jQuery = require('jquery');

require('materialize-css/dist/css/materialize.css');
require('materialize-css/dist/js/materialize.js');

function materializeInit() {
    jQuery('.button-collapse').sideNav({
        closeOnClick: true,
    });
    jQuery('select').material_select();
}

jQuery(document).ready(function () {});


String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

String.prototype.commify = function () {
    var num = parseInt(this, 10);
    return num.commify();
};

Number.prototype.commify = function () {
    var str = this.toString();
    str = str.reverse();
    str = str.replace(/(\d\d\d)(?=\d)(?!\d*\.)/g, '$1,');
    str = str.reverse();
    return str;
};

Vue.filter('commify', function (value) {
    return value ? value.commify() : '';
});

var app = {
    el: function () {
        return 'body';
    },
    ready: function () {
        setTimeout(function () {
            materializeInit();
        }, 1000);
    },
    methods: {
        onClickNav: function (name) {
            this.$route.router.go({name: name});
            jQuery('[id^=sidenav-overlay]').remove();
            return true;
        },
    }
};

var router = require('./router.js');
router(app);
