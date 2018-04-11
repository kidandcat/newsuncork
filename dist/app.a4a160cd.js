// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
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

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = h;
exports.app = app;
function h(name, attributes) {
  var rest = [];
  var children = [];
  var length = arguments.length;

  while (length-- > 2) rest.push(arguments[length]);

  while (rest.length) {
    var node = rest.pop();
    if (node && node.pop) {
      for (length = node.length; length--;) {
        rest.push(node[length]);
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(node);
    }
  }

  return typeof name === "function" ? name(attributes || {}, children) : {
    nodeName: name,
    attributes: attributes || {},
    children: children,
    key: attributes && attributes.key
  };
}

function app(state, actions, view, container) {
  var map = [].map;
  var rootElement = container && container.children[0] || null;
  var oldNode = rootElement && recycleElement(rootElement);
  var lifecycle = [];
  var skipRender;
  var isRecycling = true;
  var globalState = clone(state);
  var wiredActions = wireStateToActions([], globalState, clone(actions));

  scheduleRender();

  return wiredActions;

  function recycleElement(element) {
    return {
      nodeName: element.nodeName.toLowerCase(),
      attributes: {},
      children: map.call(element.childNodes, function (element) {
        return element.nodeType === 3 // Node.TEXT_NODE
        ? element.nodeValue : recycleElement(element);
      })
    };
  }

  function resolveNode(node) {
    return typeof node === "function" ? resolveNode(node(globalState, wiredActions)) : node != null ? node : "";
  }

  function render() {
    skipRender = !skipRender;

    var node = resolveNode(view);

    if (container && !skipRender) {
      rootElement = patch(container, rootElement, oldNode, oldNode = node);
    }

    isRecycling = false;

    while (lifecycle.length) lifecycle.pop()();
  }

  function scheduleRender() {
    if (!skipRender) {
      skipRender = true;
      setTimeout(render);
    }
  }

  function clone(target, source) {
    var out = {};

    for (var i in target) out[i] = target[i];
    for (var i in source) out[i] = source[i];

    return out;
  }

  function set(path, value, source) {
    var target = {};
    if (path.length) {
      target[path[0]] = path.length > 1 ? set(path.slice(1), value, source[path[0]]) : value;
      return clone(source, target);
    }
    return value;
  }

  function get(path, source) {
    var i = 0;
    while (i < path.length) {
      source = source[path[i++]];
    }
    return source;
  }

  function wireStateToActions(path, state, actions) {
    for (var key in actions) {
      typeof actions[key] === "function" ? function (key, action) {
        actions[key] = function (data) {
          var result = action(data);

          if (typeof result === "function") {
            result = result(get(path, globalState), actions);
          }

          if (result && result !== (state = get(path, globalState)) && !result.then // !isPromise
          ) {
              scheduleRender(globalState = set(path, clone(state, result), globalState));
            }

          return result;
        };
      }(key, actions[key]) : wireStateToActions(path.concat(key), state[key] = clone(state[key]), actions[key] = clone(actions[key]));
    }

    return actions;
  }

  function getKey(node) {
    return node ? node.key : null;
  }

  function eventListener(event) {
    return event.currentTarget.events[event.type](event);
  }

  function updateAttribute(element, name, value, oldValue, isSvg) {
    if (name === "key") {} else if (name === "style") {
      for (var i in clone(oldValue, value)) {
        var style = value == null || value[i] == null ? "" : value[i];
        if (i[0] === "-") {
          element[name].setProperty(i, style);
        } else {
          element[name][i] = style;
        }
      }
    } else {
      if (name[0] === "o" && name[1] === "n") {
        name = name.slice(2);

        if (element.events) {
          if (!oldValue) oldValue = element.events[name];
        } else {
          element.events = {};
        }

        element.events[name] = value;

        if (value) {
          if (!oldValue) {
            element.addEventListener(name, eventListener);
          }
        } else {
          element.removeEventListener(name, eventListener);
        }
      } else if (name in element && name !== "list" && !isSvg) {
        element[name] = value == null ? "" : value;
      } else if (value != null && value !== false) {
        element.setAttribute(name, value);
      }

      if (value == null || value === false) {
        element.removeAttribute(name);
      }
    }
  }

  function createElement(node, isSvg) {
    var element = typeof node === "string" || typeof node === "number" ? document.createTextNode(node) : (isSvg = isSvg || node.nodeName === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", node.nodeName) : document.createElement(node.nodeName);

    var attributes = node.attributes;
    if (attributes) {
      if (attributes.oncreate) {
        lifecycle.push(function () {
          attributes.oncreate(element);
        });
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i] = resolveNode(node.children[i]), isSvg));
      }

      for (var name in attributes) {
        updateAttribute(element, name, attributes[name], null, isSvg);
      }
    }

    return element;
  }

  function updateElement(element, oldAttributes, attributes, isSvg) {
    for (var name in clone(oldAttributes, attributes)) {
      if (attributes[name] !== (name === "value" || name === "checked" ? element[name] : oldAttributes[name])) {
        updateAttribute(element, name, attributes[name], oldAttributes[name], isSvg);
      }
    }

    var cb = isRecycling ? attributes.oncreate : attributes.onupdate;
    if (cb) {
      lifecycle.push(function () {
        cb(element, oldAttributes);
      });
    }
  }

  function removeChildren(element, node) {
    var attributes = node.attributes;
    if (attributes) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i]);
      }

      if (attributes.ondestroy) {
        attributes.ondestroy(element);
      }
    }
    return element;
  }

  function removeElement(parent, element, node) {
    function done() {
      parent.removeChild(removeChildren(element, node));
    }

    var cb = node.attributes && node.attributes.onremove;
    if (cb) {
      cb(element, done);
    } else {
      done();
    }
  }

  function patch(parent, element, oldNode, node, isSvg) {
    if (node === oldNode) {} else if (oldNode == null || oldNode.nodeName !== node.nodeName) {
      var newElement = createElement(node, isSvg);
      parent.insertBefore(newElement, element);

      if (oldNode != null) {
        removeElement(parent, element, oldNode);
      }

      element = newElement;
    } else if (oldNode.nodeName == null) {
      element.nodeValue = node;
    } else {
      updateElement(element, oldNode.attributes, node.attributes, isSvg = isSvg || node.nodeName === "svg");

      var oldKeyed = {};
      var newKeyed = {};
      var oldElements = [];
      var oldChildren = oldNode.children;
      var children = node.children;

      for (var i = 0; i < oldChildren.length; i++) {
        oldElements[i] = element.childNodes[i];

        var oldKey = getKey(oldChildren[i]);
        if (oldKey != null) {
          oldKeyed[oldKey] = [oldElements[i], oldChildren[i]];
        }
      }

      var i = 0;
      var k = 0;

      while (k < children.length) {
        var oldKey = getKey(oldChildren[i]);
        var newKey = getKey(children[k] = resolveNode(children[k]));

        if (newKeyed[oldKey]) {
          i++;
          continue;
        }

        if (newKey == null || isRecycling) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChildren[i], children[k], isSvg);
            k++;
          }
          i++;
        } else {
          var keyedNode = oldKeyed[newKey] || [];

          if (oldKey === newKey) {
            patch(element, keyedNode[0], keyedNode[1], children[k], isSvg);
            i++;
          } else if (keyedNode[0]) {
            patch(element, element.insertBefore(keyedNode[0], oldElements[i]), keyedNode[1], children[k], isSvg);
          } else {
            patch(element, oldElements[i], null, children[k], isSvg);
          }

          newKeyed[newKey] = children[k];
          k++;
        }
      }

      while (i < oldChildren.length) {
        if (getKey(oldChildren[i]) == null) {
          removeElement(element, oldElements[i], oldChildren[i]);
        }
        i++;
      }

      for (var i in oldKeyed) {
        if (!newKeyed[i]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1]);
        }
      }
    }
    return element;
  }
}
},{}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = Link;

