import Ember from 'ember';

export default Ember.Route.extend({
  resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      console.log('Reset', transition);
      // TODO reset controller
    }
  }
});
