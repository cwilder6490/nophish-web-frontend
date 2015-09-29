/**
 * Level-Exercise-Stats-Component
 *
 * @module      :: Component
 * @description :: Creates a level exercise stats bar
 */

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['level-exercise-stats'],

  /**
   * Sets amount of shown hearts
   */
  remainingLivesObserver: function () {
    var remainingLives = this.get('level.remainingLives');
    if(remainingLives < 3){
      this.set('heart-1-class', 'hide');
      if(remainingLives < 2){
        this.set('heart-2-class', 'hide');
        if(remainingLives < 1){
          this.set('heart-3-class', 'hide');
        }
        else{
          this.set('heart-3-class', 'show');
        }
      }
      else{
        this.set('heart-2-class', 'show');
      }
    }
    else{
      this.set('heart-1-class', 'show');
    }
  }.observes('level.remainingLives')
});
