/**
 * Things-Grid-Component
 *
 * @module      :: Component
 * @description :: Creates a wrapper for the grid of the graphical password
 */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['things-grid'],

  classNameBindings: ['grid.isActive:show:hide', 'numberOfImagesPerRow'],

  /**
   * Returns the calculated number of images per row
   */
  numberOfImagesPerRow: function () {
    return 'row-' + Math.floor(Math.sqrt(this.get('grid.images.length')));
  }.property('grid.images.length'),

  /**
   * Returns a shuffled array of images
   */
  shuffledImages: function () {
    var images = Ember.A();
    this.get('grid.images').forEach(function (item) {
      images.pushObject(item);
    });
    images = this.shuffle(images);
    return images;
  }.property('grid.images.@each'),

  /**
   * Returns a shuffled array
   * @param o
   * @returns {*}
   */
  shuffle: function(o){
    // empty body is a js lint fix
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
    return o;
  },

  actions: {
    /**
     * Saves clicked image and notifies subscribers of click
     * @param collection
     * @param image
     */
    setClickedImage: function (collection, image) {
      this.set('grid.clickedImage', image);
      this.sendAction('clickedImageIsSet', collection);
    }
  }
});
