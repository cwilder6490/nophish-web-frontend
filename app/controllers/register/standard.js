/**
 * Register-Standard-Controller
 *
 * @module      :: Controller
 * @description :: Manages the standard registration
 */

import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['register'],
  flashMessages: [],
  isProcessingInput: false,

  /**
   * Returns register controller
   */
  optionsController: function () {
    return this.get('controllers.register');
  }.property(),

  /**
   * Returns localized email placeholder
   */
  emailPlaceholder: function () {
    return this.get('controllers.register.emailPlaceholder');
  }.property('controllers.register.emailPlaceholder'),

  /**
   * Returns localized password placeholder
   */
  passwordPlaceholder: Ember.computed('i18n.locale', function() {
    return this.i18n.t('register.standard.body.placeholder.password');
  }),

  /**
   * Returns localized password repeat placeholder
   */
  passwordRepeatPlaceholder: Ember.computed('i18n.locale', function() {
    return this.i18n.t('register.standard.body.placeholder.password.repeat');
  }),

  /**
   * Returns if the user can register himself
   */
  canRegister: function () {
    var email = this.get('email'),
      password = this.get('password'),
      passwordRepeat = this.get('passwordRepeat');

    var canRegister = ! (email === undefined ||
                          password === undefined ||
                          passwordRepeat === undefined ||
                          email.length === 0 ||
                          password.length < 8 ||
                          email.indexOf('@') < 0 ||
                          password !== passwordRepeat);
    return canRegister;
  }.property('email', 'password', 'passwordRepeat'),

  /**
   * Returns if the register button can be clicked
   */
  isSubmitButtonClickable: function () {
    return (this.get('isProcessingInput') || (! this.get('canRegister')));
  }.property('isProcessingInput', 'canRegister'),

  actions: {
    /**
     * Registers the user
     */
    register: function(){
      var email= this.get('email');
      var password = this.get('password');

      this.get('controllers.register').send('register', email, password, false, this);
    },

    /**
     * Shows error in console
     * @param text
     */
    showError: function(text){
      console.log(text);
    }
  }
});
