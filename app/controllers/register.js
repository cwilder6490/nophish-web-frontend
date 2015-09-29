/**
 * Register-Controller
 *
 * @module      :: Controller
 * @description :: Manages the registration
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  /**
   * Returns localized email placeholder
   */
  emailPlaceholder: Ember.computed('i18n.locale', function() {
    return this.i18n.t('register.body.placeholder.email');
  }),

  /**
   * Returns localized birth placeholder
   */
  birthPlaceholder: Ember.computed('i18n.locale', function() {
    return this.i18n.t('register.body.placeholder.birth');
  }),

  /**
   * Returns the birth-year options
   */
  birthOptions: function () {
    let array = [];

    let undef = {id:'0'};
    undef['label'] = 'nicht angegeben';
    array.push(undef);

    let date = new Date();

    for(let year = date.getFullYear(); year > date.getFullYear() - 100; year--){
      let yearOption = {id:'' + year};
      yearOption['label'] = '' + year;
      array.push(yearOption);
    }

    return array;
  }.property(),
  birth: '0',

  /**
   * Returns the browser options
   */
  browserOptions: function () {
    let array = [];

    let undef = {id:'undefined'};
    undef['label'] = 'nicht angegeben';
    array.push(undef);

    let chrome = {id:'chrome'};
    chrome['label'] = 'Google Chrome';
    array.push(chrome);

    let ie = {id:'ie'};
    ie['label'] = 'Internet Explorer';
    array.push(ie);

    let safari = {id:'safari'};
    safari['label'] = 'Apple Safari';
    array.push(safari);

    let firefox = {id:'firefox'};
    firefox['label'] = 'Mozilla Firefox';
    array.push(firefox);

    return array;
  }.property(),
  browser: 'undefined',

  /**
   * Returns the mail-client options
   */
  mailclientOptions: function () {
    let array = [];

    let undef = {id:'undefined'};
    undef['label'] = 'nicht angegeben';
    array.push(undef);

    let thunderbird = {id:'thunderbird'};
    thunderbird['label'] = 'Mozilla Thunderbird';
    array.push(thunderbird);

    let outlook = {id:'outlook'};
    outlook['label'] = 'Microsoft Outlook';
    array.push(outlook);

    let gmx = {id:'gmx'};
    gmx['label'] = 'GMX';
    array.push(gmx);

    let gmail = {id:'gmail'};
    gmail['label'] = 'GoogleMail';
    array.push(gmail);

    let web = {id:'web'};
    web['label'] = 'Web';
    array.push(web);

    return array;
  }.property(),
  mailclient: 'undefined',

  /**
   * Returns the sex options
   */
  sexOptions: function () {
    let array = [];

      let undef = {id:'undefined'};
      undef['label'] = this.i18n.t('register.body.placeholder.sex.undefined');
      array.push(undef);

      let male = {id:'male'};
      male['label'] = this.i18n.t('register.body.placeholder.sex.male');
      array.push(male);

      let female = {id:'female'};
      female['label'] = this.i18n.t('register.body.placeholder.sex.female');
      array.push(female);

    return array;
  }.property(),
  sex: 'undefined',

  actions: {
    /**
     * Validates user input and registeres user
     * If succeeded shows login (graphical password) or directly logs the user in (normal password)
     * If failed it notifies the user why
     * @param email
     * @param password
     * @param isThingsPassword
     * @param controller
     * @param thingsData
     */
    register: function(email, password, isThingsPassword, controller, thingsData){
      var self = this;
      controller.set('isProcessingInput', true);

      thingsData = thingsData !== undefined ? thingsData : null;

      var dataToSend = {
        email: email,
        password: password,
        isThingsPassword: isThingsPassword,
        thingsData: thingsData
      };

      if(this.get('browser') !== undefined){
        dataToSend.usedDesktopBrowser = this.get('browser');
      }

      if(this.get('mailclient') !== undefined){
        dataToSend.usedMailClient = this.get('mailclient');
      }

      if(this.get('informal') !== undefined){
        dataToSend.addressFormal =  (! this.get('informal'));
      }

      if(this.get('birth') !== undefined){
        dataToSend.yearOfBirth = this.get('birth');
      }

      if(this.get('sex') !== undefined){
        dataToSend.sex = this.get('sex');
      }

      Ember.$.post(ENV.APP.backendURL + '/auth/register', dataToSend)
        .done(function () {
          if(isThingsPassword){
            self.transitionTo('login', {queryParams: {emailPrefill: email}});
          }
          else{
            self.controllerFor('login').send('authenticate', {identification: email, password: password});
          }
        })
        .fail(function (data) {
          if(data.responseJSON){
            if(data.responseJSON.error === 'User already exists'){
              self.get('flashMessages').danger('Diese E-Mail ist bereits registriert!');
            }
            else if(data.responseJSON.invalidAttributes){
              if(data.responseJSON.invalidAttributes.email){
                self.get('flashMessages').danger('Diese E-Mail ist nicht valide!');
              }
            }
          }
        })
        .always(function () {
          controller.set('isProcessingInput', false);
        });
    }
  }
});
