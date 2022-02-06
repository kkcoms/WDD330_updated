// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts.js":[function(require,module,exports) {
'use strict'; //Call and Apply Methods
// I can't get the imput to read and work. 
//It just flashes and leaves the screen. This would be a good thing to figure out
//
// const nameDisplay = document.querySelector(`#displayName`)
// const nameInput = document.getElementById(`name`).value;
// const amy = {name: nameInput}
// const nameExample = document.querySelector(`.nameExample`)
// nameExample.addEventListener("submit", () => sayHello.call(name));
// nameExample.addEventListener("submit", displayName);
// console.log(sayHello.call(amy));
// nameDisplay.innerHTML = sayHello.call(amy);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var nameDisplay1 = document.querySelector("#displayName1");
var nameDisplay2 = document.querySelector("#displayName2");
var clark = {
  name: 'Clark'
};
var bruce = {
  name: 'Bruce'
};

function sayHello() {
  // "There is nothing to stop you adding your own properties to functions in the same way 
  // that you can add properties to any object in JavaScript. For example, you could add 
  // a description property to a function that describes what it does:"
  sayHello.description = 'returns a greeting';
  return "Hello, my name is ".concat(this.name);
}

;
console.log(sayHello.call(clark));
console.log(sayHello.call(bruce));
nameDisplay1.innerHTML = sayHello.call(clark);
nameDisplay2.innerHTML = sayHello.call(bruce); //With Arguments

function sayHello1() {
  var greeting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Hello';
  return "".concat(greeting, ", my name is ").concat(this.name);
}

console.log(sayHello1.call(clark, 'How do you do'));
console.log(sayHello1.call(bruce)); //Immediately Invoked function expressions

(function () {
  var temp = 'World';
  console.log("Hello ".concat(temp));
})(); // "An IIFE can be used to set up any initialization code that there’ll be no need for again. Because the code is only run once, there’s no need to create any reusable, named functions, and all the variables will also be temporary. An IIFE will be invoked once, and can set up any variables, objects and event handlers when the page loads. The following example logs a welcome message to the console, then eliminates all the temporary variables used in putting the message together:"


(function () {
  var name = 'Peter Parker'; // This might be obtained from a cookie in reality

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var date = new Date(),
      today = days[date.getDay()];
  console.log("Welcome back ".concat(name, ". Today is ").concat(today));
})(); //You don't really need to do that in ES6, putting the code in a block works the same. 
// A block is {}
// This is a good example of local scope as well


{
  var name = 'Peter Parker'; // This might be obtained from a cookie in reality

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var date = new Date(),
      today = days[date.getDay()];
  console.log("Welcome back ".concat(name, ". Today is ").concat(today));
} //Creating Self-contained Code Blocks

(function () {
  // block A
  var name = 'Block A';
  console.log("Hello from ".concat(name));
})();

(function () {
  // block B
  var name = 'Block B';
  console.log("Hello from ".concat(name));
})(); //Self defining functions
//(this is cool)


function party() {
  console.log('Wow this is amazing!');

  party = function party() {
    console.log('Been there, got the T-Shirt');
  };
}

party();
party(); //recursive functions

function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1); //this is calling it's self - 1
  }
}

console.log("The factorial of 5 is:", factorial(5));

function collatz(n) {
  var sequence = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [n];

  if (n === 1) {
    return "Sequence took ".concat(sequence.length, " steps. It was ").concat(sequence);
  }

  if (n % 2 === 0) {
    n = n / 2;
  } else {
    n = 3 * n + 1;
  }

  return collatz(n, [].concat(_toConsumableArray(sequence), [n])); //note the use of the spread operator
}

console.log(collatz(9)); //Callback
//function to represent something that might take a long time

function wait(message, callback, seconds) {
  setTimeout(callback, seconds * 1000);
  console.log(message);
} //callback function


function selfDestruct() {
  console.log('BOOOOM!');
} //putting it all together


wait('This tape will self-destruct in five seconds ... ', selfDestruct, 5);
console.log('Hmmm, should I accept this mission or not ... ?'); //Promises
//"A promise is created using a constructor function. This takes a function called anexecutoras an argument. The executor initializes the promise and starts the asynchronous operation. It also accepts two functions as arguments: the resolve() function is called if the operation is successful, and the reject() function is called if the operation fails. The general layout of a promise can be seen in the code below:"
// const promiseExample = new Promise( (resolve, reject) => {
//   // initialization code goes here
//   if (success) {
//       resolve(value);
//   } else {
//       reject(error);
//   }
// });
// example with dice

