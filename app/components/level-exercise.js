/**
 * Level-Exercise-Component
 *
 * @module      :: Component
 * @description :: Creates a wrapper for the level exercises
 */

import Ember from 'ember';

export default Ember.Component.extend({
  rightPoints: 50,
  wrongPoints: 0,
  userDecidedRightStreak: 0,
  currentIndex: 0,

  /**
   * Returns the last index of a levels urls array
   */
  lastIndex: function () {
    return this.get('level.urls.length') - 1;
  }.property('level.urls.length'),

  /**
   * Resets the exercise stats
   */
  reset: function () {
    this.set('level.correctAnswers', 0);
    this.set('level.score', 0);
    this.set('level.remainingLives', 3);
  }.on('init'),

  actions: {
    /**
     * Sets the streak of right answers in a row
     * @param value
     */
    setUserDecidedRightStreak: function (value) {
      this.set('userDecidedRightStreak', value);
    },

    /**
     * Process a users answer to an exercise item
     * @param right
     */
    done: function (right) {
      if(right){
        this.set('level.correctAnswers', this.get('level.correctAnswers') + 1);
        this.set('level.score', this.get('level.score') + this.get('rightPoints'));
      }
      else{
        this.set('level.score', this.get('level.score') + this.get('wrongPoints'));
        this.set('level.remainingLives', this.get('level.remainingLives') -1);

        let index = this.get('currentIndex');
        let url = this.get('level.urls').objectAt(index);
        let levelId = url.get('level') !== undefined ? url.get('level') : 'notMutated';
        this.get('level.urls').pushObject(this.get('level.backupUrls.' + levelId).shiftObject());
      }
    },

    /**
     * Shows next exercise item if there is one or at least one life is left, or notifies subscribers that exercise was completed if so
     */
    next: function () {
      if(this.get('level.remainingLives') === 0){
        this.sendAction('failed');
      }
      else{
        if(this.get('level.correctAnswers') === this.get('level.overallUrlNumber')){
          this.sendAction('succeeded', this.get('level.correctAnswers'), this.get('level.urls.length'));
        }
        else{
          this.set('currentIndex', this.get('currentIndex') + 1);
        }
      }
    }
  }
});
