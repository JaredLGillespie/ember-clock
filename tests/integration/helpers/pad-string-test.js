import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | pad-string', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('value', 1);
    this.set('length', 2);
    this.set('padStr', '0');

    await render(hbs`{{pad-string value length padStr}}`);

    assert.equal(this.element.textContent.trim(), '01');
  });
});
