'use strict';

var Promise = require('bluebird');
var firebase = require('firebase');

function RemoteService() {
    var that = this;
    this.app = firebase.initializeApp(AppConfig.firebase);
    this.provider = new firebase.auth.TwitterAuthProvider();
    this.user = null;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            that.user = user;
        } else {
            that.user = null;
        }
    });
}

RemoteService.prototype.signInWithTwitter = function signInWithTwitter() {
    var that = this;
    console.log('signInWithTwitter');
    return firebase.auth().signInWithRedirect(this.provider)
        .then(function (result) {
            console.log('signInWithTwitter: ', result);
            return Promise.resolve(result);
        })
        .catch(function (error) {
            console.error('signInWithTwitter error: ', error);
            return Promise.resolve();
        });
};

RemoteService.prototype.signOut = function () {
    var that = this;
    firebase.auth().signOut()
        .then(function () {
            console.log('signOut');
            that.user = null;
        }, function (error) {
            console.error('signOut error: ', error);
        });
};

RemoteService.prototype.getEquipments = function getEquipments() {
    var that = this;
    console.log('getEquipments');
    firebase.database().goOnline();
    var equipmentsRef = firebase.database().ref('equipments');
    return new Promise(function (resolve) {
        equipmentsRef.once('value')
            .then(function (dataSnapshot) {
                return Promise.resolve(dataSnapshot.val());
            })
            .then(function (data) {
                firebase.database().goOffline();
                resolve(data);
                return Promise.resolve(data);
            }, function () {
                firebase.database().goOffline();
                return Promise.resolve();
            });
    });
};

module.exports = RemoteService;
