/**
 * Dashboard-Level-Component
 *
 * @module      :: Component
 * @description :: Creates a tile that displays the status of a level for the dashboard
 */

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dashboard-level col-md-4 col-sm-6 col-xs-12'],
  classNameBindings: ['level.unlocked:unlocked', 'level.unlockedThroughPreTest:unlocked-through-pretest', 'level.skipped:skipped', 'showLevelDoneLook:done'],

  /**
   * Lets level look done if preventDoneLook is not true and level is done
   */
  showLevelDoneLook: function () {
    return this.get('level.preventDoneLook') ? false : this.get('level.done');
  }.property('level.done', 'level.preventDoneLook'),

  didInsertElement: function () {

  },

  actions: {
    /**
     * Transitions to level if unlocked
     */
    transitionToLevel: function () {
      if(this.get('level.unlocked')){
        this.sendAction('transitionToLevel', this.get('level.id'));
      }
    },

    /**
     * Propagation stopping method
     */
    stopPropagation: function () {}
  }
});
