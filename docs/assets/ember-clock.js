"use strict";



define('ember-clock/app', ['exports', 'ember-clock/resolver', 'ember-load-initializers', 'ember-clock/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('ember-clock/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('ember-clock/controllers/clock', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    let timer;

    exports.default = Ember.Controller.extend({
        init() {
            this._super(...arguments);
            this.datetime = new Date();
            timer = setInterval(() => {
                this.set('datetime', new Date());
            }, 1000);
        },
        year: Ember.computed('datetime', function () {
            return this.get('datetime').getFullYear();
        }),
        month: Ember.computed('datetime', function () {
            return this.get('datetime').getMonth() + 1;
        }),
        day: Ember.computed('datetime', function () {
            return this.get('datetime').getDate();
        }),
        hours: Ember.computed('datetime', function () {
            return this.get('datetime').getHours();
        }),
        minutes: Ember.computed('datetime', function () {
            return this.get('datetime').getMinutes();
        }),
        seconds: Ember.computed('datetime', function () {
            return this.get('datetime').getSeconds();
        }),
        willDestroy() {
            clearInterval(timer);
            timer = null;
        }
    });
});
define('ember-clock/controllers/stopwatch', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    let timer;
    let lastUpdate = new Date().getTime();

    exports.default = Ember.Controller.extend({
        actions: {
            start() {
                if (timer != null) return;
                this.set('isStopped', false);

                lastUpdate = new Date().getTime();

                timer = setInterval(() => {
                    let now = new Date().getTime();
                    let diff = now - lastUpdate;

                    lastUpdate = now;
                    this.set('totalTime', this.get('totalTime') + diff);

                    let tt = this.get('totalTime');
                    let hours = Math.floor(tt / (1000 * 60 * 60));
                    let minutes = Math.floor((tt - hours * 1000 * 60 * 60) / (1000 * 60));
                    let seconds = Math.floor((tt - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);

                    this.set('hours', hours);
                    this.set('minutes', minutes);
                    this.set('seconds', seconds);
                }, 1000);
            },
            reset() {
                lastUpdate = new Date().getTime();
                this.set('totalTime', 0);
                this.set('hours', 0);
                this.set('minutes', 0);
                this.set('seconds', 0);
            },
            stop() {
                clearInterval(timer);
                timer = null;
                this.set('isStopped', true);
            }
        },
        isStopped: true,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalTime: 0
    });
});
define('ember-clock/controllers/timer', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    let timer;
    let lastUpdate = new Date().getTime();

    exports.default = Ember.Controller.extend({
        actions: {
            hourInc() {
                this.set('hours', Math.min(this.get('hours') + 1, 99));
            },
            minuteInc() {
                this.set('minutes', Math.min(this.get('minutes') + 1, 99) % 60);
            },
            secondInc() {
                this.set('seconds', Math.min(this.get('seconds') + 1, 99) % 60);
            },
            hourDec() {
                this.set('hours', Math.max(this.get('hours') - 1, 0) % 99);
            },
            minuteDec() {
                this.set('minutes', Math.max(this.get('minutes') - 1, 0) % 60);
            },
            secondDec() {
                this.set('seconds', Math.max(this.get('seconds') - 1, 0) % 60);
            },
            start() {
                if (timer != null || this.get('hours') == 0 && this.get('minutes') == 0 && this.get('seconds') == 0) return;
                this.set('isStopped', false);

                lastUpdate = new Date().getTime();
                this.set('timeRemaining', this.get('hours') * 1000 * 60 * 60 + this.get('minutes') * 1000 * 60 + this.get('seconds') * 1000 + 500);

                timer = setInterval(() => {
                    if (this.get('timeRemaining') <= 0) {
                        clearInterval(timer);
                        timer = null;
                        this.set('isStopped', true);
                        this.set('timeRemaining', 0);
                        this.set('hours', 0);
                        this.set('minutes', 0);
                        this.set('seconds', 0);
                    } else {
                        let now = new Date().getTime();
                        let diff = now - lastUpdate;
                        let tr = this.get('timeRemaining') - diff;
                        lastUpdate = now;
                        if (tr < 500) {
                            this.set('isStopped', true);
                            this.set('timeRemaining', 0);
                            this.set('hours', 0);
                            this.set('minutes', 0);
                            this.set('seconds', 0);
                            clearInterval(timer);
                            timer = null;
                        } else {
                            this.set('timeRemaining', tr);
                            let hours = Math.floor(tr / (1000 * 60 * 60));
                            let minutes = Math.floor((tr - hours * 1000 * 60 * 60) / (1000 * 60));
                            let seconds = Math.floor((tr - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);

                            this.set('hours', hours);
                            this.set('minutes', minutes);
                            this.set('seconds', seconds);
                        }
                    }
                }, 1000);
            },
            reset() {
                this.set('isStopped', true);
                this.set('timeRemaining', 0);
                this.set('hours', 0);
                this.set('minutes', 0);
                this.set('seconds', 0);
            },
            stop() {
                clearInterval(timer);
                timer = null;
                this.set('isStopped', true);
            }
        },
        isStopped: true,
        hours: 0,
        minutes: 0,
        seconds: 0,
        timeRemaining: 0
    });
});
define('ember-clock/helpers/app-version', ['exports', 'ember-clock/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('ember-clock/helpers/pad-string', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.padString = padString;
  function padString([value, length, padStr]) {
    return String(value).padStart(length, padStr);
  }

  exports.default = Ember.Helper.helper(padString);
});
define('ember-clock/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('ember-clock/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('ember-clock/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-clock/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('ember-clock/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-clock/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ember-clock/initializers/export-application-global', ['exports', 'ember-clock/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("ember-clock/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ember-clock/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ember-clock/router', ['exports', 'ember-clock/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('clock');
    this.route('stopwatch');
    this.route('timer');
  });

  exports.default = Router;
});
define('ember-clock/routes/clock', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-clock/routes/index', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        redirect() {
            this.transitionTo('clock');
        }
    });
});
define('ember-clock/routes/stopwatch', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-clock/routes/timer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-clock/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("ember-clock/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sNP8yIey", "block": "{\"symbols\":[],\"statements\":[[6,\"ul\"],[8],[0,\"\\n    \"],[6,\"li\"],[8],[4,\"link-to\",[\"clock\"],null,{\"statements\":[[0,\"Clock\"]],\"parameters\":[]},null],[9],[0,\"\\n    \"],[6,\"li\"],[8],[4,\"link-to\",[\"timer\"],null,{\"statements\":[[0,\"Timer\"]],\"parameters\":[]},null],[9],[0,\"\\n    \"],[6,\"li\"],[8],[4,\"link-to\",[\"stopwatch\"],null,{\"statements\":[[0,\"Stopwatch\"]],\"parameters\":[]},null],[9],[0,\"\\n    \"],[6,\"li\"],[8],[6,\"a\"],[10,\"style\",\"display: inline; background-color: #0c2540;\"],[10,\"href\",\"http://www.github.com/JaredLGillespie/ember-clock\"],[8],[6,\"img\"],[10,\"class\",\"github\"],[10,\"src\",\"Octicons-mark-github.svg\"],[8],[9],[9],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"footer\"],[8],[0,\"\\n    Made by me (Jared Gillespie)\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-clock/templates/application.hbs" } });
});
define("ember-clock/templates/clock", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YLUoONir", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"id\",\"clock\"],[8],[0,\"\\n    \"],[6,\"p\"],[10,\"class\",\"date\"],[8],[1,[26,\"pad-string\",[[22,[\"year\"]],4,\"0\"],null],false],[0,\"-\"],[1,[26,\"pad-string\",[[22,[\"month\"]],2,\"0\"],null],false],[0,\"-\"],[1,[26,\"pad-string\",[[22,[\"day\"]],2,\"0\"],null],false],[9],[0,\"\\n    \"],[6,\"p\"],[10,\"class\",\"time\"],[8],[1,[26,\"pad-string\",[[22,[\"hours\"]],2,\"0\"],null],false],[0,\":\"],[1,[26,\"pad-string\",[[22,[\"minutes\"]],2,\"0\"],null],false],[0,\":\"],[1,[26,\"pad-string\",[[22,[\"seconds\"]],2,\"0\"],null],false],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-clock/templates/clock.hbs" } });
});
define("ember-clock/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1Un3Hu+p", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-clock/templates/index.hbs" } });
});
define("ember-clock/templates/stopwatch", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6mthxl3U", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"id\",\"clock\"],[8],[0,\"\\n    \"],[6,\"p\"],[11,\"class\",[27,[\"time \",[26,\"if\",[[22,[\"isStopped\"]],\"stopped\"],null]]]],[8],[1,[26,\"pad-string\",[[22,[\"hours\"]],2,\"0\"],null],false],[0,\":\"],[1,[26,\"pad-string\",[[22,[\"minutes\"]],2,\"0\"],null],false],[0,\":\"],[1,[26,\"pad-string\",[[22,[\"seconds\"]],2,\"0\"],null],false],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"isStopped\"]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[10,\"class\",\"start\"],[3,\"action\",[[21,0,[]],\"start\"]],[8],[0,\"Start\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"button\"],[10,\"class\",\"stop\"],[3,\"action\",[[21,0,[]],\"stop\"]],[8],[0,\"Stop\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[6,\"button\"],[10,\"class\",\"reset\"],[3,\"action\",[[21,0,[]],\"reset\"]],[8],[0,\"Reset\"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-clock/templates/stopwatch.hbs" } });
});
define("ember-clock/templates/timer", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/Yhf9pHF", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"id\",\"clock\"],[8],[0,\"\\n    \"],[6,\"p\"],[11,\"class\",[27,[\"time \",[26,\"if\",[[22,[\"isStopped\"]],\"stopped\"],null]]]],[8],[1,[26,\"pad-string\",[[22,[\"hours\"]],2,\"0\"],null],false],[0,\":\"],[1,[26,\"pad-string\",[[22,[\"minutes\"]],2,\"0\"],null],false],[0,\":\"],[1,[26,\"pad-string\",[[22,[\"seconds\"]],2,\"0\"],null],false],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"isStopped\"]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[10,\"class\",\"start\"],[3,\"action\",[[21,0,[]],\"start\"]],[8],[0,\"Start\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"button\"],[10,\"class\",\"stop\"],[3,\"action\",[[21,0,[]],\"stop\"]],[8],[0,\"Stop\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[6,\"button\"],[10,\"class\",\"reset\"],[3,\"action\",[[21,0,[]],\"reset\"]],[8],[0,\"Reset\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"setting-box\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isStopped\"]]],null,{\"statements\":[[0,\"        \"],[6,\"p\"],[8],[0,\"Hour\"],[6,\"button\"],[10,\"class\",\"timer-setting\"],[3,\"action\",[[21,0,[]],\"hourInc\"]],[8],[0,\"+\"],[9],[6,\"button\"],[10,\"class\",\"timer-setting\"],[3,\"action\",[[21,0,[]],\"hourDec\"]],[8],[0,\"-\"],[9],[9],[0,\"\\n        \"],[6,\"p\"],[8],[0,\"Minute\"],[6,\"button\"],[10,\"class\",\"timer-setting\"],[3,\"action\",[[21,0,[]],\"minuteInc\"]],[8],[0,\"+\"],[9],[6,\"button\"],[10,\"class\",\"timer-setting\"],[3,\"action\",[[21,0,[]],\"minuteDec\"]],[8],[0,\"-\"],[9],[9],[0,\"\\n        \"],[6,\"p\"],[8],[0,\"Second\"],[6,\"button\"],[10,\"class\",\"timer-setting\"],[3,\"action\",[[21,0,[]],\"secondInc\"]],[8],[0,\"+\"],[9],[6,\"button\"],[10,\"class\",\"timer-setting\"],[3,\"action\",[[21,0,[]],\"secondDec\"]],[8],[0,\"-\"],[9],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-clock/templates/timer.hbs" } });
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

if (!runningTests) {
  require("ember-clock/app")["default"].create({"name":"ember-clock","version":"0.0.0+b25bc85d"});
}
//# sourceMappingURL=ember-clock.map
