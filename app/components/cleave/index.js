'use strict';

var _ = require('lodash');
var Cleave = require('cleave.js');

module.exports = {
    props: ['state-key', 'setter', 'type', 'options'],
    template: require('./template.html'),
    data: function () {
        return {
            cleave: null,
        };
    },
    mounted: function () {
        this.cleave = new Cleave(this.$el, this.options);
    },
    beforeDestroy: function () {
        this.cleave.destroy();
        this.cleave = null;
    },
    computed: {
        value: {
            get: function () {
                return _.get(this.$store.state, this.stateKey, null);
            },
            set: function (value) {
                this.$store.dispatch(this.setter, value);
            },
        },
    },
};
