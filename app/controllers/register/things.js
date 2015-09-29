/**
 * Register-Things-Controller
 *
 * @module      :: Controller
 * @description :: Manages the standard registration
 */

import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Controller.extend({
  needs: ['register'],
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

  passwordImages: [],

  thingsDataObserver: function(){
    var passwordImages = this.get('passwordImages'),
      thingsData = this.get('thingsData');

    passwordImages.clear();
    var images = [];
    thingsData.forEach(function (item) {
      images.pushObject({
        collection: item.collection,
        image: item.passwordImage
      });
    });

    passwordImages.pushObjects(images);
  }.observes('thingsData.@each'),

  /**
   * Returns if the password images should be shown
   */
  showPasswordImages: function(){
    return this.get('passwordImages.length') > 0;
  }.property('passwordImages.length'),

  /**
   * Returns if the user can register himself
   */
  canRegister: function () {
    var email = this.get('email');

    var canRegister = ! (email === undefined || email.length === 0 || email.indexOf('@') < 0);
    canRegister = canRegister && (this.get('everyImageWasSeen') === true);
    return canRegister;
  }.property('email', 'everyImageWasSeen'),

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
      var password = '';

      this.get('passwordImages').forEach(function (item) {
        password += item.collection + ' ' + item.image;
      });

      if(email === null || email === undefined || email.length === 0){
        console.log('Email not valid');
      }

      if(password === ''){
        console.log('No Password');
      }

      var thingsData = [];
      this.get('thingsData').forEach(function (item) {
        thingsData.pushObject({
          collection: item.collection,
          images: item.images
        });
      });

      this.get('controllers.register').send('register', email, password, true, this, thingsData);
    },

    /**
     * Gets things password from server
     */
    generateThingsPassword: function () {
      var self = this;
      this.set('isProcessingInput', true);
      this.set('everyImageWasSeen', false);

      Ember.$.post(ENV.APP.backendURL + '/auth/generateThingsPassword')
        .done(function (data) {
          self.set('thingsData', data.password);
          self.set('filePath', data.filePath);
        })
        .fail(function (data) {
          console.log('error', data);
        })
        .always(function () {
          self.set('isProcessingInput', false);
        });
    },

    /**
     * Sets everyImageWasSeen to true
     */
    everyImageWasSeen: function(){
      this.set('everyImageWasSeen', true);
    }
  }
});
