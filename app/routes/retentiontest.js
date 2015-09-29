import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.find('test', 3);
  },

  beforeModel: function () {
    let application = this.controllerFor('application');
    if(! application.get('user.retentionTestUnlocked') || application.get('user.retentionTestDone')){
      this.transitionTo('dashboard').then(function () {
        this.get('flashMessages').add({
          message: 'Retentiontest nicht freigeschaltet!',
          type: 'danger',
          sticky: false
        });
      }.bind(this));
    }
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.send('resetController');
  }
});
