/**
 * Things-Images-Component
 *
 * @module      :: Component
 * @description :: Creates a wrapper for an image of the graphical password grid
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['things-image'],
  attributeBindings: ['style'],

  /**
   * Returns a string of css style for the image
   */
  style: function (){
    return 'background-image: url("' + this.get('imagePath') + '");';
  }.property('imagePath'),

  /**
   * Returns an absolute file path to the image
   */
  imagePath: function(){
    return ENV.APP.backendURL + '/' + this.get('filePath') + this.get('collection') + '/' + this.get('image') + 'L.jpg';
  }.property('collection', 'image', 'filePath'),

  /**
   * Returns a unique image identifier
   * @returns {string}
   */
  getImageIdentifier: function(){
    return this.get('collection') + ' ' + this.get('image');
  },

  /**
   * Handles a user click and notifies subscribers
   */
  click: function () {
    this.sendAction('isClicked', this.get('collection'), this.get('image'));
  }
});
