/**
 * Login-Controller
 *
 * @module      :: Controller
 * @description :: Manages the login
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  needs: ['application'],
  i18n: Ember.inject.service(),
  queryParams: ['emailPrefill'],
  emailPrefill: null,

  /**
   * Sets identification to email-prefill if it exists and triggers the getPasswordMetaData action
   */
  emailPrefillChanged: function () {
    if(typeof(this.get('emailPrefill')) === 'string' && this.get('emailPrefill').length > 0){
      this.set('identification', this.get('emailPrefill'));
      this.send('getPasswordMetaData');
    }
  }.observes('emailPrefill'),

  /**
   * Returns a localized identification placeholder
   */
  identificationPlaceholder: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('login.body.placeholder.email');
  }),

  /**
   * Returns a localized password placeholder
   */
  passwordPlaceholder: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('login.body.placeholder.password');
  }),

  /**
   * Returns the button type depending on the password type
   */
  emailButtonType: function () {
    if(this.get('showStandardPasswordAuthentication') === true || this.get('showThingsPasswordAuthentication') === true){
      return 'button';
    }
    else{
      return 'submit';
    }
  }.property('showStandardPasswordAuthentication', 'showThingsPasswordAuthentication'),

  actions: {
    /**
     * Authenticate user through the auth-library
     * Create user if succeeded
     * Reset entered password and notify the user if the authentication failed
     * @param auth
     */
    authenticate: function(auth) {
      var credentials = (auth !== undefined) ? auth : this.getProperties('identification', 'password');
      var authenticator = 'simple-auth-authenticator:jwt';

      this.get('session').authenticate(authenticator, credentials).then(
        function () {
          Ember.get(this, 'flashMessages').clearMessages();
          this.get('controllers.application').createUser();
        }.bind(this),
        function (data) {
          Ember.get(this, 'flashMessages').clearMessages();

          var isStandardPassword =  this.get('showStandardPasswordAuthentication');
          var isThingsPassword = this.get('showThingsPasswordAuthentication');
          this.set('showStandardPasswordAuthentication', false);
          this.set('showThingsPasswordAuthentication', false);
          this.set('showStandardPasswordAuthentication', isStandardPassword);
          this.set('showThingsPasswordAuthentication', isThingsPassword);

          if(isThingsPassword === true){
            var thingsData = this.get('thingsData').copy();
            this.get('thingsData').clear();
            this.set('thingsData', thingsData);
          }

          if(data.error = 'Invalid email or password'){
            this.get('flashMessages').add({
              message: this.get('i18n').t('flash.error.login'),
              type: 'danger',
              sticky: true
            });
          }
          else{
            this.get('flashMessages').add({
              message: this.get('i18n').t('flash.error.unknown'),
              type: 'danger',
              sticky: true
            });
          }
        }.bind(this));
    },

    /**
     * Sets password
     * @param password
     */
    setPassword: function (password) {
      this.set('password', password);
    },

    /**
     * Gets password meta data from server by the entered email
     * Notifies user if it failed
     * Shows password on success
     */
    getPasswordMetaData: function () {
      var self = this;
      this.set('isProcessingInput', true);

      var email = this.get('identification');
      Ember.$.post(ENV.APP.backendURL + '/auth/getThingsData', {email: email})
        .done(function (data) {
          Ember.get(self, 'flashMessages').clearMessages();

          var isThingsPassword = data.isThingsPassword;

          self.set('showStandardPasswordAuthentication', ! isThingsPassword);
          self.set('showThingsPasswordAuthentication', isThingsPassword);
          self.set('filePath', data.filePath);

          self.set('thingsData', data.thingsData);
        })
        .fail(function (data) {
          Ember.get(self, 'flashMessages').clearMessages();
          self.set('showStandardPasswordAuthentication', false);
          self.set('showThingsPasswordAuthentication', false);

          if(data.responseJSON.error === 'User does not exist'){
            self.get('flashMessages').add({
              message: self.get('i18n').t('flash.error.email'),
              type: 'danger',
              sticky: true
            });
          }
          else{
            self.get('flashMessages').add({
              message: self.get('i18n').t('flash.error.unknown'),
              type: 'danger',
              sticky: true
            });
          }
        })
        .always(function () {
          self.set('isProcessingInput', false);
        });
    }
  }
});