var _hyperapp = require("hyperapp");

function getOrigin(loc) {
  return loc.protocol + "//" + loc.hostname + (loc.port ? ":" + loc.port : "");
}

function isExternal(anchorElement) {
  // Location.origin and HTMLAnchorElement.origin are not
  // supported by IE and Safari.
  return getOrigin(location) !== getOrigin(anchorElement);
}

function Link(props, children) {
  return function (state, actions) {
    var to = props.to;
    var location = state.location;
    var onclick = props.onclick;
    delete props.to;
    delete props.location;

    props.href = to;
    props.onclick = function (e) {
      if (onclick) {
        onclick(e);
      }
      if (e.defaultPrevented || e.button !== 0 || e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || props.target === "_blank" || isExternal(e.currentTarget)) {} else {
        e.preventDefault();

        if (to !== location.pathname) {
          history.pushState(location.pathname, "", to);
        }
      }
    };

    return (0, _hyperapp.h)("a", props, children);
  };
}
},{"hyperapp":5}],18:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseRoute = parseRoute;
function createMatch(isExact, path, url, params) {
  return {
    isExact: isExact,
    path: path,
    url: url,
    params: params
  };
}

function trimTrailingSlash(url) {
  for (var len = url.length; "/" === url[--len];);
  return url.slice(0, len + 1);
}

