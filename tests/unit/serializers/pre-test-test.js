import { moduleForModel, test } from 'ember-qunit';

moduleForModel('pre-test', 'Unit | Serializer | pre test', {
  // Specify the other units that are required for this test.
  needs: ['serializer:pre-test']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
