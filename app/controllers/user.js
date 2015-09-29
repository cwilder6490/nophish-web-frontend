/**
 * User-Controller
 *
 * @module      :: Controller
 * @description :: Manages the user singleton
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.ObjectController.extend({
  /**
   * Updates the localization
   */
  addressFormalChanged: function () {
    if(this.get('addressFormal') === true){
      this.set('i18n.locale', 'de');
    }
    else{
      this.set('i18n.locale', 'de-informal');
    }
  }.observes('model.addressFormal'),

  actions: {
    /**
     * Creates new user singleton and replaces the old one
     * @param obj
     * @param defer
     */
    createUser: function (obj, defer) {
      if (this.get('model') !== undefined && this.get('model') !== null) {
        this.send('removeUser');
      }

      let user = this.get('store').createRecord('user', obj);
      this.set('model', user);
      this.send('updateLocalStorage', obj);
      defer.resolve();
    },

    /**
     * Destroys user singleton
     */
    removeUser: function () {
      this.get('model').deleteRecord();
      this.set('model', null);
    },

    /**
     * Persists the skipped pre test and updates the user singleton
     * @param defer
     */
    skippedPreTest: function (defer) {
      var self = this;
      Ember.$.post(ENV.APP.backendURL + '/user/skippedPreTest', {})
        .done(function (data) {
          self.send('createUser', data[0], defer);
        })
        .fail(function (data) {
          defer.reject(data);
        });
    },

    /**
     * Persists the did pre test and updates the user singleton
     * @param defer
     */
    didPreTest: function (defer) {
      var self = this;
      Ember.$.post(ENV.APP.backendURL + '/user/didPreTest', {})
        .done(function (data) {
          self.send('createUser', data[0], defer);
        })
        .fail(function (data) {
          defer.reject(data);
        });
    },

    /**
     * Persists the did post test and updates the user singleton
     * @param defer
     */
    didPostTest: function (defer) {
      var self = this;
      Ember.$.post(ENV.APP.backendURL + '/user/didPostTest', {})
        .done(function (data) {
          self.send('createUser', data[0], defer);
        })
        .fail(function (data) {
          defer.reject(data);
        });
    },

    /**
     * Persists the did retention test and updates the user singleton
     * @param defer
     */
    didRetentionTest: function (defer) {
      var self = this;
      Ember.$.post(ENV.APP.backendURL + '/user/didRetentionTest', {})
        .done(function (data) {
          self.send('createUser', data[0], defer);
        })
        .fail(function (data) {
          defer.reject(data);
        });
    },

    /**
     * Persists user singleton to the local storage
     * @param obj
     */
    updateLocalStorage: function (obj) {
      if(obj.constructor === Array){
        obj = obj[0];
      }

      var session = JSON.parse(localStorage['ember_simple_auth:session']);
      session.secure.user = obj;
      localStorage['ember_simple_auth:session'] = JSON.stringify(session);
    }
  }
});