var dice = {
  sides: 20,
  roll: function roll() {
    return Math.floor(this.sides * Math.random()) + 1;
  }
};
var promise = new Promise(function (resolve, reject) {
  var n = dice.roll();
  setTimeout(function () {
    n > 1 ? resolve(n) : reject(n);
  }, n * 1000);
});
console.log("you rolled a :", dice.roll());
console.log(promise); //How do I do something with promise?

promise.then(function (result) {
  return console.log("Yes! I rolled a ".concat(result));
}, function (result) {
  return console.log("Drat! ... I rolled a ".concat(result));
}); //Functions that return functions

function returnHello() {
  console.log('returnHello() called');
  return function () {
    console.log('Hello World!');
  };
}

returnHello();
var hello = returnHello();
hello(); //Closure example

function outer() {
  var outside = 'Outside!';

  function inner() {
    var inside = 'Inside!';
    console.log(outside);
    console.log(inside);
  }

  console.log(outside);
  inner();
}

outer(); // Quiz Ninja Code
//Random function

function random(a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  // if only 1 argument is provided, we need to swap the values of a and b
  if (b === 1) {
    var _ref = [b, a];
    a = _ref[0];
    b = _ref[1];
  }

  return Math.floor((b - a + 1) * Math.random()) + a;
} //shuffle the order of the array


function shuffle(array) {
  for (var i = array.length; i; i--) {
    var j = random(i) - 1;
    var _ref2 = [array[j], array[i - 1]];
    array[i - 1] = _ref2[0];
    array[j] = _ref2[1];
  }
}

var quiz = [{
  name: "Superman",
  realName: "Clark Kent"
}, {
  name: "Wonderwoman",
  realName: "Diana Prince"
}, {
  name: "Batman",
  realName: "Bruce Wayne"
}]; // View Object

var view = {
  score: document.querySelector('#score strong'),
  question: document.querySelector('#question'),
  result: document.querySelector('#result'),
  info: document.querySelector('#info'),
  start: document.querySelector('#start'),
  response: document.querySelector('#response'),
  timer: document.querySelector('#timer strong'),
  render: function render(target, content, attributes) {
    for (var key in attributes) {
      target.setAttribute(key, attributes[key]);
    }

    target.innerHTML = content;
  },
  show: function show(element) {
    element.style.display = 'block';
  },
  hide: function hide(element) {
    element.style.display = 'none';
  },
  resetForm: function resetForm() {
    this.response.answer.value = '';
    this.response.answer.focus();
  },
  setup: function setup() {
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score, game.score);
    this.render(this.result, '');
    this.render(this.info, '');
    this.resetForm();
  },
  teardown: function teardown() {
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  }
};
var game = {
  start: function start(quiz) {
    this.score = 0;
    this.questions = _toConsumableArray(quiz);
    view.setup();
    this.secondsRemaining = 20;
    this.timer = setInterval(this.countdown, 1000);
    this.ask();
  },
  countdown: function countdown() {
    game.secondsRemaining--;
    view.render(view.timer, game.secondsRemaining);

    if (game.secondsRemaining < 0) {
      game.gameOver();
    }
  },
  ask: function ask(name) {
    console.log('ask() invoked');

    if (this.questions.length > 0) {
      shuffle(this.questions);
      this.question = this.questions.pop();
      var question = "What is ".concat(this.question.name, "'s real name?");
      view.render(view.question, question);
    } else {
      this.gameOver();
    }
  },
  check: function check(event) {
    event.preventDefault();
    var response = view.response.answer.value;
    var answer = this.question.realName;

    if (response === answer) {
      view.render(view.result, 'Correct!', {
        'class': 'correct'
      });
      this.score++;
      view.render(view.score, this.score);
    } else {
      view.render(view.result, "Wrong! The correct answer was ".concat(answer), {
        'class': 'wrong'
      });
    }

    view.resetForm();
    this.ask();
  },
  gameOver: function gameOver() {
    view.render(view.info, "Game Over, you scored ".concat(this.score, " point").concat(this.score !== 1 ? 's' : ''));
    view.teardown();
    clearInterval(this.timer);
  }
};
view.start.addEventListener('click', function () {
  return game.start(quiz);
}, false);
view.response.addEventListener('submit', function (event) {
  return game.check(event);
}, false);
view.hide(view.response); // NEW QUIZ NINJA CODE!!!!!!!!

console.log('start() invoked');
console.log('ask() invoked');
console.log('check(event) invoked');
console.log('gameOver() invoked'); // end quiz Ninja!

WebFont.load({
  google: {
    families: ['Arvo', 'Open+Sans', 'Merriweather', 'Special+Elite']
  }
});
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64648" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts.js"], null)
//# sourceMappingURL=/scripts.b71a6038.js.map