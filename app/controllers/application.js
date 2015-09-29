/**
 * Application-Controller
 *
 * @module      :: Controller
 * @description :: Manages global stuff
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  needs: ['user'],

  /**
   * Returns the user controller
   */
  userController: function () {
    return this.get('controllers.user');
  }.property('controllers.user'),

  /**
   * Returns the user singleton
   */
  user: function () {
    return this.get('userController.model');
  }.property('userController.model.@each'),

  /**
   * Creates user from data retrieved from backend
   */
  createUser: function () {
    let user = this.get('session.secure.user');
    if(user !== undefined){
      let defer = Ember.RSVP.defer();

      defer.promise.then(function(){
          this.get('target').send('onUserCreated');
        }.bind(this),
        function(){

        });

      let deferInitial = Ember.RSVP.defer();
      deferInitial.promise.then(function(){
          Ember.$.post(ENV.APP.backendURL + '/user/get')
            .done(function (user) {
              if(user === undefined){
                this.send('logout');
                return;
              }
              this.get('userController').send('createUser', user, defer);
            }.bind(this))
            .fail(function (err) {
              this.get('flashMessages').danger('Es ist ein Fehler aufgetreten');
              console.log(err);
            }.bind(this));
        }.bind(this),
        function(){

        });

      this.get('userController').send('createUser', user, deferInitial);
    }
  },

  /**
   * Initializes application
   * @returns {*}
   */
  init: function() {
    this.createUser();
    Ember.$('body').tooltip({
      selector: '[rel=tooltip]'
    });
    return this._super();
  },

  actions: {
    /**
     * Invalidates json web token and logs out user
     */
    logout: function(){
      var self = this;
      Ember.$.post(ENV.APP.backendURL + '/auth/logout')
      .done(function () {
          self.get('session').invalidate().then(
            function () {
              self.get('userController').send('removeUser');
              self.transitionTo('index');
              self.get('flashMessages').success('Erfolgreich ausgeloggt!');
            },
            function (data) {
              console.log(data);
            });

        })
      .fail(function () {
          self.get('flashMessages').danger('Es ist ein Fehler aufgetreten');
        });
    }
  }
});
