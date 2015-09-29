import Ember from 'ember';
import ENV from '../config/environment';

let dashboard = Ember.Object.extend({

});

let dashboardLevel = Ember.Object.extend({

});

dashboardLevel.reopenClass({

});

dashboard.reopenClass({
  findAll: function() {
    return $.getJSON(ENV.APP.backendURL + '/dashboard').then(
      function(response) {
        //return response.data.children.map(function (child) {
        //  return App.RedditLink.create(child.data);
        //});

        var levels = response.levels;
        delete response.levels;
        var dashboardObj = dashboard.create(response);
        dashboardObj.set('levels', Ember.A());
        levels.forEach(function (level) {
          dashboardObj.get('levels').pushObject(dashboardLevel.create(level));
        });
        return dashboardObj;
      },
      function (data) {
        localStorage.setItem('ember_simple_auth:session', '{"secure":{}}');
      }
    );
  }
});

export default dashboard;