function decodeParam(val) {
  try {
    return decodeURIComponent(val);
  } catch (e) {
    return val;
  }
}

function parseRoute(path, url, options) {
  if (path === url || !path) {
    return createMatch(path === url, path, url);
  }

  var exact = options && options.exact;
  var paths = trimTrailingSlash(path).split("/");
  var urls = trimTrailingSlash(url).split("/");

  if (paths.length > urls.length || exact && paths.length < urls.length) {
    return;
  }

  for (var i = 0, params = {}, len = paths.length, url = ""; i < len; i++) {
    if (":" === paths[i][0]) {
      params[paths[i].slice(1)] = urls[i] = decodeParam(urls[i]);
    } else if (paths[i] !== urls[i]) {
      return;
    }
    url += urls[i] + "/";
  }

  return createMatch(false, path, url.slice(0, -1), params);
}
},{}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = Route;

var _parseRoute = require("./parseRoute");

function Route(props) {
  return function (state, actions) {
    var location = state.location;
    var match = (0, _parseRoute.parseRoute)(props.path, location.pathname, {
      exact: !props.parent
    });

    return match && props.render({
      match: match,
      location: location
    });
  };
}
},{"./parseRoute":18}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = Switch;
function Switch(props, children) {
  return function (state, actions) {
    var child,
        i = 0;
    while (!(child = children[i] && children[i](state, actions)) && i < children.length) i++;
    return child;
  };
}
},{}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redirect = Redirect;
function Redirect(props) {
  return function (state, actions) {
    var location = state.location;
    history.replaceState(props.from || location.pathname, "", props.to);
  };
}
},{}],16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function wrapHistory(keys) {
  return keys.reduce(function (next, key) {
    var fn = history[key];

    history[key] = function (data, title, url) {
      fn.call(this, data, title, url);
      dispatchEvent(new CustomEvent("pushstate", { detail: data }));
    };

    return function () {
      history[key] = fn;
      next && next();
    };
  }, null);
}

var location = exports.location = {
  state: {
    pathname: window.location.pathname,
    previous: window.location.pathname
  },
  actions: {
    go: function (pathname) {
      history.pushState(null, "", pathname);
    },
    set: function (data) {
      return data;
    }
  },
  subscribe: function (actions) {
    function handleLocationChange(e) {
      actions.set({
        pathname: window.location.pathname,
        previous: e.detail ? window.location.previous = e.detail : window.location.previous
      });
    }

    var unwrap = wrapHistory(["pushState", "replaceState"]);

    addEventListener("pushstate", handleLocationChange);
    addEventListener("popstate", handleLocationChange);

    return function () {
      removeEventListener("pushstate", handleLocationChange);
      removeEventListener("popstate", handleLocationChange);
      unwrap();
    };
  }
};
},{}],6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Link = require("./Link");

Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function () {
    return _Link.Link;
  }
});

