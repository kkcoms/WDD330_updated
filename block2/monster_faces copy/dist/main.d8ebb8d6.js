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
})({"scripts/monster.js":[function(require,module,exports) {
//global Variables
var monsterURL = 'https://shakerbaker78.github.io./amy_baker_portfolio/block2/monster_faces/data/monster.json';
var createMonster = document.getElementById("makeMonster"); // get monster info from the JSON file
// fetch the local json data

fetch(monsterURL, {
  method: 'GET'
}).then(function (response) {
  return response.json();
}).then(function (json) {
  //Create a monster object
  var monster = json['monsters']; // display all the body choices    

  function displayBodies() {
    // loop through all items in the bodies object and display the bodies (that sounds so morbid!)
    var body_container = document.querySelector(".body_container");
    var bodies = monster.map(function (body) {
      return "<div class = \"body\" id = \"".concat(body.color, "Body\">\n    <img class \"monsterBody\" id = \"").concat(body.color, "BodyImg\" src = \"").concat(body.body, "\" alt = \"").concat(body.color, " Body\">\n    </div>");
    }).join(""); // Add the list items to the html

    body_container.innerHTML = bodies;
  } //End Display Bodies Function
  // Call display bodies    


  displayBodies(); //function to filter the monster object by color. 

  function filterColor(color) {
    return monster.filter(function (monster) {
      return monster.color == color;
    });
  } // Display all the faces of a given color


  function displayFaces(color) {
    var face_container = document.querySelector(".face_container"); //filter the monster file to an object with only the values from the selected color

    var allFaces = filterColor(color); // create a faces object with all of the faces of one color in it.

    var face = allFaces[0].faces; //Iterate throught the faces aray and find the correct face

    for (var j = 0; j < face.length; j++) {
      //Add the divs that hold the face images
      var faceDiv = document.createElement('div');
      faceDiv.setAttribute('class', 'face');
      faceDiv.setAttribute('id', 'face' + [j]);
      face_container.appendChild(faceDiv); //Add the face images

      var monsterFace = document.createElement('img');
      monsterFace.setAttribute('class', 'monsterFace');
      monsterFace.setAttribute('id', 'faceImg' + [j]);
      monsterFace.setAttribute('src', face[j]);
      monsterFace.setAttribute('alt', "face " + (j + 1));
      document.querySelector('#face' + [j]).appendChild(monsterFace);
    } // End for loop        

  } // End Display Faces Function
  //Call display faces (should I move this to the HTML onload?)


  displayFaces("yellow"); // make a monster function to call the correct body. This will also pass in the color variable for the faces
  //Function takes a color and face number parameter

  function chooseBody(color) {
    var bodyDiv = document.querySelector('.chosenBody'); // Remove the current child of bodyDiv

    if (bodyDiv.hasChildNodes()) {
      bodyDiv.removeChild(bodyDiv.childNodes[0]);
    } //filter the monster object and match the selected color 


    var chosenBody = filterColor(color);
    bodyDiv.setAttribute('id', 'body' + chosenBody[0].color); //dislay the correct colored body

    var monsterImage = document.createElement('img');
    monsterImage.setAttribute('class', 'variableBody');
    monsterImage.setAttribute('src', chosenBody[0].body);
    monsterImage.setAttribute('alt', chosenBody[0].color + " Body");
    bodyDiv.appendChild(monsterImage);
  } //End Choose Body Function


  function chooseFace(color, face_number) {
    var faces = filterColor(color);
    var face = faces[0].faces;
    var faceDiv = document.querySelector('.chosenFace'); // Remove the current child of faceDiv

    if (faceDiv.hasChildNodes()) {
      faceDiv.removeChild(faceDiv.childNodes[0]);
    } //Iterate through the faces aray and find the correct face


    for (var j = 0; j < face.length; j++) {
      if (j == face_number) {
        //Add the correct face to the page
        var monsterFace = document.createElement('img');
        monsterFace.setAttribute('class', 'variableFace' + (face_number + 1));
        monsterFace.setAttribute('src', face[j]);
        monsterFace.setAttribute('alt', "face " + (face_number + 1));
        document.querySelector('.chosenFace').appendChild(monsterFace);
      } //end if statement

    } //end for loop

  } // end choose face
  //Event Listeners


  var bodyButtons = document.querySelector(".body_container");
  var face_container = document.querySelector(".face_container"); // This listens for any clicks on the monster body pictures and displays the body and the matching faces. 

  bodyButtons.addEventListener("click", function (event) {
    if (event.target.matches("#blueBodyImg")) {
      chooseBody("blue"); //Remove the existing content in the face container

      while (face_container.firstChild) {
        face_container.removeChild(face_container.firstChild);
      }

      displayFaces("blue");
      clickFace("blue");
    }

    ;

    if (event.target.matches("#greenBodyImg")) {
      chooseBody("green"); //Remove the existing content in the face container

      while (face_container.firstChild) {
        face_container.removeChild(face_container.firstChild);
      }

      displayFaces("green");
      clickFace("green");
    }

    ;

    if (event.target.matches("#yellowBodyImg")) {
      chooseBody("yellow"); //Remove the existing content in the face container

      while (face_container.firstChild) {
        face_container.removeChild(face_container.firstChild);
      }

      displayFaces("yellow");
      clickFace("yellow");
    }

    ;

    if (event.target.matches("#orangeBodyImg")) {
      chooseBody("orange"); //Remove the existing content in the face container

      while (face_container.firstChild) {
        face_container.removeChild(face_container.firstChild);
      }

      displayFaces("orange");
      clickFace("orange");
    }

    ;
  }); // End the body buttons
  // This listens for any clicks on the monster body pictures and displays the body and the matching faces.
  // It takes color as a parameter

  function clickFace(color) {
    face_container.addEventListener("click", function (event) {
      if (event.target.matches("#faceImg0")) {
        chooseFace(color, 0);
      }

      ;

      if (event.target.matches("#faceImg1")) {
        chooseFace(color, 1);
      }

      ;

      if (event.target.matches("#faceImg2")) {
        chooseFace(color, 2);
      }

      ;

      if (event.target.matches("#faceImg3")) {
        chooseFace(color, 3);
      }

      ;
    }); // End the face buttons
  }

  ;
}); // End Fetch Response
},{}],"scripts/webfonts.js":[function(require,module,exports) {
WebFont.load({
  google: {
    families: ['Arvo', 'Open+Sans', 'Merriweather', 'Special+Elite']
  }
});
},{}],"scripts/main.js":[function(require,module,exports) {
"use strict";

var monster = _interopRequireWildcard(require("./monster.js"));

var fonts = _interopRequireWildcard(require("./webfonts.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./monster.js":"scripts/monster.js","./webfonts.js":"scripts/webfonts.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51378" + '/');

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
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map