/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

/*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT */
;(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.cash = root.$ = factory();
  }
})(this, function () {
  var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, push = ArrayProto.push;

  var noop = function () {}, isFunction = function (item) {
    // @see https://crbug.com/568448
    return typeof item === typeof noop && item.call;
  }, isString = function (item) {
    return typeof item === typeof "";
  };

  var idMatch = /^#[\w-]*$/, classMatch = /^\.[\w-]*$/, htmlMatch = /<.+>/, singlet = /^\w+$/;

  function find(selector, context) {
    context = context || doc;
    var elems = (classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
    return elems;
  }

  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument();
      var base = frag.createElement("base");
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }

    frag.body.innerHTML = str;

    return frag.body.childNodes;
  }

  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }

  function Init(selector, context) {
    if (!selector) {
      return this;
    }

    // If already a cash collection, don't do any further processing
    if (selector.cash && selector !== win) {
      return selector;
    }

    var elems = selector, i = 0, length;

    if (isString(selector)) {
      elems = (idMatch.test(selector) ?
      // If an ID use the faster getElementById check
      doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
      // If HTML, parse it into real elements
      parseHTML(selector) :
      // else use `find`
      find(selector, context));

      // If function, use as shortcut for DOM ready
    } else if (isFunction(selector)) {
      onReady(selector);return this;
    }

    if (!elems) {
      return this;
    }

    // If a single DOM element is passed in or received via ID, return the single element
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      // Treat like an array and loop through each item.
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }

    return this;
  }

  function cash(selector, context) {
    return new Init(selector, context);
  }

  var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };

  Object.defineProperty(fn, "constructor", { value: cash });

  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;

  cash.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments), length = args.length, i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };

  function each(collection, callback) {
    var l = collection.length, i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }

  function getCompareFunction(selector) {
    return (
    /* Use browser's `matches` function if string */
    isString(selector) ? matches :
    /* Match a cash element */
    selector.cash ? function (el) {
      return selector.is(el);
    } :
    /* Direct comparison */
    function (el, selector) {
      return el === selector;
    });
  }

  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }

  cash.extend({
    merge: function (first, second) {
      var len = +second.length, i = first.length, j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },

    each: each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });

  var uid = cash.uid = "_cash" + Date.now();

  function getDataCache(node) {
    return (node[uid] = node[uid] || {});
  }

  function setData(node, key, value) {
    return (getDataCache(node)[key] = value);
  }

  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
    }
    return c[key];
  }

  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr("data-" + name);
    }
  }

  fn.extend({
    data: function (name, value) {
      if (isString(name)) {
        return (value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        }));
      }

      for (var key in name) {
        this.data(key, name[key]);
      }

      return this;
    },

    removeData: function (key) {
      return this.each(function (v) {
        return removeData(v, key);
      });
    }

  });

  var notWhiteMatch = /\S+/g;

  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }

  function hasClass(v, c) {
    return (v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className));
  }

  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }

  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }

  fn.extend({
    addClass: function (c) {
      var classes = getClasses(c);

      return (classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      }) : this);
    },

    attr: function (name, value) {
      if (!name) {
        return undefined;
      }

      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }

        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }

      for (var key in name) {
        this.attr(key, name[key]);
      }

      return this;
    },

    hasClass: function (c) {
      var check = false, classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },

    prop: function (name, value) {
      if (isString(name)) {
        return (value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        }));
      }

      for (var key in name) {
        this.prop(key, name[key]);
      }

      return this;
    },

    removeAttr: function (name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },

    removeClass: function (c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return (classes ? this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      }) : this);
    },

    removeProp: function (name) {
      return this.each(function (v) {
        delete v[name];
      });
    },

    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return (classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      }) : this);
    } });

  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },

    each: function (callback) {
      each(this, callback);
      return this;
    },

    eq: function (index) {
      return cash(this.get(index));
    },

    filter: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = (isFunction(selector) ? selector : getCompareFunction(selector));

      return cash(filter.call(this, function (e) {
        return comparator(e, selector);
      }));
    },

    first: function () {
      return this.eq(0);
    },

    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return (index < 0 ? this[index + this.length] : this[index]);
    },

    index: function (elem) {
      var child = elem ? cash(elem)[0] : this[0], collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },

    last: function () {
      return this.eq(-1);
    }

  });

  var camelCase = (function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g, whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  }());

  var getPrefixedProp = (function () {
    var cache = {}, doc = document, div = doc.createElement("div"), style = div.style;

    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }

      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["webkit", "moz", "ms", "o"], props = (prop + " " + (prefixes).join(ucProp + " ") + ucProp).split(" ");

      each(props, function (p) {
        if (p in style) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });

      return cache[prop];
    };
  }());

  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;

  fn.extend({
    css: function (prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return (arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop]);
      }

      for (var key in prop) {
        this.css(key, prop[key]);
      }

      return this;
    }

  });

  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }

  each(["Width", "Height"], function (v) {
    var lower = v.toLowerCase();

    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };

    fn["inner" + v] = function () {
      return this[0]["client" + v];
    };

    fn["outer" + v] = function (margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });

  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }

  function removeEvent(node, eventName, callback) {
    var events = getData(node, "_cashEvents"), eventCache = (events && events[eventName]), index;

    if (!eventCache) {
      return;
    }

    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }

  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },

    on: function (eventName, delegate, callback, runOnce) {
      // jshint ignore:line

      var originalCallback;

      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }

      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }

      if (eventName === "ready") {
        onReady(callback);
        return this;
      }

      if (delegate) {
        originalCallback = callback;
        callback = function (e) {
          var t = e.target;

          while (!matches(t, delegate)) {
            if (t === this) {
              return (t = false);
            }
            t = t.parentNode;
          }

          if (t) {
            originalCallback.call(t, e);
          }
        };
      }

      return this.each(function (v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function () {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },

    one: function (eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },

    ready: onReady,

    trigger: function (eventName, data) {
      var evt = doc.createEvent("HTMLEvents");
      evt.data = data;
      evt.initEvent(eventName, true, false);
      return this.each(function (v) {
        return v.dispatchEvent(evt);
      });
    }

  });

  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }

  function getSelectMultiple_(el) {
    var values = [];
    each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }

  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }

  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case "select-one":
        return getSelectSingle_(el);
      case "select-multiple":
        return getSelectMultiple_(el);
      case "radio":
        return (el.checked) ? el.value : null;
      case "checkbox":
        return (el.checked) ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }

  fn.extend({
    serialize: function () {
      var query = "";

      each(this[0].elements || this, function (el) {
        if (el.disabled || el.tagName === "FIELDSET") {
          return;
        }
        var name = el.name;
        switch (el.type.toLowerCase()) {
          case "file":
          case "reset":
          case "submit":
          case "button":
            break;
          case "select-multiple":
            var values = getValue(el);
            if (values !== null) {
              each(values, function (value) {
                query += encode(name, value);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name, value);
            }
        }
      });

      return query.substr(1);
    },

    val: function (value) {
      if (value === undefined) {
        return getValue(this[0]);
      } else {
        return this.each(function (v) {
          return v.value = value;
        });
      }
    }

  });

  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }

  function insertContent(parent, child, prepend) {
    var str = isString(child);

    if (!str && child.length) {
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }

    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, (i === 0 ? child : child.cloneNode(true)), prepend);
    });
  }

  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },

    append: function (content) {
      insertContent(this, content);
      return this;
    },

    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },

    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },

    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },

    empty: function () {
      this.html("");
      return this;
    },

    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = (content.nodeType ? content[0].outerHTML : content);
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },

    insertAfter: function (selector) {
      var _this = this;


      cash(selector).each(function (el, i) {
        var parent = el.parentNode, sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore((i === 0 ? v : v.cloneNode(true)), sibling);
        });
      });

      return this;
    },

    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore((i === 0 ? v : v.cloneNode(true)), el);
        });
      });
      return this;
    },

    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },

    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },

    remove: function () {
      return this.each(function (v) {
        return v.parentNode.removeChild(v);
      });
    },

    text: function (content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }

  });

  var docEl = doc.documentElement;

  fn.extend({
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },

    offset: function () {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },

    offsetParent: function () {
      return cash(this[0].offsetParent);
    }

  });

  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);

      return (!selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      }));
    },

    closest: function (selector) {
      if (!selector || this.length < 1) {
        return cash();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },

    is: function (selector) {
      if (!selector) {
        return false;
      }

      var match = false, comparator = getCompareFunction(selector);

      this.each(function (el) {
        match = comparator(el, selector);
        return !match;
      });

      return match;
    },

    find: function (selector) {
      if (!selector || selector.nodeType) {
        return cash(selector && this.has(selector).length ? selector : null);
      }

      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });

      return unique(elems);
    },

    has: function (selector) {
      var comparator = (isString(selector) ? function (el) {
        return find(selector, el).length !== 0;
      } : function (el) {
        return el.contains(selector);
      });

      return this.filter(comparator);
    },

    next: function () {
      return cash(this[0].nextElementSibling);
    },

    not: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = getCompareFunction(selector);

      return this.filter(function (el) {
        return !comparator(el, selector);
      });
    },

    parent: function () {
      var result = [];

      this.each(function (item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });

      return unique(result);
    },

    parents: function (selector) {
      var last, result = [];

      this.each(function (item) {
        last = item;

        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;

          if (!selector || (selector && matches(last, selector))) {
            result.push(last);
          }
        }
      });

      return unique(result);
    },

    prev: function () {
      return cash(this[0].previousElementSibling);
    },

    siblings: function () {
      var collection = this.parent().children(), el = this[0];

      return collection.filter(function (i) {
        return i !== el;
      });
    }

  });


  return cash;
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__countdown_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toggle_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wall_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__spambotscare_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cookies_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cookies_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_cookies_js__);







