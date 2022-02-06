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
})({"to_do.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitTask = submitTask;
exports.displayTasks = displayTasks;
exports.deleteItem = deleteItem;
exports.completedTasks = completedTasks;
exports.filterFinished = filterFinished;
exports.filterNotFinished = filterNotFinished;
exports.unfinishedList = exports.finishedList = exports.toDoList = exports.toDoForm = exports.tasks = void 0;
// Variables
var tasks = document.querySelector(".todo_list");
exports.tasks = tasks;
var toDoForm = document.querySelector(".toDo");
exports.toDoForm = toDoForm;
var toDoList = [];
exports.toDoList = toDoList;
var finishedList = [];
exports.finishedList = finishedList;
var unfinishedList = []; // Function to collect user input, save it to the to do list array and add it to the html

exports.unfinishedList = unfinishedList;

function submitTask(event) {
  // Stop default submit
  event.preventDefault(); // Get task from user input
  // Can write this using current target or getElementById
  //const taskName = event.currentTarget.task.value;

  var taskName = document.getElementById("task").value; //Save task information about the task to toDo

  var toDo = {
    id: Date.now(),
    content: taskName,
    completed: false
  }; //Push toDo into toDoList array

  toDoList.push(toDo); //Clear form
  // Can write this using current target or getElementById
  //event.currentTarget.task.value = ``;

  document.getElementById("task").value = ""; //Create a custom task sumbitted event 

  toDoForm.dispatchEvent(new CustomEvent("tasksSubmitted"));
} //End Submit task function
// Function to display tasks 


function displayTasks(arrayName) {
  // loop through all items in the to do list array and make them into html list items
  var listItems = arrayName.map(function (toDo) {
    return "<li class = \"todo_item\">\n        <input type = \"checkbox\" ".concat(toDo.completed && "checked", " value = \"").concat(toDo.id, "\" >\n        <span class = \"todo_item_name\"> <p>").concat(toDo.content, " </p></span>\n        <button aria-label = \"Remove ").concat(toDo.content, "\" value = \"").concat(toDo.id, "\" class=\"fas fa-trash\"></button> \n        </li>");
  }).join(""); // Add the list items to the html

  tasks.innerHTML = listItems;
} //End Display Function
// removes tasks from the list


function deleteItem(id) {
  //This filters the array into checked and not checked and delete the checked ones
  exports.toDoList = toDoList = toDoList.filter(function (toDo) {
    return toDo.id !== id;
  }); //Event that calls display tasks and save to local storage

  toDoForm.dispatchEvent(new CustomEvent("tasksSubmitted"));
} //End Delete Item function
// gathers and saves completed tasks


function completedTasks(id) {
  // this looks through the to do list array 
  //and finds the todo with an id that matches the one that was clicked
  var taskRef = toDoList.find(function (toDo) {
    return toDo.id == id;
  }); //This changes completed from false to true when clicked

  taskRef.completed = !taskRef.completed; //Event that calls display tasks and save to local storage

  toDoForm.dispatchEvent(new CustomEvent("tasksSubmitted"));
  console.log("CHeckbox clicked");
} // end completed tasks
//Function to split the to do list into a new array for completed items


function filterFinished() {
  exports.finishedList = finishedList = toDoList.filter(function (toDoSingle) {
    return toDoSingle.completed == true;
  });
} //Function to split the to do list into a new array for uncompleted items


function filterNotFinished() {
  exports.unfinishedList = unfinishedList = toDoList.filter(function (toDoSingle) {
    return toDoSingle.completed == false;
  });
}
},{}],"ls.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveToLs = saveToLs;
exports.getTasks = getTasks;

var _to_do = require("./to_do.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//I didn't know how to use local storage, 
//so I used information from Wes Bos' beginner 
//JavaScript class. There is a walkthrough in the 
//class that explains how to use it. 
//Here is the link: https://beginnerjavascript.com
// Save user input to local storage
function saveToLs() {
  // Convert our array object to JSON so local storage can read it and save it
  localStorage.setItem("toDoList", JSON.stringify(_to_do.toDoList));
} //Get user input from local storage


function getTasks() {
  var lsTasks = JSON.parse(localStorage.getItem("toDoList"));

  if (lsTasks.length >= 1) {
    _to_do.toDoList.push.apply(_to_do.toDoList, _toConsumableArray(lsTasks));

    _to_do.toDoForm.dispatchEvent(new CustomEvent("tasksSubmitted"));
  }
} //end ls file
},{"./to_do.js":"to_do.js"}],"utilities.js":[function(require,module,exports) {
//Utilities file
// Webfonts
WebFont.load({
  google: {
    families: ['Source Sans Pro', 'Abril Fatface']
  }
}); //end utilities
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _to_do = require("./to_do.js");

var _ls = require("./ls.js");

var util = _interopRequireWildcard(require("./utilities.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Imports
//Variables
var bottomButtons = document.querySelector(".bottomButtons"); //Event Listeners
//I used information from Wes Bos' beginner JavaScript 
//course to learn how to create custom listening events. 
//Here is the link: https://beginnerjavascript.com

_to_do.toDoForm.addEventListener("submit", _to_do.submitTask);

_to_do.toDoForm.addEventListener("tasksSubmitted", function () {
  return (0, _to_do.displayTasks)(_to_do.toDoList);
});

_to_do.toDoForm.addEventListener("tasksSubmitted", _ls.saveToLs); // This event listener is listening for a click anywhere in tasks.
//here is the article where I found it:
// https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/
//Then it calls either the delete item function or the completed task function depending on what is clicked. 


_to_do.tasks.addEventListener("click", function (event) {
  var id = parseInt(event.target.value);

  if (event.target.matches("button")) {
    (0, _to_do.deleteItem)(id);
  }

  ;

  if (event.target.matches("input[type = 'checkbox']")) {
    (0, _to_do.completedTasks)(id);
  }

  ;
}); // This listens for any click in the bottom buttons div and then calls functions depending on what is clicked. 


bottomButtons.addEventListener("click", function (event) {
  if (event.target.matches("#all")) {
    (0, _to_do.displayTasks)(_to_do.toDoList);
  }

  ;

  if (event.target.matches("#active")) {
    (0, _to_do.filterNotFinished)();
    (0, _to_do.displayTasks)(_to_do.unfinishedList);
  }

  ;

  if (event.target.matches("#completed")) {
    (0, _to_do.filterFinished)();
    (0, _to_do.displayTasks)(_to_do.finishedList);
  }

  ;
}); //This is calling the get tasks function that retrieves information from local storage

(0, _ls.getTasks)();
},{"./to_do.js":"to_do.js","./ls.js":"ls.js","./utilities.js":"utilities.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57591" + '/');

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
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map