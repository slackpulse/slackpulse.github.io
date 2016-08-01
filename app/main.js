var Vue = require('vue');
var jQuery = require('jquery');

var router = require('./router.js');

global.jQuery = jQuery;
global.$ = global.jQuery;

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
}

router(app);
