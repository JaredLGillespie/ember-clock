'use strict';

define('ember-clock/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/clock.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/clock.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/stopwatch.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/stopwatch.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/timer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/timer.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/pad-string.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/pad-string.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/clock.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/clock.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/stopwatch.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/stopwatch.js should pass ESLint\n\n');
  });

  QUnit.test('routes/timer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/timer.js should pass ESLint\n\n');
  });
});
define('ember-clock/tests/integration/helpers/pad-string-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Helper | pad-string', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('value', 1);
      this.set('length', 2);
      this.set('padStr', '0');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "QsQo49rD",
        "block": "{\"symbols\":[],\"statements\":[[1,[26,\"pad-string\",[[22,[\"value\"]],[22,[\"length\"]],[22,[\"padStr\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '01');
    });
  });
});
define('ember-clock/tests/test-helper', ['ember-clock/app', 'ember-clock/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('ember-clock/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/helpers/pad-string-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/pad-string-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/clock-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/clock-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/stopwatch-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/stopwatch-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/timer-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/timer-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/clock-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/clock-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/stopwatch-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/stopwatch-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/timer-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/timer-test.js should pass ESLint\n\n');
  });
});
define('ember-clock/tests/unit/controllers/clock-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | clock', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:clock');
      assert.ok(controller);
    });
  });
});
define('ember-clock/tests/unit/controllers/stopwatch-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | stopwatch', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:stopwatch');
      assert.ok(controller);
    });
  });
});
define('ember-clock/tests/unit/controllers/timer-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | timer', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:timer');
      assert.ok(controller);
    });
  });
});
define('ember-clock/tests/unit/routes/clock-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | clock', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:clock');
      assert.ok(route);
    });
  });
});
define('ember-clock/tests/unit/routes/index-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define('ember-clock/tests/unit/routes/stopwatch-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | stopwatch', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:stopwatch');
      assert.ok(route);
    });
  });
});
define('ember-clock/tests/unit/routes/timer-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | timer', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:timer');
      assert.ok(route);
    });
  });
});
define('ember-clock/config/environment', [], function() {
  var prefix = 'ember-clock';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('ember-clock/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
