import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Dashboard from '../models/dashboard';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function () {
    return Dashboard.findAll();
  },

  actions: {
    transitionToLevel: function (id) {
      this.transitionTo('level', id);
    },

    transitionToPostTest: function () {
      this.transitionTo('posttest');
    },

    transitionToRetentionTest: function () {
      this.transitionTo('retentiontest');
    },

    transitionToCertificate: function () {
      this.transitionTo('certificate');
    }
  }
});
