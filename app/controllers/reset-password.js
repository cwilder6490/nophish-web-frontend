/**
 * Reset-Password-Controller
 *
 * @module      :: Controller
 * @description :: Manages the password reset process
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  needs: ['application'],

  /**
   * Returns a localized identification placeholder
   */
  identificationPlaceholder: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('login.body.placeholder.email');
  }),

  actions: {
    /**
     * Validates email and token and notifies the user about success or failure
     */
    resetPassword: function () {
      let email = this.get('identification');
      this.set('isProcessingInput', true);
      Ember.$.post(ENV.APP.backendURL + '/auth/resetPassword', {email: email, token: this.get('token')}).done(function (data) {
        if(data.success === true){
          this.get('flashMessages').add({
            message: 'Die E-Mail wird in Kürze verschickt. Sie können dieses Fenter nun schließen.',
            type: 'success',
            sticky: true
          });
        }
        else{
          this.get('flashMessages').add({
            message: 'Die angegebene E-Mail ist nicht registriert oder es wurde kein Passwort-Reset angefordert',
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
