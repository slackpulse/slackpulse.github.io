var Vue = require('vue');
var Vuex = require('vuex').default;
var VueHead = require('vue-head');
var VueRouter = require('vue-router').default;
var VueTranslate = require('vue-translate-plugin');

Vue.use(Vuex);
Vue.use(VueHead);
Vue.use(VueRouter);
Vue.use(VueTranslate);

global.jQuery = require('jquery');

require('materialize-css/dist/css/materialize.css');
require('materialize-css/dist/js/materialize.js');

function materializeInit() {
    console.log('materializeInit');
    jQuery('.button-collapse').sideNav({
        closeOnClick: true,
    });
    jQuery('select').material_select();
    jQuery('.dropdown-button').dropdown();
    //jQuery('.modal-trigger').leanModal();
}

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

var storeOptions = require('./store');
var store = new Vuex.Store(storeOptions);

var app = {
    store: store,
    locales: {
        'ja': {
            'PORTABILITY': 'ポータブル',
            'XP': 'XP',
            'EQUIPMENTS': '装備',
            'PORTABILITY CALCULATOR': 'ポータブル計算機',
            'LOGIN': 'ログイン',
            'LOGOUT': 'ログアウト',
            'LOGGED IN': 'ログインしました',
            'SELECT LANGUAGE': '言語を選択してください',
            'LANGUAGE': '言語',
            'English': 'English',
            'Japanese': '日本語',
        },
    },
    template: `
      <div id="app">
        <ul id="dropdown1" class="dropdown-content">
          <li v-on:click="signOut"><a href="#!" v-translate>LOGOUT</a>
          </li>
        </ul>

        <div class="navbar-fixed">
          <nav>
            <div class="nav-wrapper blue darken-4">
              <a href="#!" class="brand-logo">slackpulse</a>
              <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
              <ul class="right hide-on-med-and-down">
                <li><a v-on:click="onClickNav('portable')" v-translate>PORTABILITY</a></li>
                <li><a v-on:click="onClickNav('xp')" v-translate>XP</a></li>
                <li v-show="isLoggedIn" class="login avatar">
                  <a class="dropdown-button" href="#!" data-activates="dropdown1" data-hover="true">
                    <img v-show="isLoggedIn" v-bind:src="avatar" alt="" class="circle responsive-img" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div class="nav-wrapper blue darken-4">
          <ul class="side-nav" id="slide-out">
            <li v-show="isLoggedIn" class="login avatar">
              <img v-if="isLoggedIn" v-bind:src="avatar" alt="" class="circle responsive-img" /><span class="name">{{name}}</span>
            </li>
            <li><a v-on:click="onClickNav('portable')" v-translate>PORTABILITY</a></li>
            <li><a v-on:click="onClickNav('xp')" v-translate>XP</a></li>
          </ul>
        </div>

        <div class="container">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>

        <div class="container">
          <div class="row">
            <div class="col s10 offset-s1">
              <a class="twitter-timeline" href="https://twitter.com/hashtag/%E3%82%A2%E3%83%95%E3%83%91%E3%83%AB%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%96%E3%83%AB%E8%A8%88%E7%AE%97%E6%A9%9F" data-widget-id="776004655662796800">#アフパルポータブル計算機 のツイート</a>
            </div>
          </div>
        </div>

        <div id="loggedin-modal" class="modal">
          <div class="modal-content">
            <h4 v-translate>LOGGED IN</h4>
            <p></p>
          </div>
          <div class="modal-footer">
            <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="input-field col s6 offset-s6 m3 offset-m9">
              <select v-model="lang" v-on:change="onChangeLang" class="browser-default">
                <option value="ja" v-translate>Japanese</option>
                <option value="en" v-translate>English</option>
              </select>
            </div>
          </div>
        </div>

        <footer class="page-footer blue darken-3 ">
          <div class="footer-copyright blue darken-4 ">
            <div class="container ">
              &copy; slackpulse 2016
            </div>
          </div>
        </footer>
      </div>
    `,
    data: function () {
        return {
            title: '',
            lang: null,
        };
    },
    head: {
        title: function () {
            return {
                inner: this.title,
                complement: 'slackpulse',
            };
        },
        link: [
            {
                rel: 'icon',
                href: 'images/icon-16.png',
                sizes: '16x16',
                type: 'image/png'
            },
            {
                rel: 'icon',
                href: 'images/icon-32.png',
                sizes: '32x32',
                type: 'image/png'
            },
        ],
    },
    computed: {
        remoteService: function () {
            return this.$store.state.remoteService;
        },
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
    mounted: function () {
        this.$nextTick(function () {
            materializeInit();
            jQuery(document).on('click', '.drag-target', function () {
                jQuery('[id^=sidenav-overlay]').remove();
            });
            this.$store.dispatch('createRemoteService');
            this.setLanguage();
            document.title = 'Afterpulse Calculator | slackpulse';
        });
    },
    watch: {
        title: function (newValue, oldValue) {
            document.title = newValue + ' | ' + 'slackpulse';
        },
    },
    methods: {
        onChangeLang: function () {
            console.log('onChangeLang');
            if (this.lang) {
                window.localStorage.setItem('lang', JSON.stringify(this.lang));
                this.setLanguage(this.lang);
            }
        },
        setLanguage: function (value) {
            var lang = 'en';
            if (value) {
                lang = value;
            } else {
                var savedLang = window.localStorage.getItem('lang');
                if (savedLang) {
                    try {
                        lang = JSON.parse(savedLang);
                    } catch (error) {
                        console.warn(error);
                    }
                } else {
                    var userLang = navigator.language || navigator.userLanguage;
                    console.log('User Lang:', userLang);
                    if (/^ja(?:[_]|$)/.test(userLang)) {
                        lang = 'ja';
                    }
                }
            }
            this.lang = lang;
            console.log('setLang', lang);
            this.$translate.setLang(lang);
        },
        onClickNav: function (name) {
            this.$router.push({
                name: name
            });
            jQuery('[id^=sidenav-overlay]').remove();
        },
        signIn: function () {
            jQuery('[id^=sidenav-overlay]').remove();
            this.remoteService.signInWithTwitter();
        },
        signOut: function () {
            jQuery('[id^=sidenav-overlay]').remove();
            this.remoteService.signOut();
        },
    },
    router: require('./router'),
};

global.eventHub = new Vue(app).$mount('#app');
