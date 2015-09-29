import Ember from 'ember';
import ENV from '../config/environment';
import Url from '../models/url';

let level = Ember.Object.extend({

});

level.reopenClass({
  find: function (id) {
    return $.getJSON(ENV.APP.backendURL + '/level/' + id).then(
      function(response) {
        var infos = response.info;
        var urls = response.urls;
        var backupUrls = response.backupUrls;
        delete response.info;
        delete response.urls;
        delete response.backupUrls;

        let levelObj = level.create(response);

        if(infos !== undefined){
          levelObj.set('info', Ember.A());
          infos.forEach(function (info) {
            levelObj.get('info').pushObject(info);
          });
        }

        if(backupUrls !== undefined){
          let backupUrlsObj = Ember.Object.create({});
          Object.keys(backupUrls).forEach(function (key) {
            backupUrlsObj.set(key, Ember.A());
            backupUrls[key].forEach(function(url){
              backupUrlsObj.get(key).pushObject(Url.create(url));
            });
          });
          levelObj.set('backupUrls', backupUrlsObj);
        }

        if(urls !== undefined) {
          levelObj.set('urls', Ember.A());
          urls.forEach(function (url) {
            levelObj.get('urls').pushObject(Url.create(url));
          });
        }

        return levelObj;
      }
    );
  }
});

export default level;
