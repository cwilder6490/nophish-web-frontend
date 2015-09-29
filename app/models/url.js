import Ember from 'ember';
import ENV from '../config/environment';

let url = Ember.Object.extend({
  whoArea: function () {
    let who = this.get('domain');
    if(this.get('topLevelDomain') !== undefined && this.get('topLevelDomain').length > 0){
      who += '.' + this.get('topLevelDomain');
    }
    return who;
  }.property('domain', 'topLevelDomain')
});

url.reopenClass({

});

export default url;
