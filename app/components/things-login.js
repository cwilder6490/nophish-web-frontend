/**
 * Things-Login-Component
 *
 * @module      :: Component
 * @description :: Creates graphical password login
 */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['things-login'],

  /**
   * Returns an array of grids
   */
  grids: function () {
    var grids = Ember.A();
    var thingsData = this.get('thingsData').copy();

    if(thingsData.length === 0){
      return grids;
    }

    thingsData.forEach(function (item) {
      grids.pushObject({
        collection: item.collection,
        images: item.images,
        isActive: false,
        clickedImage: null
      });
    });
    grids = this.shuffle(grids);
    grids.set('firstObject.isActive', true);
    return grids;
  }.property('thingsData'),

  /**
   * Generates password from clicked images
   * @returns {string}
   */
  generatePassword: function () {
    var password = '';
    this.get('thingsData').forEach(function (item) {
      var obj = this.get('grids').findBy('collection', item.collection);
      password += obj.collection + ' ' + obj.clickedImage;
    }.bind(this));
    return password;
  },

  /**
   * Returns shuffled array
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
     * Selects next grid if there is one or notifies subscribers that user can be authenticated
     * @param collection
     */
    showNextGrid: function (collection) {
      var isNextGrid = false;
      this.get('grids').forEach(function (item) {
        if(isNextGrid){
          Ember.set(item, 'isActive', true);
          isNextGrid = false;
          return;
        }
        if(item.collection === collection){
          isNextGrid = true;
          Ember.set(item, 'isActive', false);
        }
      });

      if(isNextGrid){
        this.sendAction('loginDone', this.generatePassword());
        this.sendAction('authenticate');
      }
    }
  }
});