/*
 * Trigger CTA
 * triggers the CTA when user has scrolled down to #program
 * sets a cookie afterwards so it happens only once
 */
var cookie = __WEBPACK_IMPORTED_MODULE_5_cookies_js___default.a.get("_cta_triggered");
var ctaTriggered = cookie ? true : false;

// Register event handler
if (!ctaTriggered) {
    $(document).on("scroll", triggerCtaHandler);
}

// Event handler
function triggerCtaHandler() {
    if ($(this).scrollTop() >= $("#program").position().top) {
        triggerCTA();
    }
}

// Trigger function
function triggerCTA() {
    ctaTriggered = true;
    $("#newsletterModal").addClass("is-visible");
    __WEBPACK_IMPORTED_MODULE_5_cookies_js___default.a.set("_cta_triggered", "true", { expires: 2592000 });
    $(document).off("scroll", triggerCtaHandler);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cash_dom__);
// import $ from 'jquery';

// import './countdown.min.js';

/*
 countdown.js v2.6.0 http://countdownjs.org
 Copyright (c)2006-2014 Stephen M. McKamey.
 Licensed under The MIT License.
*/
var module,
    countdown = (function(v) {
        function A(a, b) {
            var c = a.getTime();
            a.setMonth(a.getMonth() + b);
            return Math.round((a.getTime() - c) / 864e5);
        }
        function w(a) {
            var b = a.getTime(),
                c = new Date(b);
            c.setMonth(a.getMonth() + 1);
            return Math.round((c.getTime() - b) / 864e5);
        }
        function x(a, b) {
            b =
                b instanceof Date || (null !== b && isFinite(b))
                    ? new Date(+b)
                    : new Date();
            if (!a) return b;
            var c = +a.value || 0;
            if (c) return b.setTime(b.getTime() + c), b;
            (c = +a.milliseconds || 0) &&
                b.setMilliseconds(b.getMilliseconds() + c);
            (c = +a.seconds || 0) && b.setSeconds(b.getSeconds() + c);
            (c = +a.minutes || 0) && b.setMinutes(b.getMinutes() + c);
            (c = +a.hours || 0) && b.setHours(b.getHours() + c);
            (c = +a.weeks || 0) && (c *= 7);
            (c += +a.days || 0) && b.setDate(b.getDate() + c);
            (c = +a.months || 0) && b.setMonth(b.getMonth() + c);
            (c = +a.millennia || 0) && (c *= 10);
            (c += +a.centuries || 0) && (c *= 10);
            (c += +a.decades || 0) && (c *= 10);
            (c += +a.years || 0) && b.setFullYear(b.getFullYear() + c);
            return b;
        }
        function D(a, b) {
            return y(a) + (1 === a ? p[b] : q[b]);
        }
        function n() {}
        function k(a, b, c, e, l, d) {
            0 <= a[c] && ((b += a[c]), delete a[c]);
            b /= l;
            if (1 >= b + 1) return 0;
            if (0 <= a[e]) {
                a[e] = +(a[e] + b).toFixed(d);
                switch (e) {
                    case "seconds":
                        if (60 !== a.seconds || isNaN(a.minutes)) break;
                        a.minutes++;
                        a.seconds = 0;
                    case "minutes":
                        if (60 !== a.minutes || isNaN(a.hours)) break;
                        a.hours++;
                        a.minutes = 0;
                    case "hours":
                        if (24 !== a.hours || isNaN(a.days)) break;
                        a.days++;
                        a.hours = 0;
                    case "days":
                        if (7 !== a.days || isNaN(a.weeks)) break;
                        a.weeks++;
                        a.days = 0;
                    case "weeks":
                        if (a.weeks !== w(a.refMonth) / 7 || isNaN(a.months))
                            break;
                        a.months++;
                        a.weeks = 0;
                    case "months":
                        if (12 !== a.months || isNaN(a.years)) break;
                        a.years++;
                        a.months = 0;
                    case "years":
                        if (10 !== a.years || isNaN(a.decades)) break;
                        a.decades++;
                        a.years = 0;
                    case "decades":
                        if (10 !== a.decades || isNaN(a.centuries)) break;
                        a.centuries++;
                        a.decades = 0;
                    case "centuries":
                        if (10 !== a.centuries || isNaN(a.millennia)) break;
                        a.millennia++;
                        a.centuries = 0;
                }
                return 0;
            }
            return b;
        }
        function B(a, b, c, e, l, d) {
            var f = new Date();
            a.start = b = b || f;
            a.end = c = c || f;
            a.units = e;
            a.value = c.getTime() - b.getTime();
            0 > a.value && ((f = c), (c = b), (b = f));
            a.refMonth = new Date(b.getFullYear(), b.getMonth(), 15, 12, 0, 0);
            try {
                a.millennia = 0;
                a.centuries = 0;
                a.decades = 0;
                a.years = c.getFullYear() - b.getFullYear();
                a.months = c.getMonth() - b.getMonth();
                a.weeks = 0;
                a.days = c.getDate() - b.getDate();
                a.hours = c.getHours() - b.getHours();
                a.minutes = c.getMinutes() - b.getMinutes();
                a.seconds = c.getSeconds() - b.getSeconds();
                a.milliseconds = c.getMilliseconds() - b.getMilliseconds();
                var g;
                0 > a.milliseconds
                    ? ((g = s(-a.milliseconds / 1e3)),
                      (a.seconds -= g),
                      (a.milliseconds += 1e3 * g))
                    : 1e3 <= a.milliseconds &&
                      ((a.seconds += m(a.milliseconds / 1e3)),
                      (a.milliseconds %= 1e3));
                0 > a.seconds
                    ? ((g = s(-a.seconds / 60)),
                      (a.minutes -= g),
                      (a.seconds += 60 * g))
                    : 60 <= a.seconds &&
                      ((a.minutes += m(a.seconds / 60)), (a.seconds %= 60));
                0 > a.minutes
                    ? ((g = s(-a.minutes / 60)),
                      (a.hours -= g),
                      (a.minutes += 60 * g))
                    : 60 <= a.minutes &&
                      ((a.hours += m(a.minutes / 60)), (a.minutes %= 60));
                0 > a.hours
                    ? ((g = s(-a.hours / 24)),
                      (a.days -= g),
                      (a.hours += 24 * g))
                    : 24 <= a.hours &&
                      ((a.days += m(a.hours / 24)), (a.hours %= 24));
                for (; 0 > a.days; ) a.months--, (a.days += A(a.refMonth, 1));
                7 <= a.days && ((a.weeks += m(a.days / 7)), (a.days %= 7));
                0 > a.months
                    ? ((g = s(-a.months / 12)),
                      (a.years -= g),
                      (a.months += 12 * g))
                    : 12 <= a.months &&
                      ((a.years += m(a.months / 12)), (a.months %= 12));
                10 <= a.years &&
                    ((a.decades += m(a.years / 10)),
                    (a.years %= 10),
                    10 <= a.decades &&
                        ((a.centuries += m(a.decades / 10)),
                        (a.decades %= 10),
                        10 <= a.centuries &&
                            ((a.millennia += m(a.centuries / 10)),
                            (a.centuries %= 10))));
                b = 0;
                !(e & 1024) || b >= l
                    ? ((a.centuries += 10 * a.millennia), delete a.millennia)
                    : a.millennia && b++;
                !(e & 512) || b >= l
                    ? ((a.decades += 10 * a.centuries), delete a.centuries)
                    : a.centuries && b++;
                !(e & 256) || b >= l
                    ? ((a.years += 10 * a.decades), delete a.decades)
                    : a.decades && b++;
                !(e & 128) || b >= l
                    ? ((a.months += 12 * a.years), delete a.years)
                    : a.years && b++;
                !(e & 64) || b >= l
                    ? (a.months && (a.days += A(a.refMonth, a.months)),
                      delete a.months,
                      7 <= a.days &&
                          ((a.weeks += m(a.days / 7)), (a.days %= 7)))
                    : a.months && b++;
                !(e & 32) || b >= l
                    ? ((a.days += 7 * a.weeks), delete a.weeks)
                    : a.weeks && b++;
                !(e & 16) || b >= l
                    ? ((a.hours += 24 * a.days), delete a.days)
                    : a.days && b++;
                !(e & 8) || b >= l
                    ? ((a.minutes += 60 * a.hours), delete a.hours)
                    : a.hours && b++;
                !(e & 4) || b >= l
                    ? ((a.seconds += 60 * a.minutes), delete a.minutes)
                    : a.minutes && b++;
                !(e & 2) || b >= l
                    ? ((a.milliseconds += 1e3 * a.seconds), delete a.seconds)
                    : a.seconds && b++;
                if (!(e & 1) || b >= l) {
                    var h = k(a, 0, "milliseconds", "seconds", 1e3, d);
                    if (
                        h &&
                        (h = k(a, h, "seconds", "minutes", 60, d)) &&
                        (h = k(a, h, "minutes", "hours", 60, d)) &&
                        (h = k(a, h, "hours", "days", 24, d)) &&
                        (h = k(a, h, "days", "weeks", 7, d)) &&
                        (h = k(a, h, "weeks", "months", w(a.refMonth) / 7, d))
                    ) {
                        e = h;
                        var n,
                            p = a.refMonth,
                            q = p.getTime(),
                            r = new Date(q);
                        r.setFullYear(p.getFullYear() + 1);
                        n = Math.round((r.getTime() - q) / 864e5);
                        if (
                            (h = k(
                                a,
                                e,
                                "months",
                                "years",
                                n / w(a.refMonth),
                                d
                            ))
                        )
                            if ((h = k(a, h, "years", "decades", 10, d)))
                                if (
                                    (h = k(a, h, "decades", "centuries", 10, d))
                                )
                                    if (
                                        (h = k(
                                            a,
                                            h,
                                            "centuries",
                                            "millennia",
                                            10,
                                            d
                                        ))
                                    )
                                        throw Error("Fractional unit overflow");
                    }
                }
            } finally {
                delete a.refMonth;
            }
            return a;
        }
        function d(a, b, c, e, d) {
            var f;
            c = +c || 222;
            e = 0 < e ? e : NaN;
            d = 0 < d ? (20 > d ? Math.round(d) : 20) : 0;
            var k = null;
            "function" === typeof a
                ? ((f = a), (a = null))
                : a instanceof Date ||
                  (null !== a && isFinite(a)
                      ? (a = new Date(+a))
                      : ("object" === typeof k && (k = a), (a = null)));
            var g = null;
            "function" === typeof b
                ? ((f = b), (b = null))
                : b instanceof Date ||
                  (null !== b && isFinite(b)
                      ? (b = new Date(+b))
                      : ("object" === typeof b && (g = b), (b = null)));
            k && (a = x(k, b));
            g && (b = x(g, a));
            if (!a && !b) return new n();
            if (!f) return B(new n(), a, b, c, e, d);
            var k =
                    c & 1
                        ? 1e3 / 30
                        : c & 2
                          ? 1e3
                          : c & 4
                            ? 6e4
                            : c & 8 ? 36e5 : c & 16 ? 864e5 : 6048e5,
                h,
                g = function() {
                    f(B(new n(), a, b, c, e, d), h);
                };
            g();
            return (h = setInterval(g, k));
        }
        var s = Math.ceil,
            m = Math.floor,
            p,
            q,
            r,
            t,
            u,
            f,
            y,
            z;
        n.prototype.toString = function(a) {
            var b = z(this),
                c = b.length;
            if (!c) return a ? "" + a : u;
            if (1 === c) return b[0];
            a = r + b.pop();
            return b.join(t) + a;
        };
        n.prototype.toHTML = function(a, b) {
            a = a || "span";
            var c = z(this),
                e = c.length;
            if (!e)
                return (b = b || u)
                    ? "\x3c" + a + "\x3e" + b + "\x3c/" + a + "\x3e"
                    : b;
            for (var d = 0; d < e; d++)
                c[d] = "\x3c" + a + "\x3e" + c[d] + "\x3c/" + a + "\x3e";
            if (1 === e) return c[0];
            e = r + c.pop();
            return c.join(t) + e;
        };
        n.prototype.addTo = function(a) {
            return x(this, a);
        };
        z = function(a) {
            var b = [],
                c = a.millennia;
            c && b.push(f(c, 10));
            (c = a.centuries) && b.push(f(c, 9));
            (c = a.decades) && b.push(f(c, 8));
            (c = a.years) && b.push(f(c, 7));
            (c = a.months) && b.push(f(c, 6));
            (c = a.weeks) && b.push(f(c, 5));
            (c = a.days) && b.push(f(c, 4));
            (c = a.hours) && b.push(f(c, 3));
            (c = a.minutes) && b.push(f(c, 2));
            (c = a.seconds) && b.push(f(c, 1));
            (c = a.milliseconds) && b.push(f(c, 0));
            return b;
        };
        d.MILLISECONDS = 1;
        d.SECONDS = 2;
        d.MINUTES = 4;
        d.HOURS = 8;
        d.DAYS = 16;
        d.WEEKS = 32;
        d.MONTHS = 64;
        d.YEARS = 128;
        d.DECADES = 256;
        d.CENTURIES = 512;
        d.MILLENNIA = 1024;
        d.DEFAULTS = 222;
        d.ALL = 2047;
        var E = (d.setFormat = function(a) {
                if (a) {
                    if ("singular" in a || "plural" in a) {
                        var b = a.singular || [];
                        b.split && (b = b.split("|"));
                        var c = a.plural || [];
                        c.split && (c = c.split("|"));
                        for (var d = 0; 10 >= d; d++)
                            (p[d] = b[d] || p[d]), (q[d] = c[d] || q[d]);
                    }
                    "string" === typeof a.last && (r = a.last);
                    "string" === typeof a.delim && (t = a.delim);
                    "string" === typeof a.empty && (u = a.empty);
                    "function" === typeof a.formatNumber &&
                        (y = a.formatNumber);
                    "function" === typeof a.formatter && (f = a.formatter);
                }
            }),
            C = (d.resetFormat = function() {
                p = " millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(
                    ";"
                );
                q = " milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(
                    ";"
                );
                r = " and ";
                t = ", ";
                u = "";
                y = function(a) {
                    return a;
                };
                f = D;
            });
        d.setLabels = function(a, b, c, d, f, k, m) {
            E({
                singular: a,
                plural: b,
                last: c,
                delim: d,
                empty: f,
                formatNumber: k,
                formatter: m
            });
        };
        d.resetLabels = C;
        C();
        v && v.exports
            ? (v.exports = d)
            : "function" === typeof window.define &&
              "undefined" !== typeof window.define.amd &&
              window.define("countdown", [], function() {
                  return d;
              });
        return d;
    })(module);