var _Route = require("./Route");

Object.defineProperty(exports, "Route", {
  enumerable: true,
  get: function () {
    return _Route.Route;
  }
});

var _Switch = require("./Switch");

Object.defineProperty(exports, "Switch", {
  enumerable: true,
  get: function () {
    return _Switch.Switch;
  }
});

var _Redirect = require("./Redirect");

Object.defineProperty(exports, "Redirect", {
  enumerable: true,
  get: function () {
    return _Redirect.Redirect;
  }
});

var _location = require("./location");

Object.defineProperty(exports, "location", {
  enumerable: true,
  get: function () {
    return _location.location;
  }
});
},{"./Link":12,"./Route":13,"./Switch":14,"./Redirect":15,"./location":16}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = undefined;

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var Header = exports.Header = function Header() {
  return function (state, actions) {
    return (0, _hyperapp.h)(
      "div",
      {
        onclick: function onclick() {
          actions.location.go("/");
        }
      },
      (0, _hyperapp.h)(
        "nav",
        { "uk-navbar": true, "class": "navbar uk-navbar-container uk-navbar-transparent" },
        (0, _hyperapp.h)(
          "div",
          { "class": "uk-navbar-left" },
          (0, _hyperapp.h)(
            "ul",
            { "class": "uk-navbar-nav" },
            (0, _hyperapp.h)(
              "li",
              { "class": "uk-active" },
              (0, _hyperapp.h)(
                "a",
                { "class": "cart-link", href: "/cart" },
                (0, _hyperapp.h)("span", { "uk-icon": "icon: cart; ratio: 0.7" })
              )
            )
          )
        ),
        (0, _hyperapp.h)(
          "div",
          { "class": "uk-navbar-center" },
          (0, _hyperapp.h)(
            "ul",
            { "class": "uk-navbar-nav" },
            (0, _hyperapp.h)(
              "li",
              { "class": "uk-active" },
              (0, _hyperapp.h)(
                "a",
                null,
                (0, _hyperapp.h)("img", {
                  style: {
                    maxHeight: "170px"
                  },
                  src: "/assets/logo.png",
                  alt: "logo"
                })
              )
            )
          )
        ),
        (0, _hyperapp.h)(
          "div",
          { "class": "uk-navbar-right" },
          (0, _hyperapp.h)(
            "ul",
            { "class": "uk-navbar-nav" },
            (0, _hyperapp.h)(
              "li",
              null,
              (0, _hyperapp.h)(
                "a",
                { href: "/language?lang=es" },
                "ES"
              )
            ),
            (0, _hyperapp.h)(
              "li",
              null,
              (0, _hyperapp.h)(
                "a",
                { href: "/language?lang=en" },
                "EN"
              )
            )
          )
        )
      )
    );
  };
};
},{"hyperapp":5,"@hyperapp/router":6}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = undefined;

var _hyperapp = require("hyperapp");

var Footer = exports.Footer = function Footer() {
  return function (state, actions) {
    return (0, _hyperapp.h)(
      "div",
      { "class": "footer" },
      (0, _hyperapp.h)(
        "div",
        { "class": "uk-container uk-text-center uk-position-relative" },
        (0, _hyperapp.h)(
          "ul",
          {
            "uk-margin": "",
            "class": "uk-width-1-1 uk-subnav uk-flex-inline uk-flex-center uk-margin-remove-bottom"
          },
          (0, _hyperapp.h)(
            "li",
            { "class": "uk-width-1-1@s uk-width-1-4@m" },
            (0, _hyperapp.h)(
              "a",
              { href: "mailto:info@suncork.net" },
              (0, _hyperapp.h)(
                "span",
                { "class": "six" },
                "info@suncork.net"
              )
            )
          ),
          (0, _hyperapp.h)(
            "li",
            { "class": "uk-width-1-1@s uk-width-1-2@m" },
            (0, _hyperapp.h)(
              "span",
              { "class": "seven" },
              "\xA9 2018 ",
              (0, _hyperapp.h)(
                "span",
                { "class": "one" },
                "SUNCORK"
              ),
              " All Rights Reserved"
            )
          ),
          (0, _hyperapp.h)(
            "li",
            { "class": "uk-width-1-1@s uk-width-1-4@m" },
            (0, _hyperapp.h)(
              "a",
              { href: "mailto:kidandcat@gmail.com" },
              (0, _hyperapp.h)(
                "span",
                { "class": "six" },
                "Developed by kidandcat"
              )
            )
          )
        )
      )
    );
  };
};
},{"hyperapp":5}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductInfo = undefined;

