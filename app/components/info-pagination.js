/**
 * Info-Pagination-Component
 *
 * @module      :: Component
 * @description :: Creates a pagination system for a levels info sites
 */

import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Sets DOM-elements of the sites to the component
   * Sets current index to 0
   */
  didInsertElement: function () {
    this.set('sites', Ember.$('.info-site'));
    this.set('currentIndex', 0);
  },

  /**
   * Resets component when all infos are rendered
   */
  modelObserver: function () {
    this.set('currentIndex', -1);
    this.didInsertElement();
  }.observes('infoRendered'),

  /**
   * Observes the current index and show the corresponding info-site
   */
  currentIndexObserver: function () {
    let sites = this.get('sites');
    let self = this;

    sites.each(function (index) {
      if(index === self.get('currentIndex')){
        Ember.$(this).removeClass('hide');
      }
      else{
        Ember.$(this).addClass('hide');
      }
    });
  }.observes('currentIndex'),

  /**
   * Returns class for the previous-button
   */
  previousClass: function () {
    return this.get('currentIndex') === 0 ? 'hide' : '';
  }.property('currentIndex', 'sites.length'),

  /**
   * Returns class for the next-button
   */
  nextClass: function () {
    return this.get('currentIndex') === (this.get('sites.length') - 1) ? 'hide' : '';
  }.property('currentIndex', 'sites.length'),

  /**
   * Applies classes to the last buttons to display the correct button at the end of an info section
   */
  paginationObserver: function () {
    if(this.get('currentIndex') === (this.get('sites.length') - 1)){
      if(this.get('model.showExercise') === true){
        this.set('startExerciseButtonClass', '');
        this.set('finishLevelButtonClass', 'hide');
      }
      else{
        this.set('startExerciseButtonClass', 'hide');
        this.set('finishLevelButtonClass', '');
      }
    }
    else{
      this.set('startExerciseButtonClass', 'hide');
      this.set('finishLevelButtonClass', 'hide');
    }
  }.observes('currentIndex', 'sites.length', 'model.showExercise'),

  actions: {
    /**
     * Decrements the current index
     */
    previous: function () {
      this.set('currentIndex', this.get('currentIndex') - 1);
    },

    /**
     * Increments the current index
     */
    next: function () {
      this.set('currentIndex', this.get('currentIndex') + 1);
    },

    /**
     * Notifies subscribers that the exercise section should be starting now
     */
    startExercise: function () {
      this.sendAction('startExercise');
    },

    /**
     * Notifies subscribers that the level was finished
     */
    finishLevel: function () {
      this.sendAction('finishLevel');
    }
  }
});
