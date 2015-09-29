/**
 * Things-Register-Component
 *
 * @module      :: Component
 * @description :: Creates graphical password registration
 */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['things-register'],
  isFirstCall: true,

  /**
   * Scrolls the viewport to the DOM-element when inserted
   */
  didInsertElement: function () {
    this.scrollToThis();
  },

  /**
   * Scrolls the viewport to this element
   */
  scrollToThis: function () {
    if(this.get('isFirstCall')){
      this.set('isFirstCall', false);
      return;
    }
    Ember.$('html, body').animate({
      scrollTop: Ember.$("div.things-register-anchor").offset().top
    }, 500);
  },

  /**
   * Copys the password images
   */
  passwordImagesCopy: function () {
    var passwordImages = this.get('passwordImages');
    if(passwordImages === undefined || passwordImages.get('length') === 0){
      return [];
    }

    var images = Ember.A();
    passwordImages.forEach(function (item) {
      var obj = Ember.Object.create(item);
      obj.set('isActive', false);
      obj.set('wasSeen', false);
      images.pushObject(obj);
    });

    this.scrollToThis();

    images[0].set('isActive', true);
    images[0].set('wasSeen', true);
    this.set('updateCurrentImageNumber', 1);
    return images;
  }.property('passwordImages.@each'),

  actions: {
    /**
     * Show next password image and triggers action if all images were seen
     */
    next: function () {
      var oldIndex;
      this.get('passwordImagesCopy').forEach(function (item, index) {
        if(item.get('isActive')){
          oldIndex = index;
          item.set('isActive', false);
        }
      });

      var newIndex = (oldIndex + 1) % this.get('passwordImagesCopy.length');
      this.get('passwordImagesCopy')[newIndex].set('isActive', true);
      this.get('passwordImagesCopy')[newIndex].set('wasSeen', true);
      this.set('updateCurrentImageNumber', newIndex + 1);

      this.send('checkIfEveryImageWasSeen');
    },

    /**
     * Show previous password image
     */
    previous: function () {
      var oldIndex;
      this.get('passwordImagesCopy').forEach(function (item, index) {
        if(item.get('isActive')){
          oldIndex = index;
          item.set('isActive', false);
        }
      });

      var newIndex = (oldIndex === 0) ? (this.get('passwordImagesCopy.length') - 1) : (oldIndex - 1);
      this.get('passwordImagesCopy')[newIndex].set('isActive', true);
      this.get('passwordImagesCopy')[newIndex].set('wasSeen', true);
      this.set('updateCurrentImageNumber', newIndex + 1);

      this.send('checkIfEveryImageWasSeen');
    },

    /**
     * Returns if every image was seen and notifies subscribers if its so
     */
    checkIfEveryImageWasSeen: function () {
      let everyImageWasSeen = true;
      this.get('passwordImagesCopy').forEach(function (item) {
        if( ! item.get('wasSeen')){
          everyImageWasSeen = false;
        }
      });

      if(everyImageWasSeen){
        this.sendAction('everyImageWasSeen');
      }
    }
  }
});
