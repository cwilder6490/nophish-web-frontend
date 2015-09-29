import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.Model.extend({
  type: DS.attr('string'),
  provider: DS.attr('string'),
  isPhishing: DS.attr('string'),
  image: DS.attr('string'),
  imagePath: DS.attr('string'),
  meta: DS.attr('string'),
  copyright: DS.attr('string'),
  belongsToLevel: DS.attr('string'),

  //ready: function () {
  //  this.store.createRecord('testAnswer', {
  //    question: this,
  //    id: this.get('id'),
  //    isPhishing: true,
  //    howSure: 1,
  //    hasAccountAtProvider: false
  //  });
  //},

  absoluteImagePath: function () {
    return ENV.APP.backendURL + this.get('imagePath') + this.get('image');
  }.property('imagePath', 'image'),

  //getAnswer: function () {
  //  return this.store.find('testAnswer', this.get('id'));
  //}.property('id'),

  isWeb: function () {
    return this.get('type') === 'web';
  }.property('type'),

  needsArgumentation: function () {
    return Math.random() < 0.2;
  }.property(),

  metaData: function () {
    if(this.get('meta') === undefined || this.get('meta') === null || this.get('meta') === ''){
      this.set('meta', JSON.stringify({}));
    }
    return JSON.parse(this.get('meta'));
  }.property('meta')
});
