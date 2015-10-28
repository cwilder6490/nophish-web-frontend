/**
 * Dashboard-Controller
 *
 * @module      :: Controller
 * @description :: Manages the dashboard and the user interactions
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  needs: ['application'],

  /**
   * Returns first object of model array since ember data returns an array
   */
  dashboard: function () {
    return this.get('model.firstObject');
  }.property('model.firstObject'),

  /**
   * Binds dev function to window
   */
  init: function () {
    window.dev = function(){
      Ember.$('#dev-wrapper').removeClass('hide');
    };
  },

  /**
   * Returns user singleton
   */
  user: function () {
    return this.get('controllers.application.user');
  }.property('controllers.application.user.@each'),

  /**
   * Returns an ember object for the pre-test dashboard tile
   */
  preTestStatus: function () {
    return Ember.Object.create({
      unlocked: true,
      done: this.get('user.preTestDone'),
      doneText: 'Durchgeführt mit ' + this.get('user.preTestCorrectAnswers') + '/' + this.get('user.preTestTotalAnswers'),
      skipped: this.get('user.preTestSkipped'),
      name: 'Vortest'
    });
  }.property('user'),

  /**
   * Returns an ember object for the levels-done dashboard tile
   */
  levelsStatus: function () {
    let levelsDone = -1;
    let levelsToDo = 0;
    this.get('model.levels').forEach(function (item) {
      if(item.get('showExercise') === true){
        levelsToDo++;
        if(item.get('unlocked') === true){
          levelsDone++;
        }
      }
    });

    let endInformationLevel = this.get('model.levels').filterBy('showExercise', false).get('lastObject');

    if(endInformationLevel.get('unlocked') === true || levelsDone === -1){
      levelsDone++;
    }

    return Ember.Object.create({
      unlocked: true,
      showExercise: true,
      correctAnswers: levelsDone,
      totalItems: levelsToDo,
      done: this.get('user.postTestUnlocked'),
      name: 'Levels'
    });
  }.property('user', 'model.levels.@each.unlocked', 'model.levels.length'),

  /**
   * Returns an ember object for the post-test dashboard tile
   */
  postTestStatus: function () {
    return Ember.Object.create({
      unlocked: this.get('user.postTestUnlocked'),
      done: this.get('user.postTestDone'),
      preventDoneLook: this.get('user.postTestCorrectAnswers') !== this.get('user.postTestTotalAnswers'),
      doneText: 'Durchgeführt mit ' + this.get('user.postTestCorrectAnswers') + '/' + this.get('user.postTestTotalAnswers'),
      name: 'Nachtest'
    });
  }.property('user'),

  /**
   * Returns an ember object for the certificate dashboard tile
   */
  certificateStatus: function () {
    return Ember.Object.create({
      unlocked: this.get('user.certificateUnlocked'),
      name: 'Zertifikat'
    });
  }.property('user'),

  /**
   * Returns an ember object for the retention-test dashboard tile
   */
  retentionTestStatus: function () {
    return Ember.Object.create({
      unlocked: this.get('user.retentionTestUnlocked'),
      done: this.get('user.retentionTestDone'),
      doneText: 'Durchgeführt mit ' + this.get('user.retentionTestCorrectAnswers') + '/' + this.get('user.retentionTestTotalAnswers'),
      name: 'Retentiontest'
    });
  }.property('user'),

  /**
   * Returns if the retention-test reminder option needs to be shown
   */
  showRetentionTestReminderOption: function () {
    return (this.get('user.retentionTestDone') === true && new Date(this.get('user.retentionTestRepeatDate')) < new Date());
  }.property('user'),

  actions: {
    /**
     * (Dev-Method) Unlocks all levels
     */
    unlockAll: function () {
      Ember.$.post(ENV.APP.backendURL + '/level/unlockAll', {password: 'dev'})
        .done(function () {
          alert('Unlocked');
        })
        .fail(function () {
          alert('error');
        })
    },

    /**
     * (Dev-Method) Unlocks retention-test
     */
    unlockRetention: function () {
      Ember.$.post(ENV.APP.backendURL + '/user/unlockRetentionTest', {password: 'dev'})
        .done(function () {
          alert('Unlocked');
        })
        .fail(function () {
          alert('error');
        })
    },

    /**
     * Transitions to last unlocked level
     */
    transitionToNextLevel: function () {
      console.log('here');
      let level = this.get('model.levels').filterBy('unlocked', true).get('lastObject');
      if(level !== undefined){
        this.target.send('transitionToLevel', level.get('id'));
      }
    },

    /**
     * Sets the retention-test reminder
     */
    setRetentionTestReminder: function () {
      Ember.$.post(ENV.APP.backendURL + '/user/setRetentionTestRepeatDate', {})
        .done(function (data) {
          let defer = Ember.RSVP.defer();

          defer.promise.then(function(){
              this.get('flashMessages').add({
                message: 'Erinnerung erfolgreich gesetzt!',
                type: 'success',
                sticky: false
              });
            }.bind(this),
            function(err){
              console.log('Error', err);
              alert('Error');
            });

          this.get('controllers.application.userController').send('createUser', data.user, defer);
        }.bind(this))
        .fail(function (err) {
          console.log('Error', err);
          alert('Error');
        }.bind(this));
    }
  }
});