/**
 * Countdown Timer
 */
var countdownObject = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()("#jsCountdown");
var countdown = countdown(
    new Date(2017, 9, 27, 19, 15),
    function(ts) {
        // console.log( ts.days );
        countdownObject.find("#days").html(spanEach(ts.days));
        countdownObject.find("#hours").html(spanEach(ts.hours));
        countdownObject.find("#minutes").html(spanEach(ts.minutes));
        countdownObject.find("#seconds").html(spanEach(ts.seconds));
    },
    countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
);

function spanEach(string) {
    var array = String(string).split("");
    string = "";
    for (var i = 0; i < array.length; i++) {
        string += "<span>" + array[i] + "</span>";
    }
    return string;
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cash_dom__);
// import $ from 'jquery';


/*
 * Start Animation
 */
__WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(window).ready(function(){
    setTimeout(function(){
        __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(".jsAniStart").addClass("u-ani--start");
    }, 300);
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cash_dom__);
/**
 * Have a button toggle a class on a target
 *
 * data-target - the target selector ".o-example". Target must be
 *               sibling of button.
 * data-class  - the class that is being toggled on the target
 *
 * Toggles the "is-hidden" class on its own children if it exists, eg:
 * <button class="jsToggle" data-target="#target" data-class="class-to-toggle">
 *   <span>more</span>
 *   <span class="u-hidden">less</span>
 * </button>
 */


// import $ from 'jquery-slim';

__WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(".jsToggle").on("click", function(e){
    e.preventDefault();
    var target = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).attr("data-target"),
        css = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).attr("data-class"),
        children = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).children();
    __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(target).toggleClass(css);
    if( __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(children).hasClass("u-hidden") ) {
        __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(children).toggleClass("u-hidden");
    }
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cash_dom__);
/**
 * wall.js is a toggle for the .c-wall component
 * - Use a button like <button class="c-btn jsWallBtn" data-target="#wall"> to
 *   toggle the wall.
 * - html, body { height: 100%; } is required
 * - .u-noscroll { overflow: hidden; } is required
 *
 * @author: Lukas Hermann
 */



