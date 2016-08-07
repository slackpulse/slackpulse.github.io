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

function Twttr(d, s, id) {
    console.log('Initialize Twitter');
    var js,
        fjs = d.getElementsByTagName(s)[0],
        t = global.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };
    return t;
}
global.twttr = global.twttr || new Twttr(document, 'script', 'twitter-wjs');

var app = {
    el: function () {
        return 'body';
    },
    ready: function () {
    },
}

router(app);
