/**
 * Browser-Window-Component
 *
 * @module      :: Component
 * @description :: Creates a browser window that adapts the style of a configured browser and displays the url
 *                 Also handles user interactions with the url
 */

import Ember from 'ember';
import Url from '../models/url';

export default Ember.Component.extend({
  classNames: ['browser-window'],

  /**
   * Sets an ember object for test items that only have json-meta-data for the url
   */
  urlObject: function () {
    if(this.get('metaData') === undefined) return;

    var meta = JSON.parse(this.get('metaData'));
    if(typeof meta === 'string'){
      meta = JSON.parse(meta);
    }

    let url = Ember.Object.create();
    url.set('domain', meta.domain);
    url.set('topLevelDomain', meta.tld);
    url.set('hasExtendedValidationCertificate', meta.extendedValidationCert);
    url.set('extendedValidationCertificateName', meta.extendedValidationCertName);
    url.set('protocol', meta.protocol ? meta.protocol : 'https');
    url.set('subDomains', Ember.A());

    let whoArea = meta.domain;
    if(meta.tld){
      whoArea += '.' + meta.tld;
    }
    url.set('whoArea', whoArea);
    if(meta.subDomain){
      url.get('subDomains').push(meta.subDomain);
    }
    url.set('path', Ember.A());
    let path = meta.path;
    if(path && path.charAt(0) === '/'){
      path = path.substring(1);
    }
    if(path){
      url.get('path').push(path);
    }

    this.set('url', url);
  }.observes('metaData').on('init'),

  /**
   * Returns the right styles for the browser window depending on the type, protocol and extended validation certificate
   */
  styles: function () {
    let http = {
      chrome: {
        top: '6px',
        left: '120px',
        right: '50px',
        height: '23px',
        https: {
          order: 1,
          style: 'display:none;color:#38A83A;margin-right:5px;'
        },
        url: {
          order: 2,
          style: '',
          protocol: 'display:none;color:#38A83A',
          protocolSlashes: 'display:none;',
          subDomain: 'color:#000000',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#9FA1A5'
        }
      },
      firefox: {
        top: '12px',
        left: '75px',
        right: '143px',
        height: '27px',
        https: {
          order: 1,
          style: 'display:none;color:#38A83A;margin-right:5px;'
        },
        url: {
          order: 2,
          style: '',
          protocol: 'display:none;color:#9FA1A5',
          protocolSlashes: 'display:none;',
          subDomain: 'color:#9FA1A5',
          domain: 'color:#000000',
          tld: 'color:#9FA1A5',
          path: 'color:#9FA1A5'
        }
      },
      ie: {
        height: '30px',
        top: '8px',
        left: '120px',
        right: '136px',
        https: {
          order: 2,
          style: 'display:none;margin-left:5px;'
        },
        url: {
          order: 1,
          style: 'flex-grow:5;',
          protocol: 'color:#9FA1A5',
          subDomain: 'color:#9FA1A5',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#9FA1A5'
        }
      },
      safari: {
        top: '14px',
        left: '130px',
        right: '112px',
        height: '23px',
        https: {
          order: 2,
          style: 'color:#31643F;margin-left:5px;'
        },
        url: {
          order: 1,
          style: '',
          protocol: 'color:#000000',
          subDomain: 'color:#000000',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#000000'
        }
      }
    };
    let https = {
      chrome: {
        top: '6px',
        left: '120px',
        right: '50px',
        height: '23px',
        https: {
          order: 1,
          style: 'display:none;color:#38A83A;margin-right:5px;'
        },
        url: {
          order: 2,
          style: '',
          protocol: 'color:#38A83A',
          subDomain: 'color:#000000',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#9FA1A5'
        }
      },
      firefox: {
        top: '12px',
        left: '75px',
        right: '143px',
        height: '27px',
        https: {
          order: 1,
          style: 'display:none;color:#38A83A;margin-right:5px;'
        },
        url: {
          order: 2,
          style: '',
          protocol: 'color:#9FA1A5',
          subDomain: 'color:#9FA1A5',
          domain: 'color:#000000',
          tld: 'color:#9FA1A5',
          path: 'color:#9FA1A5'
        }
      },
      ie: {
        height: '30px',
        top: '8px',
        left: '120px',
        right: '158px',
        https: {
          order: 2,
          style: 'display:none;margin-left:5px;'
        },
        url: {
          order: 1,
          style: 'flex-grow:5;',
          protocol: 'color:#9FA1A5',
          subDomain: 'color:#9FA1A5',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#9FA1A5'
        }
      },
      safari: {
        top: '14px',
        left: '130px',
        right: '137px',
        height: '23px',
        https: {
          order: 2,
          style: 'color:#31643F;margin-left:5px;'
        },
        url: {
          order: 1,
          style: '',
          protocol: 'color:#000000',
          subDomain: 'color:#000000',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#000000'
        }
      }
    };
    let httpsEv = {
      chrome: {
        top: '6px',
        left: '96px',
        right: '50px',
        height: '23px',
        https: {
          order: 1,
          style: 'color:#38A83A;margin-right:5px;'
        },
        url: {
          order: 2,
          style: '',
          protocol: 'color:#38A83A',
          subDomain: 'color:#000000',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#9FA1A5'
        }
      },
      firefox: {
        top: '12px',
        left: '48px',
        right: '143px',
        height: '27px',
        https: {
          order: 1,
          style: 'color:#38A83A;margin-right:5px;'
        },
        url: {
          order: 2,
          style: '',
          protocol: 'color:#9FA1A5',
          subDomain: 'color:#9FA1A5',
          domain: 'color:#000000',
          tld: 'color:#9FA1A5',
          path: 'color:#9FA1A5'
        }
      },
      ie: {
        height: '30px',
        top: '8px',
        left: '95px',
        right: '136px',
        https: {
          order: 2,
          style: 'margin-left:5px;'
        },
        url: {
          order: 1,
          style: 'flex-grow:5;',
          protocol: 'color:#9FA1A5',
          subDomain: 'color:#9FA1A5',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#9FA1A5'
        }
      },
      safari: {
        top: '14px',
        left: '130px',
        right: '137px',
        height: '23px',
        https: {
          order: 2,
          style: 'color:#31643F;margin-left:5px;'
        },
        url: {
          order: 1,
          style: '',
          protocol: 'color:#000000',
          subDomain: 'color:#000000',
          domain: 'color:#000000',
          tld: 'color:#000000',
          path: 'color:#000000'
        }
      }
    };

    let styles = http;
    if(this.get('url.protocol') === 'https'){
      if(this.get('url.hasExtendedValidationCertificate')){
        styles = httpsEv;
      }
      else{
        styles = https;
      }
    }

    let style = styles[this.get('type')];
    if(style === undefined){
      style = styles.chrome;
    }
    return style;
  }.property('type', 'url.protocol', 'url.hasExtendedValidationCertificate'),

  /**
   * Sets images for browser type and applies styles to the view
   */
  onTypeChange: function () {
    let imagePartials = [
      {
        propertyName: 'UrlStart',
        fileName: 'url-start'
      },
      {
        propertyName: 'UrlRepeat',
        fileName: 'url-repeat'
      },
      {
        propertyName: 'UrlEnd',
        fileName: 'url-end'
      },
      {
        propertyName: 'End',
        fileName: 'end'
      },
      {
        propertyName: 'HttpsStart',
        fileName: 'https-start'
      },
      {
        propertyName: 'HttpsRepeat',
        fileName: 'https-repeat'
      },
      {
        propertyName: 'HttpsEnd',
        fileName: 'https-end'
      }
    ];

    let styles = this.get('styles');

    let subFolder = this.get('url.protocol');
    if(this.get('url.hasExtendedValidationCertificate')){
      subFolder += '-ev';
    }

    imagePartials.forEach(function (item) {
      this.set('header' + item.propertyName + 'Image', '/images/browsers/' + this.get('type') + '/' + subFolder + '/' + item.fileName + '.jpg');
    }.bind(this));

    let actualStyles = styles;
    this.set('headerUrlPosition', 'height:' + actualStyles.height + ';top:' + actualStyles.top + ';left:' + actualStyles.left + ';right:' + actualStyles.right);

    let httpsStyle = [
      'order:' + actualStyles.https.order,
      actualStyles.https.style
    ].join(';');
    this.set('httpsStyle', httpsStyle);

    let urlStyle = [
      'height:' + actualStyles.height,
      'line-height:' + actualStyles.height,
      'font-size:calc(0.7*' + actualStyles.height + ')',
      'order:' + actualStyles.url.order,
      actualStyles.url.style
    ].join(';');
    this.set('urlStyle', urlStyle);
  }.observes('type', 'url.protocol', 'url.hasExtendedValidationCertificate').on('init'),

  /**
   * Fired when the dom element is inserted. Registers a resize listener for itself and recalculates the layout depending on the viewport width
   */
  didInsertElement: function () {
    Ember.$(window).on('resize', function () {
      let https = Ember.$('#' + this.elementId + ' .https-wrapper');
      let url = Ember.$('#' + this.elementId + ' .url');

      Ember.$('#' + this.elementId).imagesLoaded(https, function () {
        var width = 0;
        width += https.find('.https-start').first().width();
        width += https.find('.https-repeat').first().width();
        width += https.find('.https-end').first().width();
        https.css('width', width + 'px');

        url.css('width', 'calc(100% - ' + (width + parseInt(https.css('margin-right'))) + 'px)');

        let urlWidth = 0;
        url.find('span').each(function(){urlWidth += $(this).width();});
        let left = parseInt(Ember.$('#' + this.elementId + ' .url-wrapper').css('left'));
        let right = parseInt(Ember.$('#' + this.elementId + ' .url-wrapper').css('right'));
        Ember.$('#' + this.elementId + ' .scroll-wrapper').css('min-width', urlWidth + left + right);
      }.bind(this));
    }.bind(this));

    Ember.$(window).resize();
  },

  /**
   * Deselects all highlighted url parts
   */
  deselectAll: function () {
    let keys = Ember.keys(this.get('selectUrl'));
    keys.forEach(function (key) {
      if(key === 'id'){
        return;
      }
      let prop = this.get('selectUrl.' + key);
      if(Ember.isArray(prop)){
        this.set('selectUrl.' + key, prop.map(function (p) {
          return '';
        }));
      }
      else{
        this.set('selectUrl.' + key, '');
      }
    }.bind(this));
  },

  /**
   * Sets up url for user interaction
   */
  selectEnabledObserver: function () {
    if( ! this.get('selectEnabled')){
      return;
    }

    this.set('selectUrl', Url.create(this.get('url')));

    this.deselectAll();

  }.observes('url', 'selectEnabled').on('init'),

  /**
   * Preselects url parts
   */
  preSelectObserver: function () {
    if(this.get('preSelectGood.length') > 0){
      Ember.$('#' + this.elementId + ' #url-' + this.get('preSelectGood')).addClass('selected good');
    }
    if(this.get('preSelectBad.length') > 0){
      Ember.$('#' + this.elementId + ' #url-' + this.get('preSelectBad')).addClass('selected bad');
    }
  }.observes('url', 'preSelectGood', 'preSelectBad').on('didInsertElement'),

  actions: {
    /**
     * Selects url part and notifies subscribers
     * @param part
     * @param index
     */
    select: function (part, index) {
      if(! this.get('selectEnabled')){
        return;
      }

      this.deselectAll();

      let urlPart = this.get('selectUrl.' + part);
      let el;
      let id = '';

      if(Ember.isArray(urlPart)){
        this.set('selectUrl.' + part + '.' + index, 'selected');
        id = part + '-' + index;
      }
      else{
        this.set('selectUrl.' + part, 'selected');
        id = part;
      }

      el = Ember.$('#' + this.elementId + ' #url-' + id);

      Ember.$('#' + this.elementId + ' .url span').removeClass('selected').removeClass('good').removeClass('bad');
      el.addClass('selected');
      this.sendAction('selectedDomain', part === 'domain', id);
    }
  }
});
