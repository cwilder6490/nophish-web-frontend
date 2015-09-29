import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {

  },

  resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      console.log('Reset', transition);
    }
  }
});
