//import DS from 'ember-data';
//
//export default DS.Model.extend({
//  question: DS.belongsTo('testItem'),
//  isPhishing: DS.attr('boolean'),
//  howSure: DS.attr('number'),
//  hasAccountAtProvider: DS.attr('boolean'),
//  argumentation: DS.attr('string'),
//
//  toJson: function () {
//    let that = this;
//    return {
//      id: that.get('id'),
//      question: that.get('question.id'),
//      isPhishing: that.get('isPhishing'),
//      howSure: that.get('howSure'),
//      hasAccountAtProvider: that.get('hasAccountAtProvider'),
//      argumentation:that.get('argumentation')
//    };
//  }
//});

import Ember from 'ember';
import ENV from '../config/environment';

let testAnswer = Ember.Object.extend({
  toJSON: function () {
    let that = this;
    return {
      test: that.get('test'),
      question: that.get('question'),
      isPhishing: that.get('isPhishing'),
      howSure: that.get('howSure'),
      hasAccountAtProvider: that.get('hasAccountAtProvider'),
      argumentation:that.get('argumentation')
    };
  }
});

export default testAnswer;
