var Vue = require('vue');

window.jQuery = window.$ = require('jquery');

require('materialize-css/dist/css/materialize.css');
require('materialize-css/dist/js/materialize.js');

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

String.prototype.commify = function () {
    var num = parseInt(this, 10);
    return num.commify();
}

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
        this.$nextTick(function () {
            jQuery('.button-collapse').sideNav({
                closeOnClick: true,
            });
            jQuery('#portability-addition').material_select();
        });
    },
};

var router = require('./router.js');
router(app);
