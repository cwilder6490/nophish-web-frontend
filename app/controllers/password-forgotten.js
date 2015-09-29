/**
 * Password-Forgotten-Controller
 *
 * @module      :: Controller
 * @description :: Manages the password forgotten process
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  needs: ['application'],
  i18n: Ember.inject.service(),
  queryParams: ['emailPrefill'],
  emailPrefill: null,

  /**
   * Sets identification to email-prefill if it exists
   */
  emailPrefillChanged: function () {
    if(typeof(this.get('emailPrefill')) === 'string' && this.get('emailPrefill').length > 0){
      this.set('identification', this.get('emailPrefill'));
    }
  }.observes('emailPrefill'),

  /**
   * Returns a localized identification placeholder
   */
  identificationPlaceholder: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('login.body.placeholder.email');
  }),

  actions: {
    /**
     * Requests a password reset from the server
     * Notifies the user on success or failure
     */
    resetPassword: function () {
      let email = this.get('identification');
      this.set('isProcessingInput', true);
      Ember.$.post(ENV.APP.backendURL + '/auth/requestPasswordReset', {email: email}).done(function (data) {
        if(data.success === true){
          this.get('flashMessages').add({
            message: 'Die E-Mail wird in Kürze verschickt. Sie können dieses Fenter nun schließen.',
            type: 'success',
            sticky: true
          });
        }
        else{
          this.get('flashMessages').add({
            message: 'Die angegebene E-Mail ist nicht registriert',
            type: 'danger',
            sticky: false
          });
        }
      }.bind(this))
      .fail(function (data) {
          console.log(data);
          this.get('flashMessages').add({
            message: this.get('i18n').t('flash.error.unknown'),
            type: 'danger',
            sticky: false
          });
      }.bind(this))
      .always(function () {
        this.set('isProcessingInput', false);
      }.bind(this));
    }
  }
});
