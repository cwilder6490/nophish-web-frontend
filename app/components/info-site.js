/**
 * Info-Site-Component
 *
 * @module      :: Component
 * @description :: Creates an info site
 */

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['info-site', 'hide'],

  /**
   * Notifies subscribers when DOM-element is inserted
   */
  didInsertElement: function () {
    this.sendAction('ready');
  }
});
