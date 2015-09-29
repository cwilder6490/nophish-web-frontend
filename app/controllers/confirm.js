/**
 * Confirm-Controller
 *
 * @module      :: Controller
 * @description :: Manages account confirmation
 */


import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  needs: ['application'],

  actions: {
    /**
     * Passes token to backend and validates user if token is valid
     * @param token
     */
    confirmEmail: function (token) {
      var self = this;

      Ember.$.post(ENV.APP.backendURL + '/user/confirmEmail', {token: token})
        .done(function (data) {
          var defer = Ember.RSVP.defer();

            defer.promise.then(function(){
              self.transitionTo('dashboard').then(function () {
                Ember.get(self, 'flashMessages').clearMessages();
                self.get('flashMessages').add({
                  message: 'E-Mail erfolgreich bestätigt!',
                  type: 'success',
                  sticky: true
                });
              });
            },
            function(){
               alert('Bestätigungs-Link nicht mehr valide oder bereits bestätigt.');
            });

          self.get('controllers.application.userController').send('createUser', data, defer);
        })
        .fail(function (data) {
          alert(data);
        });
    }
  }
});
