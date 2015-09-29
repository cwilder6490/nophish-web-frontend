import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if(this.get('session.isAuthenticated')) {
      console.log('inital redirect to dashboard');
      this.transitionTo('dashboard');
    }
  }
});
