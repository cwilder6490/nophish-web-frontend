/**
 * Nav-Bar-Component
 *
 * @module      :: Component
 * @description :: Creates the navigation bar
 */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',

  actions: {
    /**
     * Notifies the subscribers that the user wants to be logged out
     */
    logout: function(){
      this.sendAction('logout');
    }
  }
});
