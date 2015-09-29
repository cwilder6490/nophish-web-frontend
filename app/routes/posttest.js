import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.find('test', 2);
  },

  beforeModel: function () {
    let application = this.controllerFor('application');
    if(! application.get('user.postTestUnlocked')){
      this.transitionTo('dashboard').then(function () {
        this.get('flashMessages').add({
          message: 'Nachtest nicht freigeschaltet!',
          type: 'danger',
          sticky: false
        });
      }.bind(this));
    }
    else if(application.get('user.certificateUnlocked')){
      this.transitionTo('dashboard').then(function () {
        this.get('flashMessages').add({
          message: 'Nachtest bereits absolviert!',
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
