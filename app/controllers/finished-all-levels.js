/**
 * Finished-All-Levels-Controller
 *
 * @module      :: Controller
 * @description :: Manages the finished-all-levels view
 */

import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  /**
   * Returns user singleton
   */
  user: function () {
    return this.get('controllers.application.user');
  }.property('controllers.application.user')
});
