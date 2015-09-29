import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Level from '../models/level';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    this.set('modelId', params.id);
    return Level.find(params.id);
  },

  setupController: function (controller, model) {
    controller.set('model', model);
    controller.set('showOverlay', false);
  },

  afterModel: function () {
    this.set('model.saved', false);
  },

  actions: {
    willTransition: function (transition) {
      if(this.controller.get('model.saved')){
       return true;
      }
      else{
        this.set('intent', transition.intent);
        transition.abort();
        Ember.$('#confirm-exit').modal('show');
        return false;
      }
    },

    confirmExit: function () {
      this.controller.set('model.saved', true);
      Ember.$('#confirm-exit').modal('hide');
      this.transitionTo(this.get('intent').name).then(function () {
        this.controller.set('model.saved', false);
        Ember.$('#confirm-exit').modal('hide');
      }.bind(this));
    }
  }
});
