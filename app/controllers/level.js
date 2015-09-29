/**
 * Level-Controller
 *
 * @module      :: Controller
 * @description :: Manages the level
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  needs: ['application'],

  _showInfo: true,
  _showExercise: true,
  _infoRendered: 0,
  showResult: false,

  /**
   * Observes the model for change and resets the controller if the models id changes
   */
  modelObserver: function () {
    this.set('_showInfo', true);
    this.set('_showExercise', true);
    this.set('_infoRendered', 0);
    this.set('showResult', false);
  }.observes('model.id'),

  /**
   * Returns the amount of wrong answers from the amount of remaining lifes
   */
  wrongAnswers: function () {
    return 3 - this.get('model.remainingLives');
  }.property('model.remainingLives'),

  /**
   * Returns if the info section should be shown
   */
  showInfo: function () {
    return this.get('model.showInfo') && this.get('_showInfo');
  }.property('model.showInfo', '_showInfo'),

  /**
   * Returns if the exercise section should be shown
   */
  showExercise: function () {
    return this.get('model.showExercise') && this.get('_showExercise') && ! this.get('showInfo');
  }.property('model.showExercise', '_showExercise', 'showInfo'),

  /**
   * Returns an array with the length of the remaining lives and sets the trophiesLost property to the amount of lost trophies
   */
  trophies: function () {
    let t = Ember.A();
    for(let i = 0; i < this.get('model.remainingLives'); i++){
      t.push(i);
    }

    let r = Ember.A();
    for(let j = 0; j < 3 - this.get('model.remainingLives'); j++){
      r.push(j);
    }

    this.set('trophiesLost', r);

    return t;
  }.property('model.remainingLives'),

  /**
   * Dummy method to run the ember observe cycle again
   */
  reset: function () {

  }.observes('model.id'),

  /**
   * Saves the level progress to the server and resolves or rejects the given promise
   * @param defer
   */
  saveProgress: function (defer) {
    let level = {};
    level.id = this.get('model.id');
    level.correctAnswers = this.get('model.correctAnswers') !== undefined ? this.get('model.correctAnswers') : 0;
    level.score = this.get('model.score') !== undefined ? this.get('model.score') : 0;
    level.remainingLives = this.get('model.remainingLives') !== undefined ? this.get('model.remainingLives') : 3;

    Ember.$.post(ENV.APP.backendURL + '/level/finish', level).done(function (data) {
      defer.resolve(data);
    }.bind(this))
    .fail(function (data) {
      defer.reject(data);
    });
  },

  actions: {
    /**
     * Handles and rendered info-element and increments the number of rendered info-elements
     */
    infoRendered: function () {
      this.set('_infoRendered', this.get('_infoRendered') + 1);
    },

    /**
     * Hides info section and shows exercise section
     */
    startExercise: function () {
      this.set('_showInfo', false);
      this.set('_showExercise', true);
    },

    /**
     * Hides exercise section, shows the result section and sets the succeeded property to true while setting the failed property to false
     */
    succeeded: function () {
      this.set('_showExercise', false);
      this.set('showResult', true);
      this.set('succeeded', true);
      this.set('failed', false);
    },

    /**
     * Hides exercise section, shows the result section and sets the failed property to true while setting the succeeded property to false
     */
    failed: function () {
      this.set('_showExercise', false);
      this.set('showResult', true);
      this.set('succeeded', false);
      this.set('failed', true);
    },

    /**
     * Resets level completely by restarting the application
     */
    repeatLevel: function () {
      window.location.reload();
    },

    /**
     * Saves the current progress, updates user singleton and transitions to next level or the finished-all-levels view
     */
    nextLevel: function () {
      let defer = Ember.RSVP.defer();
      defer.promise.then(function(data){

          if(data.success === true && data.nextLevelId === undefined && data.user !== undefined){
            this.set('model.saved', true);

            let defer = Ember.RSVP.defer();
            defer.promise.then(function(data){
                this.transitionToRoute('finished-all-levels').then(function () {
                  this.set('model.saved', false);
                  this.set('showOverlay', false);
                }.bind(this));
              }.bind(this),
              function(err){
                this.set('model.saved', false);
                this.set('showOverlay', false);
                alert('Error while unlocking posttest.');
              }.bind(this));

            this.get('controllers.application.userController').send('createUser', data.user, defer);
          }
          else{
            this.set('model.saved', true);
            this.transitionToRoute('level', data.nextLevelId).then(function () {
              this.set('model.saved', false);
              this.set('showOverlay', false);
            }.bind(this));
          }
        }.bind(this),
        function(err){
          console.log('Error: ', err);
          alert('Error! Da ist etwas schief gelaufen. Bitte dem Entwickler bescheid geben und die Konsolenausgabe notieren!');
        }.bind(this));

      this.set('showOverlay', true);
      this.saveProgress(defer);
    },

    /**
     * Saves the current progress, updates user singleton and transitions to dashboard
     */
    saveAndReturnToDashboard: function () {
      let defer = Ember.RSVP.defer();
      defer.promise.then(function(data){
          this.set('model.saved', true);
          this.transitionToRoute('dashboard').then(function () {
            this.set('model.saved', false);
            this.set('showOverlay', false);
          }.bind(this));
        }.bind(this),
        function(err){
          console.log('Error: ', err);
          alert('Error! Da ist etwas schief gelaufen. Bitte dem Entwickler bescheid geben und die Konsolenausgabe notieren!');
        }.bind(this));

      this.set('showOverlay', true);
      this.saveProgress(defer);
    }
  }
});
