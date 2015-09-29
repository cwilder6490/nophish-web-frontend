/**
 * Level-Exercise-Item-Component
 *
 * @module      :: Component
 * @description :: Creates a level exercise item
 */

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['level-exercise-item'],
  classNameBindings: ['isHidden:hide'],
  userDecidedRightStreak: 0,

  /**
   * Hides element if current element is not this element
   */
  isHidden: function () {
    Ember.$(window).resize();
    return this.get('index') !== this.get('currentIndex');
  }.property('index', 'currentIndex'),

  /**
   * Evaluates if the decide-section has to be shown
   */
  showDecideSection: function () {
    if(this.get('onlySelectDomain') === true){
      return false;
    }

    if(this.get('userDecidedRight') !== undefined){
      return false;
    }

    return true;
  }.property('onlySelectDomain', 'userDecidedRight'),

  /**
   * Evaluates if the select-section has to be shown
   */
  showSelectSection: function () {
    if(this.get('showDecideSection')){
      return false;
    }

    if(this.get('userSelectedRight') !== undefined){
      return false;
    }

    if(this.get('onlySelectDomain') === true){
      return true;
    }

    if(this.get('userDecidedRight') === true && this.get('url.isPhish') === true){
      if(this.get('userDecidedRightStreak') < 5 || Math.random() < 0.2){
        return true;
      }
    }

    return false;
  }.property('url.@each', 'showDecideSection', 'userDecidedRight', 'userSelectedRight', 'onlySelectDomain'),

  /**
   * Evaluates if the result-section has to be shown
   */
  showResultSection: function () {
    if(this.get('showDecideSection') === true || this.get('showSelectSection') === true){
      return false;
    }

    this.sendAction('done', this.get('resultRight'));
    return true;
  }.property('url.@each', 'showDecideSection', 'showSelectSection'),

  /**
   * Returns translated text for the current section and rightness
   */
  resultText: Ember.computed('i18n.locale', 'showResultSection', function() {
    let addition = this.get('url.isPhish') === true ? 'phish' : 'nophish';

    if(this.get('showResultSection') === true){
      if(this.get('onlySelectDomain') === true){
        if(this.get('userSelectedRight') === true){
          return this.get('i18n').t('components.level-exercise-item.result.onlySelectDomain.right');
        }
        else{
          return this.get('i18n').t('components.level-exercise-item.result.onlySelectDomain.wrong');
        }
      }
      else{
        if(this.get('userSelectedRight') !== undefined){
          if(this.get('userSelectedRight') === true){
            return this.get('i18n').t('components.level-exercise-item.result.decide.right.' + addition);
          }
          else{
            return this.get('i18n').t('components.level-exercise-item.result.select.wrong');
          }
        }
        else{
          if(this.get('userDecidedRight') === true){
            return this.get('i18n').t('components.level-exercise-item.result.decide.right.' + addition);
          }
          else{
            return this.get('i18n').t('components.level-exercise-item.result.decide.wrong.' + addition);
          }
        }
      }
    }
  }),

  /**
   * Returns if user decided right for this item
   */
  resultRight: function () {
    if(this.get('onlySelectDomain') === true){
      return this.get('userSelectedRight');
    }
    else{
      if(this.get('userSelectedRight') !== undefined){
        return true === this.get('userSelectedRight') && this.get('userSelectedRight') === this.get('userDecidedRight');
      }
      else{
        return this.get('userDecidedRight');
      }
    }
  }.property('userDecidedRight', 'userSelectedRight', 'onlySelectDomain'),

  actions: {
    /**
     * Checks if decision is right an updates user-decided-right-streak
     * @param isPhish
     */
    decide: function (isPhish) {
      let right = false;
      if(this.get('url.isPhish') === true){
        right = isPhish === true;
      }
      else{
        right = isPhish === false;
      }
      this.set('userDecidedRight', right);
      this.set('lastSelectedPart','');
      this.sendAction('setUserDecidedRightStreak', right ? this.get('userDecidedRightStreak') + 1 : 0);
    },

    /**
     * Sets _userSelectedRight and lastSelectedPart
     * @param selectedDomain
     * @param id
     */
    selectedDomain: function (selectedDomain, id) {
      this.set('_userSelectedRight', selectedDomain);
      this.set('lastSelectedPart', selectedDomain ? '' : id);
    },

    /**
     * Saves user selection
     */
    selected: function () {
      this.set('userSelectedRight', this.get('_userSelectedRight'));
    },

    /**
     * Notifies subscribers that the next item should be shown
     */
    next: function () {
      this.sendAction('next');
    }
  }
});
