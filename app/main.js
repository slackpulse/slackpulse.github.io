var Vue = require('vue');

global.jQuery = require('jquery');

require('materialize-css/dist/css/materialize.css');
require('materialize-css/dist/js/materialize.js');

var RemoteService = require('./remote-service');

function materializeInit() {
    jQuery('.button-collapse').sideNav({
        closeOnClick: true,
    });
    jQuery('select').material_select();
    jQuery('.dropdown-button').dropdown();
    jQuery('.modal-trigger').leanModal();
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
    data: function () {
        return {
            remoteService: null,
        };
    },
    computed: {
        isLoggedIn: function () {
            return this.remoteService && this.remoteService.user;
        },
        avatar: function () {
            if (!this.isLoggedIn) {
                return null;
            }
            return this.remoteService.user.photoURL;
        },
        name: function () {
            if (!this.isLoggedIn) {
                return null;
            }
            return this.remoteService.user.displayName;
        },
    },
    ready: function () {
        this.remoteService = new RemoteService();
        setTimeout(function () {
            materializeInit();
        }, 1000);

        jQuery(document).on('click', '.drag-target', function () {
            jQuery('[id^=sidenav-overlay]').remove();
        });
    },
    methods: {
        onClickNav: function (name) {
            this.$route.router.go({name: name});
            jQuery('[id^=sidenav-overlay]').remove();
            return true;
        },
        signIn: function () {
            jQuery('[id^=sidenav-overlay]').remove();
            this.remoteService.signInWithTwitter();
        },
        signOut: function () {
            jQuery('[id^=sidenav-overlay]').remove();
            this.remoteService.signOut();
        },
    }
};

var router = require('./router.js');
router(app);
