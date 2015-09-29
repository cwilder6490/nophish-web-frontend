/**
 * Settings-Controller
 *
 * @module      :: Controller
 * @description :: Manages the settings
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  needs: ['application'],

  /**
   * Returns itself
   */
  optionsController: function () {
    return this;
  }.property(),

  /**
   * Updates displayed user-data when user singleton changes
   */
  userChanged: function () {
    let user = this.get('controllers.application.user');

    if(user !== undefined && user !== null){
      this.set('birth', user.get('yearOfBirth') + '');
      this.set('browser', user.get('usedDesktopBrowser'));
      this.set('mailclient', user.get('usedMailClient'));
      this.set('sex', user.get('sex'));
      this.set('informal', ! user.get('addressFormal'));
    }
  }.observes('controllers.application.user.@each').on('init'),

  hideHelpBlocks: true,

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

  /**
   * Returns if user can persist password to the server
   */
  canPersistPassword: function () {
    return ( (this.get('useThingsPassword') && this.get('thingsPasswordIsValid')) || (this.get('useStandardPassword') && this.get('standardPasswordIsValid')) );
  }.property('useThingsPassword','thingsPasswordIsValid','useStandardPassword','standardPasswordIsValid'),

  passwordImages: [],

  /**
   * Updates password images when data changes
   */
  thingsDataObserver: function(){
    let passwordImages = this.get('passwordImages'),
      thingsData = this.get('thingsData');

    passwordImages.clear();
    let images = [];
    thingsData.forEach(function (item) {
      images.pushObject({
        collection: item.collection,
        image: item.passwordImage
      });
    });

    passwordImages.pushObjects(images);
  }.observes('thingsData.@each'),

  /**
   * Validates normal password
   */
  standardPasswordObserver: function () {
    let p = this.get('password');
    let pr = this.get('passwordRepeat');
    this.set('standardPasswordIsValid', (p.length >= 8 && p === pr));
  }.observes('password', 'passwordRepeat'),

  actions: {
    /**
     * Persists the settings and updates the user singleton
     */
    saveOptions: function () {
      let dataToSend = {};
      let self = this;

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

      Ember.$.post(ENV.APP.backendURL + '/user/saveOptions', dataToSend)
        .done(function (data) {
          let defer = Ember.RSVP.defer();

          defer.promise.then(function(){
              self.get('flashMessages').add({
                message: 'Erfolgreich gespeichert!',
                type: 'success',
                sticky: true
              });
            },
            function(){
                alert('todo');
            });

          self.get('controllers.application.userController').send('createUser', data[0], defer);
        })
        .fail(function (data) {
          // TODO
          //controller.send('showError', data.responseText);
        })
        .always(function () {
          self.set('isProcessingInput', false);
        });
    },

    /**
     * Opens password modal
     */
    openPasswordModal: function () {
      this.set('choosePasswordType', true);
      this.set('useThingsPassword', false);
      this.set('useStandardPassword', false);
      Ember.$('#settings-change-password').modal('show');
    },

    /**
     * Sets the controller up for the normal password
     */
    useStandardPassword: function () {
      this.set('isProcessingInput', true);
      this.set('everyImageWasSeen', false);

      this.set('choosePasswordType', false);
      this.set('useThingsPassword', false);
      this.set('useStandardPassword', true);
      this.set('standardPasswordIsValid', false);

      this.set('password', '');
      this.set('passwordRepeat', '');
      this.set('isProcessingInput', false);
    },

    /**
     * Sets the controller up for the graphical password
     */
    useThingsPassword: function () {
      let self = this;
      this.set('isProcessingInput', true);
      this.set('everyImageWasSeen', false);

      Ember.$.post(ENV.APP.backendURL + '/auth/generateThingsPassword')
        .done(function (data) {
          self.set('thingsData', data.password);
          self.set('filePath', data.filePath);

          self.set('choosePasswordType', false);
          self.set('useThingsPassword', true);
          self.set('thingsPasswordIsValid', false);
          self.set('useStandardPassword', false);
        })
        .fail(function (data) {
          console.log('error', data);
        })
        .always(function () {
          self.set('isProcessingInput', false);
        });
    },

    /**
     * Returns if every image was seen
     */
    everyImageWasSeen: function () {
      this.set('thingsPasswordIsValid', true);
    },

    /**
     * Persists the password change to the server
     */
    savePasswordChange: function () {
      let change = {};
      let self = this;

      if(this.get('thingsData')){
        change.password = '';
        this.get('passwordImages').forEach(function (item) {
          change.password += item.collection + ' ' + item.image;
          change.thingsData = self.get('thingsData');
        });
      }
      else{
        change.password = this.get('password');
      }

      this.set('isProcessingInput', true);

      Ember.$.post(ENV.APP.backendURL + '/auth/changePassword', change)
        .done(function () {
          self.send('closeModal');
          self.get('flashMessages').success('Erfolgreich gespeichert!');
        })
        .fail(function () {
          console.log('error');
        })
        .always(function () {
          self.set('isProcessingInput', false);
        });
    },

    /**
     * Closes the modal
     */
    closeModal: function () {
      Ember.$('#settings-change-password').modal('hide');
    },

    /**
     * Opens model for the account deletion
     */
    openDeleteAccountModal: function () {
      Ember.$('#settings-delete-account-modal').modal('show');
    },

    /**
     * Deletes account and logs the user out
     */
    deleteAccount: function () {
      Ember.$.post(ENV.APP.backendURL + '/auth/deleteAccount')
        .done(function () {
          this.get('controllers.application').send('logout');
        }.bind(this))
        .fail(function () {
          alert('Error');
        }.bind(this))
        .always(function () {
          Ember.$('#settings-delete-account-modal').modal('hide');
        });
    },

    /**
     * Request new confirmation email from server
     */
    requestConfirmEmail: function () {
      Ember.$.post(ENV.APP.backendURL + '/user/requestConfirmEmail')
        .done(function () {
          this.get('flashMessages').add({
            message: 'E-Mail wird in Kürze versendet!',
            type: 'success',
            sticky: true
          });
        }.bind(this))
        .fail(function () {
          alert('Error');
        }.bind(this))
        .always(function () {

        });
    }
  }
});