var _hyperapp = require("hyperapp");

var ProductInfo = exports.ProductInfo = function ProductInfo() {
  return function (state, actions) {
    return (0, _hyperapp.h)(
      "div",
      null,
      "ProductInfo"
    );
  };
};
},{"hyperapp":5}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductIndex = undefined;

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var ProductIndex = exports.ProductIndex = function ProductIndex() {
  return function (state, actions) {
    return (0, _hyperapp.h)(
      "div",
      null,
      (0, _hyperapp.h)(
        "div",
        { "uk-grid": true, "class": "uk-grid-medium uk-grid-match uk-flex-center" },
        (0, _hyperapp.h)(
          "div",
          null,
          "ProductIndex",
          (0, _hyperapp.h)(
            _router.Link,
            { to: "/product" },
            "Product"
          )
        )
      )
    );
  };
};
},{"hyperapp":5,"@hyperapp/router":6}],4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Root = undefined;

var _hyperapp = require("hyperapp");

var _Header = require("/src/components/Header");

var _Footer = require("/src/components/Footer");

var _ProductInfo = require("/src/components/ProductInfo");

var _ProductIndex = require("/src/components/ProductIndex");

var _router = require("@hyperapp/router");

// View
var Root = exports.Root = function Root(state, actions) {
  return (0, _hyperapp.h)(
    "div",
    null,
    (0, _hyperapp.h)(_Header.Header, null),
    (0, _hyperapp.h)(
      "div",
      { "class": "uk-container" },
      (0, _hyperapp.h)(
        _router.Switch,
        null,
        (0, _hyperapp.h)(_router.Route, { path: "/", render: _ProductIndex.ProductIndex }),
        (0, _hyperapp.h)(_router.Route, { path: "/product", render: _ProductInfo.ProductInfo })
      )
    ),
    (0, _hyperapp.h)(_Footer.Footer, null)
  );
};
},{"hyperapp":5,"/src/components/Header":8,"/src/components/Footer":9,"/src/components/ProductInfo":11,"/src/components/ProductIndex":10,"@hyperapp/router":6}],17:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],7:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":17}],3:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],2:[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _Root = require("/src/components/Root");

var _router = require("@hyperapp/router");

require("./css/base.css");

// State
var state = {
  count: 0,
  location: _router.location.state
};

// Actions
var actions = {
  location: _router.location.actions,
  down: function down(v) {
    return function (state) {
      return { count: state.count - v };
    };
  },
  up: function up(v) {
    return function (state) {
      return { count: state.count + v };
    };
  },
  adown: function adown(v) {
    return function (state, actions) {
      return setTimeout(function () {
        return actions.down(v);
      }, 1000);
    };
  },
  aup: function aup(v) {
    return function (state, actions) {
      return setTimeout(function () {
        return actions.up(v);
      }, 1000);
    };
  }
};

// Render
var main = (0, _hyperapp.app)(state, actions, _Root.Root, document.body);

var unsubscribe = _router.location.subscribe(main.location);
},{"hyperapp":5,"/src/components/Root":4,"@hyperapp/router":6,"./css/base.css":3}],24:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49812' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[24,2])
//# sourceMappingURL=/app.a4a160cd.map