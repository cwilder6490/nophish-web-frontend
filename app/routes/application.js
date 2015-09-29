import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  checkTransition: function (transition) {
    // check if user has to do the pretest

    console.log(transition, this.get('session.isAuthenticated'), this.get('controller.user.preTestDone'), this.get('controller.user.preTestSkipped'));

    if(transition === undefined || transition.intent.name !== 'pretest' || (transition.intent.url.indexOf('pretest') < 0)){
      if(this.get('session.isAuthenticated') === true && ! (this.get('controller.user.preTestDone') === true || this.get('controller.user.preTestSkipped') === true)){
        console.log('route to pretest');
        this.transitionTo('pretest');
        return;
      }
    }

    if(transition === undefined || transition.intent.name === 'pretest' || (transition.intent.url.indexOf('pretest') >= 0)){
      if(this.get('session.isAuthenticated') === true && (this.get('controller.user.preTestDone') === true || this.get('controller.user.preTestSkipped') === true)){
        this.transitionTo('dashboard');
        return;
      }
    }

    // TODO alles abfangen
    //if(transition.intent.name === 'pretest' || (transition.intent.url.indexOf('pretest') > -1)){
    //  if(this.get('session.isAuthenticated') === true && this.get('controller.user.preTestDone') === true){
    //    this.transitionTo('dashboard');
    //    return;
    //  }
    //}

  },

  actions: {
    onUserCreated: function () {
      this.set('didLogin', true);

      var attemptedTransition = this.get('session').get('attemptedTransition');
      if (attemptedTransition) {
        attemptedTransition.retry();
        this.get('session').set('attemptedTransition', null);
      }
      else {
        if(window.location.pathname.indexOf('login') >= 0 || window.location.pathname.indexOf('register') >= 0){
          this.transitionTo('dashboard');
        }
      }
    },

    sessionAuthenticationSucceeded: function() {
      return false;
    },

    sessionInvalidationSucceeded: function () {
      this.set('didLogout', true);
      this.transitionTo('index');
      return false;
    },

    willTransition: function(transition) {
      this.checkTransition(transition);

      return true;
    },

    didTransition: function () {
      Ember.get(this, 'flashMessages').clearMessages();

      let button = Ember.$('header button.navbar-toggle');
      if( ! button.hasClass('collapsed')){
        button.click();
      }

      if(this.get('didLogin') === true){
        this.set('didLogin', false);
        console.log(this.get('controller'),this.get('controller.i18n'),this.get('controller').i18n);
        this.get('flashMessages').add({
          message: this.get('controller.i18n').t('flash.success.login'),
          type: 'success',
          sticky: false
        });
      }
      else if(this.get('didLogout') === true){
        this.set('didLogout', false);
        this.get('flashMessages').add({
          message: this.get('controller.i18n').t('flash.success.logout'),
          type: 'success',
          sticky: false
        });
      }

      // TODO make message-texts addressFormal-Observed
      if(this.get('controller.user.emailConfirmed') === false){
        this.get('flashMessages').add({
          message: this.get('controller.i18n').t('flash.warning.verification'),
          type: 'warning',
          link: 'settings',
          sticky: true
        });
      }
    }
  }
});
