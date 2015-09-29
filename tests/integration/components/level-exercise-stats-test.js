import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('level-exercise-stats', 'Integration | Component | level exercise stats', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{level-exercise-stats}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#level-exercise-stats}}
      template block text
    {{/level-exercise-stats}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
