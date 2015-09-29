import DS from 'ember-data';

export default DS.Model.extend({
  questions: DS.hasMany('testItem')
});
