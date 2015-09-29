import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return {token: params.token};
  },
  setupController: function (controller, model) {
    controller.send('confirmEmail', model.token);
  }
});