var allowScrolling = true;

/*
 * show/hide wall on button press
 */
__WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(".jsWallBtn").on("click", function(e) {
    e.stopPropagation();
    toggleWall(__WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).attr("data-target"));
});

/*
 * hide wall on any click inside
 */
__WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(".jsWall").on("click", function(e) {
    console.log(this);
    toggleWall(this);
});

/*
 * helper function toggles classes
 */
function toggleWall(target) {
    __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(target).toggleClass("is-visible");
    __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(document.body).toggleClass("u-noscroll");
    allowScrolling = !allowScrolling;
}

/*
 * Enable/Disable scrolling on #siteWrapper when mobile nav is open
 * on iPhone/iPad’s Safari
 */
document.body.addEventListener("touchmove", function(e) {
    if (allowScrolling) {
        return true; // Enable scrolling.
    } else {
        e.preventDefault(); // Disable scrolling.
    }
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cash_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cash_dom__);


/*!
 * spambotscare v1.0.0
 * @author: Lukas Hermann <lukas@codethink.de>
 *
 * Use with the following html-tag:
 * <noscript data-defuscate data-name="lukas" data-domain="codethink.de"><em>Diese E-Mail-Adresse ist durch JavaScript geschützt</em></noscript>
 */
function spamrep() { this.href=this.href.replace(/spambotscare/,'') }
(function() {
    var spam = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()("[data-defuscate]");
    spam.each(function(e){
        var n = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).attr("data-name"),
            d = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).attr("data-domain"),
            c = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).attr("data-class"),
            i = __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).attr("data-icon");
        var content = n+"<span style=\"display: none;\">spambotscare</span>"+"@"+d;
        if(i) {
            content = "<span class=\"" + i + "\"></span>" + " " + content;
        }
        var nospam = "<a class=\""+c+"\" data-sbs href=\"mailto"+":"+n+"spambotscare@"+d+"\">"+content+"</a>";
        __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).after( nospam );
        __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()(this).remove();
    });
    __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()("body").on( 'click', "[data-sbs]", spamrep );
    __WEBPACK_IMPORTED_MODULE_0_cash_dom___default()("body").on( 'contextmenu', "[data-sbs]", spamrep );
})();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Cookies.js - 1.2.3
 * https://github.com/ScottHamper/Cookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
    'use strict';

    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('Cookies.js requires a `window` with a `document` object');
        }

        var Cookies = function (key, value, options) {
            return arguments.length === 1 ?
                Cookies.get(key) : Cookies.set(key, value, options);
        };

        // Allows for setter injection in unit tests
        Cookies._document = window.document;

        // Used to ensure cookie keys do not collide with
        // built-in `Object` properties
        Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)
        
        Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

        Cookies.defaults = {
            path: '/',
            secure: false
        };

        Cookies.get = function (key) {
            if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
                Cookies._renewCache();
            }
            
            var value = Cookies._cache[Cookies._cacheKeyPrefix + key];

            return value === undefined ? undefined : decodeURIComponent(value);
        };

        Cookies.set = function (key, value, options) {
            options = Cookies._getExtendedOptions(options);
            options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

            Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

            return Cookies;
        };

        Cookies.expire = function (key, options) {
            return Cookies.set(key, undefined, options);
        };

        Cookies._getExtendedOptions = function (options) {
            return {
                path: options && options.path || Cookies.defaults.path,
                domain: options && options.domain || Cookies.defaults.domain,
                expires: options && options.expires || Cookies.defaults.expires,
                secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
            };
        };

        Cookies._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        };

        Cookies._getExpiresDate = function (expires, now) {
            now = now || new Date();

            if (typeof expires === 'number') {
                expires = expires === Infinity ?
                    Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
            }

            if (expires && !Cookies._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        };

        Cookies._generateCookieString = function (key, value, options) {
            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};

            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';

            return cookieString;
        };

        Cookies._getCacheFromString = function (documentCookie) {
            var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

                if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }

            return cookieCache;
        };

        Cookies._getKeyValuePairFromCookieString = function (cookieString) {
            // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
            var separatorIndex = cookieString.indexOf('=');

            // IE omits the "=" when the cookie value is an empty string
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

            var key = cookieString.substr(0, separatorIndex);
            var decodedKey;
            try {
                decodedKey = decodeURIComponent(key);
            } catch (e) {
                if (console && typeof console.error === 'function') {
                    console.error('Could not decode cookie with key "' + key + '"', e);
                }
            }
            
            return {
                key: decodedKey,
                value: cookieString.substr(separatorIndex + 1) // Defer decoding value until accessed
            };
        };

        Cookies._renewCache = function () {
            Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
            Cookies._cachedDocumentCookie = Cookies._document.cookie;
        };

        Cookies._areEnabled = function () {
            var testKey = 'cookies.js';
            var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
            Cookies.expire(testKey);
            return areEnabled;
        };

        Cookies.enabled = Cookies._areEnabled();

        return Cookies;
    };
    var cookiesExport = (global && typeof global.document === 'object') ? factory(global) : factory;

    // AMD support
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return cookiesExport; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    // CommonJS/Node.js support
    } else if (typeof exports === 'object') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = cookiesExport;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.Cookies = cookiesExport;
    } else {
        global.Cookies = cookiesExport;
    }
})(typeof window === 'undefined' ? this : window);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map