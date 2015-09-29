import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {token: params.token};
  },
  setupController: function (controller, model) {
    controller.set('token', model.token);
  }
});
