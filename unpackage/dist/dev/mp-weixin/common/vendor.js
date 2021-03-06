(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context????????????
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// ??????????????????
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime ??????????????? uni ???????????????????????????????????? uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // ?????????????????????????????????????????????????????????__id__???????????????????????????mp-weixin??????navigateTo???AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// ?????? api ???????????????
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue ??? false ???????????????????????????????????????????????????????????????????????????
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// ??????????????????
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// ???????????? key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}????????????????????? key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// ???????????? returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// ??????????????? api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// ?????? api ??????????????????
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// ?????? api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:??????[' + service + ']?????????' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // ?????? Vue.prototype ???????????????
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Shopro????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('?????? Vue ??? data ???????????????????????? data ???????????????????????? data ?????????????????? vm ??????????????????????????????????????????????????????', data);
      }
    }
  } else {
    try {
      // ??? data ?????????
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // ????????????????????? render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // ?????????????????????????????????????????????
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // ??????????????????????????? $slots ??? props??????????????? vueSlots ????????? $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO ???????????? mpvue ??? mp ??????
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for ???????????????????????????', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent ????????????????????? event ??????
  if (isCustom) {// ???????????????
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// ???????????????????????? event ??? detail ??????
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent ?????????????????????
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // ???????????? scoped slots ??????????????????????????????????????????
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('?????????????????????');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // ????????? web-view ?????? dataset ?????????
  if (!eventOpts) {
    return console.warn('?????????????????????');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao ?????????????????? scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // ??????????????????????????????????????????????????????????????????????????????
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// ?????????????????????????????????????????????????????? onShow ??? onLaunch ??????
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// ?????? ???2.2.3 ????????????????????? 2.3.0 ??? nextTick ??????
          console.error('?????????????????????????????????????????? ?????????????????????-??????-????????????-????????????????????? ?????????`2.3.0`??????');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm ???????????? globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // ??????????????? globalData
  appOptions.globalData = vm.$options.globalData || {};
  // ??? methods ?????????????????? getApp() ???
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // ??????????????????(????????????:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // ??????????????????
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO ???????????? for ?????? scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail ?????????,value ?????????(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // ???????????????????????????getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // ?????? multipleSlots ??????????????? bug??????????????????????????? ??? u-list?????????????????????
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // ??????????????????
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // ????????? vue ??????
        this.$vm = new VueComponent(options);

        // ??????$slots,$scopedSlots???????????????????????????$slots???
        initSlots(this.$vm, properties.vueSlots);

        // ???????????? setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // ????????? props ???????????? true????????????????????? false ????????? created,ready ??????, ??? attached ?????????
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // ?????? mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 1101:
/*!****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/poster/tools.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default = {
  checkImgHttp: function checkImgHttp(imgPath, type) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res, newPath, pathArr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _this.getImageInfo_PromiseFc(imgPath));case 2:res = _context.sent;
              newPath = '';if (
              res) {_context.next = 20;break;}
              uni.hideLoading();_context.t0 =
              type;_context.next = _context.t0 ===
              'avatar' ? 9 : _context.t0 ===


              'bgImage' ? 11 : _context.t0 ===


              'wxCode' ? 13 : _context.t0 ===


              'goodsImage' ? 15 : 17;break;case 9:console.log('%cerr:????????????????????????', 'color:green;background:yellow');return _context.abrupt("break", 18);case 11:console.log('%cerr:????????????????????????', 'color:green;background:yellow');return _context.abrupt("break", 18);case 13:console.log('%cerr:?????????????????????????????????', 'color:green;background:yellow');return _context.abrupt("break", 18);case 15:
              console.log('%cerr:????????????????????????', 'color:green;background:yellow');return _context.abrupt("break", 18);case 17:return _context.abrupt("break", 18);case 18:_context.next = 23;break;case 20:





              pathArr = imgPath.split('://');





              pathArr[0] = 'https';

              newPath = pathArr.join('://');case 23:return _context.abrupt("return",


              newPath);case 24:case "end":return _context.stop();}}}, _callee);}))();
  },
  // ????????????????????????
  getImageInfo_PromiseFc: function getImageInfo_PromiseFc(imgPath) {var _this2 = this;
    return new Promise(function (rs, rj) {
      imgPath = _this2.checkMPUrl(imgPath);
      uni.getImageInfo({
        src: imgPath,
        success: function success(res) {
          rs(1);
        },
        fail: function fail(err) {
          rs(0);
        } });

    });
  },
  // ????????????
  checkMPUrl: function checkMPUrl(url) {

    if (
    url.substring(0, 4) === 'http' &&
    url.substring(0, 5) !== 'https' &&
    url.substring(0, 12) !== 'http://store' &&
    url.substring(0, 10) !== 'http://tmp' &&
    url.substring(0, 10) !== 'http://usr')
    {
      url = 'https' + url.substring(4, url.length);
    }

    return url;
  },

  /**
      * ????????????
      * @param {Object} bgObj -  ????????????????????????
      * @param {Number} num -  ?????????????????????????????????
      */
  getScale: function getScale(bgObj) {var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Number(bgObj.width * (num / bgObj.width).toFixed(2));
  },



  /**
      * ????????????
      * @param {Object} bgObj -  ????????????????????????
      * @param {Array} drawArr -  ????????????????????????
      */
  initDrawArray: function initDrawArray(bgObj, drawArr) {var _this3 = this;
    var that = this;
    var arr = [];
    drawArr.forEach(function (item) {var _item$lineFeed, _item$lineFeed2, _item$lineFeed3, _item$lineFeed4, _item$lineThrough, _item$lineThrough2, _item$lineThrough3, _item$lineThrough4, _arr$push, _item$circleSet, _item$circleSet2, _item$circleSet3, _item$roundRectSet, _arr$push2;
      switch (item.type) {
        case 'text':
          arr.push((_arr$push = {
            type: 'text',
            text: item.text, //??????
            size: that.getScale(bgObj, item.size) || 50, //??????
            color: item.color || 'black', //??????
            alpha: item.alpha || 1, //?????????
            textAlign: item.textAlign || 'left', //??????x????????????: 'left'???'middle'???'right'
            textBaseline: item.textBaseline ||
            'middle', //??????y????????????: 'top'???'bottom'???'middle'???'normal'
            dx: that.getScale(bgObj, item.dx) || 0, //??????x?????????
            dy: that.getScale(bgObj, item.dy + item.size) || 0 }, _defineProperty(_arr$push,
          item.lineFeed ? 'lineFeed' : '', { //????????????
            maxWidth: ((_item$lineFeed = item.lineFeed) === null || _item$lineFeed === void 0 ? void 0 : _item$lineFeed.maxWidth) && that.getScale(bgObj, item.lineFeed.
            maxWidth) || bgObj.
            width, //????????????
            lineHeight: ((_item$lineFeed2 = item.lineFeed) === null || _item$lineFeed2 === void 0 ? void 0 : _item$lineFeed2.lineHeight) && that.getScale(bgObj, item.
            lineFeed.lineHeight) || 50, //??????
            lineNum: ((_item$lineFeed3 = item.lineFeed) === null || _item$lineFeed3 === void 0 ? void 0 : _item$lineFeed3.lineNum) || -1, // ?????????????????????0?????????
            dx: ((_item$lineFeed4 = item.lineFeed) === null || _item$lineFeed4 === void 0 ? void 0 : _item$lineFeed4.dx) || -1 //?????????????????????????????????0???????????????
          }), _defineProperty(_arr$push, "infoCallBack",
          function infoCallBack(textLength) {//?????????????????????????????????
            if (item.isBgCenter) {
              return {
                dx: (bgObj.width - textLength) / 2 };

            }
            return {};
          }), _defineProperty(_arr$push,
          item.lineThrough ? 'lineThrough' : '', { // ???????????????????????????????????????
            width: ((_item$lineThrough = item.lineThrough) === null || _item$lineThrough === void 0 ? void 0 : _item$lineThrough.width) || item.size / 10,
            style: ((_item$lineThrough2 = item.lineThrough) === null || _item$lineThrough2 === void 0 ? void 0 : _item$lineThrough2.style) || item.color,
            alpha: ((_item$lineThrough3 = item.lineThrough) === null || _item$lineThrough3 === void 0 ? void 0 : _item$lineThrough3.alpha) || 1,
            cap: ((_item$lineThrough4 = item.lineThrough) === null || _item$lineThrough4 === void 0 ? void 0 : _item$lineThrough4.cap) || 'butt' }), _defineProperty(_arr$push, "fontStyle",

          item.fontStyle || 'normal'), _defineProperty(_arr$push, "fontVariant",
          item.fontVariant || 'normal'), _defineProperty(_arr$push, "fontWeight",
          item.fontWeight || 'normal'), _defineProperty(_arr$push, "fontFamily",
          item.fontFamily || 'sans-serif'), _arr$push));

          break;
        case 'qrcode':
          arr.push({
            type: 'qrcode',
            text: String(item.text || '') || '', // ????????????
            size: Number(that.getScale(bgObj, item.size) || 0) || 200, // ???????????????
            background: String(item.background || '') || '#ffffff', // ?????????
            foreground: String(item.foreground || '') || '#000000', // ?????????
            correctLevel: Number(item.correctLevel || 0) || 3, // ????????????
            image: String(item.image || '') || '', // ???????????????
            imageSize: Number(that.getScale(bgObj, item.imageSize) || 0) || 40, // ?????????????????????
            dx: item.isBgCenter ? (bgObj.width - item.size) / 2 : Number(that.getScale(
            bgObj, item.dx) || 0) || 0,
            dy: Number(that.getScale(bgObj, item.dy) || 0) || 0 // y?????????
          });

          break;
        case 'image':
          arr.push((_arr$push2 = {
            type: 'image',
            url: _this3.checkImgHttp(item.url, item.name), // ??????????????????
            dWidth: Number(that.getScale(bgObj, item.dWidth) || 0) || 100, //????????????????????????????????????
            dHeight: Number(that.getScale(bgObj, item.dHeight) || 0) || 100, //????????????????????????????????????
            sWidth: Number(that.getScale(bgObj, item.sWidth) || 0) || 100, //????????????????????????????????????
            sHeight: Number(that.getScale(bgObj, item.sHeight) || 0) || 100, //????????????????????????????????????
            dx: Number(that.getScale(bgObj, item.dx) || 0) || 0, // x?????????
            dy: Number(that.getScale(bgObj, item.dy) || 0) || 0, // y?????????
            sx: Number(that.getScale(bgObj, item.sx) || 0) || 0,
            sy: Number(that.getScale(bgObj, item.sy) || 0) || 0 }, _defineProperty(_arr$push2,
          item.circleSet ? 'circleSet' : '', { //????????????
            r: Number(((_item$circleSet = item.circleSet) === null || _item$circleSet === void 0 ? void 0 : _item$circleSet.r) && that.getScale(bgObj, item.circleSet.
            r) || 0),
            x: Number(((_item$circleSet2 = item.circleSet) === null || _item$circleSet2 === void 0 ? void 0 : _item$circleSet2.x) && that.getScale(bgObj, item.circleSet.
            x) || 0),
            y: Number(((_item$circleSet3 = item.circleSet) === null || _item$circleSet3 === void 0 ? void 0 : _item$circleSet3.y) && that.getScale(bgObj, item.circleSet.
            y) || 0) }), _defineProperty(_arr$push2,

          item.roundRectSet ? 'roundRectSet' : '', { //????????????
            r: Number(((_item$roundRectSet = item.roundRectSet) === null || _item$roundRectSet === void 0 ? void 0 : _item$roundRectSet.r) && that.getScale(bgObj, item.
            roundRectSet.r) || 0) }), _defineProperty(_arr$push2, "infoCallBack",

          function infoCallBack(imgInfo) {//?????????????????????????????????
            if (item.isBgCenter) {
              return {
                dx: (bgObj.width - item.dWidth) / 2 };

            }
          }), _arr$push2));

          break;
        default:
          _app.log('???????????????');
          break;}

    });
    return arr;
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 13:
/*!*****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/wechat/wechat.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));







var _index = _interopRequireDefault(__webpack_require__(/*! @/shopro/request/index */ 17));
var _platform = _interopRequireDefault(__webpack_require__(/*! @/shopro/platform */ 20));
var _store = _interopRequireDefault(__webpack_require__(/*! @/shopro/store */ 22));
var _env = __webpack_require__(/*! @/env */ 19);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =



{
  eventMap: function eventMap(event) {
    var map = '';
    switch (event) {
      case 'login':
        map = '?????????...';
        break;
      case 'refresh':
        map = '?????????...';
        break;
      case 'bind':
        map = '?????????...';
        break;}

    return map;
  },

  login: function login() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var token;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              token = '';_context.next = 3;return (

                _this.wxMiniProgramOauth('login'));case 3:token = _context.sent;return _context.abrupt("return",
              token);case 5:case "end":return _context.stop();}}}, _callee);}))();








  },
  refresh: function refresh() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var token;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              token = '';_context2.next = 3;return (

                _this2.wxMiniProgramOauth('refresh'));case 3:token = _context2.sent;return _context2.abrupt("return",
              token);case 5:case "end":return _context2.stop();}}}, _callee2);}))();








  },
  bind: function bind() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var token;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              token = '';_context3.next = 3;return (

                _this3.wxMiniProgramOauth('bind'));case 3:token = _context3.sent;return _context3.abrupt("return",
              token);case 5:case "end":return _context3.stop();}}}, _callee3);}))();








  },












































































  // ???????????????????????????
  getWxMiniProgramSessionKey: function getWxMiniProgramSessionKey() {var autoLogin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var that = this;
    var sessionStatus = false;
    var session_key = '';
    return new Promise(function (resolve, reject) {
      uni.checkSession({
        success: function success(res) {
          if (res.errMsg === 'checkSession:ok') sessionStatus = true;
        },
        complete: function complete() {
          if (uni.getStorageSync('session_key') && sessionStatus && !autoLogin) {
            resolve(uni.getStorageSync('session_key'));
          } else {
            uni.login({
              success: function success(info) {
                var code = info.code;
                (0, _index.default)('user.getWxMiniProgramSessionKey', {
                  code: code,
                  autoLogin: autoLogin }).
                then(function (res) {
                  if (res.code === 1) {
                    uni.setStorageSync('session_key', res.
                    data.session_key);
                    if (autoLogin) {
                      if (res.data.token) {
                        resolve(res.data.token);
                      } else {
                        resolve(false);
                      }
                    }
                    resolve(res.data.session_key);
                  } else {
                    reject(res.msg);
                  }
                });
              } });

          }
        } });

    });
  },

  // ???????????????????????????????????????
  wxMiniProgramOauth: function wxMiniProgramOauth() {var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'login';
    var that = this;
    uni.showLoading({
      title: that.eventMap(event) });

    return new Promise(function (resolve, reject) {
      uni.getUserProfile({ // ????????????????????????
        desc: '??????????????????', // ??????????????????????????????????????????????????????????????????????????????????????????
        success: function () {var _success = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(res) {return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!(
                    res.errMsg === "getUserProfile:ok")) {_context4.next = 11;break;}_context4.t0 =
                    _index.default;_context4.t1 =
                    event;_context4.next = 5;return (
                      that.getWxMiniProgramSessionKey(false));case 5:_context4.t2 = _context4.sent;_context4.t3 =
                    res.encryptedData;_context4.t4 =
                    res.iv;_context4.t5 =
                    res.signature;_context4.t6 = { event: _context4.t1, session_key: _context4.t2, encryptedData: _context4.t3, iv: _context4.t4, signature: _context4.t5 };(0, _context4.t0)('user.wxMiniProgramOauth', _context4.t6).
                    then(function (res) {
                      if (res.code === 1) {
                        resolve(res.data.token);
                      } else {
                        uni.removeStorageSync('session_key');
                        resolve(false);
                      }
                    });case 11:case "end":return _context4.stop();}}}, _callee4);}));function success(_x) {return _success.apply(this, arguments);}return success;}(),


        complete: function complete(res) {
          uni.hideLoading();
        } });

    });

  },

  // ???????????????
  checkMiniProgramUpdate: function checkMiniProgramUpdate() {
    if (uni.canIUse('getUpdateManager')) {
      var updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // ?????????????????????????????????
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            uni.showModal({
              title: '????????????',
              content: '????????????????????????????????????????????????',
              success: function success(res) {
                if (res.confirm) {
                  // ???????????????????????????????????? applyUpdate ????????????????????????
                  updateManager.applyUpdate();
                }
              } });

          });
          updateManager.onUpdateFailed(function () {
            // ????????????????????????
            uni.showModal({
              title: '????????????????????????~',
              content: '????????????????????????~??????????????????????????????????????????????????????~' });

          });
        }
      });
    }
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 15);

/***/ }),

/***/ 15:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 16);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 16:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 169:
/*!********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/permission/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));




var _mp = _interopRequireDefault(__webpack_require__(/*! ./mp.js */ 170));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} //???????????????
var









Auth = /*#__PURE__*/function () {

  function Auth(authType) {_classCallCheck(this, Auth);
    this.authType = authType;
  }_createClass(Auth, [{ key: "check", value: function () {var _check = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var state;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:


                state = 0;_context.next = 3;return (

                  new _mp.default(this.authType).checkAuth());case 3:state = _context.sent;return _context.abrupt("return",







                Promise.resolve(state));case 5:case "end":return _context.stop();}}}, _callee, this);}));function check() {return _check.apply(this, arguments);}return check;}() }]);return Auth;}();exports.default = Auth;

/***/ }),

/***/ 17:
/*!*****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/request/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = http;var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 18));
var _apis = _interopRequireDefault(__webpack_require__(/*! ./apis.js */ 21));
var _index = _interopRequireDefault(__webpack_require__(/*! @/shopro/store/index.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var shoproRequest = new _request.default();
function http(
url)


// ?????????????????????
{var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var toastBefore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var toastAfter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var api = getApiPath(url);
  /* ????????????????????? */
  shoproRequest.interceptor.request(function (config, cancel) {
    var token = uni.getStorageSync('token');
    if (api.auth && !token) {
      _index.default.dispatch('showAuthModal');
      uni.hideLoading();
      throw "\u6682\u672A\u767B\u5F55,\u5DF2\u963B\u6B62\u6B64\u6B21API\u8BF7\u6C42: '".concat(api.url, "'");
    }
    token && shoproRequest.setConfig(function (config) {
      config.header.token = token;
    });
    if (toastBefore !== '') {
      uni.showLoading({
        title: toastBefore,
        mask: true });

    }
    return config;
  });

  /* ????????????????????? */
  shoproRequest.interceptor.response(function (response) {
    uni.hideLoading();
    if (response.code === 0) {
      if (toastAfter) {
        uni.showToast({
          title: response.msg || '????????????,????????????',
          icon: 'none',
          duration: 1000,
          mask: true });

      }

    }

    // token????????????
    if (response.code === 401) {
      _index.default.dispatch('logout');
      _index.default.dispatch('showAuthModal');
      throw "\u767B\u5F55\u5DF2\u8FC7\u671F\u6216\u6CE8\u9500,\u5DF2\u963B\u6B62\u6B64\u6B21API\u8BF7\u6C42: '".concat(api.url, "'");
    }
    return response;
  });

  return shoproRequest.request({
    url: api.url,
    data: data,
    method: api.method });


}

// ??????????????????
function getApiPath(url) {
  var apiArray = url.split(".");
  var api = _apis.default;
  apiArray.forEach(function (v) {
    api = api[v];
  });
  return api;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 170:
/*!*****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/permission/mp.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * ?????????????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param {String} scopeValue - ???????????????isMessage?????????????????????,??????false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   *                         
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */

var TIPS_MAP = {
  'userInfo': '????????????',
  'userLocation': '????????????', //?????????manifest?????????permission???
  'address': '????????????',
  'userLocationBackground': '????????????',
  'record': '????????????',
  'writePhotosAlbum': '???????????????',
  'camera': '?????????',
  'invoice': '????????????',
  'invoiceTitle': '????????????',
  'werun': '????????????',
  'message': '????????????' };var


MpAuth = /*#__PURE__*/function () {

  function MpAuth(scopeValue) {_classCallCheck(this, MpAuth);
    this.scopeValue = scopeValue;
    this.isMessage = scopeValue === 'message' ? true : false;
  }

  // ???????????????????????????????????????
  _createClass(MpAuth, [{ key: "checkAuth", value: function checkAuth() {var _this = this;
      var that = this;
      return new Promise(function (resolve, reject) {
        uni.getSetting({
          withSubscriptions: that.isMessage, //?????????????????????????????????????????????
          success: function success(res) {
            if (!that.isMessage) {// ???????????????
              if (!res.authSetting["scope.".concat(
              _this.scopeValue)]) {//????????????????????????????????????????????????????????????
                uni.authorize({ //?????????????????????????????????????????????????????????success????????????????????????fai
                  scope: "scope.".concat(_this.scopeValue),
                  success: function success(res) {//????????????
                    console.log("%c\u7528\u6237\u540C\u610F".concat(
                    TIPS_MAP[_this.scopeValue], "\u6743\u96501"),
                    'color:green;background:yellow');
                    resolve(1);
                  },
                  fail: function fail(err) {//????????????
                    console.log("%c\u7528\u6237\u62D2\u7EDD".concat(
                    TIPS_MAP[_this.scopeValue], "\u6743\u9650"),
                    'color:green;background:yellow');
                    resolve(0);
                    that.setAuth();
                  } });

              } else {//????????????????????????????????????????????????
                console.log("%c\u7528\u6237\u540C\u610F".concat(TIPS_MAP[_this.scopeValue], "\u6743\u96502"),
                'color:green;background:yellow');
                resolve(1);
              }
            } else {//???????????? TODO

            }
          },
          fail: function fail(err) {
            console.log("%cuni.getSetting\u5931\u8D25\uFF1A", 'color:green;background:yellow');
            console.log(err);
          } });

      });


    }

    // ????????????????????????
  }, { key: "setAuth", value: function setAuth() {
      uni.showModal({
        title: '????????????',
        content: "\u5F53\u524D\u529F\u80FD\u9700\u8981".concat(TIPS_MAP[this.scopeValue], "\u6743\u9650\uFF0C\u662F\u5426\u5F00\u542F\uFF1F"),
        confirmText: '????????????',
        success: function success(res) {
          res.confirm && uni.openSetting();
        },
        fail: function fail(err) {
          console.log("%cuni.showModal\u5931\u8D25\uFF1A", 'color:green;background:yellow');
        } });

    } }]);return MpAuth;}();exports.default = MpAuth;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!*******************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/request/request.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));






var _env = __webpack_require__(/*! @/env */ 19);


var _index = _interopRequireDefault(__webpack_require__(/*! @/shopro/platform/index */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {
  function Request() {var _this = this;_classCallCheck(this, Request);
    // ????????????
    this.config = {
      baseUrl: _env.API_URL,
      header: {
        'content-type': 'application/json',
        'platform': _index.default.get() },

      url: '',
      data: {},
      params: {},
      method: 'GET',
      dataType: 'json',

      responseType: 'text',

      custom: {} };





    /* ????????? */
    this.interceptor = {
      request: function request(cb) {
        if (cb) {
          _this.requestBefore = cb;
        } else {
          _this.requestBefore = function (request) {return request;};
        }
      },
      response: function response(cb) {
        if (cb) {
          _this.requestAfter = cb;
        } else {
          _this.requestAfter = function (response) {return response;};
        }
      } };

  }

  /* ??????url???????????? */_createClass(Request, [{ key: "setConfig",






















    /*??????????????????*/value: function setConfig(
    func) {
      return func(this.config);
    }

    /**
       * @Function
       * @param {Object} options - ???????????????
       * @prop {String} options.url - ????????????
       * @prop {Object} options.data - ????????????
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - ?????????????????????
       * @prop {Object} [options.dataType = config.dataType] - ???????????? json??????????????????????????????????????? JSON.parse
       * @prop {Object} [options.header = config.header] - ??????header
       * @prop {Object} [options.method = config.method] - ????????????
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this2 = this;var options,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                options = _objectSpread(_objectSpread(_objectSpread({},
                options),
                this.config),
                this.requestBefore(options));return _context.abrupt("return",

                new Promise(function (resolve, reject) {
                  var mergeUrl = Request.isUrl(options.url) ? options.url : options.baseUrl + options.url;
                  if (JSON.stringify(options.params) !== '{}') {
                    var query = Request.addQueryString(options.params);
                    mergeUrl += mergeUrl.indexOf('?') === -1 ? "?".concat(query) : "&".concat(query);
                  }
                  options.url = mergeUrl;
                  options.success = function (res) {
                    resolve(_this2.requestAfter(res.data));
                  };
                  options.fail = function (err) {
                    reject(_this2.requestAfter(err));
                  };
                  uni.request(options);
                }));case 3:case "end":return _context.stop();}}}, _callee, this);}));function request() {return _request.apply(this, arguments);}return request;}() }, { key: "get", value: function get(


    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }], [{ key: "isUrl", value: function isUrl(url) {return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);} }, { key: "addQueryString", value: function addQueryString(params) {var paramsData = '';Object.keys(params).forEach(function (key) {paramsData += key + '=' + encodeURIComponent(params[key]) + '&';});return paramsData.substring(0, paramsData.length - 1);} /* ????????? */ }, { key: "requestBefore", value: function requestBefore(config) {return config;} /* ????????? */ }, { key: "requestAfter", value: function requestAfter(response) {return response;} }]);return Request;}();exports.default = Request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/env.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.HAS_LIVE = exports.MAP_KEY = exports.IMG_URL = exports.API_URL = exports.BASE_URL = void 0; /**
                                                                                                                                                                                *  Shopro?????????????????? v1.3.2
                                                                                                                                                                                */

// export const BASE_URL = 'https://demo.shopro.top' //???????????????
var BASE_URL = 'http://127.0.0.1:7001'; //???????????????
exports.BASE_URL = BASE_URL;var API_URL = "".concat(BASE_URL, "/addons/shopro/"); //??????????????????
exports.API_URL = API_URL;var IMG_URL = 'http://file.shopro.top'; //?????????????????????????????????css???????????????????????????uni.scss
// export const MAP_KEY = '426ebc3f1*****0689ee6061a98'; //?????????????????????Web??????key,???????????????
exports.IMG_URL = IMG_URL;var MAP_KEY = '2450b10ab393da61175ef32f51da965f'; //?????????????????????Web??????key,???????????????
exports.MAP_KEY = MAP_KEY;var HAS_LIVE = false; //??????????????????????????????,???????????????manifest.json??????????????????????????????????????????
exports.HAS_LIVE = HAS_LIVE;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx ????????????????????? plugins ???????????????????????????????????????????????????????????????????????? copyAugment ??????
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // ?????? externalClass ????????????(????????? externalClass ????????????????????????)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx ?????? hack ??? uni-app ???????????? name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//?????? observer ??? setData callback ?????????????????????????????? warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field ????????????
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Shopro????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick ?????? ??? setData ??? setData ??????????????????
    //2.nextTick ???????????? render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Shopro????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Shopro????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // ???????????? vm ?????????????????????
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO ??????????????????????????????????????? list=>l0 ??? list ??????????????????????????????????????????
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //????????? data ???????????????
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Shopro????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']????????????',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js ?????? new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay ???????????? selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO ???????????? string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // ??????????????????????????????????????????
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // ???????????????????????????????????????
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!******************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/platform/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * Platform v1.0.0
                                                                                                      * @Class Platform
                                                                                                      * @description shopro-platform 1.0.0 ???????????????
                                                                                                      * @Author lidongtony
                                                                                                      * @Date 2021-04-07
                                                                                                      * @Email lidongtony@qq.com
                                                                                                      */var _default =








{

  // ????????????????????????
  get: function get() {
    var platform = '';







    platform = 'wxMiniProgram';




    if (platform !== '') {
      uni.setStorageSync('platform', platform);
    } else {
      uni.showToast({
        title: '?????????????????????',
        icon: 'none' });

    }
    return platform;
  },
  set: function set(platform) {
    uni.setStorageSync('platform', platform);
    return platform;
  },

  // ????????????????????????
  device: function device() {
    return uni.getSystemInfoSync().platform;
  },

  // ????????????????????????
  host: function host() {
    var host = location.origin;
    var basePath = router.$route.options.base;
    var mode = router.$route.options.mode;
    host += basePath;
    if (mode === 'hash') {
      host += '#/';
    }
    return host;
  },

  // ??????wechat jssdk ????????????(??????IOS????????????????????????)
  entry: function entry() {
    var that = this;
    var entryUrl = location.href;
    if (this.device() === 'ios') {
      if (typeof location.entryUrl !== 'undefined') {
        entryUrl = location.entryUrl;
      } else {
        location.entryUrl = entryUrl;
      }
    }
    return entryUrl;
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/request/apis.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /**
                                                                                                                                                                                                                                                                                                                * ??????????????????
                                                                                                                                                                                                                                                                                                                */var _default =
{

  /** ?????? ??? **/
  common: {
    init: {
      url: 'index/init',
      auth: false,
      method: 'GET'
      // desc: '???????????????',end
    },
    chat: {
      url: 'chat.index/init',
      auth: false,
      method: 'GET'
      // desc: '?????????????????????',
    },
    upload: {
      url: 'index/upload',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    template: {
      url: 'index/template_yqs',
      auth: false,
      method: 'GET'
      // desc: '????????????',end
    },
    custom: {
      url: 'index/custom',
      auth: false,
      method: 'GET'
      // desc: '?????????????????????',
    },
    live: {
      url: 'live',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    wxJssdk: {
      url: 'wechat/jssdk',
      auth: false,
      method: 'POST'
      // desc: '??????Jssdk',
    },
    syncPages: {
      url: 'index/asyncPages',
      auth: false,
      method: 'POST'
      // desc: '????????? DEV?????????????????????',end
    },
    debug: {
      url: 'index/debugLog',
      auth: false,
      method: 'POST'
      // desc: '??????DEBUG??????',
    },
    richText: {
      url: 'index/richtext',
      auth: false,
      method: 'GET'
      // desc: '???????????????',
    },
    shareAdd: {
      url: 'share/add',
      auth: false,
      method: 'POST'
      // desc: '??????????????????',
    },
    smsSend: {
      url: 'sms/send',
      auth: false,
      method: 'POST'
      // desc: '????????????',
    } },


  /** ?????? ??? **/
  category: {
    info: {
      url: 'category/detail',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    detail: {
      url: 'category',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    list: {
      url: 'category/list',
      auth: false,
      method: 'GET'
      // desc: '????????????????????????',
    } },



  /** ?????? ??? **/
  store: {
    list: {
      url: 'store/index',
      auth: true,
      method: 'GET'
      // desc: '????????????????????????storeId',
    },
    info: {
      url: 'store.store/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    order: {
      url: 'store.order/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    orderDetail: {
      url: 'store.order/detail',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    orderSend: {
      url: 'store.order/send',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    orderConfirm: {
      url: 'store.order/confirm',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    apply: {
      url: 'store.apply/apply',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    shopInfo: {
      url: 'store.apply/info',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    } },


  /** ?????? ??? **/
  goods: {
    lists: {
      url: 'goods/lists',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    seckillList: {
      url: 'goods/seckillList',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    activity: {
      url: 'goods/activity',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    myGroupon: {
      url: 'activity_groupon/myGroupon',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    grouponDetail: {
      url: 'activity_groupon/detail',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    grouponItem: {
      url: 'activity_groupon/index',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    grouponList: {
      url: 'goods/grouponList',
      auth: false,
      method: 'GET'
      // desc: '??????????????????',
    },
    detail: {
      url: 'goods/detail',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    favorite: {
      url: 'goods/favorite',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },

    storeAddress: {
      url: 'goods/store',
      auth: true,
      method: 'GET'
      // desc: '????????????????????????',
    },
    scoreList: {
      url: 'score_goods_sku_price/index',
      auth: false,
      method: 'GET'
      // desc: '??????????????????',
    },
    scoreDetail: {
      url: 'score_goods_sku_price/detail',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    },
    commentList: {
      url: 'goods_comment/index',
      auth: false,
      method: 'GET'
      // desc: '??????????????????',
    },
    commentType: {
      url: 'goods_comment/type',
      auth: false,
      method: 'GET'
      // desc: '??????????????????',
    } },


  /** ?????? ??? **/
  user: {

    accountLogin: {
      url: 'user/accountLogin',
      auth: false,
      method: 'POST'
      // desc: '??????????????????',
    },

    smsLogin: {
      url: 'user/smsLogin',
      auth: false,
      method: 'POST'
      // desc: '????????????',
    },

    register: {
      url: 'user/register',
      auth: false,
      method: 'POST'
      // desc: '??????',
    },

    forgotPwd: {
      url: 'user/forgotPwd',
      auth: false,
      method: 'POST'
      // desc: '????????????',
    },

    bindMobile: {
      url: 'user/bindMobile',
      auth: true,
      method: 'POST'
      // desc: '???????????????',
    },

    changePwd: {
      url: 'user/changePwd',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },

    info: {
      url: 'user',
      auth: true,
      method: 'GET'
      // desc: '????????????',end
    },

    profile: {
      url: 'user/profile',
      auth: true,
      method: 'POST'
      // desc: '??????????????????',end
    },
    logout: {
      url: 'user/logout',
      auth: true,
      method: 'POST'
      // desc: '????????????',end
    },

    getWxMiniProgramSessionKey: {
      url: 'user/getWxMiniProgramSessionKey',
      auth: false,
      method: 'POST'
      // desc: '????????????session_key',
    },

    wxMiniProgramOauth: {
      url: 'user/wxMiniProgramOauth',
      auth: false,
      method: 'POST'
      // desc: '?????????????????????',
    },

    wxOpenPlatformOauth: {
      url: 'user/wxOpenPlatformOauth',
      auth: false,
      method: 'POST'
      // desc: '??????APP??????',
    },

    thirdOauthInfo: {
      url: 'user/thirdOauthInfo',
      auth: true,
      method: 'GET'
      // desc: '?????????????????????',
    },
    unbindThirdOauth: {
      url: 'user/unbindThirdOauth',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },

    signList: {
      url: 'user_sign/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    sign: {
      url: 'user_sign/sign',
      auth: true,
      method: 'POST'
      // desc: '??????',
    },
    messageIds: {
      url: 'notification/template',
      auth: true,
      method: 'GET'
      // desc: '??????????????????ids',
    },
    favoriteList: {
      url: 'goods/favoriteList',
      auth: true,
      method: 'GET'
      // desc: '??????????????????',
    },
    viewList: {
      url: 'goods/viewList',
      auth: true,
      method: 'GET'
      // desc: '????????????',end
    },
    viewDelete: {
      url: 'goods/viewDelete',
      auth: true,
      method: 'POST'
      // desc: '????????????',end
    },
    userData: {
      url: 'user/userData',
      auth: true,
      method: 'GET'
      // desc: '??????????????????',
    },
    appleIdOauth: {
      url: 'user/appleIdOauth',
      auth: false,
      method: 'POST'
      // desc: 'appleId??????',
    } },


  /** ?????? ??? **/
  address: {
    area: {
      url: 'address/area',
      auth: false,
      method: 'GET'
      // desc: '?????????',
    },
    list: {
      url: 'address',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    edit: {
      url: 'address/edit',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    defaults: {
      url: 'address/defaults',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    info: {
      url: 'address/info',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    del: {
      url: 'address/del',
      auth: true,
      method: 'POST'
      // desc: '??????',
    } },


  /** ???????????? ??? **/
  other: {
    faqList: {
      url: 'faq',
      auth: false,
      method: 'GET'
      // desc: '??????????????????',
    },
    feedbackType: {
      url: 'feedback/type',
      auth: true,
      method: 'GET'
      // desc: '??????????????????',
    },
    feedbackAdd: {
      url: 'feedback/add',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    commentAdd: {
      url: 'comment/submit',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    commentList: {
      url: 'comment/list',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    } },


  /** ????????? ??? **/
  cart: {
    index: {
      url: 'cart',
      auth: true,
      method: 'POST'
      // desc: '?????????????????????',
    },
    add: {
      url: 'cart/add',
      auth: true,
      method: 'POST'
      // desc: '???????????????',
    },

    edit: {
      url: 'cart/edit',
      auth: true,
      method: 'POST'
      // desc: '???????????????',
    } },


  /** ?????? ??? **/
  order: _defineProperty({
    index: {
      url: 'order/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    pre: {
      url: 'rider_order/pre',
      auth: true,
      method: 'POST'
      // desc: '??????????????????',
    },
    createOrder: {
      url: 'order/createOrder',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    detail: {
      url: 'order/detail',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    itemDetail: {
      url: 'order/itemDetail',
      auth: true,
      method: 'GET'
      // desc: '??????????????????',
    },
    confirm: {
      url: 'order/confirm',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    cancel: {
      url: 'order/cancel',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    comment: {
      url: 'order/comment',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    coupons: {
      url: 'rider_order/coupons',
      auth: true,
      method: 'POST'
      // desc: '?????????????????????',
    },
    aftersale: {
      url: 'order_aftersale/aftersale',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    aftersaleList: {
      url: 'order_aftersale/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    aftersaleDetail: {
      url: 'order_aftersale/detail',
      auth: true,
      method: 'GET'
      // desc: '??????????????????',
    },
    deleteOrder: {
      url: 'order/delete',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    deleteAftersaleOrder: {
      url: 'order_aftersale/delete',
      auth: true,
      method: 'POST'
      // desc: '??????????????????',
    },
    cancelAftersaleOrder: {
      url: 'order_aftersale/cancel',
      auth: true,
      method: 'POST'
      // desc: '??????????????????',
    },
    expressList: {
      url: 'order_express/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    expressDetail: {
      url: 'order_express/detail',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    } }, "itemDetail",
  {
    url: 'order/itemDetail',
    auth: true,
    method: 'GET'
    // desc: '??????????????????',
  }),


  /** ???????????? ??? **/
  money: {
    prepay: {
      url: 'pay/prepay',
      auth: true,
      method: 'POST'
      // desc: '????????????',
    },
    walletApply: {
      url: 'user_wallet_apply/apply',
      auth: true,
      method: 'POST'
      // desc: '????????????',end
    },
    walletRule: {
      url: 'user_wallet_apply/rule',
      auth: true,
      method: 'GET'
      // desc: '????????????',end
    },
    walletLog: {
      url: 'user_wallet_log',
      auth: true,
      method: 'GET'
      // desc: '??????,????????????',end
    },
    bankInfo: {
      url: 'user_bank/info',
      auth: true,
      method: 'GET'
      // desc: '???????????????',end
    },
    bankEdit: {
      url: 'user_bank/edit',
      auth: true,
      method: 'POST'
      // desc: '?????????????????????',end
    },
    withdrawLog: {
      url: 'user_wallet_apply/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',end
    } },


  /** ????????? ??? **/
  coupons: {
    list: {
      url: 'coupons',
      auth: false,
      method: 'GET'
      // desc: '???????????????????????????',
    },
    templateList: {
      url: 'coupons/lists',
      auth: false,
      method: 'GET'
      // desc: '???????????????',
    },
    get: {
      url: 'coupons/get',
      auth: true,
      method: 'GET'
      // desc: '??????',
    },
    detail: {
      url: 'coupons/detail',
      auth: true,
      method: 'GET'
      // desc: '???????????????',
    },
    goods: {
      url: 'coupons/goods',
      auth: false,
      method: 'GET'
      // desc: '????????????',
    } },


  /** ?????? ??? **/
  commission: {
    auth: {
      url: 'commission.agent/info',
      auth: true,
      method: 'GET'
      // desc: '??????????????????',
    },
    log: {
      url: 'commission.log/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    goods: {
      url: 'commission.goods/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    ranking: {
      url: 'commission.agent/ranking',
      auth: true,
      method: 'GET'
      // desc: '??????????????????',
    },
    form: {
      url: 'commission.agent/agentForm',
      auth: true,
      method: 'GET'
      // desc: '???????????????????????????',
    },
    apply: {
      url: 'commission.agent/applyForm',
      auth: true,
      method: 'POST'
      // desc: '?????????????????????',
    },
    team: {
      url: 'commission.agent/team',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    share: {
      url: 'share/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    orderLog: {
      url: 'commission.order/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    rewardLog: {
      url: 'commission.reward/index',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    },
    lv: {
      url: 'commission.agent/level',
      auth: true,
      method: 'GET'
      // desc: '????????????',
    } } };exports.default = _default;

/***/ }),

/***/ 22:
/*!***************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/store/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));


var _shopro = _interopRequireDefault(__webpack_require__(/*! ./modules/shopro.js */ 23));
var _user = _interopRequireDefault(__webpack_require__(/*! ./modules/user.js */ 28));
var _cart = _interopRequireDefault(__webpack_require__(/*! ./modules/cart.js */ 30));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  modules: {
    shopro: _shopro.default,
    user: _user.default,
    cart: _cart.default } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 23:
/*!************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/store/modules/shopro.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! @/shopro/request/index */ 17));
var _store = _interopRequireDefault(__webpack_require__(/*! @/shopro/store */ 22));
var _router = __webpack_require__(/*! @/shopro/router */ 24);


var _share = _interopRequireDefault(__webpack_require__(/*! @/shopro/share */ 26));
var _types = __webpack_require__(/*! ../types.js */ 27);var _mutations;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var state = {
  config: uni.getStorageSync('config') ? uni.getStorageSync('config') : {},
  routes: [],
  template: uni.getStorageSync('template') ? uni.getStorageSync('template') : {},
  hasTemplate: true, //?????????????????????
  shareInfo: {} };


var actions = {

  appInit: function appInit(_ref,

  options) {var commit = _ref.commit;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('common.init').then(function (res) {
        if (res.code === 1) {var _options$query;
          commit('CONFIG', res.data);
          if (!(options === null || options === void 0 ? void 0 : (_options$query = options.query) === null || _options$query === void 0 ? void 0 : _options$query.token)) {
            _store.default.dispatch('autoLogin');
            _store.default.dispatch('getTemplate', options);
            _store.default.dispatch('getShareInfo');
          }

        }
        resolve(res.data);
      }).catch(function (e) {
        reject(e);
      });
    });
  },

  // ??????????????????
  getTemplate: function getTemplate(_ref2,

  options) {var commit = _ref2.commit;
    return new Promise(function (resolve, reject) {
      var shop_id = 0;







      if (options === null || options === void 0 ? void 0 : options.query.scene) {
        var scene = decodeURIComponent(options === null || options === void 0 ? void 0 : options.query.scene);
        var sceneObj = scene.split('=');
        if (sceneObj[0] === 'shop_id') {
          shop_id = sceneObj[1];
        }
      }

      (0, _index.default)('common.template', {
        shop_id: shop_id }).
      then(function (res) {
        res.code === 0 ? commit('hasTemplate', false) : commit('hasTemplate', true);
        if (res.code === 1) {
          commit('TEMPLATE', res.data);
          uni.setStorageSync('template', res.data);
        }
        resolve(res);
      }).catch(function (e) {
        reject(e);

      });
    });
  },

  getShareInfo: function getShareInfo(_ref3)

  {var commit = _ref3.commit;
    var shareInfo = _share.default.setShareInfo();
    commit('SHARE_INFO', shareInfo);
    return shareInfo;
  },

  // ??????????????????
  syncPages: function syncPages(_ref4)

  {var commit = _ref4.commit;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('common.syncPages', {
        data: [{"path":"/pages/index/category","aliasPath":"/","meta":{"auth":false,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/index/cart","meta":{"auth":false,"async":true,"title":"?????????","group":"??????"}},{"path":"/pages/index/user","meta":{"auth":false,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/index/view","name":"view","meta":{"auth":false,"async":true,"title":"???????????????","group":"??????"}},{"path":"/pages/activity/sign/index","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/activity/seckill/list","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/activity/groupon/list","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/activity/groupon/detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/activity/groupon/my-groupon","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/activity/discounts/list","meta":{"auth":false,"async":false,"title":"??????????????????","group":"??????"}},{"path":"/pages/app/score/list","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/coupon/list","meta":{"auth":true,"async":true,"title":"???????????????","group":"?????????"}},{"path":"/pages/app/coupon/detail","meta":{"auth":true,"async":true,"title":"???????????????","group":"?????????"}},{"path":"/pages/app/merchant/index","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/app/merchant/apply","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/merchant/detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/app/merchant/info","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/app/merchant/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/index","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/team","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/commission-log","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/order","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/goods","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/apply","meta":{"auth":true,"async":true,"title":"???????????????","group":"??????"}},{"path":"/pages/app/commission/rankings","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/share-log","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/goods/list","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/goods/detail","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/goods/comment/add-comment","meta":{"auth":false,"async":false,"title":"??????","group":"??????"}},{"path":"/pages/goods/comment/comment-list","meta":{"auth":false,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/confirm","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/payment/method","meta":{"auth":true,"async":false,"title":"?????????","group":"??????"}},{"path":"/pages/order/payment/result","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/order/detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/after-sale/detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/after-sale/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/order/after-sale/log","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/after-sale/refund","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/express/distribution-detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/express/express-detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/express/express-list","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/express/store-address","meta":{"auth":true,"async":false,"title":"???????????????","group":"??????"}},{"path":"/pages/public/faq","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/public/feedback","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/public/chat/index","meta":{"auth":true,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/public/search","meta":{"auth":false,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/public/richtext","meta":{"auth":false,"async":true,"title":"?????????","group":"??????"}},{"path":"/pages/public/webview","meta":{"auth":false,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/public/404","name":"404"},{"path":"/pages/public/loading"},{"path":"/pages/user/info","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/set","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/view-log","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/wallet/index","meta":{"auth":true,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/user/wallet/withdraw","meta":{"auth":true,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/user/wallet/withdraw-log","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/wallet/score-balance","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/address1/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/address1/edit","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/user/address2/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/address2/edit","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/user/favorite","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}}] }).
      then(function (res) {
        commit('PAGE_ROUTES', res.data);
        resolve(res);
      }).catch(function (e) {
        reject(e);
      });
    });
  } };


var mutations = (_mutations = {}, _defineProperty(_mutations,
_types.CONFIG, function (state, data) {
  state.config = data;
  uni.setStorageSync('config', data);
}), _defineProperty(_mutations,
_types.TEMPLATE, function (state, data) {
  state.template = data;
}), _defineProperty(_mutations,
_types.PAGE_ROUTES, function (state, data) {
  state.routes = data;
}), _defineProperty(_mutations,
_types.SHARE_INFO, function (state, data) {
  state.shareInfo = data;
}), _defineProperty(_mutations, "hasTemplate", function hasTemplate(
state, data) {
  state.hasTemplate = data;
}), _defineProperty(_mutations, "delPopup", function delPopup(

state, index) {
  var templateData = state.template;
  uni.removeStorageSync('template');
  templateData.popup[0].content.list.splice(index, 1);
  uni.setStorageSync('template', templateData);
  state.template = templateData;
}), _mutations);


var getters = {};var _default =



{
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/router/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "RouterMount", { enumerable: true, get: function get() {return _uniSimpleRouter.RouterMount;} });exports.router = void 0;
var _uniSimpleRouter = __webpack_require__(/*! uni-simple-router */ 25);



var _store = _interopRequireDefault(__webpack_require__(/*! @/shopro/store */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}
var router = (0, _uniSimpleRouter.createRouter)({
  platform: "mp-weixin",
  routerErrorEach: function routerErrorEach(_ref)


  {var type = _ref.type,msg = _ref.msg;
    switch (type) {
      case 3: // APP????????????












        break;
      case 2:
        router.$lockStatus = false;
        break;
      default:
        break;}


  },
  // ????????????????????????????????????404
  routes: [].concat(_toConsumableArray([{"path":"/pages/index/category","aliasPath":"/","meta":{"auth":false,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/index/cart","meta":{"auth":false,"async":true,"title":"?????????","group":"??????"}},{"path":"/pages/index/user","meta":{"auth":false,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/index/view","name":"view","meta":{"auth":false,"async":true,"title":"???????????????","group":"??????"}},{"path":"/pages/activity/sign/index","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/activity/seckill/list","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/activity/groupon/list","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/activity/groupon/detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/activity/groupon/my-groupon","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/activity/discounts/list","meta":{"auth":false,"async":false,"title":"??????????????????","group":"??????"}},{"path":"/pages/app/score/list","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/coupon/list","meta":{"auth":true,"async":true,"title":"???????????????","group":"?????????"}},{"path":"/pages/app/coupon/detail","meta":{"auth":true,"async":true,"title":"???????????????","group":"?????????"}},{"path":"/pages/app/merchant/index","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/app/merchant/apply","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/merchant/detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/app/merchant/info","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/app/merchant/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/index","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/team","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/commission-log","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/order","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/goods","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/apply","meta":{"auth":true,"async":true,"title":"???????????????","group":"??????"}},{"path":"/pages/app/commission/rankings","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/app/commission/share-log","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/goods/list","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/goods/detail","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/goods/comment/add-comment","meta":{"auth":false,"async":false,"title":"??????","group":"??????"}},{"path":"/pages/goods/comment/comment-list","meta":{"auth":false,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/confirm","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/payment/method","meta":{"auth":true,"async":false,"title":"?????????","group":"??????"}},{"path":"/pages/order/payment/result","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/order/detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/after-sale/detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/after-sale/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/order/after-sale/log","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/after-sale/refund","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/express/distribution-detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/express/express-detail","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/express/express-list","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/order/express/store-address","meta":{"auth":true,"async":false,"title":"???????????????","group":"??????"}},{"path":"/pages/public/faq","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/public/feedback","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/public/chat/index","meta":{"auth":true,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/public/search","meta":{"auth":false,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/public/richtext","meta":{"auth":false,"async":true,"title":"?????????","group":"??????"}},{"path":"/pages/public/webview","meta":{"auth":false,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/public/404","name":"404"},{"path":"/pages/public/loading"},{"path":"/pages/user/info","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/set","meta":{"auth":false,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/view-log","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/wallet/index","meta":{"auth":true,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/user/wallet/withdraw","meta":{"auth":true,"async":true,"title":"??????","group":"??????"}},{"path":"/pages/user/wallet/withdraw-log","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/wallet/score-balance","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/address1/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/address1/edit","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/user/address2/list","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}},{"path":"/pages/user/address2/edit","meta":{"auth":true,"async":false,"title":"????????????","group":"??????"}},{"path":"/pages/user/favorite","meta":{"auth":true,"async":true,"title":"????????????","group":"??????"}}]), [
  {
    path: '*',
    redirect: function redirect(to) {
      return {
        name: '404' };

    } }]) });




//????????????????????????
exports.router = router;router.beforeEach(function (to, from, next) {
  // ??????????????????
  if (to.meta && to.meta.auth && !_store.default.state.user.isLogin) {
    _store.default.dispatch('showAuthModal');
    next(false);
  } else {
    next();
  }
});

/***/ }),

/***/ 25:
/*!**************************************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/node_modules/uni-simple-router/dist/uni-simple-router.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {!function (e, t) { true ? module.exports = t() : undefined;}(self, function () {return e = { 779: function _(e, t, r) {var o = r(173);e.exports = function e(t, r, n) {return o(r) || (n = r || n, r = []), n = n || {}, t instanceof RegExp ? function (e, t) {var r = e.source.match(/\((?!\?)/g);if (r) for (var o = 0; o < r.length; o++) {t.push({ name: o, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null });}return c(e, t);}(t, r) : o(t) ? function (t, r, o) {for (var n = [], a = 0; a < t.length; a++) {n.push(e(t[a], r, o).source);}return c(new RegExp("(?:" + n.join("|") + ")", s(o)), r);}(t, r, n) : function (e, t, r) {return f(a(e, r), t, r);}(t, r, n);}, e.exports.parse = a, e.exports.compile = function (e, t) {return u(a(e, t), t);}, e.exports.tokensToFunction = u, e.exports.tokensToRegExp = f;var n = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");function a(e, t) {for (var r, o = [], a = 0, i = 0, u = "", c = t && t.delimiter || "/"; null != (r = n.exec(e));) {var s = r[0],f = r[1],h = r.index;if (u += e.slice(i, h), i = h + s.length, f) u += f[1];else {var v = e[i],y = r[2],g = r[3],d = r[4],m = r[5],b = r[6],O = r[7];u && (o.push(u), u = "");var P = null != y && null != v && v !== y,k = "+" === b || "*" === b,j = "?" === b || "*" === b,w = r[2] || c,R = d || m;o.push({ name: g || a++, prefix: y || "", delimiter: w, optional: j, repeat: k, partial: P, asterisk: !!O, pattern: R ? p(R) : O ? ".*" : "[^" + l(w) + "]+?" });}}return i < e.length && (u += e.substr(i)), u && o.push(u), o;}function i(e) {return encodeURI(e).replace(/[\/?#]/g, function (e) {return "%" + e.charCodeAt(0).toString(16).toUpperCase();});}function u(e, t) {for (var r = new Array(e.length), n = 0; n < e.length; n++) {"object" == typeof e[n] && (r[n] = new RegExp("^(?:" + e[n].pattern + ")$", s(t)));}return function (t, n) {for (var a = "", u = t || {}, l = (n || {}).pretty ? i : encodeURIComponent, p = 0; p < e.length; p++) {var c = e[p];if ("string" != typeof c) {var s,f = u[c.name];if (null == f) {if (c.optional) {c.partial && (a += c.prefix);continue;}throw new TypeError('Expected "' + c.name + '" to be defined');}if (o(f)) {if (!c.repeat) throw new TypeError('Expected "' + c.name + '" to not repeat, but received `' + JSON.stringify(f) + "`");if (0 === f.length) {if (c.optional) continue;throw new TypeError('Expected "' + c.name + '" to not be empty');}for (var h = 0; h < f.length; h++) {if (s = l(f[h]), !r[p].test(s)) throw new TypeError('Expected all "' + c.name + '" to match "' + c.pattern + '", but received `' + JSON.stringify(s) + "`");a += (0 === h ? c.prefix : c.delimiter) + s;}} else {if (s = c.asterisk ? encodeURI(f).replace(/[?#]/g, function (e) {return "%" + e.charCodeAt(0).toString(16).toUpperCase();}) : l(f), !r[p].test(s)) throw new TypeError('Expected "' + c.name + '" to match "' + c.pattern + '", but received "' + s + '"');a += c.prefix + s;}} else a += c;}return a;};}function l(e) {return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");}function p(e) {return e.replace(/([=!:$\/()])/g, "\\$1");}function c(e, t) {return e.keys = t, e;}function s(e) {return e && e.sensitive ? "" : "i";}function f(e, t, r) {o(t) || (r = t || r, t = []);for (var n = (r = r || {}).strict, a = !1 !== r.end, i = "", u = 0; u < e.length; u++) {var p = e[u];if ("string" == typeof p) i += l(p);else {var f = l(p.prefix),h = "(?:" + p.pattern + ")";t.push(p), p.repeat && (h += "(?:" + f + h + ")*"), i += h = p.optional ? p.partial ? f + "(" + h + ")?" : "(?:" + f + "(" + h + "))?" : f + "(" + h + ")";}}var v = l(r.delimiter || "/"),y = i.slice(-v.length) === v;return n || (i = (y ? i.slice(0, -v.length) : i) + "(?:" + v + "(?=$))?"), i += a ? "$" : n && y ? "" : "(?=" + v + "|$)", c(new RegExp("^" + i, s(r)), t);}}, 173: function _(e) {e.exports = Array.isArray || function (e) {return "[object Array]" == Object.prototype.toString.call(e);};}, 844: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.buildVueRouter = t.buildVueRoutes = void 0;var n = r(366),a = r(883),i = r(789),u = r(169);t.buildVueRoutes = function (e, t) {for (var r = e.routesMap, o = r.pathMap, l = r.finallyPathList, p = Object.keys(t), c = 0; c < p.length; c++) {var s = p[c],f = o[s],h = t[s];if (f) {var v = i.getRoutePath(f, e).finallyPath;if (v instanceof Array) throw new Error("??? vueRouterDev ????????????alias???aliasPath???path ??????????????????????????? " + JSON.stringify(f));null != f.name && (h.name = f.name);var y = h.path,g = h.alias;delete h.alias, h.path = v, "/" === y && null != g && (h.alias = g, h.path = y), f.beforeEnter && (h.beforeEnter = function (t, r, o) {u.onTriggerEachHook(t, r, e, n.hookToggle.enterHooks, o);});} else a.warn(s + " ???????????????????????????????????????????????????????????????", e, !0);}return l.includes("*") && (t["*"] = o["*"]), t;}, t.buildVueRouter = function (e, t, r) {var n;n = "[object Array]" === i.getDataType(r) ? r : Object.values(r);var a = e.options.h5,u = a.scrollBehavior,l = a.fallback,p = t.options.scrollBehavior;t.options.scrollBehavior = function (e, t, r) {return p && p(e, t, r), u(e, t, r);}, t.fallback = l;var c = new t.constructor(o(o({}, e.options.h5), { base: t.options.base, mode: t.options.mode, routes: n }));t.matcher = c.matcher;};}, 147: function _(e, t) {"use strict";var _r,o = this && this.__extends || (_r = function r(e, t) {return (_r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var r in t) {Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);}})(e, t);}, function (e, t) {function o() {this.constructor = e;}_r(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());});Object.defineProperty(t, "__esModule", { value: !0 }), t.proxyH5Mount = t.proxyEachHook = t.MyArray = void 0;var n = function (e) {function t(r, o, n, a) {var i = e.call(this) || this;return i.router = r, i.vueEachArray = o, i.myEachHook = n, i.hookName = a, Object.setPrototypeOf(i, t.prototype), i;}return o(t, e), t.prototype.push = function (e) {var t = this;this.vueEachArray.push(e);var r = this.length;this[this.length] = function (e, o, n) {r > 0 ? t.vueEachArray[r](e, o, function () {n && n();}) : t.myEachHook(e, o, function (a) {!1 === a ? n(!1) : t.vueEachArray[r](e, o, function (e) {n(a);});}, t.router, !0);};}, t;}(Array);t.MyArray = n, t.proxyEachHook = function (e, t) {for (var r = ["beforeHooks", "afterHooks"], o = 0; o < r.length; o++) {var a = r[o],i = e.lifeCycle[a][0];if (i) {var u = t[a];t[a] = new n(e, u, i, a);}}}, t.proxyH5Mount = function (e) {var t;if (0 === e.mount.length) {if (null === (t = e.options.h5) || void 0 === t ? void 0 : t.vueRouterDev) return;navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && setTimeout(function () {if (document.getElementsByTagName("uni-page").length > 0) return !1;window.location.reload();}, 0);} else e.mount[0].app.$mount(), e.mount = [];};}, 814: function _(e, t) {"use strict";var r = this && this.__assign || function () {return (r = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.runtimeQuit = t.registerLoddingPage = void 0;var o = null;t.registerLoddingPage = function (e) {if (e.options.registerLoadingPage) {var t = e.options.APP,o = t.loadingPageHook,n = t.loadingPageStyle;o(new plus.nativeObj.View("router-loadding", r({ top: "0px", left: "0px", height: "100%", width: "100%" }, n())));}}, t.runtimeQuit = function (e) {void 0 === e && (e = "????????????????????????");var t = +new Date();o ? t - o < 1e3 && plus.runtime.quit() : (o = t, uni.showToast({ title: e, icon: "none", position: "bottom", duration: 1e3 }), setTimeout(function () {o = null;}, 1e3));};}, 334: function _(e, t) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.getEnterPath = void 0, t.getEnterPath = function (e, t) {switch (t.options.platform) {case "mp-alipay":case "mp-weixin":case "mp-toutiao":case "mp-qq":return e.$options.mpInstance.route;case "mp-baidu":return e.$options.mpInstance.is || e.$options.mpInstance.pageinstance.route;}return e.$options.mpInstance.route;};}, 282: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);},n = this && this.__rest || function (e, t) {var r = {};for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);}if (null != e && "function" == typeof Object.getOwnPropertySymbols) {var n = 0;for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);}}return r;};Object.defineProperty(t, "__esModule", { value: !0 }), t.notCallProxyHook = t.proxyVueSortHookName = t.indexProxyHook = t.appProxyHook = t.lifeCycle = t.baseConfig = t.mpPlatformReg = t.keyword = void 0;var a = r(883),i = r(789);t.keyword = ["query"], t.mpPlatformReg = "(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)", t.baseConfig = { h5: { paramsToQuery: !1, vueRouterDev: !1, vueNext: !1, mode: "hash", base: "/", linkActiveClass: "router-link-active", linkExactActiveClass: "router-link-exact-active", scrollBehavior: function scrollBehavior(e, t, r) {return { x: 0, y: 0 };}, fallback: !0 }, APP: { registerLoadingPage: !0, loadingPageStyle: function loadingPageStyle() {return JSON.parse('{"backgroundColor":"#FFF"}');}, loadingPageHook: function loadingPageHook(e) {e.show();}, launchedHook: function launchedHook() {plus.navigator.closeSplashscreen();}, animation: {} }, applet: { animationDuration: 300 }, platform: "h5", keepUniOriginNav: !1, debugger: !1, routerBeforeEach: function routerBeforeEach(e, t, r) {r();}, routerAfterEach: function routerAfterEach(e, t) {}, routerErrorEach: function routerErrorEach(e, t) {t.$lockStatus = !1, a.err(e, t, !0);}, detectBeforeLock: function detectBeforeLock(e, t, r) {}, routes: [{ path: "/choose-location" }, { path: "/open-location" }, { path: "/preview-image" }] }, t.lifeCycle = { beforeHooks: [], afterHooks: [], routerBeforeHooks: [], routerAfterHooks: [], routerErrorHooks: [] }, t.appProxyHook = { app: { created: [], beforeMount: [], mounted: [], onLaunch: [], onShow: [], onHide: [], beforeDestroy: [], destroyed: [] } }, t.indexProxyHook = { app: t.appProxyHook.app, page: function (e) {e.onLaunch;var t = n(e, ["onLaunch"]);return o(o({}, t), { onLoad: [], onReady: [], onUnload: [], onResize: [] });}(i.copyData(t.appProxyHook.app)), component: [] }, t.proxyVueSortHookName = { app: ["created", "beforeMount", "mounted", "onLaunch", "onShow", "onHide", "beforeDestroy", "destroyed"], page: ["created", "beforeMount", "mounted", "onLoad", "onReady", "onShow", "onResize", "onHide", "beforeDestroy", "destroyed", "onUnload"], component: ["created", "beforeMount", "mounted", "beforeDestroy", "destroyed"] }, t.notCallProxyHook = ["onHide", "beforeDestroy", "destroyed", "destroyed", "onUnload", "onResize"];}, 801: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.createRouteMap = void 0;var o = r(883),n = r(789);t.createRouteMap = function (e, t) {var r = { finallyPathList: [], finallyPathMap: Object.create(null), aliasPathMap: Object.create(null), pathMap: Object.create(null), vueRouteMap: Object.create(null), nameMap: Object.create(null) };return t.forEach(function (t) {var a = n.getRoutePath(t, e),i = a.finallyPath,u = a.aliasPath,l = a.path;if (null == l) throw new Error("????????????????????????????????????????????????????????????????????? ???path??? ????????? " + JSON.stringify(t));if (i instanceof Array && !e.options.h5.vueRouterDev && "h5" === e.options.platform) throw new Error("??? vueRouterDev ????????????route.alias ????????????????????????????????? " + JSON.stringify(t));var p = i,c = u;"h5" !== e.options.platform && 0 !== p.indexOf("/") && "*" !== l && o.warn("????????????????????????route???" + JSON.stringify(t) + " ????????????????????? ???/???", e, !0), r.finallyPathMap[p] || (r.finallyPathMap[p] = t, r.aliasPathMap[c] = t, r.pathMap[l] = t, r.finallyPathList.push(p), null != t.name && (r.nameMap[t.name] = t));}), r;};}, 662: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.registerEachHooks = t.registerRouterHooks = t.registerHook = void 0;var o = r(366),n = r(169);function a(e, t) {e[0] = t;}t.registerHook = a, t.registerRouterHooks = function (e, t) {return a(e.routerBeforeHooks, function (e, r, o) {t.routerBeforeEach(e, r, o);}), a(e.routerAfterHooks, function (e, r) {t.routerAfterEach(e, r);}), a(e.routerErrorHooks, function (e, r) {t.routerErrorEach(e, r);}), e;}, t.registerEachHooks = function (e, t, r) {a(e.lifeCycle[t], function (e, a, i, u, l) {l ? n.onTriggerEachHook(e, a, u, o.hookToggle[t], i) : r(e, a, i);});};}, 460: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.initMixins = t.getMixins = void 0;var n = r(801),a = r(844),i = r(147),u = r(814),l = r(845),p = r(890),c = r(789),s = r(334),f = r(282),h = !1,v = !1,y = { app: !1, page: "" };function g(e, t) {var r = t.options.platform;return new RegExp(f.mpPlatformReg, "g").test(r) && (r = "app-lets"), { h5: { beforeCreate: function beforeCreate() {var e;if (this.$options.router) {t.$route = this.$options.router;var r = [];(null === (e = t.options.h5) || void 0 === e ? void 0 : e.vueRouterDev) ? r = t.options.routes : (r = n.createRouteMap(t, this.$options.router.options.routes).finallyPathMap, t.routesMap.vueRouteMap = r, a.buildVueRoutes(t, r)), a.buildVueRouter(t, this.$options.router, r), i.proxyEachHook(t, this.$options.router);}} }, "app-plus": { beforeCreate: function beforeCreate() {h || (h = !0, l.proxyPageHook(this, t, "appProxyHook", "app"), u.registerLoddingPage(t));} }, "app-lets": { beforeCreate: function beforeCreate() {var e = this.$options.mpType;"component" !== e || v ? "component" !== e && (y[e] || ("page" === e ? (y[e] = s.getEnterPath(this, t), t.enterPath = y[e]) : y[e] = !0, l.proxyPageHook(this, t, "appletsProxyHook", e))) : c.assertParentChild(y.page, this) && l.proxyPageHook(this, t, "appletsProxyHook", e);}, onLoad: function onLoad() {!v && c.assertParentChild(y.page, this) && (v = !0, p.forceGuardEach(t));} } }[r];}t.getMixins = g, t.initMixins = function (e, t) {var r = n.createRouteMap(t, t.options.routes);t.routesMap = r, e.mixin(o({}, g(0, t)));};}, 789: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);},n = this && this.__rest || function (e, t) {var r = {};for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);}if (null != e && "function" == typeof Object.getOwnPropertySymbols) {var n = 0;for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);}}return r;},a = this && this.__spreadArrays || function () {for (var e = 0, t = 0, r = arguments.length; t < r; t++) {e += arguments[t].length;}var o = Array(e),n = 0;for (t = 0; t < r; t++) {for (var a = arguments[t], i = 0, u = a.length; i < u; i++, n++) {o[n] = a[i];}}return o;};Object.defineProperty(t, "__esModule", { value: !0 }), t.resolveAbsolutePath = t.assertParentChild = t.reservedWord = t.resetPageHook = t.callHook = t.replaceHook = t.lockDetectWarn = t.deepClone = t.baseClone = t.assertDeepObject = t.paramsToQuery = t.forMatNextToFrom = t.urlToJson = t.getUniCachePage = t.copyData = t.getDataType = t.routesForMapRoute = t.notRouteTo404 = t.getWildcardRule = t.assertNewOptions = t.getRoutePath = t.notDeepClearNull = t.mergeConfig = t.timeOut = t.def = t.voidFun = void 0;var i = r(282),u = r(169),l = r(883),p = r(890),c = r(779);function s(e, t) {for (var r = Object.create(null), n = Object.keys(e).concat(["resolveQuery", "parseQuery"]), i = 0; i < n.length; i += 1) {var u = n[i];null != t[u] ? t[u].constructor === Object ? r[u] = o(o({}, e[u]), t[u]) : r[u] = "routes" === u ? a(e[u], t[u]) : t[u] : r[u] = e[u];}return r;}function f(e, t) {var r = e.aliasPath || e.alias || e.path;return "h5" !== t.options.platform && (r = e.path), { finallyPath: r, aliasPath: e.aliasPath || e.path, path: e.path, alias: e.alias };}function h(e, t) {var r = e.routesMap.finallyPathMap["*"];if (r) return r;throw t && u.ERRORHOOK[0](t, e), new Error("??????????????????????????????????????????????????????????????????????????????????????????????????? '*' ??????????????????????????????");}function v(e) {return Object.prototype.toString.call(e);}function y(e) {return JSON.parse(JSON.stringify(e));}function g(e, t) {for (var r = 0, o = Object.keys(e); r < o.length; r++) {var n = o[r],a = n;e[n] !== e && ("object" == typeof e[n] ? (t[a] = "[object Array]" === v(e[n]) ? [] : {}, g(e[n], t[a])) : t[a] = e[n]);}}function d(e) {var t = "[object Array]" === v(e) ? [] : {};return g(e, t), t;}function m(e, t) {for (var r = [], o = 0, n = Object.entries(e); o < n.length; o++) {var a = n[o][1][0];a && a.hook && r.push(a.hook(t));}return r;}t.voidFun = function () {}, t.def = function (e, t, r) {Object.defineProperty(e, t, { get: function get() {return r();} });}, t.timeOut = function (e) {return new Promise(function (t) {setTimeout(function () {t();}, e);});}, t.mergeConfig = s, t.notDeepClearNull = function (e) {for (var t in e) {null == e[t] && delete e[t];}return e;}, t.getRoutePath = f, t.assertNewOptions = function (e) {var t,r = e.platform,o = e.routes;if (null == r) throw new Error("???????????????????????????????????? 'platform'");if (null == o || 0 === o.length) throw new Error("???????????????????????????????????? routes ??????????????????????????????");return "h5" === e.platform && (null === (t = e.h5) || void 0 === t ? void 0 : t.vueRouterDev) && (i.baseConfig.routes = []), s(i.baseConfig, e);}, t.getWildcardRule = h, t.notRouteTo404 = function (e, t, r, o) {if ("*" !== t.path) return t;var n = t.redirect;if (void 0 === n) throw new Error(" *  ????????????????????? redirect ?????????redirect: string | Location | Function");var a = n;return "function" == typeof a && (a = a(r)), p.navjump(a, e, o, void 0, void 0, void 0, !1);}, t.routesForMapRoute = function (e, t, r) {var o;if (null === (o = e.options.h5) || void 0 === o ? void 0 : o.vueRouterDev) return { path: t };for (var n = t.split("?")[0], a = "", i = e.routesMap, u = 0; u < r.length; u++) {for (var l = i[r[u]], p = 0, s = Object.entries(l); p < s.length; p++) {var f = s[p],y = f[0],g = f[1];if ("*" !== y) {var d = g,m = y;if ("[object Array]" === v(l) && (m = d), null != c(m).exec(n)) return "[object String]" === v(d) ? i.finallyPathMap[d] : d;} else "" === a && (a = "*");}}if ("" !== a) return h(e);throw new Error(t + " ??????????????????????????????????????????????????????????????????");}, t.getDataType = v, t.copyData = y, t.getUniCachePage = function (e) {var t = getCurrentPages();if (null == e) return t;if (0 === t.length) return t;var r = t.reverse()[e];return null == r ? [] : r;}, t.urlToJson = function (e) {var t = {},r = e.split("?"),o = r[0],n = r[1];if (null != n) for (var a = 0, i = n.split("&"); a < i.length; a++) {var u = i[a].split("=");t[u[0]] = u[1];}return { path: o, query: t };}, t.forMatNextToFrom = function (e, t, r) {var o = [t, r],n = o[0],a = o[1];if ("h5" === e.options.platform) {var i = e.options.h5,u = i.vueNext,l = i.vueRouterDev;u || l || (n = p.createRoute(e, void 0, n), a = p.createRoute(e, void 0, a));} else n = p.createRoute(e, void 0, d(n)), a = p.createRoute(e, void 0, d(a));return { matTo: n, matFrom: a };}, t.paramsToQuery = function (e, t) {var r;if ("h5" === e.options.platform && !(null === (r = e.options.h5) || void 0 === r ? void 0 : r.paramsToQuery)) return t;if ("[object Object]" === v(t)) {var a = t,i = a.name,l = a.params,p = n(a, ["name", "params"]),c = l;if ("h5" !== e.options.platform && null == c && (c = {}), null != i && null != c) {var s = e.routesMap.nameMap[i];null == s && (s = h(e, { type: 2, msg: "??????????????????" + i + " ??????????????????????????????????????????", toRule: t }));var y = f(s, e).finallyPath;if (!y.includes(":")) return o(o({}, p), { path: y, query: c });u.ERRORHOOK[0]({ type: 2, msg: "???????????????" + y + " ???????????? paramsToQuery???", toRule: t }, e);}}return t;}, t.assertDeepObject = function (e) {var t = null;try {t = JSON.stringify(e).match(/\{|\[|\}|\]/g);} catch (e) {l.warnLock("????????????????????????????????????" + e);}return null != t && t.length > 3;}, t.baseClone = g, t.deepClone = d, t.lockDetectWarn = function (e, t, r, o, n) {if ("afterHooks" === n) o();else {var a = e.options.detectBeforeLock;a && a(e, t, r), e.$lockStatus ? e.options.routerErrorEach({ type: 2, msg: "???????????????????????????????????????????????????????????????...." }, e) : o();}}, t.replaceHook = function (e, t, r, o) {var n = t.$options,a = e[r][o],u = {};if ("[object Array]" === v(a) && (u = { beforeCreate: [], created: [], beforeMount: [], mounted: [], beforeDestroy: [], destroyed: [] }), null != a) {for (var l = i.proxyVueSortHookName[o], p = function p(r) {var p = l[r],c = n[p];if ("[object Array]" === v(c)) {var s = { options: [], hook: Function },f = c.splice(c.length - 1, 1, function () {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}return s.options = e;})[0];s.hook = function (r) {return e.enterPath.replace(/^\//, "") !== r.replace(/^\//, "") && "app" !== o ? function () {} : (i.notCallProxyHook.includes(p) || f.apply(t, s.options), function () {c.splice(c.length - 1, 1, f);});}, Object.keys(u).length > 0 ? u[p] = [s] : a[p] = [s];}}, c = 0; c < l.length; c++) {p(c);}Object.keys(u).length > 0 && a.push(u);}}, t.callHook = m, t.resetPageHook = function (e, t) {var r = t.trim().match(/^(\/?[^\?\s]+)(\?[\s\S]*$)?$/);if (null == r) throw new Error("??????hook?????????????????? ???" + t + "??? ?????????????????????");t = r[1];var o = "appletsProxyHook";"app-plus" === e.options.platform && (o = "appProxyHook");for (var n = [], a = 0, i = Object.entries(e[o]); a < i.length; a++) {var u = i[a][1];if ("[object Array]" === v(u)) for (var l = 0; l < u.length; l++) {n = n.concat(m(u[l], t));} else n = n.concat(m(u, t));}setTimeout(function () {for (var e = 0; e < n.length; e++) {n[e]();}}, 500);}, t.reservedWord = function (e) {if ("string" == typeof e) return e;for (var t = o(o({}, y(e.params || {})), y(e.query || {})), r = 0; r < i.keyword.length; r++) {var n = i.keyword[r];Reflect.has(t, n) && ("[object Object]" === v(e.query) && delete e.query[n], "[object Object]" === v(e.params) && delete e.params[n], l.warnLock(JSON.stringify(i.keyword) + " ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? "));}return e;}, t.assertParentChild = function (e, t) {for (; null != t.$parent;) {var r = t.$parent.$mp;if (r.page && r.page.is === e) return !0;t = t.$parent;}try {if (t.$mp.page.is === e || t.$mp.page.route === e) return !0;} catch (e) {return !1;}return !1;}, t.resolveAbsolutePath = function (e, t) {var r = /^\/?([^\?\s]+)(\?.+)?$/,o = e.trim();if (!r.test(o)) throw new Error("???" + e + "??? ???????????????????????????????????????(10001)???");var n = o.match(r);if (null == n) throw new Error("???" + e + "??? ???????????????????????????????????????(10002)???");var a = n[2] || "";if (/^\.\/[^\.]+/.test(o)) return (t.currentRoute.path + e).replace(/[^\/]+\.\//, "");var i = n[1].replace(/\//g, "\\/").replace(/\.\./g, "[^\\/]+").replace(/\./g, "\\."),u = new RegExp("^\\/" + i + "$"),l = t.options.routes.filter(function (e) {return u.test(e.path);});if (1 !== l.length) throw new Error("???" + e + "??? ???????????????????????????????????????????????????????????????????????????(10003)???");return l[0].path + a;};}, 883: function _(e, t) {"use strict";function r(e, t, r, o) {if (void 0 === o && (o = !1), !o) {var n = "[object Object]" === t.toString();if (!1 === t) return !1;if (n && !1 === t[e]) return !1;}return console[e](r), !0;}Object.defineProperty(t, "__esModule", { value: !0 }), t.warnLock = t.log = t.warn = t.err = t.isLog = void 0, t.isLog = r, t.err = function (e, t, o) {r("error", t.options.debugger, e, o);}, t.warn = function (e, t, o) {r("warn", t.options.debugger, e, o);}, t.log = function (e, t, o) {r("log", t.options.debugger, e, o);}, t.warnLock = function (e) {console.warn(e);};}, 607: function _(e, t, r) {"use strict";var o = this && this.__createBinding || (Object.create ? function (e, t, r, o) {void 0 === o && (o = r), Object.defineProperty(e, o, { enumerable: !0, get: function get() {return t[r];} });} : function (e, t, r, o) {void 0 === o && (o = r), e[o] = t[r];}),n = this && this.__exportStar || function (e, t) {for (var r in e) {"default" === r || Object.prototype.hasOwnProperty.call(t, r) || o(t, e, r);}};Object.defineProperty(t, "__esModule", { value: !0 }), t.createRouter = t.RouterMount = t.runtimeQuit = void 0, n(r(366), t), n(r(309), t);var a = r(814);Object.defineProperty(t, "runtimeQuit", { enumerable: !0, get: function get() {return a.runtimeQuit;} });var i = r(963);Object.defineProperty(t, "RouterMount", { enumerable: !0, get: function get() {return i.RouterMount;} }), Object.defineProperty(t, "createRouter", { enumerable: !0, get: function get() {return i.createRouter;} });}, 366: function _(e, t) {"use strict";var r, o, n;Object.defineProperty(t, "__esModule", { value: !0 }), t.rewriteMethodToggle = t.navtypeToggle = t.hookToggle = void 0, (n = t.hookToggle || (t.hookToggle = {})).beforeHooks = "beforeEach", n.afterHooks = "afterEach", n.enterHooks = "beforeEnter", (o = t.navtypeToggle || (t.navtypeToggle = {})).push = "navigateTo", o.replace = "redirectTo", o.replaceAll = "reLaunch", o.pushTab = "switchTab", o.back = "navigateBack", (r = t.rewriteMethodToggle || (t.rewriteMethodToggle = {})).navigateTo = "push", r.navigate = "push", r.redirectTo = "replace", r.reLaunch = "replaceAll", r.switchTab = "pushTab", r.navigateBack = "back";}, 309: function _(e, t) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });}, 169: function _(e, t, r) {"use strict";var o = this && this.__rest || function (e, t) {var r = {};for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);}if (null != e && "function" == typeof Object.getOwnPropertySymbols) {var n = 0;for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);}}return r;};Object.defineProperty(t, "__esModule", { value: !0 }), t.loopCallHook = t.transitionTo = t.onTriggerEachHook = t.callHook = t.callBeforeRouteLeave = t.HOOKLIST = t.ERRORHOOK = void 0;var n = r(789),a = r(890),i = r(147);function u(e, t, r, o) {var a,i = n.getUniCachePage(0);if (Object.keys(i).length > 0) {var u = void 0;switch ("h5" === e.options.platform ? u = i.$options.beforeRouteLeave : null != i.$vm && (u = i.$vm.$options.beforeRouteLeave), n.getDataType(u)) {case "[object Array]":a = (a = u[0]).bind(i);break;case "[object Function]":a = u.bind(i.$vm);}}return l(a, t, r, e, o);}function l(e, t, r, o, n, a) {void 0 === a && (a = !0), null != e && e instanceof Function ? !0 === a ? e(t, r, n, o, !1) : (e(t, r, function () {}, o, !1), n()) : n();}function p(e, t, r, o, a, i) {var u = n.forMatNextToFrom(e, t, r),l = u.matTo,p = u.matFrom;"h5" === e.options.platform ? c(a, 0, i, e, l, p, o) : c(a.slice(0, 4), 0, function () {i(function () {c(a.slice(4), 0, n.voidFun, e, l, p, o);});}, e, l, p, o);}function c(e, r, i, u, l, p, s) {var f = n.routesForMapRoute(u, l.path, ["finallyPathMap", "pathMap"]);if (e.length - 1 < r) return i();var h = e[r],v = t.ERRORHOOK[0];h(u, l, p, f, function (t) {if (!1 === t) "h5" === u.options.platform && i(!1), v({ type: 0, msg: "?????????????????? false ???????????????!", matTo: l, matFrom: p, nextTo: t }, u);else if ("string" == typeof t || "object" == typeof t) {var n = s,f = t;if ("object" == typeof t) {var h = t.NAVTYPE;f = o(t, ["NAVTYPE"]), null != h && (n = h);}a.navjump(f, u, n, { from: p, next: i });} else null == t ? (r++, c(e, r, i, u, l, p, s)) : v({ type: 1, msg: "?????????????????????????????????????????????????????????????????????", matTo: l, matFrom: p, nextTo: t }, u);});}t.ERRORHOOK = [function (e, t) {return t.lifeCycle.routerErrorHooks[0](e, t);}], t.HOOKLIST = [function (e, t, r, o, n) {return l(e.lifeCycle.routerBeforeHooks[0], t, r, e, n);}, function (e, t, r, o, n) {return u(e, t, r, n);}, function (e, t, r, o, n) {return l(e.lifeCycle.beforeHooks[0], t, r, e, n);}, function (e, t, r, o, n) {return l(o.beforeEnter, t, r, e, n);}, function (e, t, r, o, n) {return l(e.lifeCycle.afterHooks[0], t, r, e, n, !1);}, function (e, t, r, o, n) {return e.$lockStatus = !1, "h5" === e.options.platform && i.proxyH5Mount(e), l(e.lifeCycle.routerAfterHooks[0], t, r, e, n, !1);}], t.callBeforeRouteLeave = u, t.callHook = l, t.onTriggerEachHook = function (e, r, o, n, a) {var i = [];switch (n) {case "beforeEach":i = t.HOOKLIST.slice(0, 3);break;case "afterEach":i = t.HOOKLIST.slice(4);break;case "beforeEnter":i = t.HOOKLIST.slice(3, 4);}p(o, e, r, "push", i, a);}, t.transitionTo = p, t.loopCallHook = c;}, 890: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.createRoute = t.forceGuardEach = t.backOptionsBuild = t.navjump = t.lockNavjump = void 0;var n = r(366),a = r(99),i = r(789),u = r(169),l = r(845),p = r(169);function c(e, t, r, o, n) {i.lockDetectWarn(t, e, r, function () {"h5" !== t.options.platform && (t.$lockStatus = !0), s(e, t, r, void 0, o, n);});}function s(e, t, r, c, s, h, v) {if (void 0 === v && (v = !0), "back" === r) {var y;if (y = "string" == typeof e ? +e : e.delta || 1, "h5" === t.options.platform) {t.$route.go(-y);var g = (h || { success: i.voidFun }).success || i.voidFun,d = (h || { complete: i.voidFun }).complete || i.voidFun;return g({ errMsg: "navigateBack:ok" }), void d({ errMsg: "navigateBack:ok" });}e = f(t, y, h);}e = i.reservedWord(e);var m = a.queryPageToMap(e, t).rule;m.type = n.navtypeToggle[r];var b = i.paramsToQuery(t, m),O = a.resolveQuery(b, t);if ("h5" === t.options.platform) {if ("push" !== r && (r = "replace"), null != c) c.next(o({ replace: "push" !== r }, O));else if ("push" === r && Reflect.has(O, "events")) {if (Reflect.has(O, "name")) throw new Error("???h5???????????? 'push'???'navigateTo' ???????????????????????? events ??????????????? name ??????????????? name ???????????????????????????????????? path ?????? url ?????????");uni.navigateTo(O, !0, i.voidFun, s);} else t.$route[r](O, O.success || i.voidFun, O.fail || i.voidFun);} else {var P = { path: "" };if (null == c) {var k = i.routesForMapRoute(t, O.path, ["finallyPathMap", "pathMap"]);k = i.notRouteTo404(t, k, O, r), O = o(o(o(o({}, k), { params: {} }), O), { path: k.path }), P = l.createToFrom(O, t);} else P = c.from;if (l.createFullPath(O, P), !1 === v) return O;u.transitionTo(t, O, P, r, p.HOOKLIST, function (e) {uni[n.navtypeToggle[r]](O, !0, e, s);});}}function f(e, t, r) {var n = h(e, t),a = o(o({}, r || {}), { path: n.path, query: n.query, delta: t });if ("[object Object]" === i.getDataType(r)) {var u = r,l = u.animationDuration,p = u.animationType;null != l && (a.animationDuration = l), null != p && (a.animationType = p);var c = r.from;null != c && (a.BACKTYPE = c);}return a;}function h(e, t, r) {void 0 === t && (t = 0);var u = { name: "", meta: {}, path: "", fullPath: "", NAVTYPE: "", query: {}, params: {}, BACKTYPE: (r || { BACKTYPE: "" }).BACKTYPE || "" };if (19970806 === t) return u;if ("h5" === e.options.platform) {var l = { path: "" };l = null != r ? r : e.$route.currentRoute;var p = i.copyData(l.params);delete p.__id__;var c = a.parseQuery(o(o({}, p), i.copyData(l.query)), e);l = o(o({}, l), { query: c }), u.path = l.path, u.fullPath = l.fullPath || "", u.query = l.query || {}, u.NAVTYPE = n.rewriteMethodToggle[l.type || "reLaunch"];} else {var s = {};if (null != r) s = o(o({}, r), { openType: r.type });else {var f = i.getUniCachePage(t);if (0 === Object.keys(f).length) throw e.options.routerErrorEach({ type: 3, msg: "?????????????????????????????????????????????????????????????????? level:" + t }, e), new Error("?????????????????????????????????????????????????????????????????? level:" + t);var h = f.options || {},v = h.query;null != v && 1 === Object.keys(h).length && (h = JSON.parse(decodeURIComponent(v)));var y = JSON.parse(decodeURIComponent(JSON.stringify(h)));s = o(o({}, f.$page || {}), { query: y, fullPath: decodeURIComponent((f.$page || {}).fullPath || "/" + f.route) }), "app-plus" !== e.options.platform && (s.path = "/" + f.route);}var g = s.openType;u.query = s.query, u.path = s.path, u.fullPath = s.fullPath, u.NAVTYPE = n.rewriteMethodToggle[g || "reLaunch"];}var d = i.routesForMapRoute(e, u.path, ["finallyPathMap", "pathMap"]),m = o(o({}, u), d);return m.query = a.parseQuery(m.query, e), m;}t.lockNavjump = c, t.navjump = s, t.backOptionsBuild = f, t.forceGuardEach = function (e, t, r) {if (void 0 === t && (t = "replaceAll"), void 0 === r && (r = !1), "h5" === e.options.platform) throw new Error("???h5???????????????forceGuardEach ???????????????????????? forceGuardEach ???????????????h5????????????");var o = i.getUniCachePage(0);0 === Object.keys(o).length && e.options.routerErrorEach({ type: 3, msg: "?????????????????????????????????????????????????????????????????? level:0" }, e);var n = o;c({ path: "/" + n.route, query: n.options }, e, t, r);}, t.createRoute = h;}, 845: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.proxyPageHook = t.createFullPath = t.createToFrom = void 0;var o = r(789),n = r(890),a = r(99);t.createToFrom = function (e, t) {var r = o.getUniCachePage(0);return "[object Array]" === o.getDataType(r) ? o.deepClone(e) : n.createRoute(t);}, t.createFullPath = function (e, t) {if (null == e.fullPath) {var r = a.stringifyQuery(e.query);e.fullPath = e.path + r;}null == t.fullPath && (r = a.stringifyQuery(t.query), t.fullPath = t.path + r);}, t.proxyPageHook = function (e, t, r, n) {o.replaceHook(t, e, r, n);};}, 99: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.stringifyQuery = t.parseQuery = t.resolveQuery = t.queryPageToMap = void 0;var n = r(789),a = r(169),i = r(883),u = /[!'()*]/g,l = function l(e) {return "%" + e.charCodeAt(0).toString(16);},p = /%2C/g,c = function c(e) {return encodeURIComponent(e).replace(u, l).replace(p, ",");};t.queryPageToMap = function (e, t) {var r = {},i = "",u = e.success,l = e.fail;if ("[object Object]" === n.getDataType(e)) {var p = e;if (null != p.path) {var c = n.urlToJson(p.path),s = c.path,f = c.query;i = n.routesForMapRoute(t, s, ["finallyPathList", "pathMap"]), r = o(o({}, f), e.query || {}), p.path = s, p.query = r, delete e.params;} else null != p.name ? null == (i = t.routesMap.nameMap[p.name]) ? i = n.getWildcardRule(t, { type: 2, msg: "??????????????????" + p.name + " ??????????????????????????????????????????", toRule: e }) : (r = e.params || {}, delete e.query) : i = n.getWildcardRule(t, { type: 2, msg: e + " ????????????????????????????????????????????????????????????", toRule: e });} else e = n.urlToJson(e), i = n.routesForMapRoute(t, e.path, ["finallyPathList", "pathMap"]), r = e.query;if ("h5" === t.options.platform) {n.getRoutePath(i, t).finallyPath.includes(":") && null == e.name && a.ERRORHOOK[0]({ type: 2, msg: "???????????? alias??????aliasPath ???????????????????????????????????? path ?????????????????? name ?????????", route: i }, t);var h = e.complete,v = e.success,y = e.fail;if ("[object Function]" === n.getDataType(h)) {var g = function g(e, t) {"[object Function]" === n.getDataType(t) && t.apply(this, e), h.apply(this, e);};u = function u() {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}g.call(this, e, v);}, l = function l() {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}g.call(this, e, y);};}}var d = e;return "[object Function]" === n.getDataType(d.success) && (d.success = u), "[object Function]" === n.getDataType(d.fail) && (d.fail = l), { rule: d, route: i, query: r };}, t.resolveQuery = function (e, t) {var r = "query";null != e.params && (r = "params"), null != e.query && (r = "query");var o = n.copyData(e[r] || {}),a = t.options.resolveQuery;if (a) {var u = a(o);"[object Object]" !== n.getDataType(u) ? i.warn("??????????????????????????? resolveQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}", t) : e[r] = u;} else {if (!n.assertDeepObject(o)) return e;var l = JSON.stringify(o);e[r] = { query: l };}return e;}, t.parseQuery = function (e, t) {var r = t.options.parseQuery;if (r) e = r(n.copyData(e)), "[object Object]" !== n.getDataType(e) && i.warn("??????????????????????????? parseQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}", t);else if (Reflect.get(e, "query")) {var o = Reflect.get(e, "query"),a = { query: decodeURIComponent(o) };try {if ("object" == typeof (a = JSON.parse(a.query))) return a;} catch (e) {i.warn("???????????????????????????????????????????????????" + e, t);}}return e;}, t.stringifyQuery = function (e) {var t = e ? Object.keys(e).map(function (t) {var r = e[t];if (void 0 === r) return "";if (null === r) return c(t);if (Array.isArray(r)) {var o = [];return r.forEach(function (e) {void 0 !== e && (null === e ? o.push(c(t)) : o.push(c(t) + "=" + c(e)));}), o.join("&");}return c(t) + "=" + c(r);}).filter(function (e) {return e.length > 0;}).join("&") : null;return t ? "?" + t : "";};}, 314: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.rewriteMethod = void 0;var o = r(366),n = r(789),a = r(883),i = r(809),u = ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"];t.rewriteMethod = function (e) {!1 === e.options.keepUniOriginNav && u.forEach(function (t) {var r = uni[t];uni[t] = function (u, l, p, c) {void 0 === l && (l = !1), l ? i.uniOriginJump(e, r, t, u, p, c) : ("app-plus" === e.options.platform && 0 === Object.keys(e.appMain).length && (e.appMain = { NAVTYPE: t, path: u.url }), function (e, t, r) {if ("app-plus" === r.options.platform) {var i = null;e && (i = e.openType), null != i && "appLaunch" === i && (t = "reLaunch");}if ("reLaunch" === t && '{"url":"/"}' === JSON.stringify(e) && (a.warn("uni-app ???????????????reLaunch({url:'/'}) ???????????????????????????????????? this.$Router.replaceAll() ?????? uni.reLaunch({url:'/?xxx=xxx'})", r, !0), t = "navigateBack", e = { from: "backbutton" }), "navigateBack" === t) {var u = 1;null == e && (e = { delta: 1 }), "[object Number]" === n.getDataType(e.delta) && (u = e.delta), r.back(u, e);} else {var l = o.rewriteMethodToggle[t],p = e.url;if (!p.startsWith("/")) {var c = n.resolveAbsolutePath(p, r);p = c, e.url = c;}if ("switchTab" === t) {var s = n.routesForMapRoute(r, p, ["pathMap", "finallyPathList"]),f = n.getRoutePath(s, r).finallyPath;if ("[object Array]" === n.getDataType(f) && a.warn("uni-app ??????????????????????????????" + p + "???????????????tab??????????????????????????? alias ?????????????????????????????????????????????????????????????????????????????????*?????????", r, !0), "*" === f && a.warn("uni-app ??????????????????????????????" + p + "???????????????????????????????????????????????????????????????????????????*?????????", r, !0), "h5" === r.options.platform) {var h = e.success;e.success = function () {for (var t = [], r = 0; r < arguments.length; r++) {t[r] = arguments[r];}null == h || h.apply(null, t), n.timeOut(150).then(function () {var t = e.detail || {};if (Object.keys(t).length > 0 && Reflect.has(t, "index")) {var r = n.getUniCachePage(0);if (0 === Object.keys(r).length) return !1;var o = r,a = o.$options.onTabItemTap;if (a) for (var i = 0; i < a.length; i++) {a[i].call(o, t);}}});};}p = f;}var v = e,y = v.events,g = v.success,d = v.fail,m = v.complete,b = v.animationType,O = { path: p, events: y, success: g, fail: d, complete: m, animationDuration: v.animationDuration, animationType: b };r[l](n.notDeepClearNull(O));}}(u, t, e));};});};}, 963: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.createRouter = t.RouterMount = void 0;var n = r(282),a = r(789),i = r(662),u = r(460),l = r(890),p = r(314),c = function c() {},s = new Promise(function (e) {return c = e;});t.createRouter = function (e) {var t = a.assertNewOptions(e),r = { options: t, mount: [], Vue: null, appProxyHook: n.appProxyHook, appletsProxyHook: n.indexProxyHook, appMain: {}, enterPath: "", $route: null, $lockStatus: !1, routesMap: {}, lifeCycle: i.registerRouterHooks(n.lifeCycle, t), push: function push(e) {l.lockNavjump(e, r, "push");}, replace: function replace(e) {l.lockNavjump(e, r, "replace");}, replaceAll: function replaceAll(e) {l.lockNavjump(e, r, "replaceAll");}, pushTab: function pushTab(e) {l.lockNavjump(e, r, "pushTab");}, back: function back(e, t) {void 0 === e && (e = 1), "[object Object]" !== a.getDataType(t) ? t = { from: "navigateBack" } : Reflect.has(t, "from") || (t = o(o({}, t), { from: "navigateBack" })), l.lockNavjump(e + "", r, "back", void 0, t);}, forceGuardEach: function forceGuardEach(e, t) {l.forceGuardEach(r, e, t);}, beforeEach: function beforeEach(e) {i.registerEachHooks(r, "beforeHooks", e);}, afterEach: function afterEach(e) {i.registerEachHooks(r, "afterHooks", e);}, install: function install(e) {r.Vue = e, p.rewriteMethod(this), u.initMixins(e, this), Object.defineProperty(e.prototype, "$Router", { get: function get() {return r;} }), Object.defineProperty(e.prototype, "$Route", { get: function get() {return l.createRoute(r);} }), Object.defineProperty(e.prototype, "$AppReady", { get: function get() {return "h5" === r.options.platform ? Promise.resolve() : s;}, set: function set(e) {!0 === e && c();} });} };return a.def(r, "keyword", function () {return n.keyword;}), a.def(r, "currentRoute", function () {return l.createRoute(r);}), r.beforeEach(function (e, t, r) {return r();}), r.afterEach(function () {}), r;}, t.RouterMount = function (e, t, r) {if (void 0 === r && (r = "#app"), "[object Array]" !== a.getDataType(t.mount)) throw new Error("?????????????????????router.app ???????????????????????????????????????" + typeof t.mount);if (t.mount.push({ app: e, el: r }), "h5" === t.options.platform) {var o = t.$route;o.replace({ path: o.currentRoute.fullPath });}};}, 809: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);},n = this && this.__awaiter || function (e, t, r, o) {return new (r || (r = Promise))(function (n, a) {function i(e) {try {l(o.next(e));} catch (e) {a(e);}}function u(e) {try {l(o.throw(e));} catch (e) {a(e);}}function l(e) {var t;e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {e(t);})).then(i, u);}l((o = o.apply(e, t || [])).next());});},a = this && this.__generator || function (e, t) {var r,o,n,a,i = { label: 0, sent: function sent() {if (1 & n[0]) throw n[1];return n[1];}, trys: [], ops: [] };return a = { next: u(0), throw: u(1), return: u(2) }, "function" == typeof Symbol && (a[Symbol.iterator] = function () {return this;}), a;function u(a) {return function (u) {return function (a) {if (r) throw new TypeError("Generator is already executing.");for (; i;) {try {if (r = 1, o && (n = 2 & a[0] ? o.return : a[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, a[1])).done) return n;switch (o = 0, n && (a = [2 & a[0], n.value]), a[0]) {case 0:case 1:n = a;break;case 4:return i.label++, { value: a[1], done: !1 };case 5:i.label++, o = a[1], a = [0];continue;case 7:a = i.ops.pop(), i.trys.pop();continue;default:if (!((n = (n = i.trys).length > 0 && n[n.length - 1]) || 6 !== a[0] && 2 !== a[0])) {i = 0;continue;}if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {i.label = a[1];break;}if (6 === a[0] && i.label < n[1]) {i.label = n[1], n = a;break;}if (n && i.label < n[2]) {i.label = n[2], i.ops.push(a);break;}n[2] && i.ops.pop(), i.trys.pop();continue;}a = t.call(e, i);} catch (e) {a = [6, e], o = 0;} finally {r = n = 0;}}if (5 & a[0]) throw a[1];return { value: a[0] ? a[1] : void 0, done: !0 };}([a, u]);};}},i = this && this.__rest || function (e, t) {var r = {};for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);}if (null != e && "function" == typeof Object.getOwnPropertySymbols) {var n = 0;for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);}}return r;};Object.defineProperty(t, "__esModule", { value: !0 }), t.formatOriginURLQuery = t.uniOriginJump = void 0;var u = r(99),l = r(789),p = r(282),c = 0,s = "reLaunch";function f(e, t, r) {var n,a = t.url,i = t.path,p = t.query,c = t.animationType,s = t.animationDuration,f = t.events,h = t.success,v = t.fail,y = t.complete,g = t.delta,d = t.animation,m = u.stringifyQuery(p || {}),b = "" === m ? i || a : (i || a) + m,O = {};return "app-plus" === e.options.platform && "navigateBack" !== r && (O = (null === (n = e.options.APP) || void 0 === n ? void 0 : n.animation) || {}, O = o(o({}, O), d || {})), l.notDeepClearNull({ delta: g, url: b, animationType: c || O.animationType, animationDuration: s || O.animationDuration, events: f, success: h, fail: v, complete: y });}t.uniOriginJump = function (e, t, r, u, h, v) {var y = f(e, u, r),g = y.complete,d = i(y, ["complete"]),m = e.options.platform.trim();0 === c && "h5" !== m && l.resetPageHook(e, d.url), null != v && !1 === v ? (0 === c && (c++, "h5" !== m && (e.Vue.prototype.$AppReady = !0)), g && g.apply(null, { msg: "forceGuardEach?????????????????????????????????" }), h && h.apply(null, { msg: "forceGuardEach?????????????????????????????????" })) : t(o(o({}, d), { from: u.BACKTYPE, complete: function complete() {for (var t, o, i, u, f = [], v = 0; v < arguments.length; v++) {f[v] = arguments[v];}return n(this, void 0, void 0, function () {var n, v, y;return a(this, function (a) {switch (a.label) {case 0:return 0 === c && (c++, "h5" !== m && (e.Vue.prototype.$AppReady = !0), "app-plus" === m && ((n = plus.nativeObj.View.getViewById("router-loadding")) && n.close(), (v = null === (t = e.options.APP) || void 0 === t ? void 0 : t.launchedHook) && v())), y = 0, new RegExp(p.mpPlatformReg, "g").test(m) ? y = null === (o = e.options.applet) || void 0 === o ? void 0 : o.animationDuration : "app-plus" === m && "navigateBack" === r && "navigateTo" === s && (y = null === (u = null === (i = e.options.APP) || void 0 === i ? void 0 : i.animation) || void 0 === u ? void 0 : u.animationDuration), "navigateTo" !== r && "navigateBack" !== r || 0 === y ? [3, 2] : [4, l.timeOut(y)];case 1:a.sent(), a.label = 2;case 2:return s = r, g && g.apply(null, f), h && h.apply(null, f), [2];}});});} }));}, t.formatOriginURLQuery = f;} }, t = {}, function r(o) {if (t[o]) return t[o].exports;var n = t[o] = { exports: {} };return e[o].call(n.exports, n, n.exports, r), n.exports;}(607);var e, t;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 26:
/*!***************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/share/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;








var _store = _interopRequireDefault(__webpack_require__(/*! @/shopro/store */ 22));
var _platform = _interopRequireDefault(__webpack_require__(/*! @/shopro/platform */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                    * Share v1.0.0
                                                                                                                                                                    * @Class Share
                                                                                                                                                                    * @description shopro-share 1.0.0 ????????????
                                                                                                                                                                    * @Author lidongtony
                                                                                                                                                                    * @Date 2021-04-19
                                                                                                                                                                    * @Email lidongtony@qq.com
                                                                                                                                                                    */var _default = { // ??????????????????
  setShareInfo: function setShareInfo()



  {var _store$state$shopro$c;var scene = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { title: '', // ?????????????????????
      desc: '', // ???????????????
      image: '', // ?????????????????????
      params: {} // ?????????????????????
    };var that = this;var shareInfo = { title: '', // ????????????
      desc: '', // ??????
      image: '', // ????????????
      path: '', // ????????????
      copyLink: '', // ????????????
      query: '' // ????????????
    };var shareConfig = _store.default.state.shopro.config.share;
    var shopConfig = _store.default.state.shopro.config.shop;
    if ((shopConfig === null || shopConfig === void 0 ? void 0 : shopConfig.domain) === '' || shareConfig.title === '' || shareConfig.image === '') {
      throw '??????????????????????????????????????????????????????';
    }

    // ???????????????????????????
    shareInfo.title = scene.title !== '' ? scene.title : shareConfig.title;
    shareInfo.image = scene.image !== '' ? scene.image : shareConfig.image;
    shareInfo.desc = scene.desc !== '' ? scene.desc : '';

    // ??????????????????????????????
    var query = that.setShareQuery(scene.params);

    shareInfo.path = "/pages/index/index?".concat(query);




    shareInfo.copyLink = "".concat((_store$state$shopro$c = _store.default.state.shopro.config.shop) === null || _store$state$shopro$c === void 0 ? void 0 : _store$state$shopro$c.domain, "?").concat(query);
    shareInfo.query = query;






    return shareInfo;
  },

  // ???????????????????????????: ??????????????????????????????(B?????????32?????????),???????????????????????????????????????????????????spm???????????? shareUserId.page.pageId.platform.from ----??? spm=88888888.3.1666666.3.2 ??????ID???88888888?????????????????????????????????????????????ID???1666666?????????????????????
  setShareQuery: function setShareQuery(params) {
    var shareUserId = '0'; // ?????????????????????ID
    if (params.shareId === undefined) {
      if (_store.default.state.user.isLogin) {
        shareUserId = _store.default.state.user.userInfo.id;
      }
    }
    var page = '1'; // ????????????: 1=??????(??????),2=??????,3=??????...????????????
    if (params.page !== undefined) {
      page = params.page;
    }
    var pageId = '0'; // ????????????ID: ?????????ID?????????ID???
    if (params.pageId !== undefined) {
      pageId = params.pageId;
    }
    var platform = ['H5', 'wxOfficialAccount', 'wxMiniProgram', 'App'].indexOf(_platform.default.get()) +
    1; // ???????????????????????????: 1=H5,2=?????????????????????,3=???????????????,4=App,...????????????
    var from = '1'; // ??????????????????: 1=????????????,2=??????,3=??????,...????????????
    if (params.from !== undefined) {
      from = params.from;
    }
    //spmParam = ...  ???????????????
    return "spm=".concat(shareUserId, ".").concat(page, ".").concat(pageId, ".").concat(platform, ".").concat(from);
  },
  getShareQuery: function getShareQuery(spm) {
    var shareParams = {};
    var shareParamsArray = spm.split('.');
    if (shareParamsArray[0] != '0') {
      shareParams.shareUserId = shareParamsArray[0];
    }
    switch (shareParamsArray[1]) {
      case '1':
        // ?????????????????????
        break;
      case '2':
        shareParams.page = '/pages/goods/detail';
        break;
      case '3':
        shareParams.page = '/pages/activity/groupon/detail';
        break;}

    if (shareParamsArray[2] !== '0') {
      shareParams.pageId = shareParamsArray[2];
    }
    shareParams.platform = shareParamsArray[3];
    shareParams.from = shareParamsArray[4];
    return shareParams;
  } };exports.default = _default;

/***/ }),

/***/ 27:
/*!***************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/store/types.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.PAGE_ROUTES = exports.AUTH_TYPE = exports.MESSAGE_IDS = exports.CART_NUM = exports.CART_LIST = exports.USER_DATA = exports.AGENT_INFO = exports.SHARE_INFO = exports.USER_INFO = exports.IS_LOGIN = exports.TEMPLATE = exports.CONFIG = void 0;var CONFIG = 'CONFIG'; // ???????????????
exports.CONFIG = CONFIG;var TEMPLATE = 'TEMPLATE'; // ??????????????????
exports.TEMPLATE = TEMPLATE;var IS_LOGIN = 'IS_LOGIN'; // ?????????
exports.IS_LOGIN = IS_LOGIN;var USER_INFO = 'USER_INFO'; // ????????????
exports.USER_INFO = USER_INFO;var SHARE_INFO = 'SHARE_INFO'; // ????????????
exports.SHARE_INFO = SHARE_INFO;var AGENT_INFO = 'AGENT_INFO'; //?????????
exports.AGENT_INFO = AGENT_INFO;var USER_DATA = 'USER_DATA'; //??????????????????
exports.USER_DATA = USER_DATA;var CART_LIST = 'CART_LIST'; //???????????????
exports.CART_LIST = CART_LIST;var CART_NUM = 'CART_NUM'; //??????????????????
exports.CART_NUM = CART_NUM;var MESSAGE_IDS = 'MESSAGE_IDS'; // ???????????????????????????ids
exports.MESSAGE_IDS = MESSAGE_IDS;var AUTH_TYPE = 'AUTH_TYPE'; // ???????????????
exports.AUTH_TYPE = AUTH_TYPE;var PAGE_ROUTES = 'PAGE_ROUTES'; //?????????
exports.PAGE_ROUTES = PAGE_ROUTES;

/***/ }),

/***/ 28:
/*!**********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/store/modules/user.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));
var _index = _interopRequireDefault(__webpack_require__(/*! @/shopro/request/index */ 17));
var _store = _interopRequireDefault(__webpack_require__(/*! @/shopro/store */ 22));
var _tools = _interopRequireDefault(__webpack_require__(/*! @/shopro/utils/tools */ 29));
var _wechat = _interopRequireDefault(__webpack_require__(/*! @/shopro/wechat/wechat */ 13));

var _types = __webpack_require__(/*! ../types.js */ 27);var _mutations;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}







var state = {
  isLogin: uni.getStorageSync('isLogin') ? uni.getStorageSync('isLogin') : false,
  userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
  agentInfo: uni.getStorageSync('agentInfo') ? uni.getStorageSync('agentInfo') : {},
  userData: {}, //????????????????????????
  messageIds: {}, //???????????????????????????ids
  authType: '' // smsLogin:?????????????????????, accountLogin:????????????, forgotPwd:????????????, changePwd:????????????, bindMobile:???????????????
};

var actions = {
  // ??????????????????
  getUserInfo: function getUserInfo(_ref)

  {var commit = _ref.commit;var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return new Promise(function (resolve, reject) {
      token && uni.setStorageSync('token', token);
      (0, _index.default)('user.info').then(function (res) {
        if (res.code === 1) {
          _store.default.dispatch('showAuthModal', '');
          if (!_store.default.state.user.isLogin) {
            _store.default.dispatch('getShareInfo');
          }
          commit('IS_LOGIN', true);
          commit('USER_INFO', res.data);
          uni.setStorageSync('userInfo', res.data);
          var spm = uni.getStorageSync('spm');
          if (spm) {
            (0, _index.default)('common.shareAdd', {
              spm: spm });

            uni.removeStorageSync('spm');
          }
          resolve(res);
        }

      }).then(function () {
        // ??????????????????????????????????????????????????????????????????????????????????????????
        token && _store.default.dispatch('getCartList');
        token && _store.default.dispatch('getUserData');
      }).
      catch(function (e) {
        reject(e);
      });
    });
  },
  // ????????????????????????
  getUserData: function getUserData(_ref2)

  {var commit = _ref2.commit;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('user.userData').then(function (res) {
        commit('USER_DATA', res.data);
        resolve(res);
      }).catch(function (e) {
        reject(e);
      });
    });
  },
  // ????????????????????????ids;
  getMessageIds: function getMessageIds(_ref3,

  type) {var commit = _ref3.commit;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('user.messageIds').then(function (res) {
        var typeName = []; //?????????
        var obj = res.data; //????????????
        var arr = []; //??????ids
        switch (type) {
          case 'result': //???????????????
            typeName = ['order_sended'];
            break;
          case 'grouponResult': //?????????????????????
            typeName = ['groupon_success', 'groupon_fail', 'order_sended'];
            break;
          case 'aftersale': //????????????
            typeName = ['refund_agree', 'aftersale_change', 'wallet_change'];
            break;
          case 'wallet': //????????????
            typeName = ['score_change', 'wallet_apply', 'wallet_change'];
            break;
          case 'store': //?????????????????????
            typeName = ['store_order_new'];
            break;
          case 'storeApply': //??????????????????
            typeName = ['store_apply'];
            break;
          default:
            typeName = [];
            break;}

        typeName.forEach(function (item) {
          obj[item] && arr.push(obj[item]);
        });
        commit('MESSAGE_IDS', arr);

        arr.length && uni.requestSubscribeMessage({
          tmplIds: arr,
          success: function success(res) {
            console.log(res);
          },
          fail: function fail(err) {
            console.log(err);
          } });



        resolve(arr);
      }).catch(function (e) {
        reject(e);
      });
    });
  },

  // ???????????????????????????
  getAgent: function getAgent(_ref4)

  {var commit = _ref4.commit;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('commission.auth').then(function (res) {
        if (res.code === 1) {
          commit('AGENT_INFO', res.data.data);
          uni.setStorageSync('agentInfo', res.data.data);
        }
        resolve(res);
      }).catch(function (e) {
        reject(e);
      });
    });
  },


  // ????????????
  autoLogin: function autoLogin(_ref5)

  {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _store$state$shopro$c;var commit, token;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:commit = _ref5.commit;if (!(
              ((_store$state$shopro$c = _store.default.state.shopro.config.wechat) === null || _store$state$shopro$c === void 0 ? void 0 : _store$state$shopro$c.autologin) && !_store.default.state.user.isLogin)) {_context.next = 7;break;}
              token = '';_context.next = 5;return (





                _wechat.default.getWxMiniProgramSessionKey(true));case 5:token = _context.sent;

              if (token) {
                _store.default.dispatch('getUserInfo', token);
              }case 7:case "end":return _context.stop();}}}, _callee);}))();

  },

  // ??????????????????
  showAuthModal: function showAuthModal(_ref6)

  {var commit = _ref6.commit;var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'accountLogin';
    commit('AUTH_TYPE', type);
  },

  // ????????????
  logout: function logout(_ref7)

  {var commit = _ref7.commit;
    uni.getStorageSync('token') && (0, _index.default)('user.logout');
    uni.removeStorageSync('token');
    uni.removeStorageSync('session_key');
    uni.removeStorageSync('userInfo');
    uni.removeStorageSync('cartNum');
    uni.removeStorageSync('chatSessionId');
    commit('IS_LOGIN', false);
    commit('USER_INFO', {});
    commit('CART_LIST', []);
    commit('CART_NUM');
    commit('USER_DATA', {});
  } };


var mutations = (_mutations = {}, _defineProperty(_mutations,

_types.IS_LOGIN, function (state, data) {
  uni.setStorageSync('isLogin', data);
  state.isLogin = data;
}), _defineProperty(_mutations,

_types.USER_INFO, function (state, data) {
  state.userInfo = data;
}), _defineProperty(_mutations,

_types.AGENT_INFO, function (state, data) {
  state.agentInfo = data;
}), _defineProperty(_mutations,

_types.MESSAGE_IDS, function (state, data) {
  state.messageIds = data;
}), _defineProperty(_mutations,
_types.USER_DATA, function (state, data) {
  state.userData = data;
}), _defineProperty(_mutations,
_types.AUTH_TYPE, function (state, data) {
  data ? uni.hideTabBar() : uni.showTabBar();
  state.authType = data;
}), _mutations);


var getters = {};var _default =



{
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 29:
/*!***************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/utils/tools.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _env = __webpack_require__(/*! @/env */ 19);


var _router = __webpack_require__(/*! @/shopro/router */ 24);var _default =


{

  /**
   * ???????????????,??????????????????????????????
   * @param {String} path - ????????????
   * @param {isTabbar} isTabbar - ?????????????????????
   */
  routerTo: function routerTo(path, isTabbar) {
    if (path) {
      // ????????????????????????
      if (~path.indexOf('http') || ~path.indexOf('www')) {




        _router.router.push({
          path: '/pages/public/webview',
          query: {
            'webviewPath': path } });



        return false;
      }
      if (isTabbar) {
        _router.router.replaceAll(path);
      } else {
        path.includes('/pages/index') && !path.includes('/pages/index/view') ? _router.router.pushTab(path) : _router.router.
        push(path);
      }

    } else {
      console.log("%cerr:\u6CA1\u6709\u586B\u5199\u8DF3\u8F6C\u8DEF\u5F84", 'color:green;background:yellow');
    }
  },
  /**
      * ????????????-????????????
      * @param {Array} urls - ????????????
      * @param {Number} current - ??????????????????
      */
  previewImage: function previewImage() {var urls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    uni.previewImage({
      urls: urls,
      current: current,
      indicator: 'default',
      loop: true,
      fail: function fail(err) {
        console.log('previewImage??????', urls, err);
      } });

  },

  /**
      * ????????????
      * @param {Array} oArr - ???????????????
      * @param {Number} length - ??????????????????
      * @return {Array}  arr - ?????????????????????
      */
  splitData: function splitData() {var oArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var arr = [];
    var minArr = [];
    oArr.forEach(function (c) {
      if (minArr.length === length) {
        minArr = [];
      }
      if (minArr.length === 0) {
        arr.push(minArr);
      }
      minArr.push(c);
    });

    return arr;
  },

  /**
      * ?????????????????????
      * @param {Number} t - ???????????????
      * @return {Object}  format - ??????????????????????????????
      */
  format: function format(t) {
    var format = {
      d: '00',
      h: '00',
      m: '00',
      s: '00' };

    if (t > 0) {
      var d = Math.floor(t / 86400);
      var h = Math.floor(t / 3600 % 24);
      var m = Math.floor(t / 60 % 60);
      var s = Math.floor(t % 60);
      format.d = d < 10 ? '0' + d : d;
      format.h = h < 10 ? '0' + h : h;
      format.m = m < 10 ? '0' + m : m;
      format.s = s < 10 ? '0' + s : s;
    }
    return format;
  },

  /**
      * ?????????
      * @param {String<Number>} phoneNumber - ???????????????
      */
  callPhone: function callPhone() {var phoneNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var num = phoneNumber.toString();
    uni.makePhoneCall({
      phoneNumber: num,
      fail: function fail(err) {
        console.log('makePhoneCall??????', err);
      } });

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!**********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/store/modules/cart.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! @/shopro/request/index */ 17));
var _index2 = _interopRequireDefault(__webpack_require__(/*! @/shopro/store/index.js */ 22));
var _types = __webpack_require__(/*! ../types.js */ 27);var _mutations;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var state = {
  cartList: uni.getStorageSync('cartList') ? uni.getStorageSync('cartList') : [],
  checkCart: {}, //???????????????????????????????????????
  allSelected: false,
  cartNum: uni.getStorageSync('cartNum') ? uni.getStorageSync('cartNum') : 0 //?????????,????????????????????????????????????????????????,
};

var actions = {
  // ????????????????????????
  getCartList: function getCartList(_ref)


  {var commit = _ref.commit,state = _ref.state;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('cart.index').then(function (res) {
        if (res.code === 1) {
          var cartData = res.data;
          cartData.length && cartData.map(function (item) {
            item.checked = true;
          });
          uni.setStorageSync('cartNum', cartData.length);
          commit('CART_LIST', cartData);
          commit('checkCartList');
          commit('getCheckCart');
          commit('CART_NUM');
        }

      }).catch(function (e) {
        reject(e);
      });
    });
  },
  // ???????????????????????????
  addCartGoods: function addCartGoods(_ref2,


  data) {var commit = _ref2.commit,dispatch = _ref2.dispatch;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('cart.add', {
        goods_list: data.list,
        from: data.from }).
      then(function (res) {
        if (res.code === 1) {
          dispatch('getCartList');
        }
        resolve(res);
      }).catch(function (e) {
        reject(e);
      });
    });
  },
  // ????????????????????????????????????|| ??????????????????????????????
  changeCartList: function changeCartList(_ref3,



  param) {var commit = _ref3.commit,state = _ref3.state,dispatch = _ref3.dispatch;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('cart.edit', {
        cart_list: param.ids,
        value: param.goodsNum || null,
        act: param.art }).
      then(function (res) {
        if (param.art === 'delete' && res.code === 1) {
          dispatch('getCartList');
        }
        resolve(res);
        commit('checkCartList');
      }).catch(function (e) {
        reject(e);
      });
    });
  } };


var mutations = (_mutations = {}, _defineProperty(_mutations,

_types.CART_LIST, function (state, data) {
  uni.setStorageSync('cartList', data);
  state.cartList = data;
}), _defineProperty(_mutations,

_types.CART_NUM, function (state, data) {
  var cartNum = uni.getStorageSync('cartNum') ? uni.getStorageSync('cartNum') : 0;
  if (Number(cartNum)) {
    uni.setTabBarBadge({
      index: 2,
      text: String(cartNum) });

  } else {
    uni.removeTabBarBadge({
      index: 2 });

  }
  state.cartNum = cartNum;
}), _defineProperty(_mutations, "changeAllSellect", function changeAllSellect(

state) {
  state.allSelected = !state.allSelected;
}), _defineProperty(_mutations, "getAllSellectCartList", function getAllSellectCartList(

state, flag) {
  state.cartList.map(function (item) {
    item.checked = flag;
  });
}), _defineProperty(_mutations, "checkCartList", function checkCartList(

state) {
  var all = true;
  state.cartList.map(function (item) {
    if (!item.checked) {
      all = false;
    }
  });
  state.allSelected = all;
}), _defineProperty(_mutations, "getCheckCart", function getCheckCart(

state) {
  var obj = {};
  state.cartList.map(function (item) {
    obj[item.goods_id] = {
      num: item.goods_num,
      cartOrderId: item.id };

  });
  state.checkCart = obj;
}), _mutations);


var getters = {
  // ????????????????????????
  totalCount: function totalCount(state) {
    var totalNum = 0;
    var totalPrice = 0;
    state.cartList.filter(function (item) {
      if (item.checked) {
        totalNum += 1;
        totalPrice += item.goods_num * (item.sku_price ? item.sku_price.price : 0);
      }
    });
    return {
      totalNum: totalNum,
      totalPrice: totalPrice };

  },

  // ?????????????????????
  isSel: function isSel(state) {
    var isSel = false;
    state.cartList.map(function (item) {
      if (item.checked) {
        isSel = true;
      }
    });
    return isSel;
  },

  // ????????????????????????????????????
  isActivityPay: function isActivityPay() {
    var num = 0;
    var activityNum = 0;
    state.cartList.map(function (item) {
      if (item.checked) {
        num += 1;
        if (item.cart_type === 'activity') {
          activityNum += 1;
        }
      }
    });
    if (num === 1 && activityNum === 1 || activityNum === 0) {
      return true;
    }
    return false;
  } };var _default =



{
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 34:
/*!****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/utils/sdk-h5.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 35:
/*!***********************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 36));












var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 37));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 38));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 39));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 40));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 41));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 42));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 43));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 44));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 45));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 46));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 47));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 48));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 49));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 50));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 51));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 52));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 53));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 54);




var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 55));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 56));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 57));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 58));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // ????????????mixin
function wranning(str) {// ??????????????????????????????,???????????????????????????
  // ?????????????????????????????????????????????,??????hx????????????????????????????????????,??????:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // post????????????????????????get??????url??????
var $u = { queryParams: _queryParams.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // ??????date
  timeFrom: _timeFrom.default,
  colorGradient: _colorGradient.default.colorGradient,
  colorToRgba: _colorGradient.default.colorToRgba,
  guid: _guid.default,
  color: _color.default,
  sys: _sys.sys,
  os: _sys.os,
  type2icon: _type2icon.default,
  randomArray: _randomArray.default,
  wranning: wranning,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  toast: _toast.default,
  config: _config.default, // uView????????????????????????????????????
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u?????????uni?????????
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  // ???????????????????????????????????????date???timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // ???????????????????????????????????????????????????
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!**********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/mixin/mixin.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _env = __webpack_require__(/*! @/env.js */ 19);




module.exports = {
  data: function data() {
    return {
      $IMG_URL: _env.IMG_URL, //??????????????????template???????????????vue????????????
      $API_URL: _env.API_URL, //??????????????????template???????????????vue????????????
      $Router: this.$Router, //??????????????????template???????????????vue????????????
      $tools: this.$tools //??????????????????template???????????????vue????????????
    };
  },
  mounted: function mounted() {
    this.$u.getRect = this.$uGetRect; // getRect?????????$u?????????????????????????????????in(this)?????????????????????????????????????????????????????????
  },
  methods: {
    // ??????????????????
    // ?????????????????????????????????????????????????????????????????????????????????????????????bug(2020-07-21)
    // ???????????????????????????????????????????????????????????????view??????
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // ?????????created????????????parent??????
      if (!this.parent) this.parent = false;
      // ??????????????????????????????????????????????????????(??????u-radio-group???this)
      // ????????????this???????????????????????????????????????(u-radio???this)???parentData????????????????????????
      // ?????????????????????????????????????????????????????????????????????????????????this.parent.xxx?????????????????????????????????
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // ??????parentData??????????????????parent???????????????????????????parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // ??????????????????
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // ??????????????????????????????parent???chldren????????????checkbox???checkbox-group????????????????????????????????????
    // ?????????????????????????????????????????????children??????????????????????????????????????????????????????
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // ???????????????????????????????????????children????????????????????????
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // ????????????????????????
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 37:
/*!*******************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/queryParams.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ?????????url??????
                                                                                                      * @param {*} data,??????
                                                                                                      * @param {*} isPrefix,??????????????????"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // ?????????????????????
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // ?????????????????????????????????
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // ??????: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // ??????: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // ??????: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // ??????: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 38:
/*!******************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/timeFormat.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart ??? polyfill????????????????????????????????????????????????es7???padStart????????????????????????????????????
// ???????????????????????????polyfill???????????????
if (!String.prototype.padStart) {
  // ???????????????????????? fillString ??????ES6 ?????????????????????????????????
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // ?????? String(str) ????????????????????????????????????????????????????????????????????????????????????
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// ?????????????????????????????????:
// yyyy:mm:dd|yyyy:mm|yyyy???mm???dd???|yyyy???mm???dd??? hh???MM??????,??????????????????
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // ?????????null,????????????????????????
  if (!dateTime) dateTime = Number(new Date());
  // ??????dateTime?????????10??????13????????????????????????????????????????????????13?????????????????????????????????
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // ???
    "m+": (date.getMonth() + 1).toString(), // ???
    "d+": date.getDate().toString(), // ???
    "h+": date.getHours().toString(), // ???
    "M+": date.getMinutes().toString(), // ???
    "s+": date.getSeconds().toString() // ???
    // ???????????????????????????????????????????????????????????????????????????
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 380:
/*!*****************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/poster/QS-SharePoster/app.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var log = console.log; // ??????????????????APP.vue????????????onlaunch????????? console.log = ()=> {} ?????????????????????????????????
log = function log() {}; // ????????????????????????????????????????????????
var _app = {
  lineFeedTags: ['<br />', '<br/>', '\r\n', '\n\t', '\r', '\n'], //?????????????????????
  tagetLineFeedTag: "\u2764", //???lineFeedTags???????????????????????????????????????, ???????????????, ????????????????????????????????????????????????????????????????????????!
  //????????????
  log: function log(t) {
    // log(t);
  }, // ????????????,
  showLoading: function showLoading(msg, ifmask) {
    uni.showLoading({
      title: msg,
      mask: ifmask || false });

  },
  hideLoading: function hideLoading() {
    uni.hideLoading();
  },
  showToast: function showToast(msg, icon) {
    uni.showToast({
      title: msg,
      icon: icon || 'none' });

  },
  getPosterUrl: function getPosterUrl(objs) {// ????????????????????????url????????????
    var
    backgroundImage =


    objs.backgroundImage,type = objs.type,formData = objs.formData;
    return new Promise(function (rs, rj) {
      var image;
      if (backgroundImage) {
        image = backgroundImage;
      } else {
        switch (type) {//??????type???????????????, ???????????????request??????
          case 1:
            image = '';
            break;
          default:
            image = '';
            break;}

      }
      if (image) {
        rs(image); // resolve???????????????
      } else {
        rj('???????????????????????????');
      }
    });
  },






  //????????????????????????
  shareTypeListSheetArray: {
    array: [0, 1, 2, 3, 4, 5] },
  // ???????????? 0-???????????? 1-????????? 2-????????? 3-?????? 4-?????? 5-?????????
  isArray: function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  },
  isObject: function isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
  },
  isPromise: function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  },
  isNull: function isNull(arg) {
    return arg === null;
  },
  isUndefined: function isUndefined(arg) {
    return arg === undefined;
  },
  isUndef: function isUndef(arg) {
    return arg === undefined;
  },
  isNotNull_string: function isNotNull_string(arg) {
    return arg !== null && arg !== undefined && arg !== '';
  },
  isFn: function isFn(fn) {
    return fn && typeof fn === 'function';
  },
  getStorage: function getStorage(key, scb, fcb) {
    uni.getStorage({
      key: key,
      success: function success(res) {
        if (res.data && res.data != "") {
          if (scb) scb(res.data);
        } else {
          if (fcb) fcb();
        }
      },
      fail: function fail() {
        if (fcb) fcb();
      } });

  },
  setStorage: function setStorage(key, data) {
    log('????????????');
    log('key???' + key);
    log('data???' + JSON.stringify(data));
    uni.setStorage({
      key: key,
      data: data });

  },
  setStorageSync: function setStorageSync(key, data) {
    uni.setStorageSync(key, data);
  },
  getStorageSync: function getStorageSync(key) {
    return uni.getStorageSync(key);
  },
  clearStorageSync: function clearStorageSync() {
    uni.clearStorageSync();
  },
  removeStorageSync: function removeStorageSync(key) {
    uni.removeStorageSync(key);
  },
  getImageInfo: function getImageInfo(url, cb, fcb) {
    url = checkMPUrl(url);
    uni.getImageInfo({
      src: url,
      success: function success(res) {
        if (cb && typeof cb == 'function') cb(res);
      },
      fail: function fail(err) {
        if (fcb && typeof fcb == 'function') fcb(err);
      } });

  },
  downloadFile: function downloadFile(url, cb) {
    url = checkMPUrl(url);
    uni.downloadFile({
      url: url,
      success: function success(res) {
        if (cb && typeof cb == 'function') cb(res);
      } });

  },
  downloadFile_PromiseFc: function downloadFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      if (url.substring(0, 4) !== 'http') {
        rs(url);
      } else {
        url = checkMPUrl(url);
        log('url:' + url);
        uni.downloadFile({
          url: url,
          success: function success(res) {
            if (res && res.tempFilePath)
            rs(res.tempFilePath);else

            rj('not find tempFilePath');
          },
          fail: function fail(err) {
            rj(err);
          } });

      }
    });
  },
  saveFile: function saveFile(url) {
    uni.saveFile({
      tempFilePath: url,
      success: function success(res) {
        log('????????????:' + JSON.stringify(res));
      } });

  },
  downLoadAndSaveFile_PromiseFc: function downLoadAndSaveFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      log('???????????????????????????:' + url);
      if (url.substring(0, 4) === 'http') {
        url = checkMPUrl(url);
        uni.downloadFile({
          url: url,
          success: function success(d_res) {
            log('????????????????????????' + JSON.stringify(d_res));
            if (d_res && d_res.tempFilePath) {






              uni.saveFile({
                tempFilePath: d_res.tempFilePath,
                success: function success(s_res) {
                  log('?????????????????????:' + JSON.stringify(s_res));
                  if (s_res && s_res.savedFilePath)
                  rs(s_res.savedFilePath);else

                  rs(d_res.tempFilePath);
                },
                fail: function fail(err) {
                  rs(d_res.tempFilePath);
                } });



            } else {
              rj('not find tempFilePath');
            }
          },
          fail: function fail(err) {
            rj(err);
          } });

      } else {
        rs(url);
      }
    });
  },
  checkFile_PromiseFc: function checkFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      uni.getSavedFileList({
        success: function success(res) {
          var d = res.fileList;
          var index = d.findIndex(function (item) {
            return item.filePath === url;
          });
          rs(index);
        },
        fail: function fail(err) {
          rj(err);
        } });

    });
  },
  removeSavedFile: function removeSavedFile(path) {
    uni.getSavedFileList({
      success: function success(res) {
        var d = res.fileList;
        var index = d.findIndex(function (item) {
          return item.filePath === path;
        });
        if (index >= 0)
        uni.removeSavedFile({
          filePath: path });

      } });

  },
  fileNameInPath: function fileNameInPath(path) {
    var s = path.split("/");
    return s[s.length - 1];
  },
  getImageInfo_PromiseFc: function getImageInfo_PromiseFc(imgPath) {
    return new Promise(function (rs, rj) {
      log('????????????????????????:' + imgPath);
      imgPath = checkMPUrl(imgPath);
      uni.getImageInfo({
        src: imgPath,
        success: function success(res) {
          log('????????????????????????:' + JSON.stringify(res));
          rs(res);
        },
        fail: function fail(err) {
          log('????????????????????????:' + JSON.stringify(err));
          rj(err);
        } });

    });
  },
  previewImage: function previewImage(urls) {
    if (typeof urls == 'string')
    urls = [urls];
    uni.previewImage({
      urls: urls });

  },
  actionSheet: function actionSheet(obj, cb) {
    var sheetArray = [];
    for (var i = 0; i < obj.array.length; i++) {
      switch (obj.array[i]) {
        case 'sinaweibo':
          sheetArray[i] = '????????????';
          break;
        case 'qq':
          sheetArray[i] = 'QQ';
          break;
        case 'weixin':
          sheetArray[i] = '??????';
          break;
        case 'WXSceneSession':
          sheetArray[i] = '????????????';
          break;
        case 'WXSenceTimeline':
          sheetArray[i] = '???????????????';
          break;
        case 'WXSceneFavorite':
          sheetArray[i] = '????????????';
          break;
        case 0:
          sheetArray[i] = '????????????';
          break;
        case 1:
          sheetArray[i] = '?????????';
          break;
        case 2:
          sheetArray[i] = '?????????';
          break;
        case 3:
          sheetArray[i] = '??????';
          break;
        case 4:
          sheetArray[i] = '??????';
          break;
        case 5:
          sheetArray[i] = '?????????';
          break;
        default:
          break;}

    }
    this.showActionSheet(sheetArray, cb);
  },
  showActionSheet: function showActionSheet(sheetArray, cb) {
    uni.showActionSheet({
      itemList: sheetArray,
      success: function success(e) {
        if (cb && typeof cb == 'function') cb(e.tapIndex);
      } });

  },
  getProvider: function getProvider(type, cb, sheet) {
    var _this = this;
    uni.getProvider({
      service: type,
      success: function success(res) {
        if (sheet) {
          var obj = {};
          obj.array = res.provider;
          _this.actionSheet(obj, function (index) {
            if (cb && typeof cb == "function") cb(res.provider[index]);
          });
        } else {
          if (type == 'payment') {
            var providers = res.provider;
            var payTypeArray = [];
            for (var i = 0; i < providers.length; i++) {
              if (providers[i] == 'wxpay') {
                payTypeArray[i] = {
                  name: '????????????',
                  value: providers[i],
                  img: '/static/image/wei.png' };

              } else if (providers[i] == 'alipay') {
                payTypeArray[i] = {
                  name: "???????????????",
                  value: providers[i],
                  img: '/static/image/ali.png' };

              }
            }
            if (cb && typeof cb == "function") cb(payTypeArray);
          } else {
            if (cb && typeof cb == "function") cb(res);
          }
        }
      } });

  } };



















































































































































































function checkMPUrl(url) {

  // if(process.env.NODE_ENV !== 'development'){
  // 	if(
  // 		url.substring(0, 4) === 'http' && 
  // 		url.substring(0, 5) !== 'https' && 
  // 		url.substring(0, 12) !== 'http://store' && 
  // 		url.substring(0, 10) !== 'http://tmp' && 
  // 		url.substring(0, 10) !== 'http://usr'
  // 	) {
  // 		url = 'https' + url.substring(4, url.length);
  // 	}
  // }

  return url;
}

module.exports = _app;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 381:
/*!****************************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/poster/QS-SharePoster/QS-SharePoster.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));var _app2 = _interopRequireDefault(__webpack_require__(/*! ./app.js */ 380));
var _QRCodeAlg = _interopRequireDefault(__webpack_require__(/*! ./QRCodeAlg.js */ 382));
var _imageTools = __webpack_require__(/*! ./image-tools.js */ 383);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


var ShreUserPosterBackgroundKey = 'ShrePosterBackground_'; // ??????????????????????????????
var idKey = 'QSSHAREPOSTER_IDKEY'; //drawArray???????????????idkey
var nbgScale = 1;
// export default 
function getSharePoster(obj) {var

  type =



















  obj.type,formData = obj.formData,background = obj.background,posterCanvasId = obj.posterCanvasId,backgroundImage = obj.backgroundImage,reserve = obj.reserve,textArray = obj.textArray,drawArray = obj.drawArray,qrCodeArray = obj.qrCodeArray,imagesArray = obj.imagesArray,setCanvasWH = obj.setCanvasWH,setCanvasToTempFilePath = obj.setCanvasToTempFilePath,canvas2image = obj.canvas2image,setDraw = obj.setDraw,bgScale = obj.bgScale,Context = obj.Context,_this = obj._this,delayTimeScale = obj.delayTimeScale,drawDelayTime = obj.drawDelayTime,draw = obj.draw;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(rs, rj) {var bgObj, params, i, addDrawArray, _i, drawArrayItem, newData, addDraw, drawArray_copy, _loop, _i2, _ret, poster;return _regenerator.default.wrap(function _callee$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;

              if (!Context) {
                _app2.default.log('??????????????????,??????????????????');
                Context = uni.createCanvasContext(posterCanvasId, _this || null);
              }if (!(

              background && background.width && background.height)) {_context2.next = 6;break;}
              bgObj = background;_context2.next = 9;break;case 6:_context2.next = 8;return (

                getShreUserPosterBackground({
                  backgroundImage: backgroundImage,
                  type: type,
                  formData: formData }));case 8:bgObj = _context2.sent;case 9:


              bgScale = bgScale || nbgScale;
              bgObj.width = bgObj.width * bgScale;
              bgObj.height = bgObj.height * bgScale;

              _app2.default.log('?????????????????????????????????:' + JSON.stringify(bgObj));
              params = {
                bgObj: bgObj,
                type: type,
                bgScale: bgScale,
                getBgObj: function getBgObj() {
                  return params.bgObj;
                },
                setBgObj: function setBgObj(newBgObj) {
                  var n = _objectSpread(_objectSpread({},
                  params.bgObj),
                  newBgObj);

                  params.bgObj = n;
                  bgObj = n;
                } };if (!

              imagesArray) {_context2.next = 20;break;}
              if (typeof imagesArray == 'function')
              imagesArray = imagesArray(params);
              _app2.default.log('??????????????????');_context2.next = 19;return (
                setImage(imagesArray));case 19:imagesArray = _context2.sent;case 20:

              if (textArray) {
                if (typeof textArray == 'function')
                textArray = textArray(params);
                textArray = setText(Context, textArray);

              }if (!
              qrCodeArray) {_context2.next = 33;break;}
              if (typeof qrCodeArray == 'function')
              qrCodeArray = qrCodeArray(params);
              i = 0;case 24:if (!(i < qrCodeArray.length)) {_context2.next = 33;break;}
              _app2.default.log(i);if (!
              qrCodeArray[i].image) {_context2.next = 30;break;}_context2.next = 29;return (
                _app2.default.downloadFile_PromiseFc(qrCodeArray[i].image));case 29:qrCodeArray[i].image = _context2.sent;case 30:i++;_context2.next = 24;break;case 33:if (!


              drawArray) {_context2.next = 91;break;}
              if (typeof drawArray == 'function') {
                drawArray = drawArray(params);
              }if (!
              _app2.default.isPromise(drawArray)) {_context2.next = 39;break;}_context2.next = 38;return (
                drawArray);case 38:drawArray = _context2.sent;case 39:if (!(


              _app2.default.isArray(drawArray) && drawArray.length > 0)) {_context2.next = 91;break;}
              // let hasAllInfoCallback = false;
              addDrawArray = [];
              _i = 0;case 42:if (!(_i < drawArray.length)) {_context2.next = 74;break;}
              drawArrayItem = drawArray[_i];
              // if (_app.isFn(drawArrayItem.allInfoCallback) && !hasAllInfoCallback)
              // hasAllInfoCallback = true;
              drawArrayItem[idKey] = _i;
              newData = void 0;
              addDraw = false;_context2.t0 =
              drawArrayItem.type;_context2.next = _context2.t0 ===
              'image' ? 50 : _context2.t0 ===


              'text' ? 54 : _context2.t0 ===











              'qrcode' ? 56 : _context2.t0 ===





              'custom' ? 62 : _context2.t0 ===

              'fillrect' ? 63 : _context2.t0 ===

              'strokeRect' ? 64 : _context2.t0 ===

              'roundStrokeRect' ? 65 : _context2.t0 ===

              'roundFillRect' ? 66 : 67;break;case 50:_context2.next = 52;return setImage(drawArrayItem);case 52:newData = _context2.sent;return _context2.abrupt("break", 69);case 54:newData = setText(Context, drawArrayItem, params.bgObj); // if (_app.isArray(setTextResult)) {
              // 	addDraw = true;
              // 	addDrawArray.push({
              // 		index: i,
              // 		items: setTextResult
              // 	});
              // } else {
              // 	newData = setTextResult;
              // }
              return _context2.abrupt("break", 69);case 56:if (!drawArrayItem.image) {_context2.next = 61;break;}_context2.next = 59;return _app2.default.downloadFile_PromiseFc(drawArrayItem.image);case 59:_context2.t1 = _context2.sent;newData = { image: _context2.t1 };case 61:return _context2.abrupt("break", 69);case 62:return _context2.abrupt("break", 69);case 63:return _context2.abrupt("break", 69);case 64:return _context2.abrupt("break", 69);case 65:return _context2.abrupt("break", 69);case 66:return _context2.abrupt("break", 69);case 67:_app2.default.log('??????????????????');return _context2.abrupt("break", 69);case 69:if (!addDraw && newData && _app2.default.isObject(newData)) {drawArray[_i] = _objectSpread(_objectSpread({}, drawArrayItem), newData);

              };case 71:_i++;_context2.next = 42;break;case 74:


              // if (addDrawArray.length) {
              // 	for (let i = 0; i < addDrawArray.length; i++) {
              // 		const item = addDrawArray[i];
              // 		const index = drawArray.findIndex(ite => ite[idKey] == item.index);
              // 		if (-1 != index) {
              // 			item.items.forEach((ite, index) => {
              // 				ite[idKey] = drawArray.length + index;
              // 				ite.allInfoCallback = null;
              // 			});
              // 			drawArray.splice(index, 1, ...item.items)
              // 		}
              // 	}
              // }
              _app2.default.log('AllInfoCallback??????', JSON.stringify(drawArray));

              // if (hasAllInfoCallback) {
              _app2.default.log('----------------hasAllInfoCallback----------------');
              drawArray_copy = _toConsumableArray(drawArray);
              drawArray_copy.sort(function (a, b) {
                var a_serialNum = !_app2.default.isUndef(a.serialNum) && !_app2.default.isNull(a.
                serialNum) ? Number(a.serialNum) : Number.NEGATIVE_INFINITY;
                var b_serialNum = !_app2.default.isUndef(b.serialNum) && !_app2.default.isNull(b.
                serialNum) ? Number(b.serialNum) : Number.NEGATIVE_INFINITY;
                return a_serialNum - b_serialNum;
              });
              _app2.default.log('??????for??????');_loop = /*#__PURE__*/_regenerator.default.mark(function _loop(

              _i2) {var item, item_idKey, ind, _newData, textLength, setLineFeedResult, _drawArray;return _regenerator.default.wrap(function _loop$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        item = _objectSpread({},
                        drawArray_copy[_i2]);

                        item_idKey = item[idKey];
                        _app2.default.log('item_idKey', item_idKey);
                        ind = drawArray.findIndex(function (it) {return it[idKey] == item_idKey;});
                        _app2.default.log('ind', ind);if (!(
                        -1 == ind)) {_context.next = 7;break;}return _context.abrupt("return", "break");case 7:if (!
                        _app2.default.isFn(item.allInfoCallback)) {_context.next = 16;break;}
                        _newData = item.allInfoCallback({
                          drawArray: drawArray });

                        _app2.default.log('newData', JSON.stringify(_newData));if (!
                        _app2.default.isPromise(_newData)) {_context.next = 14;break;}_context.next = 13;return _newData;case 13:_newData = _context.sent;case 14:

                        if (drawArray[ind].type === 'text' && _newData.size) {
                          textLength = countTextLength(Context, {
                            text: _newData.text || drawArray[ind].text,
                            size: _newData.size });

                          _newData.textLength = textLength;
                        }
                        drawArray[ind] = _objectSpread(_objectSpread({},
                        item),
                        _newData);case 16:


                        _app2.default.log('drawArray[ind]', JSON.stringify(drawArray[ind]));
                        if (drawArray[ind].type === 'text') {
                          setLineFeedResult = setLineFeed(Context, drawArray[ind], params.bgObj);
                          if (_app2.default.isArray(setLineFeedResult)) {
                            setLineFeedResult.forEach(function (ite, index) {
                              ite[idKey] = drawArray.length + index;
                              ite.allInfoCallback = null;
                            });
                            (_drawArray = drawArray).splice.apply(_drawArray, [ind, 1].concat(_toConsumableArray(setLineFeedResult)));
                          } else {
                            drawArray.splice(ind, 1, setLineFeedResult);
                          }
                        }case 18:case "end":return _context.stop();}}}, _loop);});_i2 = 0;case 81:if (!(_i2 < drawArray_copy.length)) {_context2.next = 89;break;}return _context2.delegateYield(_loop(_i2), "t2", 83);case 83:_ret = _context2.t2;if (!(_ret === "break")) {_context2.next = 86;break;}return _context2.abrupt("break", 89);case 86:_i2++;_context2.next = 81;break;case 89:


              _app2.default.log('for????????????');
              _app2.default.log('allInfocallback??????', JSON.stringify(drawArray));
              // }
            case 91:

              drawArray.sort(function (a, b) {
                var a_zIndex = !_app2.default.isUndef(a.zIndex) && !_app2.default.isNull(a.
                zIndex) ? Number(a.zIndex) : Number.NEGATIVE_INFINITY;
                var b_zIndex = !_app2.default.isUndef(b.zIndex) && !_app2.default.isNull(b.
                zIndex) ? Number(b.zIndex) : Number.NEGATIVE_INFINITY;
                return a_zIndex - b_zIndex;
              });
              _app2.default.log('params:' + JSON.stringify(params));if (!(
              setCanvasWH && typeof setCanvasWH == 'function')) {_context2.next = 96;break;}_context2.next = 96;return (
                new Promise(function (resolve, reject) {
                  setCanvasWH(params);
                  setTimeout(function () {
                    resolve();
                  }, 50);
                }));case 96:_context2.next = 98;return (

                drawShareImage({
                  Context: Context,
                  type: type,
                  posterCanvasId: posterCanvasId,
                  reserve: reserve,
                  drawArray: drawArray,
                  textArray: textArray,
                  imagesArray: imagesArray,
                  bgObj: bgObj,
                  qrCodeArray: qrCodeArray,
                  setCanvasToTempFilePath: setCanvasToTempFilePath,
                  setDraw: setDraw,
                  bgScale: bgScale,
                  _this: _this,
                  delayTimeScale: delayTimeScale,
                  drawDelayTime: drawDelayTime,
                  canvas2image: canvas2image,
                  draw: draw }));case 98:poster = _context2.sent;

              rs({
                bgObj: bgObj,
                poster: poster,
                type: type });_context2.next = 106;break;case 102:_context2.prev = 102;_context2.t3 = _context2["catch"](0);


              //TODO handle the exception
              _app2.default.hideLoading();
              rj(_context2.t3);case 106:case "end":return _context2.stop();}}}, _callee, null, [[0, 102]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


}

function drawShareImage(obj) {//??????????????????
  var
  Context =
















  obj.Context,type = obj.type,posterCanvasId = obj.posterCanvasId,reserve = obj.reserve,bgObj = obj.bgObj,drawArray = obj.drawArray,textArray = obj.textArray,qrCodeArray = obj.qrCodeArray,imagesArray = obj.imagesArray,setCanvasToTempFilePath = obj.setCanvasToTempFilePath,setDraw = obj.setDraw,bgScale = obj.bgScale,_this = obj._this,delayTimeScale = obj.delayTimeScale,drawDelayTime = obj.drawDelayTime,canvas2image = obj.canvas2image,draw = obj.draw;
  var params = {
    Context: Context,
    bgObj: bgObj,
    type: type,
    bgScale: bgScale };

  delayTimeScale = delayTimeScale !== undefined ? delayTimeScale : 15;
  drawDelayTime = drawDelayTime !== undefined ? drawDelayTime : 100;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(rs, rj) {var i, _i3, drawArrayItem;return _regenerator.default.wrap(function _callee2$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

              _app2.default.log('????????????:' + JSON.stringify(bgObj));
              if (bgObj && bgObj.path) {
                _app2.default.log('?????????????????????');
                Context.drawImage(bgObj.path, 0, 0, bgObj.width, bgObj.height);
              } else {
                _app2.default.log('????????????????????????');
                if (bgObj.backgroundColor) {
                  _app2.default.log('?????????????????????:' + bgObj.backgroundColor);
                  Context.setFillStyle(bgObj.backgroundColor);
                  Context.fillRect(0, 0, bgObj.width, bgObj.height);
                } else {
                  _app2.default.log('????????????????????????');
                }
              }

              if (imagesArray && imagesArray.length > 0)
              drawImage(Context, imagesArray);

              if (setDraw && typeof setDraw == 'function') setDraw(params);

              if (textArray && textArray.length > 0)
              drawText(Context, textArray, bgObj);

              if (qrCodeArray && qrCodeArray.length > 0) {
                for (i = 0; i < qrCodeArray.length; i++) {
                  drawQrCode(Context, qrCodeArray[i]);
                }
              }if (!(

              drawArray && drawArray.length > 0)) {_context3.next = 45;break;}
              _i3 = 0;case 9:if (!(_i3 < drawArray.length)) {_context3.next = 45;break;}
              drawArrayItem = drawArray[_i3];
              _app2.default.log('????????????????????????, drawArrayItem:' + JSON.stringify(drawArrayItem));_context3.t0 =
              drawArrayItem.type;_context3.next = _context3.t0 ===
              'image' ? 15 : _context3.t0 ===



              'text' ? 18 : _context3.t0 ===



              'qrcode' ? 21 : _context3.t0 ===



              'custom' ? 24 : _context3.t0 ===





              'fillRect' ? 28 : _context3.t0 ===



              'strokeRect' ? 31 : _context3.t0 ===



              'roundStrokeRect' ? 34 : _context3.t0 ===



              'roundFillRect' ? 37 : 40;break;case 15:_app2.default.log('????????????????????????, ????????????');drawImage(Context, drawArrayItem);return _context3.abrupt("break", 42);case 18:_app2.default.log('????????????????????????, ????????????');drawText(Context, drawArrayItem, bgObj);return _context3.abrupt("break", 42);case 21:_app2.default.log('????????????????????????, ???????????????');drawQrCode(Context, drawArrayItem);return _context3.abrupt("break", 42);case 24:_app2.default.log('????????????????????????, ?????????????????????');if (drawArrayItem.setDraw && typeof drawArrayItem.setDraw === 'function') drawArrayItem.setDraw(Context);return _context3.abrupt("break", 42);case 28:_app2.default.log('????????????????????????, ????????????????????????');drawFillRect(Context, drawArrayItem);return _context3.abrupt("break", 42);case 31:_app2.default.log('????????????????????????, ????????????????????????');drawStrokeRect(Context, drawArrayItem);return _context3.abrupt("break", 42);case 34:_app2.default.log('????????????????????????, ????????????????????????');drawRoundStrokeRect(Context, drawArrayItem);return _context3.abrupt("break", 42);case 37:
              _app2.default.log('????????????????????????, ????????????????????????');
              drawRoundFillRect(Context, drawArrayItem);return _context3.abrupt("break", 42);case 40:


              _app2.default.log('??????????????????');return _context3.abrupt("break", 42);case 42:_i3++;_context3.next = 9;break;case 45:




              setTimeout(function () {
                _app2.default.log('????????????draw??????');
                _app2.default.log('Context:' + Context);
                if (draw === false) {
                  _app2.default.log('draw?????????false??????????????????canvas?????????draw??????');
                  rs();
                  return;
                }
                var fn = function fn() {
                  var setObj = setCanvasToTempFilePath || {};
                  if (setObj && typeof setObj == 'function')
                  setObj = setCanvasToTempFilePath(bgObj, type);
                  var canvasToTempFilePathFn;
                  var dpr = uni.getSystemInfoSync().pixelRatio;
                  var data = _objectSpread(_objectSpread({
                    // ?????????????????????uni??????????????????????????????
                    // x: 0,
                    // y: 0,
                    // width: Number(bgObj.width),
                    // height: Number(bgObj.height),
                    // destWidth: Number(bgObj.width) * dpr,
                    // destHeight: Number(bgObj.height) * dpr,
                    quality: .8,
                    fileType: 'jpg' },
                  setObj), {}, {
                    canvasId: posterCanvasId });

                  if (canvas2image === false) {
                    return rs({
                      setCanvasToTempFilePath: data });

                  }
                  _app2.default.log('canvasToTempFilePath???data??????:' + JSON.stringify(data));
                  canvasToTempFilePathFn = function canvasToTempFilePathFn() {
                    var toTempFilePathObj = _objectSpread(_objectSpread({},
                    data), {}, {
                      success: function success(res) {
                        rs(_objectSpread(_objectSpread({},
                        res), {}, {
                          setCanvasToTempFilePath: data }));

                      },
                      fail: function fail(err) {
                        _app2.default.hideLoading();
                        _app2.default.log('??????????????????');
                        _app2.default.log('??????????????????:' + JSON.stringify(err));
                        rj('??????????????????:' + JSON.stringify(err));
                      } });

                    uni.canvasToTempFilePath(toTempFilePathObj, _this || null);
                  };
                  var delayTime = 0;
                  if (qrCodeArray) {
                    qrCodeArray.forEach(function (item) {
                      if (item.text) {
                        delayTime += Number(item.text.length);
                      }
                    });
                  }
                  if (imagesArray) {
                    imagesArray.forEach(function () {
                      delayTime += delayTimeScale;
                    });
                  }
                  if (textArray) {
                    textArray.forEach(function () {
                      delayTime += delayTimeScale;
                    });
                  }
                  if (drawArray) {
                    drawArray.forEach(function (item) {
                      switch (item.type) {
                        case 'text':
                          if (item.text) {
                            delayTime += item.text.length;
                          }
                          break;
                        case 'qrcode':
                          if (item.text) {
                            delayTime += item.text.length * 2;
                          }
                          break;
                        default:
                          delayTime += delayTimeScale;
                          break;}

                    });
                  }
                  _app2.default.log('????????????:' + delayTimeScale);
                  _app2.default.log('????????????:' + delayTime);
                  setTimeout(canvasToTempFilePathFn, delayTime);
                };
                Context.draw(typeof reserve == 'boolean' ? reserve : false, fn);
              }, drawDelayTime);_context3.next = 52;break;case 48:_context3.prev = 48;_context3.t1 = _context3["catch"](0);

              //TODO handle the exception
              _app2.default.hideLoading();
              rj(_context3.t1);case 52:case "end":return _context3.stop();}}}, _callee2, null, [[0, 48]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());


}

// export
function drawFillRect(Context) {var drawArrayItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; //????????????
  _app2.default.log('????????????????????????????????????, drawArrayItem:' + JSON.stringify(drawArrayItem));
  Context.setFillStyle(drawArrayItem.backgroundColor || 'black');
  Context.setGlobalAlpha(drawArrayItem.alpha || 1);
  Context.fillRect(drawArrayItem.dx || 0, drawArrayItem.dy || 0, drawArrayItem.width || 0, drawArrayItem.height || 0);
  Context.setGlobalAlpha(1);
}

// export
function drawStrokeRect(Context) {var drawArrayItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; //????????????
  Context.setStrokeStyle(drawArrayItem.color || 'black');
  Context.setLineWidth(drawArrayItem.lineWidth || 1);
  Context.strokeRect(drawArrayItem.dx, drawArrayItem.dy, drawArrayItem.width, drawArrayItem.height);
}

// export
function drawRoundStrokeRect(Context) {var drawArrayItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var

  dx =






  drawArrayItem.dx,dy = drawArrayItem.dy,width = drawArrayItem.width,height = drawArrayItem.height,r = drawArrayItem.r,lineWidth = drawArrayItem.lineWidth,color = drawArrayItem.color;
  r = r || width * .1;

  if (width < 2 * r) {
    r = width / 2;
  }
  if (width < 2 * r) {
    r = width / 2;
  }
  Context.beginPath();
  Context.arc(dx + r, dy + r, r, 1 * Math.PI, 1.5 * Math.PI);
  Context.lineTo(dx + width - r, dy);
  Context.arc(dx + width - r, dy + r, r, 1.5 * Math.PI, 0);
  Context.lineTo(dx + width, dy + height - r);
  Context.arc(dx + width - r, dy + height - r, r, 0, .5 * Math.PI);
  Context.lineTo(dx + r, dy + height);
  Context.arc(dx + r, dy + height - r, r, .5 * Math.PI, 1 * Math.PI);
  Context.lineTo(dx, dy + r);
  Context.closePath();
  Context.setLineWidth(lineWidth || 1);
  Context.setStrokeStyle(color || 'black');
  Context.stroke();
}

// export
function drawRoundFillRect(Context) {var drawArrayItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var

  dx =





  drawArrayItem.dx,dy = drawArrayItem.dy,width = drawArrayItem.width,height = drawArrayItem.height,r = drawArrayItem.r,backgroundColor = drawArrayItem.backgroundColor;
  r = r || width * .1;

  if (width < 2 * r) {
    r = width / 2;
  }
  if (width < 2 * r) {
    r = width / 2;
  }
  Context.beginPath();
  Context.arc(dx + r, dy + r, r, 1 * Math.PI, 1.5 * Math.PI);
  Context.lineTo(dx + width - r, dy);
  Context.arc(dx + width - r, dy + r, r, 1.5 * Math.PI, 0);
  Context.lineTo(dx + width, dy + height - r);
  Context.arc(dx + width - r, dy + height - r, r, 0, .5 * Math.PI);
  Context.lineTo(dx + r, dy + height);
  Context.arc(dx + r, dy + height - r, r, .5 * Math.PI, 1 * Math.PI);
  Context.lineTo(dx, dy + r);
  Context.closePath();
  Context.setFillStyle(backgroundColor);
  Context.fill();
}

// export 
function setText(Context, texts, bgObj) {// ??????????????????
  _app2.default.log('????????????????????????, texts:' + JSON.stringify(texts));
  if (texts && _app2.default.isArray(texts)) {
    _app2.default.log('texts?????????');
    if (texts.length > 0) {
      for (var i = 0; i < texts.length; i++) {
        _app2.default.log('???????????????-???????????????:' + JSON.stringify(texts[i]));
        texts[i] = setTextFn(Context, texts[i], bgObj);
      }
    }
  } else {
    _app2.default.log('texts?????????');
    texts = setTextFn(Context, texts, bgObj);
    _app2.default.log('??????texts:' + JSON.stringify(texts));
    return texts;
  }
}

function setTextFn(Context, textItem, bgObj) {
  _app2.default.log('????????????????????????, textItem:' + JSON.stringify(textItem));
  if (_app2.default.isNotNull_string(textItem.text)) {
    textItem.text = String(textItem.text);
    textItem.alpha = textItem.alpha !== undefined ? Number(textItem.alpha) : 1;
    textItem.color = textItem.color || 'black';
    textItem.size = textItem.size !== undefined ? Number(textItem.size) : 10;
    textItem.textAlign = textItem.textAlign || 'left';
    textItem.textBaseline = textItem.textBaseline || 'middle';
    textItem.dx = Number(textItem.dx) || 0;
    textItem.dy = Number(textItem.dy) || 0;
    textItem.size = Math.ceil(Number(textItem.size));
    _app2.default.log('???????????????-?????????????????????:' + JSON.stringify(textItem));
    var textLength = countTextLength(Context, {
      text: textItem.text,
      size: textItem.size });

    _app2.default.log('???????????????-???????????????????????????:' + textLength);
    var infoCallBackObj = {};
    if (textItem.infoCallBack && typeof textItem.infoCallBack === 'function') {
      infoCallBackObj = textItem.infoCallBack(textLength);
    }

    if (infoCallBackObj.size)
    textLength = countTextLength(Context, {
      text: textItem.text,
      size: textItem.size });

    textItem = _objectSpread(_objectSpread(_objectSpread({},
    textItem),
    infoCallBackObj), {}, {
      textLength: textLength });

    _app2.default.log('???????????????-infoCallBack???:' + JSON.stringify(textItem));
  }
  return textItem;
}

function setLineFeed(Context, textItem, bgObj) {
  if (textItem.text && textItem.lineFeed) {
    _app2.default.log('????????????');
    var lineNum = -1,
    maxWidth = bgObj.width,
    lineHeight = textItem.size,
    dx = textItem.dx;
    if (_app2.default.isObject(textItem.lineFeed)) {
      var lineFeed = textItem.lineFeed;
      lineNum = lineFeed.lineNum !== undefined && typeof lineFeed.lineNum === 'number' && lineFeed.
      lineNum >= 0 ?
      lineFeed.lineNum : lineNum;
      maxWidth = lineFeed.maxWidth !== undefined && typeof lineFeed.maxWidth === 'number' ? lineFeed.
      maxWidth :
      maxWidth;
      lineHeight = lineFeed.lineHeight !== undefined && typeof lineFeed.lineHeight === 'number' ? lineFeed.
      lineHeight :
      lineHeight;
      dx = lineFeed.dx !== undefined && typeof lineFeed.dx === 'number' ? lineFeed.dx : dx;
    }
    _app2.default.lineFeedTags.forEach(function (i) {
      textItem.text = textItem.text.split(i).join(_app2.default.tagetLineFeedTag);
    });
    var chr = textItem.text.split("");
    var temp = "";
    var row = [];
    //?????????????????????????????????
    for (var a = 0, len = chr.length; a < len; a++) {
      if (chr[a] === _app2.default.tagetLineFeedTag) {
        row.push(temp);
        temp = chr[++a];
        continue;
      }
      if (countTextLength(Context, {
        text: temp,
        size: textItem.size }) <=
      maxWidth && countTextLength(Context, {
        text: temp + chr[a],
        size: textItem.size }) <=
      maxWidth) {
        temp += chr[a];
        if (a == chr.length - 1) {
          row.push(temp);
        }
      } else {
        row.push(temp);
        temp = chr[a];
        if (a == chr.length - 1) row.push(chr[a]);
      }
    }
    _app2.default.log('????????????????????????:' + JSON.stringify(row));
    //??????????????? ????????????lineHeight  ????????????lineNum
    var allNum = lineNum >= 0 && lineNum < row.length ? lineNum : row.length;
    var newArr = [];
    for (var i = 0; i < allNum; i++) {
      var str = row[i];
      if (i == allNum - 1 && allNum < row.length && row.length > 1) {
        if (countTextLength(Context, {
          text: str,
          size: textItem.size }) >
        (maxWidth - textItem.size) * .9) {
          str = str.substring(0, str.length - 1) + '...';
        }
      }
      var obj = _objectSpread(_objectSpread({},
      textItem), {}, {
        text: str,
        dx: i === 0 ? textItem.dx : dx >= 0 ? dx : textItem.dx,
        dy: textItem.dy + i * lineHeight,
        textLength: countTextLength(Context, {
          text: str,
          size: textItem.size }) });


      _app2.default.log('???????????????????????????:' + JSON.stringify(obj));
      newArr.push(obj);
    }
    _app2.default.log('newArr: -----', JSON.stringify(newArr));
    var result = newArr.length > 1 ? newArr : newArr[0];
    return result;
  }
  return textItem;
}

function countTextLength(Context, obj) {
  _app2.default.log('??????????????????, obj:' + JSON.stringify(obj));var

  text =

  obj.text,size = obj.size;
  Context.setFontSize(size);
  var textLength;
  try {
    textLength = Context.measureText(text); // ??????????????? App?????????????????????????????????????????????measureText??????
  } catch (e) {
    //TODO handle the exception
    textLength = {};
  }
  _app2.default.log('measureText??????????????????, textLength:' + JSON.stringify(textLength));
  textLength = textLength && textLength.width ? textLength.width : 0;
  if (!textLength) {
    var l = 0;
    for (var j = 0; j < text.length; j++) {
      var t = text.substr(j, 1);
      var countL = countStrLength(t);
      _app2.default.log('????????????????????????:' + countL);
      l += countL;
    }
    _app2.default.log('?????????????????????:' + l);
    textLength = l * size;
  }
  return textLength;
}

//????????????????????????
function countStrLength(t) {
  var l;
  if (/a/.test(t)) {
    l = 0.552734375;
  } else if (/b/.test(t)) {
    l = 0.638671875;
  } else if (/c/.test(t)) {
    l = 0.50146484375;
  } else if (/d/.test(t)) {
    l = 0.6396484375;
  } else if (/e/.test(t)) {
    l = 0.5673828125;
  } else if (/f/.test(t)) {
    l = 0.3466796875;
  } else if (/g/.test(t)) {
    l = 0.6396484375;
  } else if (/h/.test(t)) {
    l = 0.61572265625;
  } else if (/i/.test(t)) {
    l = 0.26611328125;
  } else if (/j/.test(t)) {
    l = 0.26708984375;
  } else if (/k/.test(t)) {
    l = 0.54443359375;
  } else if (/l/.test(t)) {
    l = 0.26611328125;
  } else if (/m/.test(t)) {
    l = 0.93701171875;
  } else if (/n/.test(t)) {
    l = 0.6162109375;
  } else if (/o/.test(t)) {
    l = 0.6357421875;
  } else if (/p/.test(t)) {
    l = 0.638671875;
  } else if (/q/.test(t)) {
    l = 0.6396484375;
  } else if (/r/.test(t)) {
    l = 0.3818359375;
  } else if (/s/.test(t)) {
    l = 0.462890625;
  } else if (/t/.test(t)) {
    l = 0.37255859375;
  } else if (/u/.test(t)) {
    l = 0.6162109375;
  } else if (/v/.test(t)) {
    l = 0.52490234375;
  } else if (/w/.test(t)) {
    l = 0.78955078125;
  } else if (/x/.test(t)) {
    l = 0.5068359375;
  } else if (/y/.test(t)) {
    l = 0.529296875;
  } else if (/z/.test(t)) {
    l = 0.49169921875;
  } else if (/A/.test(t)) {
    l = 0.70361328125;
  } else if (/B/.test(t)) {
    l = 0.62744140625;
  } else if (/C/.test(t)) {
    l = 0.6689453125;
  } else if (/D/.test(t)) {
    l = 0.76171875;
  } else if (/E/.test(t)) {
    l = 0.5498046875;
  } else if (/F/.test(t)) {
    l = 0.53125;
  } else if (/G/.test(t)) {
    l = 0.74365234375;
  } else if (/H/.test(t)) {
    l = 0.7734375;
  } else if (/I/.test(t)) {
    l = 0.2939453125;
  } else if (/J/.test(t)) {
    l = 0.39599609375;
  } else if (/K/.test(t)) {
    l = 0.634765625;
  } else if (/L/.test(t)) {
    l = 0.51318359375;
  } else if (/M/.test(t)) {
    l = 0.97705078125;
  } else if (/N/.test(t)) {
    l = 0.81298828125;
  } else if (/O/.test(t)) {
    l = 0.81494140625;
  } else if (/P/.test(t)) {
    l = 0.61181640625;
  } else if (/Q/.test(t)) {
    l = 0.81494140625;
  } else if (/R/.test(t)) {
    l = 0.65283203125;
  } else if (/S/.test(t)) {
    l = 0.5771484375;
  } else if (/T/.test(t)) {
    l = 0.5732421875;
  } else if (/U/.test(t)) {
    l = 0.74658203125;
  } else if (/V/.test(t)) {
    l = 0.67626953125;
  } else if (/W/.test(t)) {
    l = 1.017578125;
  } else if (/X/.test(t)) {
    l = 0.64501953125;
  } else if (/Y/.test(t)) {
    l = 0.603515625;
  } else if (/Z/.test(t)) {
    l = 0.6201171875;
  } else if (/[0-9]/.test(t)) {
    l = 0.58642578125;
  } else if (/[\u4e00-\u9fa5]/.test(t)) {
    l = 1;
  } else if (/ /.test(t)) {
    l = 0.2958984375;
  } else if (/\`/.test(t)) {
    l = 0.294921875;
  } else if (/\~/.test(t)) {
    l = 0.74169921875;
  } else if (/\!/.test(t)) {
    l = 0.3125;
  } else if (/\@/.test(t)) {
    l = 1.03125;
  } else if (/\#/.test(t)) {
    l = 0.63818359375;
  } else if (/\$/.test(t)) {
    l = 0.58642578125;
  } else if (/\%/.test(t)) {
    l = 0.8896484375;
  } else if (/\^/.test(t)) {
    l = 0.74169921875;
  } else if (/\&/.test(t)) {
    l = 0.8701171875;
  } else if (/\*/.test(t)) {
    l = 0.455078125;
  } else if (/\(/.test(t)) {
    l = 0.333984375;
  } else if (/\)/.test(t)) {
    l = 0.333984375;
  } else if (/\_/.test(t)) {
    l = 0.4482421875;
  } else if (/\-/.test(t)) {
    l = 0.4326171875;
  } else if (/\+/.test(t)) {
    l = 0.74169921875;
  } else if (/\=/.test(t)) {
    l = 0.74169921875;
  } else if (/\|/.test(t)) {
    l = 0.26904296875;
  } else if (/\\/.test(t)) {
    l = 0.416015625;
  } else if (/\[/.test(t)) {
    l = 0.333984375;
  } else if (/\]/.test(t)) {
    l = 0.333984375;
  } else if (/\;/.test(t)) {
    l = 0.24072265625;
  } else if (/\'/.test(t)) {
    l = 0.25634765625;
  } else if (/\,/.test(t)) {
    l = 0.24072265625;
  } else if (/\./.test(t)) {
    l = 0.24072265625;
  } else if (/\//.test(t)) {
    l = 0.42724609375;
  } else if (/\{/.test(t)) {
    l = 0.333984375;
  } else if (/\}/.test(t)) {
    l = 0.333984375;
  } else if (/\:/.test(t)) {
    l = 0.24072265625;
  } else if (/\"/.test(t)) {
    l = 0.435546875;
  } else if (/\</.test(t)) {
    l = 0.74169921875;
  } else if (/\>/.test(t)) {
    l = 0.74169921875;
  } else if (/\?/.test(t)) {
    l = 0.48291015625;
  } else {
    l = 1;
  }
  return l;
}

// export 
function setImage(images) {// ??????????????????
  _app2.default.log('??????????????????????????????');
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve, rejcet) {var i;return _regenerator.default.wrap(function _callee3$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.prev = 0;if (!(

              images && _app2.default.isArray(images))) {_context4.next = 14;break;}
              _app2.default.log('images???????????????');
              i = 0;case 4:if (!(i < images.length)) {_context4.next = 12;break;}
              _app2.default.log('???????????????????????????:' + i);_context4.next = 8;return (
                setImageFn(images[i]));case 8:images[i] = _context4.sent;case 9:i++;_context4.next = 4;break;case 12:_context4.next = 18;break;case 14:


              _app2.default.log('images???????????????');_context4.next = 17;return (
                setImageFn(images));case 17:images = _context4.sent;case 18:

              resolve(images);_context4.next = 25;break;case 21:_context4.prev = 21;_context4.t0 = _context4["catch"](0);

              _app2.default.hideLoading();
              //TODO handle the exception
              rejcet(_context4.t0);case 25:case "end":return _context4.stop();}}}, _callee3, null, [[0, 21]]);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}());


}

function base64ToPathFn(path) {
  var reg =
  /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
  if (!reg.test(path)) {
    return Promise.resolve(path);
  }
  return (0, _imageTools.base64ToPath)(path);
}

function setImageFn(image) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve, reject) {var imgUrl, oldImgUrl, hasinfoCallBack, imageInfo;return _regenerator.default.wrap(function _callee4$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;if (!

              image.url) {_context5.next = 22;break;}_context5.next = 4;return (
                base64ToPathFn(image.url));case 4:image.url = _context5.sent;
              imgUrl = image.url;
              oldImgUrl = imgUrl;_context5.next = 9;return (
                _app2.default.downloadFile_PromiseFc(imgUrl));case 9:imgUrl = _context5.sent;
              image.url = imgUrl;
              hasinfoCallBack = image.infoCallBack && typeof image.infoCallBack === 'function';
              imageInfo = {};_context5.next = 15;return (
                _app2.default.getImageInfo_PromiseFc(oldImgUrl));case 15:imageInfo = _context5.sent;
              if (hasinfoCallBack) {
                image = _objectSpread(_objectSpread({},
                image),
                image.infoCallBack(imageInfo));

              }
              image.dx = Number(image.dx) || 0;
              image.dy = Number(image.dy) || 0;
              image.dWidth = Number(image.dWidth || imageInfo.width);
              image.dHeight = Number(image.dHeight || imageInfo.height);
              image = _objectSpread(_objectSpread({},
              image), {}, {
                imageInfo: imageInfo });case 22:


              resolve(image);_context5.next = 29;break;case 25:_context5.prev = 25;_context5.t0 = _context5["catch"](0);

              _app2.default.hideLoading();
              rejcet(_context5.t0);
              //TODO handle the exception
            case 29:case "end":return _context5.stop();}}}, _callee4, null, [[0, 25]]);}));return function (_x7, _x8) {return _ref4.apply(this, arguments);};}());


}

// export 
function drawText(Context, textArray, bgObj) {// ????????????????????????
  if (!_app2.default.isArray(textArray)) {
    _app2.default.log('??????????????????, ????????????');
    textArray = [textArray];
  } else {
    _app2.default.log('??????????????????, ?????????');
  }
  _app2.default.log('??????????????????, textArray:' + JSON.stringify(textArray));
  var newArr = textArray;
  // if (textArray && textArray.length > 0) {
  // 	for (let j = 0; j < textArray.length; j++) {
  // 		const textItem = textArray[j];
  // 		if (textItem.text && textItem.lineFeed) {
  // 			let lineNum = -1,
  // 				maxWidth = bgObj.width,
  // 				lineHeight = textItem.size,
  // 				dx = textItem.dx;
  // 			if (_app.isObject(textItem.lineFeed)) {
  // 				const lineFeed = textItem.lineFeed;
  // 				lineNum = (lineFeed.lineNum !== undefined && typeof(lineFeed.lineNum) === 'number') && lineFeed
  // 					.lineNum >= 0 ?
  // 					lineFeed.lineNum : lineNum;
  // 				maxWidth = (lineFeed.maxWidth !== undefined && typeof(lineFeed.maxWidth) === 'number') ? lineFeed
  // 					.maxWidth :
  // 					maxWidth;
  // 				lineHeight = (lineFeed.lineHeight !== undefined && typeof(lineFeed.lineHeight) === 'number') ?
  // 					lineFeed.lineHeight :
  // 					lineHeight;
  // 				dx = (lineFeed.dx !== undefined && typeof(lineFeed.dx) === 'number') ? lineFeed.dx : dx;
  // 			}
  // 			const chr = (textItem.text).split("");
  // 			let temp = "";
  // 			const row = [];
  // 			//?????????????????????????????????
  // 			for (let a = 0, len = chr.length; a < len; a++) {
  // 				if (countTextLength(Context, {
  // 						text: temp,
  // 						size: textItem.size
  // 					}) <= maxWidth && countTextLength(Context, {
  // 						text: (temp + chr[a]),
  // 						size: textItem.size
  // 					}) <= maxWidth) {
  // 					temp += chr[a];
  // 					if (a == (chr.length - 1)) {
  // 						row.push(temp);
  // 					}
  // 				} else {
  // 					row.push(temp);
  // 					temp = chr[a];
  // 					if (a == chr.length - 1) row.push(chr[a]);
  // 				}
  // 			}
  // 			_app.log('????????????????????????:' + JSON.stringify(row));
  // 			//??????????????? ????????????lineHeight  ????????????lineNum
  // 			let allNum = (lineNum >= 0 && lineNum < row.length) ? lineNum : row.length;

  // 			for (let i = 0; i < allNum; i++) {
  // 				let str = row[i];
  // 				if (i == (allNum - 1) && allNum < row.length) {
  // 					str = str.substring(0, str.length - 1) + '...';
  // 				}
  // 				const obj = {
  // 					...textItem,
  // 					text: str,
  // 					dx: i === 0 ? textItem.dx : (dx >= 0 ? dx : textItem.dx),
  // 					dy: textItem.dy + (i * lineHeight),
  // 					textLength: countTextLength(Context, {
  // 						text: str,
  // 						size: textItem.size
  // 					})
  // 				};
  // 				_app.log('???????????????????????????:' + JSON.stringify(obj));
  // 				newArr.push(obj);
  // 			}
  // 		} else {
  // 			newArr.push(textItem);
  // 		}
  // 	}
  // }
  _app2.default.log('?????????????????????:' + JSON.stringify(newArr));
  drawTexts(Context, newArr);
}

function setFont() {var textItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (textItem.font && typeof textItem.font === 'string') {
    _app2.default.log(textItem.font);
    return textItem.font;
  } else {
    var fontStyle = 'normal';
    var fontVariant = 'normal';
    var fontWeight = 'normal';
    var fontSize = textItem.size || 10;
    var fontFamily = 'sans-serif';
    fontSize = Math.ceil(Number(fontSize));
    if (textItem.fontStyle && typeof textItem.fontStyle === 'string')
    fontStyle = textItem.fontStyle.trim();
    if (textItem.fontVariant && typeof textItem.fontVariant === 'string')
    fontVariant = textItem.fontVariant.trim();
    if (textItem.fontWeight && (typeof textItem.fontWeight === 'string' || typeof textItem.fontWeight ===
    'number'))
    fontWeight = textItem.fontWeight.trim();
    if (textItem.fontFamily && typeof textItem.fontFamily === 'string')
    fontFamily = textItem.fontFamily.trim();
    return fontStyle + ' ' +
    fontVariant + ' ' +
    fontWeight + ' ' +
    fontSize + 'px' + ' ' +
    fontFamily;
  }
}

function drawTexts(Context, texts) {// ????????????
  _app2.default.log('????????????????????????, texts:' + JSON.stringify(texts));
  if (texts && _app2.default.isArray(texts)) {
    _app2.default.log('????????????????????????, ?????????');
    if (texts.length > 0) {
      for (var i = 0; i < texts.length; i++) {
        drawTextFn(Context, texts[i]);
      }
    }
  } else {
    _app2.default.log('????????????????????????, ????????????');
    drawTextFn(Context, texts);
  }
}

function drawTextFn(Context, textItem) {
  _app2.default.log('????????????????????????, textItem:' + JSON.stringify(textItem));
  if (textItem && _app2.default.isObject(textItem) && textItem.text) {
    Context.font = setFont(textItem);
    Context.setFillStyle(textItem.color);
    Context.setGlobalAlpha(textItem.alpha);
    Context.setTextAlign(textItem.textAlign);
    Context.setTextBaseline(textItem.textBaseline);
    Context.fillText(textItem.text, textItem.dx, textItem.dy);
    if (textItem.lineThrough && _app2.default.isObject(textItem.lineThrough)) {
      _app2.default.log('????????????');
      var lineThrough = textItem.lineThrough;
      lineThrough.alpha = lineThrough.alpha !== undefined ? lineThrough.alpha : textItem.alpha;
      lineThrough.style = lineThrough.style || textItem.color;
      lineThrough.width = lineThrough.width !== undefined ? lineThrough.width : textItem.size / 10;
      lineThrough.cap = lineThrough.cap !== undefined ? lineThrough.cap : 'butt';
      _app2.default.log('???????????????:' + JSON.stringify(lineThrough));
      Context.setGlobalAlpha(lineThrough.alpha);
      Context.setStrokeStyle(lineThrough.style);
      Context.setLineWidth(lineThrough.width);
      Context.setLineCap(lineThrough.cap);
      var mx, my;
      switch (textItem.textAlign) {
        case 'left':
          mx = textItem.dx;
          break;
        case 'center':
          mx = textItem.dx - textItem.textLength / 2;
          break;
        default:
          mx = textItem.dx - textItem.textLength;
          break;}

      switch (textItem.textBaseline) {
        case 'top':
          my = textItem.dy + textItem.size * .5;
          break;
        case 'middle':
          my = textItem.dy;
          break;
        default:
          my = textItem.dy - textItem.size * .5;
          break;}

      Context.beginPath();
      Context.moveTo(mx, my);
      Context.lineTo(mx + textItem.textLength, my);
      Context.stroke();
      Context.closePath();
      _app2.default.log('???????????????');
    }
    Context.setGlobalAlpha(1);
    Context.font = '10px sans-serif';
  }
}
// export 
function drawImage(Context, images) {// ????????????
  _app2.default.log('????????????????????????:' + JSON.stringify(images));
  if (images && _app2.default.isArray(images)) {
    if (images.length > 0) {
      for (var i = 0; i < images.length; i++) {
        readyDrawImageFn(Context, images[i]);
      }
    }
  } else {
    readyDrawImageFn(Context, images);
  }

}

function readyDrawImageFn(Context, img) {
  _app2.default.log('????????????????????????, img:' + JSON.stringify(img));
  if (img.url) {
    if (img.circleSet) {
      drawCircleImage(Context, img);
    } else if (img.roundRectSet) {
      drawRoundRectImage(Context, img);
    } else {
      drawImageFn(Context, img);
    }
  }
}

var drawImageModes = {
  scaleToFill: function scaleToFill(Context, img) {
    _app2.default.log('????????????mode???scaleToFill?????????');
    Context.drawImage(img.url, Number(img.dx || 0), Number(img.dy || 0),
    Number(img.dWidth) || false, Number(img.dHeight) || false);
    _app2.default.log('mode???scaleToFill?????????????????????');
  },
  aspectFit: function aspectFit(Context, img) {
    _app2.default.log('????????????mode???aspectFit?????????');var

    imageInfo =


    img.imageInfo,dWidth = img.dWidth,dHeight = img.dHeight;var

    height =

    imageInfo.height,width = imageInfo.width;
    var drawWidth = dWidth;
    var drawHeight = height / width * drawWidth;
    if (drawHeight < dHeight) {
      var diffHeight = (Number(dHeight) - Number(drawHeight)) / Number(dHeight) * height;
      img.dy = Number(img.dy) + diffHeight / 2;
    } else {
      drawHeight = dHeight;
      drawWidth = width / height * drawHeight;
      var diffWidth = (Number(dWidth) - Number(drawWidth)) / Number(dWidth) * width;
      img.dx = Number(img.dx) + diffWidth / 2;
    }
    Context.drawImage(img.url, 0, 0, width, height, img.dx, img.dy, drawWidth, drawHeight);
    _app2.default.log('mode???aspectFit?????????????????????');
  },
  aspectFill: function aspectFill(Context, img) {
    var dpr = uni.getSystemInfoSync().pixelRatio;
    _app2.default.log('????????????mode???aspectFill?????????');var

    imageInfo =


    img.imageInfo,dWidth = img.dWidth,dHeight = img.dHeight;var

    height =

    imageInfo.height,width = imageInfo.width;
    var sx = 0,
    sy = 0,
    sWidth = width,
    sHeight = height;
    var drawWidth = dWidth;
    var drawHeight = height / width * drawWidth;
    if (drawHeight < dHeight) {
      _app2.default.log('???????????? ?????? ????????????');
      drawHeight = dHeight;
      drawWidth = width / height * drawHeight;
      var diffWidth = (Number(drawWidth) - Number(dWidth)) / Number(drawWidth) * width;
      sx = diffWidth / 2;
      sWidth = width - diffWidth;
    } else {
      var diffHeight = (Number(drawHeight) - Number(dHeight)) / Number(drawHeight) * height;
      sy = diffHeight / 2;
      sHeight = height - diffHeight;
    }
    _app2.default.log("aspectFill \u6700\u7EC8\u7ED8\u5236: sx: ".concat(
    sx, ", sy: ").concat(sy, ", sWidth: ").concat(sWidth, ", sHeight: ").concat(sHeight, ", dx: ").concat(img.dx, ", dy: ").concat(img.dy, ", dWidth: ").concat(dWidth, ", dHeight: ").concat(dHeight));

    Context.drawImage(img.url, sx, sy, sWidth, sHeight, img.dx, img.dy, dWidth, dHeight);
    _app2.default.log('mode???aspectFill?????????????????????');
  } };


function drawImageFn(Context, img) {
  _app2.default.log('??????????????????????????????, img:' + JSON.stringify(img));
  if (img.url) {
    var hasAlpha = !_app2.default.isUndef(img.alpha);
    img.alpha = Number(!_app2.default.isUndef(img.alpha) ? img.alpha : 1);
    Context.setGlobalAlpha(img.alpha);
    _app2.default.log('????????????????????????, ???url');
    if (img.dHeight === undefined) img.dHeight = img.imageInfo.height;
    if (img.dWidth === undefined) img.dWidth = img.imageInfo.width;
    var fn = drawImageModes[img.mode];
    if (fn) {
      fn(Context, img);
    } else {
      if (img.dWidth && img.dHeight && img.sx && img.sy && img.sWidth && img.sHeight) {
        _app2.default.log('????????????????????????, ?????????????????????');
        Context.drawImage(img.url,
        Number(img.sx) || false, Number(img.sy) || false,
        Number(img.sWidth) || false, Number(img.sHeight) || false,
        Number(img.dx || 0), Number(img.dy || 0),
        Number(img.dWidth) || false, Number(img.dHeight) || false);
      } else if (img.dWidth && img.dHeight) {
        _app2.default.log('????????????????????????, ?????????????????????');
        Context.drawImage(img.url, Number(img.dx || 0), Number(img.dy || 0),
        Number(img.dWidth) || false, Number(img.dHeight) || false);
      } else {
        _app2.default.log('????????????????????????, ?????????????????????');
        Context.drawImage(img.url, Number(img.dx || 0), Number(img.dy || 0));
      }
    }
    if (hasAlpha) {
      Context.setGlobalAlpha(1);
    }
  }
  _app2.default.log('????????????????????????, ????????????');
}

function drawCircleImage(Context, obj) {
  _app2.default.log('??????????????????????????????, obj:' + JSON.stringify(obj));var

  dx =





  obj.dx,dy = obj.dy,dWidth = obj.dWidth,dHeight = obj.dHeight,circleSet = obj.circleSet,imageInfo = obj.imageInfo;
  var x, y, r;
  if (typeof circleSet === 'object') {
    x = circleSet.x;
    y = circleSet.y;
    r = circleSet.r;
  }
  if (!r) {
    var d;
    d = dWidth > dHeight ? dHeight : dWidth;
    r = d / 2;
  }

  x = x ? dx + x : (dx || 0) + r;
  y = y ? dy + y : (dy || 0) + r;
  Context.save();
  Context.beginPath();
  Context.arc(x, y, r, 0, 2 * Math.PI, false);
  Context.closePath();
  Context.setGlobalAlpha(0);
  Context.fillStyle = '#FFFFFF';
  Context.fill();
  Context.setGlobalAlpha(1);
  Context.clip();
  drawImageFn(Context, obj);
  _app2.default.log('????????????????????????');
  Context.restore();
}

function drawRoundRectImage(Context, obj) {// ????????????
  _app2.default.log('??????????????????????????????, obj:' + JSON.stringify(obj));
  Context.save();var

  dx =





  obj.dx,dy = obj.dy,dWidth = obj.dWidth,dHeight = obj.dHeight,roundRectSet = obj.roundRectSet,imageInfo = obj.imageInfo;
  var r;
  if (typeof roundRectSet === 'object') {
    r = roundRectSet.r;
  }
  r = r || dWidth * .1;

  if (dWidth < 2 * r) {
    r = dWidth / 2;
  }
  if (dHeight < 2 * r) {
    r = dHeight / 2;
  }
  Context.beginPath();

  // Context.moveTo(dx + r, dy);
  Context.arc(dx + r, dy + r, r, 1 * Math.PI, 1.5 * Math.PI);
  Context.lineTo(dx + dWidth - r, dy);
  Context.arc(dx + dWidth - r, dy + r, r, 1.5 * Math.PI, 0);
  Context.lineTo(dx + dWidth, dy + dHeight - r);
  Context.arc(dx + dWidth - r, dy + dHeight - r, r, 0, .5 * Math.PI);
  Context.lineTo(dx + r, dy + dHeight);
  Context.arc(dx + r, dy + dHeight - r, r, .5 * Math.PI, 1 * Math.PI);
  Context.lineTo(dx, dy + r);

  // Context.arcTo(dx + dWidth, dy, dx + dWidth, dy + dHeight, r);
  // Context.arcTo(dx + dWidth, dy + dHeight, dx, dy + dHeight, r);
  // Context.arcTo(dx, dy + dHeight, dx, dy, r);
  // Context.arcTo(dx, dy, dx + dWidth, dy, r);
  Context.closePath();
  Context.setGlobalAlpha(0);
  Context.fillStyle = '#FFFFFF';
  Context.fill();
  Context.setGlobalAlpha(1);
  Context.clip();
  drawImageFn(Context, obj);
  Context.restore();
  _app2.default.log('??????????????????????????????, ????????????');
}

// export 
function drawQrCode(Context, qrCodeObj) {//???????????????????????? ????????? ????????? ???????????????????????????
  _app2.default.log('???????????????????????????');
  var qrcodeAlgObjCache = [];
  var options = {
    text: String(qrCodeObj.text || '') || '', // ????????????
    size: Number(qrCodeObj.size || 0) || 200, // ???????????????
    background: String(qrCodeObj.background || '') || '#ffffff', // ?????????
    foreground: String(qrCodeObj.foreground || '') || '#000000', // ?????????
    pdground: String(qrCodeObj.pdground || '') || '#000000', // ??????????????????
    correctLevel: Number(qrCodeObj.correctLevel || 0) || 3, // ????????????
    image: String(qrCodeObj.image || '') || '', // ???????????????
    imageSize: Number(qrCodeObj.imageSize || 0) || 40, // ?????????????????????
    dx: Number(qrCodeObj.dx || 0) || 0, // x?????????
    dy: Number(qrCodeObj.dy || 0) || 0 // y?????????
  };
  var qrCodeAlg = null;
  var d = 0;
  for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
    d = i;
    if (qrcodeAlgObjCache[i].text == options.text && qrcodeAlgObjCache[i].text.correctLevel == options.
    correctLevel) {
      qrCodeAlg = qrcodeAlgObjCache[i].obj;
      break;
    }
  }
  if (d == l) {
    qrCodeAlg = new _QRCodeAlg.default(options.text, options.correctLevel);
    qrcodeAlgObjCache.push({
      text: options.text,
      correctLevel: options.correctLevel,
      obj: qrCodeAlg });

  }
  var getForeGround = function getForeGround(config) {
    var options = config.options;
    if (options.pdground && (
    config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 ||
    config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.
    col < 5 ||
    config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count -
    2))
    {
      return options.pdground;
    }
    return options.foreground;
  };
  var count = qrCodeAlg.getModuleCount();
  var ratioSize = options.size;
  var ratioImgSize = options.imageSize;
  //????????????????????????
  var tileW = (ratioSize / count).toPrecision(4);
  var tileH = (ratioSize / count).toPrecision(4);
  //??????
  for (var row = 0; row < count; row++) {
    for (var col = 0; col < count; col++) {
      var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
      var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
      var foreground = getForeGround({
        row: row,
        col: col,
        count: count,
        options: options });

      Context.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
      Context.fillRect(options.dx + Math.round(col * tileW), options.dy + Math.round(row * tileH), w, h);
    }
  }
  if (options.image) {




    // ???????????????
    var drawRoundedRect = function drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
      ctxi.setLineWidth(lineWidth);
      ctxi.setFillStyle(options.background);
      ctxi.setStrokeStyle(options.background);
      ctxi.beginPath(); // draw top and top right corner 
      ctxi.moveTo(x + r, y);
      ctxi.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
      ctxi.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
      ctxi.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
      ctxi.arcTo(x, y, x + r, y, r);
      ctxi.closePath();
      if (fill) {
        ctxi.fill();
      }
      if (stroke) {
        ctxi.stroke();
      }
    };var x = options.dx + Number(((ratioSize - ratioImgSize) / 2).toFixed(2));var y = options.dy + Number(((ratioSize - ratioImgSize) / 2).toFixed(2));drawRoundedRect(Context, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);Context.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
  }
  _app2.default.log('?????????????????????????????????');
}


function getShreUserPosterBackground(objs) {//??????????????????????????????????????? ???????????????????????? ????????????getShreUserPosterBackgroundFc??????
  var
  backgroundImage =

  objs.backgroundImage,type = objs.type;
  return new Promise( /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(resolve, reject) {var savedFilePath;return _regenerator.default.wrap(function _callee5$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.prev = 0;_context6.next = 3;return (

                getShreUserPosterBackgroundFc(objs));case 3:savedFilePath = _context6.sent;
              resolve(savedFilePath);_context6.next = 13;break;case 7:_context6.prev = 7;_context6.t0 = _context6["catch"](0);

              _app2.default.hideLoading();
              _app2.default.showToast('?????????????????????????????????:' + JSON.stringify(_context6.t0));
              _app2.default.log(JSON.stringify(_context6.t0));
              reject(_context6.t0);case 13:case "end":return _context6.stop();}}}, _callee5, null, [[0, 7]]);}));return function (_x9, _x10) {return _ref5.apply(this, arguments);};}());


}

function getPosterStorage(type) {
  return _app2.default.getStorageSync(getStorageKey(type));
}

function removePosterStorage(type) {
  var ShreUserPosterBackgroundKey = getStorageKey(type);
  var pbg = _app2.default.getStorageSync(ShreUserPosterBackgroundKey);
  if (pbg && pbg.path) {
    _app2.default.removeStorageSync(ShreUserPosterBackgroundKey);
  }
}

function setPosterStorage(type, data) {
  _app2.default.setStorage(getStorageKey(type), data);
}

function getStorageKey(type) {
  return ShreUserPosterBackgroundKey + (type || 'default');
}

function getShreUserPosterBackgroundFc(objs, upimage) {//??????????????????????????????
  var
  backgroundImage =

  objs.backgroundImage,type = objs.type;
  _app2.default.log('?????????????????????, ????????????????????????');
  return new Promise( /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(resolve, reject) {var image, savedFilePath, imageObj, returnObj;return _regenerator.default.wrap(function _callee6$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.prev = 0;

              _app2.default.log('??????????????????????????????????????????, ???????????????????????????????????????');if (!
              backgroundImage) {_context7.next = 6;break;}_context7.t0 = backgroundImage;_context7.next = 9;break;case 6:_context7.next = 8;return _app2.default.getPosterUrl(objs);case 8:_context7.t0 = _context7.sent;case 9:image = _context7.t0;_context7.next = 12;return (
                base64ToPathFn(image));case 12:image = _context7.sent;
              _app2.default.log('??????????????????????????????:' + image);_context7.next = 16;return (
                _app2.default.downLoadAndSaveFile_PromiseFc(image));case 16:savedFilePath = _context7.sent;if (!
              savedFilePath) {_context7.next = 30;break;}
              _app2.default.log('??????????????????????????????:' + savedFilePath);_context7.next = 21;return (
                _app2.default.getImageInfo_PromiseFc(image));case 21:imageObj = _context7.sent;
              _app2.default.log('????????????????????????');
              returnObj = {
                path: savedFilePath,
                width: imageObj.width,
                height: imageObj.height,
                name: _app2.default.fileNameInPath(image) };

              _app2.default.log('?????????????????????????????????:' + JSON.stringify(returnObj));


              setPosterStorage(type, _objectSpread({},
              returnObj));



              _app2.default.log('???????????????????????????');
              resolve(_objectSpread({},
              returnObj));_context7.next = 31;break;case 30:


              reject('not find savedFilePath');case 31:_context7.next = 37;break;case 33:_context7.prev = 33;_context7.t1 = _context7["catch"](0);



              //TODO handle the exception
              _app2.default.hideLoading();
              reject(_context7.t1);case 37:case "end":return _context7.stop();}}}, _callee6, null, [[0, 33]]);}));return function (_x11, _x12) {return _ref6.apply(this, arguments);};}());


}


module.exports = {
  getShreUserPosterBackground: getShreUserPosterBackground,
  getSharePoster: getSharePoster,
  setText: setText,
  setImage: setImage,
  drawText: drawText,
  drawImage: drawImage,
  drawQrCode: drawQrCode,
  drawFillRect: drawFillRect,
  drawStrokeRect: drawStrokeRect,
  drawRoundStrokeRect: drawRoundStrokeRect,
  drawRoundFillRect: drawRoundFillRect };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 382:
/*!***********************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/poster/QS-SharePoster/QRCodeAlg.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = QRCodeAlg; /**
                                                                                                            * ?????????????????????utf8??????
                                                                                                            * unicode BMP?????????65535?????????
                                                                                                            * @param {num} code
                                                                                                            * return {array}
                                                                                                            */
function unicodeFormat8(code) {
  // 1 byte
  var c0, c1, c2;
  if (code < 128) {
    return [code];
    // 2 bytes
  } else if (code < 2048) {
    c0 = 192 + (code >> 6);
    c1 = 128 + (code & 63);
    return [c0, c1];
    // 3 bytes
  } else {
    c0 = 224 + (code >> 12);
    c1 = 128 + (code >> 6 & 63);
    c2 = 128 + (code & 63);
    return [c0, c1, c2];
  }
}
/**
   * ??????????????????utf8???????????????
   * @param {string} string
   * @return {array}
   */
function getUTF8Bytes(string) {
  var utf8codes = [];
  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i);
    var utf8 = unicodeFormat8(code);
    for (var j = 0; j < utf8.length; j++) {
      utf8codes.push(utf8[j]);
    }
  }
  return utf8codes;
}
/**
   * ?????????????????????
   * @param {string} data              ???????????????????????????
   * @param {num} errorCorrectLevel ????????????
   */
function QRCodeAlg(data, errorCorrectLevel) {
  this.typeNumber = -1; //??????
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null; //?????????????????????????????????
  this.moduleCount = 0; //????????????
  this.dataCache = null; //????????????
  this.rsBlocks = null; //??????????????????
  this.totalDataCount = -1; //?????????????????????
  this.data = data;
  this.utf8bytes = getUTF8Bytes(data);
  this.make();
}
QRCodeAlg.prototype = {
  constructor: QRCodeAlg,
  /**
                           * ???????????????????????????
                           * @return {num} ????????????
                           */
  getModuleCount: function getModuleCount() {
    return this.moduleCount;
  },
  /**
      * ??????
      */
  make: function make() {
    this.getRightType();
    this.dataCache = this.createData();
    this.createQrcode();
  },
  /**
      * ??????????????????????????????
      * @param  {bool} test ???????????????????????????????????????
      * @param  {num} maskPattern ???????????????
      */
  makeImpl: function makeImpl(maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(true, maskPattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(true);
    }
    this.mapData(this.dataCache, maskPattern);
  },
  /**
      * ????????????????????????????????????
      * @param  {num} row ??????????????????????????????
      * @param  {num} col ??????????????????????????????
      */
  setupPositionProbePattern: function setupPositionProbePattern(row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  /**
      * ???????????????
      * @return {[type]} [description]
      */
  createQrcode: function createQrcode() {
    var minLostPoint = 0;
    var pattern = 0;
    var bestModules = null;
    for (var i = 0; i < 8; i++) {
      this.makeImpl(i);
      var lostPoint = QRUtil.getLostPoint(this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
        bestModules = this.modules;
      }
    }
    this.modules = bestModules;
    this.setupTypeInfo(false, pattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(false);
    }
  },
  /**
      * ??????????????????
      * @return {[type]} [description]
      */
  setupTimingPattern: function setupTimingPattern() {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = r % 2 == 0;
      if (this.modules[6][r] != null) {
        continue;
      }
      this.modules[6][r] = r % 2 == 0;
    }
  },
  /**
      * ??????????????????
      * @return {[type]} [description]
      */
  setupPositionAdjustPattern: function setupPositionAdjustPattern() {
    var pos = QRUtil.getPatternPosition(this.typeNumber);
    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];
        if (this.modules[row][col] != null) {
          continue;
        }
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  /**
      * ?????????????????????7?????????????????????
      * @param  {bool} test ????????????????????????????????????
      * @return {[type]}      [description]
      */
  setupTypeNumber: function setupTypeNumber(test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  /**
      * ???????????????????????????????????????????????????
      * @param  {bool} test
      * @param  {num} maskPattern ????????????
      * @return {}
      */
  setupTypeInfo: function setupTypeInfo(test, maskPattern) {
    var data = QRErrorCorrectLevel[this.errorCorrectLevel] << 3 | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);
    // vertical
    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
      // horizontal
      var mod = !test && (bits >> i & 1) == 1;
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }
    // fixed module
    this.modules[this.moduleCount - 8][8] = !test;
  },
  /**
      * ????????????
      * @return {[type]} [description]
      */
  createData: function createData() {
    var buffer = new QRBitBuffer();
    var lengthBits = this.typeNumber > 9 ? 16 : 8;
    buffer.put(4, 4); //????????????
    buffer.put(this.utf8bytes.length, lengthBits);
    for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
      buffer.put(this.utf8bytes[i], 8);
    }
    if (buffer.length + 4 <= this.totalDataCount * 8) {
      buffer.put(0, 4);
    }
    // padding
    while (buffer.length % 8 != 0) {
      buffer.putBit(false);
    }
    // padding
    while (true) {
      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD0, 8);
      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD1, 8);
    }
    return this.createBytes(buffer);
  },
  /**
      * ???????????????
      * @param  {buffer} buffer ????????????
      * @return {[type]}
      */
  createBytes: function createBytes(buffer) {
    var offset = 0;
    var maxDcCount = 0;
    var maxEcCount = 0;
    var length = this.rsBlock.length / 3;
    var rsBlocks = new Array();
    for (var i = 0; i < length; i++) {
      var count = this.rsBlock[i * 3 + 0];
      var totalCount = this.rsBlock[i * 3 + 1];
      var dataCount = this.rsBlock[i * 3 + 2];
      for (var j = 0; j < count; j++) {
        rsBlocks.push([dataCount, totalCount]);
      }
    }
    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);
    for (var r = 0; r < rsBlocks.length; r++) {
      var dcCount = rsBlocks[r][0];
      var ecCount = rsBlocks[r][1] - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;
      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    var data = new Array(this.totalDataCount);
    var index = 0;
    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }
    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }
    return data;

  },
  /**
      * ?????????????????????????????????
      * @param  {} data
      * @param  {} maskPattern
      * @return {}
      */
  mapData: function mapData(data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;
    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;
      while (true) {
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }
            var mask = QRUtil.getMask(maskPattern, row, col - c);
            if (mask) {
              dark = !dark;
            }
            this.modules[row][col - c] = dark;
            bitIndex--;
            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  } };

/**
        * ????????????
        */
QRCodeAlg.PAD0 = 0xEC;
QRCodeAlg.PAD1 = 0x11;
//---------------------------------------------------------------------
// ???????????????????????????
//---------------------------------------------------------------------
var QRErrorCorrectLevel = [1, 0, 3, 2];
//---------------------------------------------------------------------
// ????????????
//---------------------------------------------------------------------
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7 };

//---------------------------------------------------------------------
// ?????????
//---------------------------------------------------------------------
var QRUtil = {
  /*
               ?????????????????????????????????
                */
  PATTERN_POSITION_TABLE: [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]],

  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  /*
                                                           BCH??????????????????
                                                            */
  getBCHTypeInfo: function getBCHTypeInfo(data) {
    var d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }
    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  /*
     BCH??????????????????
      */
  getBCHTypeNumber: function getBCHTypeNumber(data) {
    var d = data << 12;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }
    return data << 12 | d;
  },
  /*
     ??????BCH?????????
      */
  getBCHDigit: function getBCHDigit(data) {
    var digit = 0;
    while (data != 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  },
  /*
     ???????????????????????????????????????
      */
  getPatternPosition: function getPatternPosition(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  /*
     ????????????
      */
  getMask: function getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern);}

  },
  /*
     ??????RS??????????????????
      */
  getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
    var a = new QRPolynomial([1], 0);
    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  },
  /*
     ????????????
      */
  getLostPoint: function getLostPoint(qrCode) {
    var moduleCount = qrCode.getModuleCount(),
    lostPoint = 0,
    darkCount = 0;
    for (var row = 0; row < moduleCount; row++) {
      var sameCount = 0;
      var head = qrCode.modules[row][0];
      for (var col = 0; col < moduleCount; col++) {
        var current = qrCode.modules[row][col];
        //level 3 ??????
        if (col < moduleCount - 6) {
          if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
            if (col < moduleCount - 10) {
              if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                lostPoint += 40;
              }
            } else if (col > 3) {
              if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                lostPoint += 40;
              }
            }
          }
        }
        //level 2 ??????
        if (row < moduleCount - 1 && col < moduleCount - 1) {
          var count = 0;
          if (current) count++;
          if (qrCode.modules[row + 1][col]) count++;
          if (qrCode.modules[row][col + 1]) count++;
          if (qrCode.modules[row + 1][col + 1]) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
        //level 1 ??????
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += 3 + sameCount - 5;
          }
          sameCount = 1;
        }
        //level 4 ??????
        if (current) {
          darkCount++;
        }
      }
    }
    for (var col = 0; col < moduleCount; col++) {
      var sameCount = 0;
      var head = qrCode.modules[0][col];
      for (var row = 0; row < moduleCount; row++) {
        var current = qrCode.modules[row][col];
        //level 3 ??????
        if (row < moduleCount - 6) {
          if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
            if (row < moduleCount - 10) {
              if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                lostPoint += 40;
              }
            } else if (row > 3) {
              if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                lostPoint += 40;
              }
            }
          }
        }
        //level 1 ??????
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += 3 + sameCount - 5;
          }
          sameCount = 1;
        }
      }
    }
    // LEVEL4
    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  } };


//---------------------------------------------------------------------
// QRMath?????????????????????
//---------------------------------------------------------------------
var QRMath = {
  /*
               ???n?????????a^m
                */
  glog: function glog(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }
    return QRMath.LOG_TABLE[n];
  },
  /*
     ???a^m?????????n
      */
  gexp: function gexp(n) {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256) };


for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}
//---------------------------------------------------------------------
// QRPolynomial ?????????
//---------------------------------------------------------------------
/**
 * ????????????
 * @param {Array} num   ??????
 * @param {num} shift a^shift
 */
function QRPolynomial(num, shift) {
  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }
  var offset = 0;
  while (offset < num.length && num[offset] == 0) {
    offset++;
  }
  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}
QRPolynomial.prototype = {
  get: function get(index) {
    return this.num[index];
  },
  getLength: function getLength() {
    return this.num.length;
  },
  /**
      * ???????????????
      * @param  {QRPolynomial} e ???????????????
      * @return {[type]}   [description]
      */
  multiply: function multiply(e) {
    var num = new Array(this.getLength() + e.getLength() - 1);
    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }
    return new QRPolynomial(num, 0);
  },
  /**
      * ??????????????????
      * @param  {QRPolynomial} e ????????????
      * @return {}
      */
  mod: function mod(e) {
    var tl = this.getLength(),
    el = e.getLength();
    if (tl - el < 0) {
      return this;
    }
    var num = new Array(tl);
    for (var i = 0; i < tl; i++) {
      num[i] = this.get(i);
    }
    while (num.length >= el) {
      var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }
      while (num[0] == 0) {
        num.shift();
      }
    }
    return new QRPolynomial(num, 0);
  } };


//---------------------------------------------------------------------
// RS_BLOCK_TABLE
//---------------------------------------------------------------------
/*
???????????????????????????[??????, ????????????????????????, ????????????????????????]
 */
var RS_BLOCK_TABLE = [
// L
// M
// Q
// H
// 1
[1, 26, 19],
[1, 26, 16],
[1, 26, 13],
[1, 26, 9],

// 2
[1, 44, 34],
[1, 44, 28],
[1, 44, 22],
[1, 44, 16],

// 3
[1, 70, 55],
[1, 70, 44],
[2, 35, 17],
[2, 35, 13],

// 4
[1, 100, 80],
[2, 50, 32],
[2, 50, 24],
[4, 25, 9],

// 5
[1, 134, 108],
[2, 67, 43],
[2, 33, 15, 2, 34, 16],
[2, 33, 11, 2, 34, 12],

// 6
[2, 86, 68],
[4, 43, 27],
[4, 43, 19],
[4, 43, 15],

// 7
[2, 98, 78],
[4, 49, 31],
[2, 32, 14, 4, 33, 15],
[4, 39, 13, 1, 40, 14],

// 8
[2, 121, 97],
[2, 60, 38, 2, 61, 39],
[4, 40, 18, 2, 41, 19],
[4, 40, 14, 2, 41, 15],

// 9
[2, 146, 116],
[3, 58, 36, 2, 59, 37],
[4, 36, 16, 4, 37, 17],
[4, 36, 12, 4, 37, 13],

// 10
[2, 86, 68, 2, 87, 69],
[4, 69, 43, 1, 70, 44],
[6, 43, 19, 2, 44, 20],
[6, 43, 15, 2, 44, 16],

// 11
[4, 101, 81],
[1, 80, 50, 4, 81, 51],
[4, 50, 22, 4, 51, 23],
[3, 36, 12, 8, 37, 13],

// 12
[2, 116, 92, 2, 117, 93],
[6, 58, 36, 2, 59, 37],
[4, 46, 20, 6, 47, 21],
[7, 42, 14, 4, 43, 15],

// 13
[4, 133, 107],
[8, 59, 37, 1, 60, 38],
[8, 44, 20, 4, 45, 21],
[12, 33, 11, 4, 34, 12],

// 14
[3, 145, 115, 1, 146, 116],
[4, 64, 40, 5, 65, 41],
[11, 36, 16, 5, 37, 17],
[11, 36, 12, 5, 37, 13],

// 15
[5, 109, 87, 1, 110, 88],
[5, 65, 41, 5, 66, 42],
[5, 54, 24, 7, 55, 25],
[11, 36, 12],

// 16
[5, 122, 98, 1, 123, 99],
[7, 73, 45, 3, 74, 46],
[15, 43, 19, 2, 44, 20],
[3, 45, 15, 13, 46, 16],

// 17
[1, 135, 107, 5, 136, 108],
[10, 74, 46, 1, 75, 47],
[1, 50, 22, 15, 51, 23],
[2, 42, 14, 17, 43, 15],

// 18
[5, 150, 120, 1, 151, 121],
[9, 69, 43, 4, 70, 44],
[17, 50, 22, 1, 51, 23],
[2, 42, 14, 19, 43, 15],

// 19
[3, 141, 113, 4, 142, 114],
[3, 70, 44, 11, 71, 45],
[17, 47, 21, 4, 48, 22],
[9, 39, 13, 16, 40, 14],

// 20
[3, 135, 107, 5, 136, 108],
[3, 67, 41, 13, 68, 42],
[15, 54, 24, 5, 55, 25],
[15, 43, 15, 10, 44, 16],

// 21
[4, 144, 116, 4, 145, 117],
[17, 68, 42],
[17, 50, 22, 6, 51, 23],
[19, 46, 16, 6, 47, 17],

// 22
[2, 139, 111, 7, 140, 112],
[17, 74, 46],
[7, 54, 24, 16, 55, 25],
[34, 37, 13],

// 23
[4, 151, 121, 5, 152, 122],
[4, 75, 47, 14, 76, 48],
[11, 54, 24, 14, 55, 25],
[16, 45, 15, 14, 46, 16],

// 24
[6, 147, 117, 4, 148, 118],
[6, 73, 45, 14, 74, 46],
[11, 54, 24, 16, 55, 25],
[30, 46, 16, 2, 47, 17],

// 25
[8, 132, 106, 4, 133, 107],
[8, 75, 47, 13, 76, 48],
[7, 54, 24, 22, 55, 25],
[22, 45, 15, 13, 46, 16],

// 26
[10, 142, 114, 2, 143, 115],
[19, 74, 46, 4, 75, 47],
[28, 50, 22, 6, 51, 23],
[33, 46, 16, 4, 47, 17],

// 27
[8, 152, 122, 4, 153, 123],
[22, 73, 45, 3, 74, 46],
[8, 53, 23, 26, 54, 24],
[12, 45, 15, 28, 46, 16],

// 28
[3, 147, 117, 10, 148, 118],
[3, 73, 45, 23, 74, 46],
[4, 54, 24, 31, 55, 25],
[11, 45, 15, 31, 46, 16],

// 29
[7, 146, 116, 7, 147, 117],
[21, 73, 45, 7, 74, 46],
[1, 53, 23, 37, 54, 24],
[19, 45, 15, 26, 46, 16],

// 30
[5, 145, 115, 10, 146, 116],
[19, 75, 47, 10, 76, 48],
[15, 54, 24, 25, 55, 25],
[23, 45, 15, 25, 46, 16],

// 31
[13, 145, 115, 3, 146, 116],
[2, 74, 46, 29, 75, 47],
[42, 54, 24, 1, 55, 25],
[23, 45, 15, 28, 46, 16],

// 32
[17, 145, 115],
[10, 74, 46, 23, 75, 47],
[10, 54, 24, 35, 55, 25],
[19, 45, 15, 35, 46, 16],

// 33
[17, 145, 115, 1, 146, 116],
[14, 74, 46, 21, 75, 47],
[29, 54, 24, 19, 55, 25],
[11, 45, 15, 46, 46, 16],

// 34
[13, 145, 115, 6, 146, 116],
[14, 74, 46, 23, 75, 47],
[44, 54, 24, 7, 55, 25],
[59, 46, 16, 1, 47, 17],

// 35
[12, 151, 121, 7, 152, 122],
[12, 75, 47, 26, 76, 48],
[39, 54, 24, 14, 55, 25],
[22, 45, 15, 41, 46, 16],

// 36
[6, 151, 121, 14, 152, 122],
[6, 75, 47, 34, 76, 48],
[46, 54, 24, 10, 55, 25],
[2, 45, 15, 64, 46, 16],

// 37
[17, 152, 122, 4, 153, 123],
[29, 74, 46, 14, 75, 47],
[49, 54, 24, 10, 55, 25],
[24, 45, 15, 46, 46, 16],

// 38
[4, 152, 122, 18, 153, 123],
[13, 74, 46, 32, 75, 47],
[48, 54, 24, 14, 55, 25],
[42, 45, 15, 32, 46, 16],

// 39
[20, 147, 117, 4, 148, 118],
[40, 75, 47, 7, 76, 48],
[43, 54, 24, 22, 55, 25],
[10, 45, 15, 67, 46, 16],

// 40
[19, 148, 118, 6, 149, 119],
[18, 75, 47, 31, 76, 48],
[34, 54, 24, 34, 55, 25],
[20, 45, 15, 61, 46, 16]];


/**
                            * ??????????????????????????????
                            * @return {[type]} [description]
                            */
QRCodeAlg.prototype.getRightType = function () {
  for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
    var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var totalDataCount = 0;
    for (var i = 0; i < length; i++) {
      var count = rsBlock[i * 3 + 0];
      var dataCount = rsBlock[i * 3 + 2];
      totalDataCount += dataCount * count;
    }
    var lengthBytes = typeNumber > 9 ? 2 : 1;
    if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
      this.typeNumber = typeNumber;
      this.rsBlock = rsBlock;
      this.totalDataCount = totalDataCount;
      break;
    }
  }
};

//---------------------------------------------------------------------
// QRBitBuffer
//---------------------------------------------------------------------
function QRBitBuffer() {
  this.buffer = new Array();
  this.length = 0;
}
QRBitBuffer.prototype = {
  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return this.buffer[bufIndex] >>> 7 - index % 8 & 1;
  },
  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit(num >>> length - i - 1 & 1);
    }
  },
  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }
    this.length++;
  } };

/***/ }),

/***/ 383:
/*!*************************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/poster/QS-SharePoster/image-tools.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              resolve(e.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(this.response);
          }
        };
        xhr.onerror = reject;
        xhr.send();
        return;
      }
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
        canvas.height = canvas.width = 0;
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = Date.now() + '.' + extName;
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.loadBase64Data(base64, function () {
        var filePath = '_doc/uniapp_temp/' + fileName;
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ }),

/***/ 39:
/*!****************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/timeFrom.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 38));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * ???????????????????????????
                                                                                                                                                                                                                                                                                          * @param String timestamp ?????????
                                                                                                                                                                                                                                                                                          * @param String | Boolean format ??????????????????????????????????????????????????????????????????????????????????????????
                                                                                                                                                                                                                                                                                          * ??????????????????false??????????????????????????????????????????????????????
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // ?????????null,????????????????????????
  if (!dateTime) dateTime = Number(new Date());
  // ??????dateTime?????????10??????13????????????????????????????????????????????????13?????????????????????????????????
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // ????????????5??????,?????????"??????",??????????????????
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '??????';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '?????????';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '?????????';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '??????';
      break;
    default:
      // ??????format???false???????????????????????????????????????xx??????
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '?????????';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '??????';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 4:
/*!****************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/pages.json ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!*********************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/colorGradient.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ?????????????????????????????????
                                                                                                      * @param {string} startColor ???????????????
                                                                                                      * @param {string} endColor ???????????????
                                                                                                      * @param {number} step ?????????????????????
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //?????????rgb????????????
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //?????????
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //??????????????????hex??? 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// ???hex?????????????????????rgb????????????(????????????rgb????????????)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //????????????????????????
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// ???rgb?????????????????????hex????????????
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // ????????????rgb?????????2???
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS???????????????????????????rgb???rgba,?????????????????? rgba???255???255???255???0.5????????????
  * sHex?????????????????????????????????
  * alpha???rgba????????????
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // ???????????????????????????????????????
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16??????????????????RGB?????? */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // ????????????????????????
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 41:
/*!************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/guid.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ????????????????????????????????????????????????https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * ????????????????????????uuid???Globally Unique Identifier???,????????? uuid(Universally Unique IDentifier) 
                                                                                                      * ??????????????????????????????,??????????????????????????????,??????v-for???????????????,?????????????????????index???????????????????????????????????????
                                                                                                      * ?????????????????????????????????item????????????????????????"?????????"?????????????????????,?????????????????????????????????????????????
                                                                                                      * v-for?????????,???????????????????????????id??????????????????index
                                                                                                      * @param {Number} len uuid?????????
                                                                                                      * @param {Boolean} firstU ???????????????????????????"u"
                                                                                                      * @param {Nubmer} radix ??????uuid?????????(?????????????????????????????????????????????),2-?????????,8-?????????,10-?????????,16-????????????
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // ????????????uuid??????,????????????????????????,0|x????????????,?????????x????????????,???????????????
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122?????????????????????uuid???,???????????????????????????
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // ?????????????????????,??????u??????,?????????????????????????????????,???guuid????????????id??????class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 42:
/*!*************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/color.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ?????????????????????????????????????????????????????????????????????????????????css??????
// ????????????????????????????????????????????????????????????????????????(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 43:
/*!*****************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/type2icon.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ????????????type???,?????????????????????
                                                                                                      * @param String type ????????????,primary|info|error|warning|success
                                                                                                      * @param String fill ????????????fill?????????????????????  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // ??????????????????,?????????success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // ??????(2019-12-12),info???primary?????????????????????
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // ?????????????????????,??????-fill,???icon????????????,???????????????????????????-fill???
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 44:
/*!*******************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/randomArray.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ????????????
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // ?????????sort??????,Math.random()??????0<= x < 1????????????,?????????x-0.05??????????????????0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 45:
/*!*****************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/deepClone.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ??????arr????????????????????????????????????bool???
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// ????????????
function deepClone(obj) {
  // ????????????????????????????????????????????????
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //????????????????????????
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 46:
/*!*****************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/deepMerge.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 45));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS??????????????????
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 47:
/*!***************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/addUnit.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 48));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// ????????????????????????rpx???%???px???????????????????????????auto??????????????????????????????rpx????????????
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // ???uView????????????????????????number?????????????????????
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 48:
/*!************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/test.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ????????????????????????
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * ??????????????????
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * ??????URL??????
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * ??????????????????
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * ??????ISO?????????????????????
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * ?????????????????????
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * ????????????
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * ?????????????????????
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * ???????????????
   */
function carNo(value) {
  // ???????????????
  var xreg = /^[???????????????????????????????????????????????????????????????????????????????????????????????????A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // ?????????
  var creg = /^[???????????????????????????????????????????????????????????????????????????????????????????????????A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9???????????????]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * ??????,?????????2?????????
   */
function amount(value) {
  //????????????????????????????????????
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * ??????
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * ??????????????????
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * ???????????????????????????
   */
function enOrNum(value) {
  //??????????????????
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * ???????????????????????????
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * ?????????????????????[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * ????????????????????????[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * ??????????????????
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * ??????????????????
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * ??????json?????????
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * ????????????
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * ????????????
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * ?????????????????????
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 49:
/*!**************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/random.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;
var DIFF_TIME = 60 * 1000 * 60 * 24;

var statConfig = __webpack_require__(/*! uni-stat-config */ 7).default || __webpack_require__(/*! uni-stat-config */ 7);
var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {var _platformList;
  var aliArr = ['y', 'a', 'p', 'mp-ali'];
  var platformList = (_platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx' }, _defineProperty(_platformList,
  aliArr.reverse().join(''), 'ali'), _defineProperty(_platformList,
  'mp-baidu', 'bd'), _defineProperty(_platformList,
  'mp-toutiao', 'tt'), _defineProperty(_platformList,
  'mp-qq', 'qq'), _defineProperty(_platformList,
  'quickapp-native', 'qn'), _defineProperty(_platformList,
  'mp-kuaishou', 'ks'), _platformList);

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // ???????????????????????????????????????
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  if (!page) return '';
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  if (!page) return '';
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login ??? share ???pay_success ???pay_fail ???register ???title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] ????????? title ??????[options] ??????????????? String ??????');
    return true;
  }
};

var Report_Data_Time = 'Report_Data_Time';
var Report_Status = 'Report_Status';
var isReportData = function isReportData() {
  return new Promise(function (resolve, reject) {
    var start_time = '';
    var end_time = new Date().getTime();
    var diff_time = DIFF_TIME;
    var report_status = 1;
    try {
      start_time = uni.getStorageSync(Report_Data_Time);
      report_status = uni.getStorageSync(Report_Status);
    } catch (e) {
      start_time = '';
      report_status = 1;
    }

    if (report_status === '') {
      requestData(function (_ref)

      {var enable = _ref.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
        if (enable === 1) {
          resolve();
        }
      });
      return;
    }

    if (report_status === 1) {
      resolve();
    }

    if (!start_time) {
      uni.setStorageSync(Report_Data_Time, end_time);
      start_time = end_time;
    }

    if (end_time - start_time > diff_time) {
      requestData(function (_ref2)

      {var enable = _ref2.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
      });
    }

  });
};

var requestData = function requestData(done) {
  var formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: statConfig.appid }) };


  uni.request({
    url: STAT_URL,
    method: 'GET',
    data: formData,
    success: function success(res) {var

      data =
      res.data;
      if (data.ret === 0) {
        typeof done === 'function' && done({
          enable: data.enable });

      }
    },
    fail: function fail(e) {
      var report_status_code = 1;
      try {
        report_status_code = uni.getStorageSync(Report_Status);
      } catch (e) {
        report_status_code = 1;
      }
      if (report_status_code === '') {
        report_status_code = 1;
      }
      typeof done === 'function' && done({
        enable: report_status_code });

    } });

};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 8).default;
var statConfig$1 = __webpack_require__(/*! uni-stat-config */ 7).default || __webpack_require__(/*! uni-stat-config */ 7);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig$1.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "getIsReportData", value: function getIsReportData()

    {
      return isReportData();
    } }, { key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('?????? onLauch ???????????????????????? pageShow ?????????????????????????????????');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref3$key = _ref3.key,key = _ref3$key === void 0 ? '' : _ref3$key,_ref3$value = _ref3.value,value = _ref3$value === void 0 ? "" : _ref3$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig$1.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // ????????????????????????????????????
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //?????? SDK ?????????
        t: time, //???????????????????????????
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      this.getIsReportData().then(function () {
        uni.request({
          url: STAT_URL,
          method: 'POST',
          // header: {
          //   'content-type': 'application/json' // ?????????
          // },
          data: optionsData,
          success: function success() {
            // if (process.env.NODE_ENV === 'development') {
            //   console.log('stat request success');
            // }
          },
          fail: function fail(e) {
            if (++_this5._retry < 3) {
              setTimeout(function () {
                _this5._sendRequest(optionsData);
              }, 1000);
            }
          } });

      });
    }
    /**
       * h5 ??????
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      this.getIsReportData().then(function () {
        var image = new Image();
        var options = getSgin(GetEncodeURIComponentOptions(data)).options;
        image.src = STAT_H5_URL + '?' + options;
      });
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // ?????? type ??????
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // ???????????????
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('?????????????????????????????????????????????????????????');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // ???????????????????????????????????????
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 50:
/*!************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/trim.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 506:
/*!*****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/validate/form.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


var _test = _interopRequireDefault(__webpack_require__(/*! @/uview-ui/libs/function/test.js */ 48));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                               * Validate v1.0.0 ????????????
                                                                                                                                                                               */var _default = {
  // ?????????
  mobile: [{
    required: true,
    message: '??????????????????',
    trigger: ['change', 'blur'] },

  {
    validator: function validator(rule, value, callback) {
      return _test.default.mobile(value);
    },
    message: '???????????????????????????',
    trigger: ['change', 'blur'] }],


  // ??????
  account: [{
    required: true,
    min: 5,
    message: '???????????????',
    trigger: ['change', 'blur'] }],


  // ???????????????
  code: [{
    required: true,
    min: 4,
    message: '??????????????????',
    trigger: ['change', 'blur'] }],


  // ??????
  password: [{
    required: true,
    message: '???????????????',
    trigger: ['change', 'blur'] },

  {
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
    message: '??????????????????????????????????????????6-12??????',
    trigger: ['change', 'blur'] }],



  // ????????????
  realName: [{
    required: true,
    message: '????????????????????????',
    trigger: ['change', 'blur'] },

  {
    validator: function validator(rule, value, callback) {
      return _test.default.chinese(value);
    },
    message: '???????????????',
    trigger: ['change', 'blur'] }],



  // ?????????
  bankName: [{
    required: true,
    message: '??????????????????',
    trigger: ['change', 'blur'] },

  {
    validator: function validator(rule, value, callback) {
      return _test.default.chinese(value);
    },
    message: '???????????????',
    trigger: ['change', 'blur'] }],



  // ????????????
  bankCode: [{
    required: true,
    message: '?????????????????????',
    trigger: ['change', 'blur'] },

  {
    validator: function validator(rule, value, callback) {
      return _test.default.number(value);
    },
    message: '?????????????????????',
    trigger: ['change', 'blur'] }],



  // ???????????????
  alipayAccount: [{
    required: true,
    message: '?????????????????????',
    trigger: ['change', 'blur'] },

  {
    validator: function validator(rule, value, callback) {
      var isRange = _test.default.rangeLength(value, [6, 30]);
      var isAsterisk = _test.default.contains(value, '*');

      return isRange && !isAsterisk;
    },
    message: '?????????????????????',
    trigger: ['change', 'blur'] }] };exports.default = _default;

/***/ }),

/***/ 51:
/*!*************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/toast.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!*****************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/getParent.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // ????????????????????????????????????????????????????????????provide/inject?????????
// this.$parent??????H5????????????????????????????????????????????????H5??????????????????this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // ??????while??????????????????????????????H5???????????????????????????
  while (parent) {
    // ?????????
    if (parent.$options.name !== name) {
      // ???????????????name?????????????????????????????????
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // ??????keys??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // ??????????????????????????????
          for (var i in keys) {
            // ???????????????????????????????????????????????????????????????
            // ????????????????????????????????????????????????????????????????????????????????????
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // ????????????????????????????????????false?????????????????????????????????????????????????????????????????????
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 53:
/*!***************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/$parent.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // ????????????????????????????????????????????????????????????provide/inject?????????
// this.$parent??????H5????????????????????????????????????????????????H5??????????????????this.$parent.$parent.xxx
// ?????????????????????undefined???????????????????????????????????????(??????)???$parent??????undefined??????????????????name
// ???(?????????undefined)???????????????????????????$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // ??????while??????????????????????????????H5???????????????????????????
  while (parent) {
    // ?????????
    if (parent.$options && parent.$options.name !== name) {
      // ???????????????name?????????????????????????????????
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 54:
/*!***********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/sys.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 55:
/*!****************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/debounce.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * ??????????????????????????????????????????????????????????????????wait????????????????????????
                                                                                                                         * 
                                                                                                                         * @param {Function} func ???????????????????????? 
                                                                                                                         * @param {Number} wait ???????????????
                                                                                                                         * @param {Boolean} immediate ?????????????????? 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // ???????????????
  if (timeout !== null) clearTimeout(timeout);
  // ??????????????????????????????????????????
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // ?????????????????????????????????????????????timeout????????????????????????????????????wait???????????????func????????????
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 56:
/*!****************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/function/throttle.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * ??????????????????????????????????????????????????????
                                                                                                                      * 
                                                                                                                      * @param {Function} func ???????????????????????? 
                                                                                                                      * @param {Number} wait ???????????????
                                                                                                                      * @param {Boolean} immediate ??????????????????
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // ??????????????????????????????wait????????????????????????
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // ?????????????????????????????????wait???????????????????????????
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 57:
/*!************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/config/config.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ??????????????????2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // ????????????
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 58:
/*!************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/config/zIndex.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp???H5??????API???z-index????????????
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup??????popup???actionsheet???keyboard???picker??????
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 59:
/*!****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/mixins/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;







var _store = _interopRequireDefault(__webpack_require__(/*! @/shopro/store */ 22));
var _share = _interopRequireDefault(__webpack_require__(/*! @/shopro/share */ 26));
var _request = _interopRequireDefault(__webpack_require__(/*! @/shopro/request */ 17));
var _platform = _interopRequireDefault(__webpack_require__(/*! @/shopro/platform */ 20));
var _router = __webpack_require__(/*! @/shopro/router */ 24);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                        * MixinIndex v1.0.0
                                                                                                                                        * @description shopro-mixin-index 1.0.0 shopro??????????????????
                                                                                                                                        * @Author lidongtony
                                                                                                                                        * @Date 2021-04-18
                                                                                                                                        * @Email lidongtony@qq.com
                                                                                                                                        */var _default = { onLoad: function onLoad(options) {var that = this; // ?????????????????????page?????? ???????????? ??????????????????????????????????????????

    if (options === null || options === void 0 ? void 0 : options.scene) {
      var scene = decodeURIComponent(options.scene);
      var sceneObj = scene.split('=');
      options[sceneObj[0]] = sceneObj[1];
    }

    if (options === null || options === void 0 ? void 0 : options.page) {
      _router.router.push({
        path: decodeURIComponent(options.page) });

    }
    if (options === null || options === void 0 ? void 0 : options.custom_id) {
      _router.router.push({
        path: '/pages/index/view',
        query: {
          id: options.custom_id } });


    }
    if (options === null || options === void 0 ? void 0 : options.spm) {
      var shareParams = _share.default.getShareQuery(options.spm);
      // ??????????????????
      if (shareParams.shareUserId) {
        if (_store.default.state.user.isLogin) {
          (0, _request.default)('common.shareAdd', {
            spm: options.spm });

        } else {
          uni.setStorageSync('spm', options.spm);
        }
      }
      // ??????????????????
      var page = {};
      if (shareParams.page) {
        page.path = shareParams.page;
      }
      if (shareParams.pageId) {
        page.query = {
          id: shareParams.pageId };

      }
      if (page.path) {
        _router.router.push(page);
      }
    }
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"@dcloudio/uni-stat@next\",\"_id\":\"@dcloudio/uni-stat@2.0.0-30720210122001\",\"_inBundle\":false,\"_integrity\":\"sha512-TRCq2q+bMpahbHrMxPuuZt8rJor09mgsSWBsN381tTbNRHiRqlTnMC0HqNw+aNwlHf2/Ta2cshOW9hmdHn2dUg==\",\"_location\":\"/@dcloudio/uni-stat\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"@dcloudio/uni-stat@next\",\"name\":\"@dcloudio/uni-stat\",\"escapedName\":\"@dcloudio%2funi-stat\",\"scope\":\"@dcloudio\",\"rawSpec\":\"next\",\"saveSpec\":null,\"fetchSpec\":\"next\"},\"_requiredBy\":[\"#USER\",\"/\",\"/@dcloudio/vue-cli-plugin-uni\"],\"_resolved\":\"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-30720210122001.tgz\",\"_shasum\":\"113e8c596abae7956d8dba15488fa8647ad60d44\",\"_spec\":\"@dcloudio/uni-stat@next\",\"_where\":\"/Users/guoshengqiang/Documents/dcloud-plugins-new/release/uniapp-cli\",\"author\":\"\",\"bugs\":{\"url\":\"https://github.com/dcloudio/uni-app/issues\"},\"bundleDependencies\":false,\"deprecated\":false,\"description\":\"\",\"devDependencies\":{\"@babel/core\":\"^7.5.5\",\"@babel/preset-env\":\"^7.5.5\",\"eslint\":\"^6.1.0\",\"rollup\":\"^1.19.3\",\"rollup-plugin-babel\":\"^4.3.3\",\"rollup-plugin-clear\":\"^2.0.7\",\"rollup-plugin-commonjs\":\"^10.0.2\",\"rollup-plugin-copy\":\"^3.1.0\",\"rollup-plugin-eslint\":\"^7.0.0\",\"rollup-plugin-json\":\"^4.0.0\",\"rollup-plugin-node-resolve\":\"^5.2.0\",\"rollup-plugin-replace\":\"^2.2.0\",\"rollup-plugin-uglify\":\"^6.0.2\"},\"files\":[\"dist\",\"package.json\",\"LICENSE\"],\"gitHead\":\"05cca9557ee104e1a52439caf5f15da09f478496\",\"homepage\":\"https://github.com/dcloudio/uni-app#readme\",\"license\":\"Apache-2.0\",\"main\":\"dist/index.js\",\"name\":\"@dcloudio/uni-stat\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/dcloudio/uni-app.git\",\"directory\":\"packages/uni-stat\"},\"scripts\":{\"build\":\"NODE_ENV=production rollup -c rollup.config.js\",\"dev\":\"NODE_ENV=development rollup -w -c rollup.config.js\"},\"version\":\"2.0.0-30720210122001\"}");

/***/ }),

/***/ 60:
/*!****************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/shopro/mixins/share.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;






var _store = _interopRequireDefault(__webpack_require__(/*! @/shopro/store */ 22));
var _vuex = __webpack_require__(/*! vuex */ 12);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                           * MixinShare v1.0.0
                                                                                                                           * @description shopro-mixin-share 1.0.0 shopro??????????????????
                                                                                                                           * @Author lidongtony
                                                                                                                           * @Date 2021-04-18
                                                                                                                           * @Email lidongtony@qq.com
                                                                                                                           */var _default = { data: function data() {
    return {
      shareInfo: {} };

  },
  // ????????????
  computed: {
    shareData: {
      get: function get() {
        this.shareInfo = _store.default.state.shopro.shareInfo;
        return _store.default.state.shopro.shareInfo;
      },
      set: function set(val) {
        this.shareInfo = val;
      } } },



  onShareAppMessage: function onShareAppMessage(res) {
    var that = this;
    uni.$emit('ON_WX_SHARE');
    return {
      title: that.shareInfo.title,
      path: that.shareInfo.path,
      imageUrl: that.shareInfo.image,
      success: function success(res) {
        uni.showToast({
          title: '????????????' });


      },
      fail: function fail(res) {
        uni.showToast({
          title: '????????????',
          icon: 'none' });

      },
      complete: function complete() {} };

  },
  onShareTimeline: function onShareTimeline(res) {
    var that = this;
    var query = that.shareInfo.query;
    //????????????????????????ID??????
    var currentPage = getCurrentPages()[getCurrentPages().length - 1];
    var options = currentPage.options;
    if (JSON.stringify(options) != '{}' && options.id) {
      query += "&id=".concat(options.id);
    }

    return {
      title: that.shareInfo.title,
      query: query,
      imageUrl: that.shareInfo.image,
      success: function success(res) {
        uni.showToast({
          title: '????????????' });

      },
      fail: function fail(res) {
        uni.showToast({
          title: '????????????',
          icon: 'none' });

      },
      complete: function complete() {} };

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 605:
/*!***********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/util/emitter.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ???????????? call ??????this??????
                                                                                                      * @param componentName // ???????????????????????????
                                                                                                      * @param eventName // ????????????
                                                                                                      * @param params // ?????????????????????
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // ????????????????????????????????????????????? ?????? ?????? ???????????????
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * ?????? (????????????) (??????)
              * @param componentName // ???????????????????????????
              * @param eventName // ????????????
              * @param params // ?????????????????????
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent ???????????????????????? $root ?????????
      var name = parent.$options.name; // ???????????????????????????name
      // ????????????????????? && ??????????????? ??? ??????????????????????????????????????????????????????????????????????????????
      // ?????????????????????????????????????????????
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // ??????????????????????????????name???????????????
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * ?????? (????????????) (????????????)
        * @param componentName // ???????????????????????????
        * @param eventName // ????????????
        * @param params // ?????????????????????
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 7:
/*!********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/pages.json?{"type":"stat"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__*****" };exports.default = _default;

/***/ }),

/***/ 8:
/*!*********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/pages.json?{"type":"style"} ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/category": { "navigationBarTitleText": "??????" }, "pages/index/cart": { "navigationBarTitleText": "?????????" }, "pages/index/user": { "navigationBarTitleText": "??????", "navigationStyle": "custom", "navigationBarTextStyle": "white", "enablePullDownRefresh": true }, "pages/index/view": { "navigationBarTitleText": "", "enablePullDownRefresh": true }, "pages/activity/sign/index": { "navigationBarTitleText": "????????????" }, "pages/activity/seckill/list": { "navigationBarTitleText": "????????????", "enablePullDownRefresh": true }, "pages/activity/groupon/list": { "navigationBarTitleText": "????????????", "enablePullDownRefresh": true }, "pages/activity/groupon/detail": { "navigationBarTitleText": "????????????", "enablePullDownRefresh": true }, "pages/activity/groupon/my-groupon": { "navigationBarTitleText": "????????????", "enablePullDownRefresh": true }, "pages/activity/discounts/list": { "navigationBarTitleText": "??????????????????" }, "pages/app/score/list": { "navigationBarTitleText": "????????????" }, "pages/app/coupon/list": { "navigationBarTitleText": "???????????????" }, "pages/app/coupon/detail": { "navigationBarTitleText": "???????????????", "navigationStyle": "custom" }, "pages/app/merchant/index": { "navigationBarTitleText": "????????????", "navigationStyle": "custom", "enablePullDownRefresh": true, "navigationBarTextStyle": "white" }, "pages/app/merchant/apply": { "navigationBarTitleText": "????????????", "navigationStyle": "custom" }, "pages/app/merchant/detail": { "navigationBarTitleText": "????????????" }, "pages/app/merchant/info": { "navigationBarTitleText": "????????????" }, "pages/app/merchant/list": { "navigationBarTitleText": "????????????" }, "pages/app/commission/index": { "navigationBarTitleText": "????????????", "enablePullDownRefresh": true, "navigationStyle": "custom", "navigationBarTextStyle": "white" }, "pages/app/commission/team": { "navigationBarTitleText": "????????????", "navigationStyle": "custom", "navigationBarTextStyle": "white" }, "pages/app/commission/commission-log": { "navigationBarTitleText": "????????????", "enablePullDownRefresh": true }, "pages/app/commission/order": { "navigationBarTitleText": "????????????", "navigationStyle": "custom", "navigationBarTextStyle": "white", "enablePullDownRefresh": true }, "pages/app/commission/goods": { "navigationBarTitleText": "????????????" }, "pages/app/commission/apply": { "navigationBarTitleText": "???????????????", "navigationStyle": "custom", "navigationBarTextStyle": "white" }, "pages/app/commission/rankings": { "navigationBarTitleText": "????????????", "navigationStyle": "custom", "navigationBarTextStyle": "white" }, "pages/app/commission/share-log": { "navigationBarTitleText": "????????????", "navigationStyle": "custom", "navigationBarTextStyle": "white", "enablePullDownRefresh": true }, "pages/goods/list": { "navigationBarTitleText": "????????????", "navigationStyle": "custom" }, "pages/goods/detail": { "navigationBarTitleText": "????????????", "navigationStyle": "custom", "navigationBarTextStyle": "white" }, "pages/goods/comment/add-comment": { "navigationBarTitleText": "??????" }, "pages/goods/comment/comment-list": { "navigationBarTitleText": "????????????" }, "pages/order/confirm": { "navigationBarTitleText": "????????????" }, "pages/order/payment/method": { "navigationBarTitleText": "?????????" }, "pages/order/payment/result": { "navigationBarTitleText": "????????????" }, "pages/order/list": { "navigationBarTitleText": "????????????" }, "pages/order/detail": { "navigationBarTitleText": "????????????" }, "pages/order/after-sale/detail": { "navigationBarTitleText": "????????????" }, "pages/order/after-sale/list": { "navigationBarTitleText": "????????????" }, "pages/order/after-sale/log": { "navigationBarTitleText": "????????????" }, "pages/order/after-sale/refund": { "navigationBarTitleText": "????????????" }, "pages/order/express/distribution-detail": { "navigationBarTitleText": "????????????" }, "pages/order/express/express-detail": { "navigationBarTitleText": "????????????" }, "pages/order/express/express-list": { "navigationBarTitleText": "????????????" }, "pages/order/express/store-address": { "navigationBarTitleText": "???????????????", "navigationStyle": "custom", "navigationBarTextStyle": "white" }, "pages/public/faq": { "navigationBarTitleText": "????????????" }, "pages/public/feedback": { "navigationBarTitleText": "????????????" }, "pages/public/chat/index": { "navigationBarTitleText": "??????", "navigationStyle": "custom", "navigationBarTextStyle": "white" }, "pages/public/search": { "navigationBarTitleText": "??????" }, "pages/public/richtext": { "navigationBarTitleText": "" }, "pages/public/webview": { "navigationBarTitleText": "" }, "pages/public/404": { "navigationBarTitleText": "???????????????" }, "pages/public/loading": { "navigationBarTitleText": "", "enablePullDownRefresh": false }, "pages/user/info": { "navigationBarTitleText": "????????????" }, "pages/user/set": { "navigationBarTitleText": "????????????" }, "pages/user/view-log": { "navigationBarTitleText": "????????????" }, "pages/user/wallet/index": { "navigationBarTitleText": "????????????" }, "pages/user/wallet/withdraw": { "navigationBarTitleText": "", "navigationStyle": "custom" }, "pages/user/wallet/withdraw-log": { "navigationBarTitleText": "????????????" }, "pages/user/wallet/score-balance": { "navigationBarTitleText": "????????????", "navigationStyle": "custom" }, "pages/user/address1/list": { "navigationBarTitleText": "????????????" }, "pages/user/address1/edit": { "navigationBarTitleText": "" }, "pages/user/address2/list": { "navigationBarTitleText": "????????????" }, "pages/user/address2/edit": { "navigationBarTitleText": "" }, "pages/user/favorite": { "navigationBarTitleText": "????????????" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "shopro-plus", "navigationBarBackgroundColor": "#FFFFFF", "backgroundColor": "#FFFFFF" } };exports.default = _default;

/***/ }),

/***/ 903:
/*!*******************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/util/async-validator.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"NODE_ENV":"development","VUE_APP_NAME":"Shopro????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // ????????????????????????????????????????????????
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // ???????????????????????????U+010000?????????U+10FFFF????????????????????????Supplementary Plane???

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // ??????????????????U+010000?????????length??????????????????bug??????"????????????".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 904)))

/***/ }),

/***/ 904:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 905);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 905:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 904)))

/***/ }),

/***/ 934:
/*!************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/util/province.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var provinceData = [{ "label": "?????????", "value": "11" }, { "label": "?????????", "value": "12" }, { "label": "?????????", "value": "13" }, { "label": "?????????", "value": "14" }, { "label": "??????????????????", "value": "15" }, { "label": "?????????", "value": "21" }, { "label": "?????????", "value": "22" }, { "label": "????????????", "value": "23" }, { "label": "?????????", "value": "31" }, { "label": "?????????", "value": "32" }, { "label": "?????????", "value": "33" }, { "label": "?????????", "value": "34" }, { "label": "?????????", "value": "35" }, { "label": "?????????", "value": "36" }, { "label": "?????????", "value": "37" }, { "label": "?????????", "value": "41" }, { "label": "?????????", "value": "42" }, { "label": "?????????", "value": "43" }, { "label": "?????????", "value": "44" }, { "label": "?????????????????????", "value": "45" }, { "label": "?????????", "value": "46" }, { "label": "?????????", "value": "50" }, { "label": "?????????", "value": "51" }, { "label": "?????????", "value": "52" }, { "label": "?????????", "value": "53" }, { "label": "???????????????", "value": "54" }, { "label": "?????????", "value": "61" }, { "label": "?????????", "value": "62" }, { "label": "?????????", "value": "63" }, { "label": "?????????????????????", "value": "64" }, { "label": "????????????????????????", "value": "65" }, { "label": "??????", "value": "66" }, { "label": "??????", "value": "67" }, { "label": "??????", "value": "68" }];var _default = provinceData;exports.default = _default;

/***/ }),

/***/ 935:
/*!********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/util/city.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [[{ "label": "?????????", "value": "1101" }], [{ "label": "?????????", "value": "1201" }], [{ "label": "????????????", "value": "1301" }, { "label": "?????????", "value": "1302" }, { "label": "????????????", "value": "1303" }, { "label": "?????????", "value": "1304" }, { "label": "?????????", "value": "1305" }, { "label": "?????????", "value": "1306" }, { "label": "????????????", "value": "1307" }, { "label": "?????????", "value": "1308" }, { "label": "?????????", "value": "1309" }, { "label": "?????????", "value": "1310" }, { "label": "?????????", "value": "1311" }], [{ "label": "?????????", "value": "1401" }, { "label": "?????????", "value": "1402" }, { "label": "?????????", "value": "1403" }, { "label": "?????????", "value": "1404" }, { "label": "?????????", "value": "1405" }, { "label": "?????????", "value": "1406" }, { "label": "?????????", "value": "1407" }, { "label": "?????????", "value": "1408" }, { "label": "?????????", "value": "1409" }, { "label": "?????????", "value": "1410" }, { "label": "?????????", "value": "1411" }], [{ "label": "???????????????", "value": "1501" }, { "label": "?????????", "value": "1502" }, { "label": "?????????", "value": "1503" }, { "label": "?????????", "value": "1504" }, { "label": "?????????", "value": "1505" }, { "label": "???????????????", "value": "1506" }, { "label": "???????????????", "value": "1507" }, { "label": "???????????????", "value": "1508" }, { "label": "???????????????", "value": "1509" }, { "label": "?????????", "value": "1522" }, { "label": "???????????????", "value": "1525" }, { "label": "????????????", "value": "1529" }], [{ "label": "?????????", "value": "2101" }, { "label": "?????????", "value": "2102" }, { "label": "?????????", "value": "2103" }, { "label": "?????????", "value": "2104" }, { "label": "?????????", "value": "2105" }, { "label": "?????????", "value": "2106" }, { "label": "?????????", "value": "2107" }, { "label": "?????????", "value": "2108" }, { "label": "?????????", "value": "2109" }, { "label": "?????????", "value": "2110" }, { "label": "?????????", "value": "2111" }, { "label": "?????????", "value": "2112" }, { "label": "?????????", "value": "2113" }, { "label": "????????????", "value": "2114" }], [{ "label": "?????????", "value": "2201" }, { "label": "?????????", "value": "2202" }, { "label": "?????????", "value": "2203" }, { "label": "?????????", "value": "2204" }, { "label": "?????????", "value": "2205" }, { "label": "?????????", "value": "2206" }, { "label": "?????????", "value": "2207" }, { "label": "?????????", "value": "2208" }, { "label": "????????????????????????", "value": "2224" }], [{ "label": "????????????", "value": "2301" }, { "label": "???????????????", "value": "2302" }, { "label": "?????????", "value": "2303" }, { "label": "?????????", "value": "2304" }, { "label": "????????????", "value": "2305" }, { "label": "?????????", "value": "2306" }, { "label": "?????????", "value": "2307" }, { "label": "????????????", "value": "2308" }, { "label": "????????????", "value": "2309" }, { "label": "????????????", "value": "2310" }, { "label": "?????????", "value": "2311" }, { "label": "?????????", "value": "2312" }, { "label": "??????????????????", "value": "2327" }], [{ "label": "?????????", "value": "3101" }], [{ "label": "?????????", "value": "3201" }, { "label": "?????????", "value": "3202" }, { "label": "?????????", "value": "3203" }, { "label": "?????????", "value": "3204" }, { "label": "?????????", "value": "3205" }, { "label": "?????????", "value": "3206" }, { "label": "????????????", "value": "3207" }, { "label": "?????????", "value": "3208" }, { "label": "?????????", "value": "3209" }, { "label": "?????????", "value": "3210" }, { "label": "?????????", "value": "3211" }, { "label": "?????????", "value": "3212" }, { "label": "?????????", "value": "3213" }], [{ "label": "?????????", "value": "3301" }, { "label": "?????????", "value": "3302" }, { "label": "?????????", "value": "3303" }, { "label": "?????????", "value": "3304" }, { "label": "?????????", "value": "3305" }, { "label": "?????????", "value": "3306" }, { "label": "?????????", "value": "3307" }, { "label": "?????????", "value": "3308" }, { "label": "?????????", "value": "3309" }, { "label": "?????????", "value": "3310" }, { "label": "?????????", "value": "3311" }], [{ "label": "?????????", "value": "3401" }, { "label": "?????????", "value": "3402" }, { "label": "?????????", "value": "3403" }, { "label": "?????????", "value": "3404" }, { "label": "????????????", "value": "3405" }, { "label": "?????????", "value": "3406" }, { "label": "?????????", "value": "3407" }, { "label": "?????????", "value": "3408" }, { "label": "?????????", "value": "3410" }, { "label": "?????????", "value": "3411" }, { "label": "?????????", "value": "3412" }, { "label": "?????????", "value": "3413" }, { "label": "?????????", "value": "3415" }, { "label": "?????????", "value": "3416" }, { "label": "?????????", "value": "3417" }, { "label": "?????????", "value": "3418" }], [{ "label": "?????????", "value": "3501" }, { "label": "?????????", "value": "3502" }, { "label": "?????????", "value": "3503" }, { "label": "?????????", "value": "3504" }, { "label": "?????????", "value": "3505" }, { "label": "?????????", "value": "3506" }, { "label": "?????????", "value": "3507" }, { "label": "?????????", "value": "3508" }, { "label": "?????????", "value": "3509" }], [{ "label": "?????????", "value": "3601" }, { "label": "????????????", "value": "3602" }, { "label": "?????????", "value": "3603" }, { "label": "?????????", "value": "3604" }, { "label": "?????????", "value": "3605" }, { "label": "?????????", "value": "3606" }, { "label": "?????????", "value": "3607" }, { "label": "?????????", "value": "3608" }, { "label": "?????????", "value": "3609" }, { "label": "?????????", "value": "3610" }, { "label": "?????????", "value": "3611" }], [{ "label": "?????????", "value": "3701" }, { "label": "?????????", "value": "3702" }, { "label": "?????????", "value": "3703" }, { "label": "?????????", "value": "3704" }, { "label": "?????????", "value": "3705" }, { "label": "?????????", "value": "3706" }, { "label": "?????????", "value": "3707" }, { "label": "?????????", "value": "3708" }, { "label": "?????????", "value": "3709" }, { "label": "?????????", "value": "3710" }, { "label": "?????????", "value": "3711" }, { "label": "?????????", "value": "3712" }, { "label": "?????????", "value": "3713" }, { "label": "?????????", "value": "3714" }, { "label": "?????????", "value": "3715" }, { "label": "?????????", "value": "3716" }, { "label": "?????????", "value": "3717" }], [{ "label": "?????????", "value": "4101" }, { "label": "?????????", "value": "4102" }, { "label": "?????????", "value": "4103" }, { "label": "????????????", "value": "4104" }, { "label": "?????????", "value": "4105" }, { "label": "?????????", "value": "4106" }, { "label": "?????????", "value": "4107" }, { "label": "?????????", "value": "4108" }, { "label": "?????????", "value": "4109" }, { "label": "?????????", "value": "4110" }, { "label": "?????????", "value": "4111" }, { "label": "????????????", "value": "4112" }, { "label": "?????????", "value": "4113" }, { "label": "?????????", "value": "4114" }, { "label": "?????????", "value": "4115" }, { "label": "?????????", "value": "4116" }, { "label": "????????????", "value": "4117" }, { "label": "???????????????????????????", "value": "4190" }], [{ "label": "?????????", "value": "4201" }, { "label": "?????????", "value": "4202" }, { "label": "?????????", "value": "4203" }, { "label": "?????????", "value": "4205" }, { "label": "?????????", "value": "4206" }, { "label": "?????????", "value": "4207" }, { "label": "?????????", "value": "4208" }, { "label": "?????????", "value": "4209" }, { "label": "?????????", "value": "4210" }, { "label": "?????????", "value": "4211" }, { "label": "?????????", "value": "4212" }, { "label": "?????????", "value": "4213" }, { "label": "??????????????????????????????", "value": "4228" }, { "label": "???????????????????????????", "value": "4290" }], [{ "label": "?????????", "value": "4301" }, { "label": "?????????", "value": "4302" }, { "label": "?????????", "value": "4303" }, { "label": "?????????", "value": "4304" }, { "label": "?????????", "value": "4305" }, { "label": "?????????", "value": "4306" }, { "label": "?????????", "value": "4307" }, { "label": "????????????", "value": "4308" }, { "label": "?????????", "value": "4309" }, { "label": "?????????", "value": "4310" }, { "label": "?????????", "value": "4311" }, { "label": "?????????", "value": "4312" }, { "label": "?????????", "value": "4313" }, { "label": "??????????????????????????????", "value": "4331" }], [{ "label": "?????????", "value": "4401" }, { "label": "?????????", "value": "4402" }, { "label": "?????????", "value": "4403" }, { "label": "?????????", "value": "4404" }, { "label": "?????????", "value": "4405" }, { "label": "?????????", "value": "4406" }, { "label": "?????????", "value": "4407" }, { "label": "?????????", "value": "4408" }, { "label": "?????????", "value": "4409" }, { "label": "?????????", "value": "4412" }, { "label": "?????????", "value": "4413" }, { "label": "?????????", "value": "4414" }, { "label": "?????????", "value": "4415" }, { "label": "?????????", "value": "4416" }, { "label": "?????????", "value": "4417" }, { "label": "?????????", "value": "4418" }, { "label": "?????????", "value": "4419" }, { "label": "?????????", "value": "4420" }, { "label": "?????????", "value": "4451" }, { "label": "?????????", "value": "4452" }, { "label": "?????????", "value": "4453" }], [{ "label": "?????????", "value": "4501" }, { "label": "?????????", "value": "4502" }, { "label": "?????????", "value": "4503" }, { "label": "?????????", "value": "4504" }, { "label": "?????????", "value": "4505" }, { "label": "????????????", "value": "4506" }, { "label": "?????????", "value": "4507" }, { "label": "?????????", "value": "4508" }, { "label": "?????????", "value": "4509" }, { "label": "?????????", "value": "4510" }, { "label": "?????????", "value": "4511" }, { "label": "?????????", "value": "4512" }, { "label": "?????????", "value": "4513" }, { "label": "?????????", "value": "4514" }], [{ "label": "?????????", "value": "4601" }, { "label": "?????????", "value": "4602" }, { "label": "?????????", "value": "4603" }, { "label": "?????????", "value": "4604" }, { "label": "???????????????????????????", "value": "4690" }], [{ "label": "?????????", "value": "5001" }, { "label": "???", "value": "5002" }], [{ "label": "?????????", "value": "5101" }, { "label": "?????????", "value": "5103" }, { "label": "????????????", "value": "5104" }, { "label": "?????????", "value": "5105" }, { "label": "?????????", "value": "5106" }, { "label": "?????????", "value": "5107" }, { "label": "?????????", "value": "5108" }, { "label": "?????????", "value": "5109" }, { "label": "?????????", "value": "5110" }, { "label": "?????????", "value": "5111" }, { "label": "?????????", "value": "5113" }, { "label": "?????????", "value": "5114" }, { "label": "?????????", "value": "5115" }, { "label": "?????????", "value": "5116" }, { "label": "?????????", "value": "5117" }, { "label": "?????????", "value": "5118" }, { "label": "?????????", "value": "5119" }, { "label": "?????????", "value": "5120" }, { "label": "???????????????????????????", "value": "5132" }, { "label": "?????????????????????", "value": "5133" }, { "label": "?????????????????????", "value": "5134" }], [{ "label": "?????????", "value": "5201" }, { "label": "????????????", "value": "5202" }, { "label": "?????????", "value": "5203" }, { "label": "?????????", "value": "5204" }, { "label": "?????????", "value": "5205" }, { "label": "?????????", "value": "5206" }, { "label": "?????????????????????????????????", "value": "5223" }, { "label": "??????????????????????????????", "value": "5226" }, { "label": "??????????????????????????????", "value": "5227" }], [{ "label": "?????????", "value": "5301" }, { "label": "?????????", "value": "5303" }, { "label": "?????????", "value": "5304" }, { "label": "?????????", "value": "5305" }, { "label": "?????????", "value": "5306" }, { "label": "?????????", "value": "5307" }, { "label": "?????????", "value": "5308" }, { "label": "?????????", "value": "5309" }, { "label": "?????????????????????", "value": "5323" }, { "label": "??????????????????????????????", "value": "5325" }, { "label": "???????????????????????????", "value": "5326" }, { "label": "???????????????????????????", "value": "5328" }, { "label": "?????????????????????", "value": "5329" }, { "label": "??????????????????????????????", "value": "5331" }, { "label": "????????????????????????", "value": "5333" }, { "label": "?????????????????????", "value": "5334" }], [{ "label": "?????????", "value": "5401" }, { "label": "????????????", "value": "5402" }, { "label": "?????????", "value": "5403" }, { "label": "?????????", "value": "5404" }, { "label": "?????????", "value": "5405" }, { "label": "????????????", "value": "5424" }, { "label": "????????????", "value": "5425" }], [{ "label": "?????????", "value": "6101" }, { "label": "?????????", "value": "6102" }, { "label": "?????????", "value": "6103" }, { "label": "?????????", "value": "6104" }, { "label": "?????????", "value": "6105" }, { "label": "?????????", "value": "6106" }, { "label": "?????????", "value": "6107" }, { "label": "?????????", "value": "6108" }, { "label": "?????????", "value": "6109" }, { "label": "?????????", "value": "6110" }], [{ "label": "?????????", "value": "6201" }, { "label": "????????????", "value": "6202" }, { "label": "?????????", "value": "6203" }, { "label": "?????????", "value": "6204" }, { "label": "?????????", "value": "6205" }, { "label": "?????????", "value": "6206" }, { "label": "?????????", "value": "6207" }, { "label": "?????????", "value": "6208" }, { "label": "?????????", "value": "6209" }, { "label": "?????????", "value": "6210" }, { "label": "?????????", "value": "6211" }, { "label": "?????????", "value": "6212" }, { "label": "?????????????????????", "value": "6229" }, { "label": "?????????????????????", "value": "6230" }], [{ "label": "?????????", "value": "6301" }, { "label": "?????????", "value": "6302" }, { "label": "?????????????????????", "value": "6322" }, { "label": "?????????????????????", "value": "6323" }, { "label": "?????????????????????", "value": "6325" }, { "label": "?????????????????????", "value": "6326" }, { "label": "?????????????????????", "value": "6327" }, { "label": "??????????????????????????????", "value": "6328" }], [{ "label": "?????????", "value": "6401" }, { "label": "????????????", "value": "6402" }, { "label": "?????????", "value": "6403" }, { "label": "?????????", "value": "6404" }, { "label": "?????????", "value": "6405" }], [{ "label": "???????????????", "value": "6501" }, { "label": "???????????????", "value": "6502" }, { "label": "????????????", "value": "6504" }, { "label": "?????????", "value": "6505" }, { "label": "?????????????????????", "value": "6523" }, { "label": "???????????????????????????", "value": "6527" }, { "label": "???????????????????????????", "value": "6528" }, { "label": "???????????????", "value": "6529" }, { "label": "?????????????????????????????????", "value": "6530" }, { "label": "????????????", "value": "6531" }, { "label": "????????????", "value": "6532" }, { "label": "????????????????????????", "value": "6540" }, { "label": "????????????", "value": "6542" }, { "label": "???????????????", "value": "6543" }, { "label": "?????????????????????????????????", "value": "6590" }], [{ "label": "??????", "value": "6601" }, { "label": "??????", "value": "6602" }, { "label": "??????", "value": "6603" }, { "label": "??????", "value": "6604" }, { "label": "??????", "value": "6605" }, { "label": "??????", "value": "6606" }, { "label": "??????", "value": "6607" }, { "label": "??????", "value": "6608" }, { "label": "??????", "value": "6609" }, { "label": "??????", "value": "6610" }, { "label": "??????", "value": "6611" }, { "label": "??????", "value": "6612" }, { "label": "??????", "value": "6613" }, { "label": "??????", "value": "6614" }, { "label": "??????", "value": "6615" }, { "label": "??????", "value": "6616" }, { "label": "??????", "value": "6617" }], [{ "label": "?????????", "value": "6701" }, { "label": "??????", "value": "6702" }, { "label": "??????", "value": "6703" }], [{ "label": "????????????", "value": "6801" }, { "label": "?????????", "value": "6802" }, { "label": "?????????", "value": "6803" }, { "label": "?????????", "value": "6804" }]];var _default = cityData;exports.default = _default;

/***/ }),

/***/ 936:
/*!********************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/libs/util/area.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaData = [[[{ "label": "?????????", "value": "110101" }, { "label": "?????????", "value": "110102" }, { "label": "?????????", "value": "110105" }, { "label": "?????????", "value": "110106" }, { "label": "????????????", "value": "110107" }, { "label": "?????????", "value": "110108" }, { "label": "????????????", "value": "110109" }, { "label": "?????????", "value": "110111" }, { "label": "?????????", "value": "110112" }, { "label": "?????????", "value": "110113" }, { "label": "?????????", "value": "110114" }, { "label": "?????????", "value": "110115" }, { "label": "?????????", "value": "110116" }, { "label": "?????????", "value": "110117" }, { "label": "?????????", "value": "110118" }, { "label": "?????????", "value": "110119" }]], [[{ "label": "?????????", "value": "120101" }, { "label": "?????????", "value": "120102" }, { "label": "?????????", "value": "120103" }, { "label": "?????????", "value": "120104" }, { "label": "?????????", "value": "120105" }, { "label": "?????????", "value": "120106" }, { "label": "?????????", "value": "120110" }, { "label": "?????????", "value": "120111" }, { "label": "?????????", "value": "120112" }, { "label": "?????????", "value": "120113" }, { "label": "?????????", "value": "120114" }, { "label": "?????????", "value": "120115" }, { "label": "????????????", "value": "120116" }, { "label": "?????????", "value": "120117" }, { "label": "?????????", "value": "120118" }, { "label": "?????????", "value": "120119" }]], [[{ "label": "?????????", "value": "130102" }, { "label": "?????????", "value": "130104" }, { "label": "?????????", "value": "130105" }, { "label": "????????????", "value": "130107" }, { "label": "?????????", "value": "130108" }, { "label": "?????????", "value": "130109" }, { "label": "?????????", "value": "130110" }, { "label": "?????????", "value": "130111" }, { "label": "?????????", "value": "130121" }, { "label": "?????????", "value": "130123" }, { "label": "?????????", "value": "130125" }, { "label": "?????????", "value": "130126" }, { "label": "?????????", "value": "130127" }, { "label": "?????????", "value": "130128" }, { "label": "?????????", "value": "130129" }, { "label": "?????????", "value": "130130" }, { "label": "?????????", "value": "130131" }, { "label": "?????????", "value": "130132" }, { "label": "??????", "value": "130133" }, { "label": "????????????????????????????????????", "value": "130171" }, { "label": "???????????????????????????", "value": "130172" }, { "label": "?????????", "value": "130181" }, { "label": "?????????", "value": "130183" }, { "label": "?????????", "value": "130184" }], [{ "label": "?????????", "value": "130202" }, { "label": "?????????", "value": "130203" }, { "label": "?????????", "value": "130204" }, { "label": "?????????", "value": "130205" }, { "label": "?????????", "value": "130207" }, { "label": "?????????", "value": "130208" }, { "label": "????????????", "value": "130209" }, { "label": "??????", "value": "130223" }, { "label": "?????????", "value": "130224" }, { "label": "?????????", "value": "130225" }, { "label": "?????????", "value": "130227" }, { "label": "?????????", "value": "130229" }, { "label": "????????????????????????????????????", "value": "130271" }, { "label": "????????????????????????", "value": "130272" }, { "label": "?????????????????????????????????", "value": "130273" }, { "label": "?????????????????????????????????", "value": "130274" }, { "label": "?????????", "value": "130281" }, { "label": "?????????", "value": "130283" }], [{ "label": "?????????", "value": "130302" }, { "label": "????????????", "value": "130303" }, { "label": "????????????", "value": "130304" }, { "label": "?????????", "value": "130306" }, { "label": "?????????????????????", "value": "130321" }, { "label": "?????????", "value": "130322" }, { "label": "?????????", "value": "130324" }, { "label": "?????????????????????????????????", "value": "130371" }, { "label": "???????????????", "value": "130372" }], [{ "label": "?????????", "value": "130402" }, { "label": "?????????", "value": "130403" }, { "label": "?????????", "value": "130404" }, { "label": "????????????", "value": "130406" }, { "label": "?????????", "value": "130407" }, { "label": "?????????", "value": "130408" }, { "label": "?????????", "value": "130423" }, { "label": "?????????", "value": "130424" }, { "label": "?????????", "value": "130425" }, { "label": "??????", "value": "130426" }, { "label": "??????", "value": "130427" }, { "label": "??????", "value": "130430" }, { "label": "?????????", "value": "130431" }, { "label": "?????????", "value": "130432" }, { "label": "?????????", "value": "130433" }, { "label": "??????", "value": "130434" }, { "label": "?????????", "value": "130435" }, { "label": "???????????????????????????", "value": "130471" }, { "label": "??????????????????", "value": "130473" }, { "label": "?????????", "value": "130481" }], [{ "label": "?????????", "value": "130502" }, { "label": "?????????", "value": "130503" }, { "label": "?????????", "value": "130521" }, { "label": "?????????", "value": "130522" }, { "label": "?????????", "value": "130523" }, { "label": "?????????", "value": "130524" }, { "label": "?????????", "value": "130525" }, { "label": "??????", "value": "130526" }, { "label": "?????????", "value": "130527" }, { "label": "?????????", "value": "130528" }, { "label": "?????????", "value": "130529" }, { "label": "?????????", "value": "130530" }, { "label": "?????????", "value": "130531" }, { "label": "?????????", "value": "130532" }, { "label": "??????", "value": "130533" }, { "label": "?????????", "value": "130534" }, { "label": "?????????", "value": "130535" }, { "label": "???????????????????????????", "value": "130571" }, { "label": "?????????", "value": "130581" }, { "label": "?????????", "value": "130582" }], [{ "label": "?????????", "value": "130602" }, { "label": "?????????", "value": "130606" }, { "label": "?????????", "value": "130607" }, { "label": "?????????", "value": "130608" }, { "label": "?????????", "value": "130609" }, { "label": "?????????", "value": "130623" }, { "label": "?????????", "value": "130624" }, { "label": "?????????", "value": "130626" }, { "label": "??????", "value": "130627" }, { "label": "?????????", "value": "130628" }, { "label": "?????????", "value": "130629" }, { "label": "?????????", "value": "130630" }, { "label": "?????????", "value": "130631" }, { "label": "?????????", "value": "130632" }, { "label": "??????", "value": "130633" }, { "label": "?????????", "value": "130634" }, { "label": "??????", "value": "130635" }, { "label": "?????????", "value": "130636" }, { "label": "?????????", "value": "130637" }, { "label": "??????", "value": "130638" }, { "label": "?????????????????????????????????", "value": "130671" }, { "label": "??????????????????", "value": "130672" }, { "label": "?????????", "value": "130681" }, { "label": "?????????", "value": "130682" }, { "label": "?????????", "value": "130683" }, { "label": "????????????", "value": "130684" }], [{ "label": "?????????", "value": "130702" }, { "label": "?????????", "value": "130703" }, { "label": "?????????", "value": "130705" }, { "label": "????????????", "value": "130706" }, { "label": "?????????", "value": "130708" }, { "label": "?????????", "value": "130709" }, { "label": "?????????", "value": "130722" }, { "label": "?????????", "value": "130723" }, { "label": "?????????", "value": "130724" }, { "label": "?????????", "value": "130725" }, { "label": "??????", "value": "130726" }, { "label": "?????????", "value": "130727" }, { "label": "?????????", "value": "130728" }, { "label": "?????????", "value": "130730" }, { "label": "?????????", "value": "130731" }, { "label": "?????????", "value": "130732" }, { "label": "???????????????????????????????????????", "value": "130771" }, { "label": "???????????????????????????", "value": "130772" }, { "label": "???????????????????????????", "value": "130773" }], [{ "label": "?????????", "value": "130802" }, { "label": "?????????", "value": "130803" }, { "label": "??????????????????", "value": "130804" }, { "label": "?????????", "value": "130821" }, { "label": "?????????", "value": "130822" }, { "label": "?????????", "value": "130824" }, { "label": "?????????", "value": "130825" }, { "label": "?????????????????????", "value": "130826" }, { "label": "?????????????????????", "value": "130827" }, { "label": "??????????????????????????????", "value": "130828" }, { "label": "?????????????????????????????????", "value": "130871" }, { "label": "?????????", "value": "130881" }], [{ "label": "?????????", "value": "130902" }, { "label": "?????????", "value": "130903" }, { "label": "??????", "value": "130921" }, { "label": "??????", "value": "130922" }, { "label": "?????????", "value": "130923" }, { "label": "?????????", "value": "130924" }, { "label": "?????????", "value": "130925" }, { "label": "?????????", "value": "130926" }, { "label": "?????????", "value": "130927" }, { "label": "?????????", "value": "130928" }, { "label": "??????", "value": "130929" }, { "label": "?????????????????????", "value": "130930" }, { "label": "???????????????????????????", "value": "130971" }, { "label": "?????????????????????????????????", "value": "130972" }, { "label": "??????????????????", "value": "130973" }, { "label": "?????????", "value": "130981" }, { "label": "?????????", "value": "130982" }, { "label": "?????????", "value": "130983" }, { "label": "?????????", "value": "130984" }], [{ "label": "?????????", "value": "131002" }, { "label": "?????????", "value": "131003" }, { "label": "?????????", "value": "131022" }, { "label": "?????????", "value": "131023" }, { "label": "?????????", "value": "131024" }, { "label": "?????????", "value": "131025" }, { "label": "?????????", "value": "131026" }, { "label": "?????????????????????", "value": "131028" }, { "label": "???????????????????????????", "value": "131071" }, { "label": "?????????", "value": "131081" }, { "label": "?????????", "value": "131082" }], [{ "label": "?????????", "value": "131102" }, { "label": "?????????", "value": "131103" }, { "label": "?????????", "value": "131121" }, { "label": "?????????", "value": "131122" }, { "label": "?????????", "value": "131123" }, { "label": "?????????", "value": "131124" }, { "label": "?????????", "value": "131125" }, { "label": "?????????", "value": "131126" }, { "label": "??????", "value": "131127" }, { "label": "?????????", "value": "131128" }, { "label": "???????????????????????????", "value": "131171" }, { "label": "??????????????????", "value": "131172" }, { "label": "?????????", "value": "131182" }]], [[{ "label": "?????????", "value": "140105" }, { "label": "?????????", "value": "140106" }, { "label": "????????????", "value": "140107" }, { "label": "????????????", "value": "140108" }, { "label": "????????????", "value": "140109" }, { "label": "?????????", "value": "140110" }, { "label": "?????????", "value": "140121" }, { "label": "?????????", "value": "140122" }, { "label": "?????????", "value": "140123" }, { "label": "?????????????????????????????????", "value": "140171" }, { "label": "?????????", "value": "140181" }], [{ "label": "??????", "value": "140202" }, { "label": "??????", "value": "140203" }, { "label": "?????????", "value": "140211" }, { "label": "?????????", "value": "140212" }, { "label": "?????????", "value": "140221" }, { "label": "?????????", "value": "140222" }, { "label": "?????????", "value": "140223" }, { "label": "?????????", "value": "140224" }, { "label": "?????????", "value": "140225" }, { "label": "?????????", "value": "140226" }, { "label": "?????????", "value": "140227" }, { "label": "???????????????????????????", "value": "140271" }], [{ "label": "??????", "value": "140302" }, { "label": "??????", "value": "140303" }, { "label": "??????", "value": "140311" }, { "label": "?????????", "value": "140321" }, { "label": "??????", "value": "140322" }, { "label": "???????????????????????????", "value": "140371" }], [{ "label": "??????", "value": "140402" }, { "label": "??????", "value": "140411" }, { "label": "?????????", "value": "140421" }, { "label": "?????????", "value": "140423" }, { "label": "?????????", "value": "140424" }, { "label": "?????????", "value": "140425" }, { "label": "?????????", "value": "140426" }, { "label": "?????????", "value": "140427" }, { "label": "?????????", "value": "140428" }, { "label": "?????????", "value": "140429" }, { "label": "??????", "value": "140430" }, { "label": "?????????", "value": "140431" }, { "label": "????????????????????????????????????", "value": "140471" }, { "label": "?????????", "value": "140481" }], [{ "label": "??????", "value": "140502" }, { "label": "?????????", "value": "140521" }, { "label": "?????????", "value": "140522" }, { "label": "?????????", "value": "140524" }, { "label": "?????????", "value": "140525" }, { "label": "?????????", "value": "140581" }], [{ "label": "?????????", "value": "140602" }, { "label": "?????????", "value": "140603" }, { "label": "?????????", "value": "140621" }, { "label": "??????", "value": "140622" }, { "label": "?????????", "value": "140623" }, { "label": "?????????", "value": "140624" }, { "label": "???????????????????????????", "value": "140671" }], [{ "label": "?????????", "value": "140702" }, { "label": "?????????", "value": "140721" }, { "label": "?????????", "value": "140722" }, { "label": "?????????", "value": "140723" }, { "label": "?????????", "value": "140724" }, { "label": "?????????", "value": "140725" }, { "label": "?????????", "value": "140726" }, { "label": "??????", "value": "140727" }, { "label": "?????????", "value": "140728" }, { "label": "?????????", "value": "140729" }, { "label": "?????????", "value": "140781" }], [{ "label": "?????????", "value": "140802" }, { "label": "?????????", "value": "140821" }, { "label": "?????????", "value": "140822" }, { "label": "?????????", "value": "140823" }, { "label": "?????????", "value": "140824" }, { "label": "?????????", "value": "140825" }, { "label": "??????", "value": "140826" }, { "label": "?????????", "value": "140827" }, { "label": "??????", "value": "140828" }, { "label": "?????????", "value": "140829" }, { "label": "?????????", "value": "140830" }, { "label": "?????????", "value": "140881" }, { "label": "?????????", "value": "140882" }], [{ "label": "?????????", "value": "140902" }, { "label": "?????????", "value": "140921" }, { "label": "?????????", "value": "140922" }, { "label": "??????", "value": "140923" }, { "label": "?????????", "value": "140924" }, { "label": "?????????", "value": "140925" }, { "label": "?????????", "value": "140926" }, { "label": "?????????", "value": "140927" }, { "label": "?????????", "value": "140928" }, { "label": "?????????", "value": "140929" }, { "label": "?????????", "value": "140930" }, { "label": "?????????", "value": "140931" }, { "label": "?????????", "value": "140932" }, { "label": "????????????????????????", "value": "140971" }, { "label": "?????????", "value": "140981" }], [{ "label": "?????????", "value": "141002" }, { "label": "?????????", "value": "141021" }, { "label": "?????????", "value": "141022" }, { "label": "?????????", "value": "141023" }, { "label": "?????????", "value": "141024" }, { "label": "??????", "value": "141025" }, { "label": "?????????", "value": "141026" }, { "label": "?????????", "value": "141027" }, { "label": "??????", "value": "141028" }, { "label": "?????????", "value": "141029" }, { "label": "?????????", "value": "141030" }, { "label": "??????", "value": "141031" }, { "label": "?????????", "value": "141032" }, { "label": "??????", "value": "141033" }, { "label": "?????????", "value": "141034" }, { "label": "?????????", "value": "141081" }, { "label": "?????????", "value": "141082" }], [{ "label": "?????????", "value": "141102" }, { "label": "?????????", "value": "141121" }, { "label": "?????????", "value": "141122" }, { "label": "??????", "value": "141123" }, { "label": "??????", "value": "141124" }, { "label": "?????????", "value": "141125" }, { "label": "?????????", "value": "141126" }, { "label": "??????", "value": "141127" }, { "label": "?????????", "value": "141128" }, { "label": "?????????", "value": "141129" }, { "label": "?????????", "value": "141130" }, { "label": "?????????", "value": "141181" }, { "label": "?????????", "value": "141182" }]], [[{ "label": "?????????", "value": "150102" }, { "label": "?????????", "value": "150103" }, { "label": "?????????", "value": "150104" }, { "label": "?????????", "value": "150105" }, { "label": "???????????????", "value": "150121" }, { "label": "????????????", "value": "150122" }, { "label": "???????????????", "value": "150123" }, { "label": "????????????", "value": "150124" }, { "label": "?????????", "value": "150125" }, { "label": "??????????????????????????????", "value": "150171" }, { "label": "?????????????????????????????????", "value": "150172" }], [{ "label": "?????????", "value": "150202" }, { "label": "????????????", "value": "150203" }, { "label": "?????????", "value": "150204" }, { "label": "?????????", "value": "150205" }, { "label": "??????????????????", "value": "150206" }, { "label": "?????????", "value": "150207" }, { "label": "???????????????", "value": "150221" }, { "label": "?????????", "value": "150222" }, { "label": "???????????????????????????", "value": "150223" }, { "label": "???????????????????????????????????????", "value": "150271" }], [{ "label": "????????????", "value": "150302" }, { "label": "?????????", "value": "150303" }, { "label": "?????????", "value": "150304" }], [{ "label": "?????????", "value": "150402" }, { "label": "????????????", "value": "150403" }, { "label": "?????????", "value": "150404" }, { "label": "??????????????????", "value": "150421" }, { "label": "????????????", "value": "150422" }, { "label": "????????????", "value": "150423" }, { "label": "?????????", "value": "150424" }, { "label": "???????????????", "value": "150425" }, { "label": "????????????", "value": "150426" }, { "label": "????????????", "value": "150428" }, { "label": "?????????", "value": "150429" }, { "label": "?????????", "value": "150430" }], [{ "label": "????????????", "value": "150502" }, { "label": "?????????????????????", "value": "150521" }, { "label": "?????????????????????", "value": "150522" }, { "label": "?????????", "value": "150523" }, { "label": "?????????", "value": "150524" }, { "label": "?????????", "value": "150525" }, { "label": "????????????", "value": "150526" }, { "label": "???????????????????????????", "value": "150571" }, { "label": "???????????????", "value": "150581" }], [{ "label": "?????????", "value": "150602" }, { "label": "????????????", "value": "150603" }, { "label": "????????????", "value": "150621" }, { "label": "????????????", "value": "150622" }, { "label": "???????????????", "value": "150623" }, { "label": "????????????", "value": "150624" }, { "label": "?????????", "value": "150625" }, { "label": "?????????", "value": "150626" }, { "label": "???????????????", "value": "150627" }], [{ "label": "????????????", "value": "150702" }, { "label": "???????????????", "value": "150703" }, { "label": "?????????", "value": "150721" }, { "label": "?????????????????????????????????", "value": "150722" }, { "label": "??????????????????", "value": "150723" }, { "label": "?????????????????????", "value": "150724" }, { "label": "???????????????", "value": "150725" }, { "label": "??????????????????", "value": "150726" }, { "label": "??????????????????", "value": "150727" }, { "label": "????????????", "value": "150781" }, { "label": "????????????", "value": "150782" }, { "label": "????????????", "value": "150783" }, { "label": "???????????????", "value": "150784" }, { "label": "?????????", "value": "150785" }], [{ "label": "?????????", "value": "150802" }, { "label": "?????????", "value": "150821" }, { "label": "?????????", "value": "150822" }, { "label": "???????????????", "value": "150823" }, { "label": "???????????????", "value": "150824" }, { "label": "???????????????", "value": "150825" }, { "label": "????????????", "value": "150826" }], [{ "label": "?????????", "value": "150902" }, { "label": "?????????", "value": "150921" }, { "label": "?????????", "value": "150922" }, { "label": "?????????", "value": "150923" }, { "label": "?????????", "value": "150924" }, { "label": "?????????", "value": "150925" }, { "label": "?????????????????????", "value": "150926" }, { "label": "?????????????????????", "value": "150927" }, { "label": "?????????????????????", "value": "150928" }, { "label": "????????????", "value": "150929" }, { "label": "?????????", "value": "150981" }], [{ "label": "???????????????", "value": "152201" }, { "label": "????????????", "value": "152202" }, { "label": "?????????????????????", "value": "152221" }, { "label": "?????????????????????", "value": "152222" }, { "label": "????????????", "value": "152223" }, { "label": "?????????", "value": "152224" }], [{ "label": "???????????????", "value": "152501" }, { "label": "???????????????", "value": "152502" }, { "label": "????????????", "value": "152522" }, { "label": "???????????????", "value": "152523" }, { "label": "???????????????", "value": "152524" }, { "label": "??????????????????", "value": "152525" }, { "label": "??????????????????", "value": "152526" }, { "label": "????????????", "value": "152527" }, { "label": "?????????", "value": "152528" }, { "label": "????????????", "value": "152529" }, { "label": "?????????", "value": "152530" }, { "label": "?????????", "value": "152531" }, { "label": "??????????????????", "value": "152571" }], [{ "label": "???????????????", "value": "152921" }, { "label": "???????????????", "value": "152922" }, { "label": "????????????", "value": "152923" }, { "label": "?????????????????????????????????", "value": "152971" }]], [[{ "label": "?????????", "value": "210102" }, { "label": "?????????", "value": "210103" }, { "label": "?????????", "value": "210104" }, { "label": "?????????", "value": "210105" }, { "label": "?????????", "value": "210106" }, { "label": "????????????", "value": "210111" }, { "label": "?????????", "value": "210112" }, { "label": "????????????", "value": "210113" }, { "label": "?????????", "value": "210114" }, { "label": "?????????", "value": "210115" }, { "label": "?????????", "value": "210123" }, { "label": "?????????", "value": "210124" }, { "label": "?????????", "value": "210181" }], [{ "label": "?????????", "value": "210202" }, { "label": "?????????", "value": "210203" }, { "label": "????????????", "value": "210204" }, { "label": "????????????", "value": "210211" }, { "label": "????????????", "value": "210212" }, { "label": "?????????", "value": "210213" }, { "label": "????????????", "value": "210214" }, { "label": "?????????", "value": "210224" }, { "label": "????????????", "value": "210281" }, { "label": "?????????", "value": "210283" }], [{ "label": "?????????", "value": "210302" }, { "label": "?????????", "value": "210303" }, { "label": "?????????", "value": "210304" }, { "label": "?????????", "value": "210311" }, { "label": "?????????", "value": "210321" }, { "label": "?????????????????????", "value": "210323" }, { "label": "?????????", "value": "210381" }], [{ "label": "?????????", "value": "210402" }, { "label": "?????????", "value": "210403" }, { "label": "?????????", "value": "210404" }, { "label": "?????????", "value": "210411" }, { "label": "?????????", "value": "210421" }, { "label": "?????????????????????", "value": "210422" }, { "label": "?????????????????????", "value": "210423" }], [{ "label": "?????????", "value": "210502" }, { "label": "?????????", "value": "210503" }, { "label": "?????????", "value": "210504" }, { "label": "?????????", "value": "210505" }, { "label": "?????????????????????", "value": "210521" }, { "label": "?????????????????????", "value": "210522" }], [{ "label": "?????????", "value": "210602" }, { "label": "?????????", "value": "210603" }, { "label": "?????????", "value": "210604" }, { "label": "?????????????????????", "value": "210624" }, { "label": "?????????", "value": "210681" }, { "label": "?????????", "value": "210682" }], [{ "label": "?????????", "value": "210702" }, { "label": "?????????", "value": "210703" }, { "label": "?????????", "value": "210711" }, { "label": "?????????", "value": "210726" }, { "label": "??????", "value": "210727" }, { "label": "?????????", "value": "210781" }, { "label": "?????????", "value": "210782" }], [{ "label": "?????????", "value": "210802" }, { "label": "?????????", "value": "210803" }, { "label": "????????????", "value": "210804" }, { "label": "?????????", "value": "210811" }, { "label": "?????????", "value": "210881" }, { "label": "????????????", "value": "210882" }], [{ "label": "?????????", "value": "210902" }, { "label": "?????????", "value": "210903" }, { "label": "?????????", "value": "210904" }, { "label": "????????????", "value": "210905" }, { "label": "?????????", "value": "210911" }, { "label": "????????????????????????", "value": "210921" }, { "label": "?????????", "value": "210922" }], [{ "label": "?????????", "value": "211002" }, { "label": "?????????", "value": "211003" }, { "label": "?????????", "value": "211004" }, { "label": "????????????", "value": "211005" }, { "label": "????????????", "value": "211011" }, { "label": "?????????", "value": "211021" }, { "label": "?????????", "value": "211081" }], [{ "label": "????????????", "value": "211102" }, { "label": "????????????", "value": "211103" }, { "label": "?????????", "value": "211104" }, { "label": "?????????", "value": "211122" }], [{ "label": "?????????", "value": "211202" }, { "label": "?????????", "value": "211204" }, { "label": "?????????", "value": "211221" }, { "label": "?????????", "value": "211223" }, { "label": "?????????", "value": "211224" }, { "label": "????????????", "value": "211281" }, { "label": "?????????", "value": "211282" }], [{ "label": "?????????", "value": "211302" }, { "label": "?????????", "value": "211303" }, { "label": "?????????", "value": "211321" }, { "label": "?????????", "value": "211322" }, { "label": "?????????????????????????????????", "value": "211324" }, { "label": "?????????", "value": "211381" }, { "label": "?????????", "value": "211382" }], [{ "label": "?????????", "value": "211402" }, { "label": "?????????", "value": "211403" }, { "label": "?????????", "value": "211404" }, { "label": "?????????", "value": "211421" }, { "label": "?????????", "value": "211422" }, { "label": "?????????", "value": "211481" }]], [[{ "label": "?????????", "value": "220102" }, { "label": "?????????", "value": "220103" }, { "label": "?????????", "value": "220104" }, { "label": "?????????", "value": "220105" }, { "label": "?????????", "value": "220106" }, { "label": "?????????", "value": "220112" }, { "label": "?????????", "value": "220113" }, { "label": "?????????", "value": "220122" }, { "label": "???????????????????????????", "value": "220171" }, { "label": "???????????????????????????????????????", "value": "220172" }, { "label": "?????????????????????????????????", "value": "220173" }, { "label": "?????????????????????????????????", "value": "220174" }, { "label": "?????????", "value": "220182" }, { "label": "?????????", "value": "220183" }], [{ "label": "?????????", "value": "220202" }, { "label": "?????????", "value": "220203" }, { "label": "?????????", "value": "220204" }, { "label": "?????????", "value": "220211" }, { "label": "?????????", "value": "220221" }, { "label": "?????????????????????", "value": "220271" }, { "label": "?????????????????????????????????", "value": "220272" }, { "label": "??????????????????????????????", "value": "220273" }, { "label": "?????????", "value": "220281" }, { "label": "?????????", "value": "220282" }, { "label": "?????????", "value": "220283" }, { "label": "?????????", "value": "220284" }], [{ "label": "?????????", "value": "220302" }, { "label": "?????????", "value": "220303" }, { "label": "?????????", "value": "220322" }, { "label": "?????????????????????", "value": "220323" }, { "label": "????????????", "value": "220381" }, { "label": "?????????", "value": "220382" }], [{ "label": "?????????", "value": "220402" }, { "label": "?????????", "value": "220403" }, { "label": "?????????", "value": "220421" }, { "label": "?????????", "value": "220422" }], [{ "label": "?????????", "value": "220502" }, { "label": "????????????", "value": "220503" }, { "label": "?????????", "value": "220521" }, { "label": "?????????", "value": "220523" }, { "label": "?????????", "value": "220524" }, { "label": "????????????", "value": "220581" }, { "label": "?????????", "value": "220582" }], [{ "label": "?????????", "value": "220602" }, { "label": "?????????", "value": "220605" }, { "label": "?????????", "value": "220621" }, { "label": "?????????", "value": "220622" }, { "label": "????????????????????????", "value": "220623" }, { "label": "?????????", "value": "220681" }], [{ "label": "?????????", "value": "220702" }, { "label": "?????????????????????????????????", "value": "220721" }, { "label": "?????????", "value": "220722" }, { "label": "?????????", "value": "220723" }, { "label": "???????????????????????????", "value": "220771" }, { "label": "?????????", "value": "220781" }], [{ "label": "?????????", "value": "220802" }, { "label": "?????????", "value": "220821" }, { "label": "?????????", "value": "220822" }, { "label": "???????????????????????????", "value": "220871" }, { "label": "?????????", "value": "220881" }, { "label": "?????????", "value": "220882" }], [{ "label": "?????????", "value": "222401" }, { "label": "?????????", "value": "222402" }, { "label": "?????????", "value": "222403" }, { "label": "?????????", "value": "222404" }, { "label": "?????????", "value": "222405" }, { "label": "?????????", "value": "222406" }, { "label": "?????????", "value": "222424" }, { "label": "?????????", "value": "222426" }]], [[{ "label": "?????????", "value": "230102" }, { "label": "?????????", "value": "230103" }, { "label": "?????????", "value": "230104" }, { "label": "?????????", "value": "230108" }, { "label": "?????????", "value": "230109" }, { "label": "?????????", "value": "230110" }, { "label": "?????????", "value": "230111" }, { "label": "?????????", "value": "230112" }, { "label": "?????????", "value": "230113" }, { "label": "?????????", "value": "230123" }, { "label": "?????????", "value": "230124" }, { "label": "??????", "value": "230125" }, { "label": "?????????", "value": "230126" }, { "label": "?????????", "value": "230127" }, { "label": "?????????", "value": "230128" }, { "label": "?????????", "value": "230129" }, { "label": "?????????", "value": "230183" }, { "label": "?????????", "value": "230184" }], [{ "label": "?????????", "value": "230202" }, { "label": "?????????", "value": "230203" }, { "label": "?????????", "value": "230204" }, { "label": "????????????", "value": "230205" }, { "label": "???????????????", "value": "230206" }, { "label": "????????????", "value": "230207" }, { "label": "????????????????????????", "value": "230208" }, { "label": "?????????", "value": "230221" }, { "label": "?????????", "value": "230223" }, { "label": "?????????", "value": "230224" }, { "label": "?????????", "value": "230225" }, { "label": "?????????", "value": "230227" }, { "label": "?????????", "value": "230229" }, { "label": "?????????", "value": "230230" }, { "label": "?????????", "value": "230231" }, { "label": "?????????", "value": "230281" }], [{ "label": "?????????", "value": "230302" }, { "label": "?????????", "value": "230303" }, { "label": "?????????", "value": "230304" }, { "label": "?????????", "value": "230305" }, { "label": "????????????", "value": "230306" }, { "label": "?????????", "value": "230307" }, { "label": "?????????", "value": "230321" }, { "label": "?????????", "value": "230381" }, { "label": "?????????", "value": "230382" }], [{ "label": "?????????", "value": "230402" }, { "label": "?????????", "value": "230403" }, { "label": "?????????", "value": "230404" }, { "label": "?????????", "value": "230405" }, { "label": "?????????", "value": "230406" }, { "label": "?????????", "value": "230407" }, { "label": "?????????", "value": "230421" }, { "label": "?????????", "value": "230422" }], [{ "label": "?????????", "value": "230502" }, { "label": "?????????", "value": "230503" }, { "label": "????????????", "value": "230505" }, { "label": "?????????", "value": "230506" }, { "label": "?????????", "value": "230521" }, { "label": "?????????", "value": "230522" }, { "label": "?????????", "value": "230523" }, { "label": "?????????", "value": "230524" }], [{ "label": "????????????", "value": "230602" }, { "label": "?????????", "value": "230603" }, { "label": "????????????", "value": "230604" }, { "label": "?????????", "value": "230605" }, { "label": "?????????", "value": "230606" }, { "label": "?????????", "value": "230621" }, { "label": "?????????", "value": "230622" }, { "label": "?????????", "value": "230623" }, { "label": "??????????????????????????????", "value": "230624" }, { "label": "?????????????????????????????????", "value": "230671" }], [{ "label": "?????????", "value": "230702" }, { "label": "?????????", "value": "230703" }, { "label": "?????????", "value": "230704" }, { "label": "?????????", "value": "230705" }, { "label": "?????????", "value": "230706" }, { "label": "?????????", "value": "230707" }, { "label": "?????????", "value": "230708" }, { "label": "????????????", "value": "230709" }, { "label": "?????????", "value": "230710" }, { "label": "????????????", "value": "230711" }, { "label": "????????????", "value": "230712" }, { "label": "?????????", "value": "230713" }, { "label": "????????????", "value": "230714" }, { "label": "?????????", "value": "230715" }, { "label": "????????????", "value": "230716" }, { "label": "?????????", "value": "230722" }, { "label": "?????????", "value": "230781" }], [{ "label": "?????????", "value": "230803" }, { "label": "?????????", "value": "230804" }, { "label": "?????????", "value": "230805" }, { "label": "??????", "value": "230811" }, { "label": "?????????", "value": "230822" }, { "label": "?????????", "value": "230826" }, { "label": "?????????", "value": "230828" }, { "label": "?????????", "value": "230881" }, { "label": "?????????", "value": "230882" }, { "label": "?????????", "value": "230883" }], [{ "label": "?????????", "value": "230902" }, { "label": "?????????", "value": "230903" }, { "label": "????????????", "value": "230904" }, { "label": "?????????", "value": "230921" }], [{ "label": "?????????", "value": "231002" }, { "label": "?????????", "value": "231003" }, { "label": "?????????", "value": "231004" }, { "label": "?????????", "value": "231005" }, { "label": "?????????", "value": "231025" }, { "label": "??????????????????????????????", "value": "231071" }, { "label": "????????????", "value": "231081" }, { "label": "?????????", "value": "231083" }, { "label": "?????????", "value": "231084" }, { "label": "?????????", "value": "231085" }, { "label": "?????????", "value": "231086" }], [{ "label": "?????????", "value": "231102" }, { "label": "?????????", "value": "231121" }, { "label": "?????????", "value": "231123" }, { "label": "?????????", "value": "231124" }, { "label": "?????????", "value": "231181" }, { "label": "???????????????", "value": "231182" }], [{ "label": "?????????", "value": "231202" }, { "label": "?????????", "value": "231221" }, { "label": "?????????", "value": "231222" }, { "label": "?????????", "value": "231223" }, { "label": "?????????", "value": "231224" }, { "label": "?????????", "value": "231225" }, { "label": "?????????", "value": "231226" }, { "label": "?????????", "value": "231281" }, { "label": "?????????", "value": "231282" }, { "label": "?????????", "value": "231283" }], [{ "label": "???????????????", "value": "232701" }, { "label": "?????????", "value": "232702" }, { "label": "?????????", "value": "232703" }, { "label": "?????????", "value": "232704" }, { "label": "?????????", "value": "232721" }, { "label": "?????????", "value": "232722" }, { "label": "?????????", "value": "232723" }]], [[{ "label": "?????????", "value": "310101" }, { "label": "?????????", "value": "310104" }, { "label": "?????????", "value": "310105" }, { "label": "?????????", "value": "310106" }, { "label": "?????????", "value": "310107" }, { "label": "?????????", "value": "310109" }, { "label": "?????????", "value": "310110" }, { "label": "?????????", "value": "310112" }, { "label": "?????????", "value": "310113" }, { "label": "?????????", "value": "310114" }, { "label": "????????????", "value": "310115" }, { "label": "?????????", "value": "310116" }, { "label": "?????????", "value": "310117" }, { "label": "?????????", "value": "310118" }, { "label": "?????????", "value": "310120" }, { "label": "?????????", "value": "310151" }]], [[{ "label": "?????????", "value": "320102" }, { "label": "?????????", "value": "320104" }, { "label": "?????????", "value": "320105" }, { "label": "?????????", "value": "320106" }, { "label": "?????????", "value": "320111" }, { "label": "?????????", "value": "320113" }, { "label": "????????????", "value": "320114" }, { "label": "?????????", "value": "320115" }, { "label": "?????????", "value": "320116" }, { "label": "?????????", "value": "320117" }, { "label": "?????????", "value": "320118" }], [{ "label": "?????????", "value": "320205" }, { "label": "?????????", "value": "320206" }, { "label": "?????????", "value": "320211" }, { "label": "?????????", "value": "320213" }, { "label": "?????????", "value": "320214" }, { "label": "?????????", "value": "320281" }, { "label": "?????????", "value": "320282" }], [{ "label": "?????????", "value": "320302" }, { "label": "?????????", "value": "320303" }, { "label": "?????????", "value": "320305" }, { "label": "?????????", "value": "320311" }, { "label": "?????????", "value": "320312" }, { "label": "??????", "value": "320321" }, { "label": "??????", "value": "320322" }, { "label": "?????????", "value": "320324" }, { "label": "???????????????????????????", "value": "320371" }, { "label": "?????????", "value": "320381" }, { "label": "?????????", "value": "320382" }], [{ "label": "?????????", "value": "320402" }, { "label": "?????????", "value": "320404" }, { "label": "?????????", "value": "320411" }, { "label": "?????????", "value": "320412" }, { "label": "?????????", "value": "320413" }, { "label": "?????????", "value": "320481" }], [{ "label": "?????????", "value": "320505" }, { "label": "?????????", "value": "320506" }, { "label": "?????????", "value": "320507" }, { "label": "?????????", "value": "320508" }, { "label": "?????????", "value": "320509" }, { "label": "??????????????????", "value": "320571" }, { "label": "?????????", "value": "320581" }, { "label": "????????????", "value": "320582" }, { "label": "?????????", "value": "320583" }, { "label": "?????????", "value": "320585" }], [{ "label": "?????????", "value": "320602" }, { "label": "?????????", "value": "320611" }, { "label": "?????????", "value": "320612" }, { "label": "?????????", "value": "320621" }, { "label": "?????????", "value": "320623" }, { "label": "???????????????????????????", "value": "320671" }, { "label": "?????????", "value": "320681" }, { "label": "?????????", "value": "320682" }, { "label": "?????????", "value": "320684" }], [{ "label": "?????????", "value": "320703" }, { "label": "?????????", "value": "320706" }, { "label": "?????????", "value": "320707" }, { "label": "?????????", "value": "320722" }, { "label": "?????????", "value": "320723" }, { "label": "?????????", "value": "320724" }, { "label": "??????????????????????????????", "value": "320771" }, { "label": "????????????????????????????????????", "value": "320772" }], [{ "label": "?????????", "value": "320803" }, { "label": "?????????", "value": "320804" }, { "label": "????????????", "value": "320812" }, { "label": "?????????", "value": "320813" }, { "label": "?????????", "value": "320826" }, { "label": "?????????", "value": "320830" }, { "label": "?????????", "value": "320831" }, { "label": "???????????????????????????", "value": "320871" }], [{ "label": "?????????", "value": "320902" }, { "label": "?????????", "value": "320903" }, { "label": "?????????", "value": "320904" }, { "label": "?????????", "value": "320921" }, { "label": "?????????", "value": "320922" }, { "label": "?????????", "value": "320923" }, { "label": "?????????", "value": "320924" }, { "label": "?????????", "value": "320925" }, { "label": "???????????????????????????", "value": "320971" }, { "label": "?????????", "value": "320981" }], [{ "label": "?????????", "value": "321002" }, { "label": "?????????", "value": "321003" }, { "label": "?????????", "value": "321012" }, { "label": "?????????", "value": "321023" }, { "label": "???????????????????????????", "value": "321071" }, { "label": "?????????", "value": "321081" }, { "label": "?????????", "value": "321084" }], [{ "label": "?????????", "value": "321102" }, { "label": "?????????", "value": "321111" }, { "label": "?????????", "value": "321112" }, { "label": "????????????", "value": "321171" }, { "label": "?????????", "value": "321181" }, { "label": "?????????", "value": "321182" }, { "label": "?????????", "value": "321183" }], [{ "label": "?????????", "value": "321202" }, { "label": "?????????", "value": "321203" }, { "label": "?????????", "value": "321204" }, { "label": "???????????????????????????????????????", "value": "321271" }, { "label": "?????????", "value": "321281" }, { "label": "?????????", "value": "321282" }, { "label": "?????????", "value": "321283" }], [{ "label": "?????????", "value": "321302" }, { "label": "?????????", "value": "321311" }, { "label": "?????????", "value": "321322" }, { "label": "?????????", "value": "321323" }, { "label": "?????????", "value": "321324" }, { "label": "???????????????????????????", "value": "321371" }]], [[{ "label": "?????????", "value": "330102" }, { "label": "?????????", "value": "330103" }, { "label": "?????????", "value": "330104" }, { "label": "?????????", "value": "330105" }, { "label": "?????????", "value": "330106" }, { "label": "?????????", "value": "330108" }, { "label": "?????????", "value": "330109" }, { "label": "?????????", "value": "330110" }, { "label": "?????????", "value": "330111" }, { "label": "?????????", "value": "330112" }, { "label": "?????????", "value": "330122" }, { "label": "?????????", "value": "330127" }, { "label": "?????????", "value": "330182" }], [{ "label": "?????????", "value": "330203" }, { "label": "?????????", "value": "330205" }, { "label": "?????????", "value": "330206" }, { "label": "?????????", "value": "330211" }, { "label": "?????????", "value": "330212" }, { "label": "?????????", "value": "330213" }, { "label": "?????????", "value": "330225" }, { "label": "?????????", "value": "330226" }, { "label": "?????????", "value": "330281" }, { "label": "?????????", "value": "330282" }], [{ "label": "?????????", "value": "330302" }, { "label": "?????????", "value": "330303" }, { "label": "?????????", "value": "330304" }, { "label": "?????????", "value": "330305" }, { "label": "?????????", "value": "330324" }, { "label": "?????????", "value": "330326" }, { "label": "?????????", "value": "330327" }, { "label": "?????????", "value": "330328" }, { "label": "?????????", "value": "330329" }, { "label": "???????????????????????????", "value": "330371" }, { "label": "?????????", "value": "330381" }, { "label": "?????????", "value": "330382" }], [{ "label": "?????????", "value": "330402" }, { "label": "?????????", "value": "330411" }, { "label": "?????????", "value": "330421" }, { "label": "?????????", "value": "330424" }, { "label": "?????????", "value": "330481" }, { "label": "?????????", "value": "330482" }, { "label": "?????????", "value": "330483" }], [{ "label": "?????????", "value": "330502" }, { "label": "?????????", "value": "330503" }, { "label": "?????????", "value": "330521" }, { "label": "?????????", "value": "330522" }, { "label": "?????????", "value": "330523" }], [{ "label": "?????????", "value": "330602" }, { "label": "?????????", "value": "330603" }, { "label": "?????????", "value": "330604" }, { "label": "?????????", "value": "330624" }, { "label": "?????????", "value": "330681" }, { "label": "?????????", "value": "330683" }], [{ "label": "?????????", "value": "330702" }, { "label": "?????????", "value": "330703" }, { "label": "?????????", "value": "330723" }, { "label": "?????????", "value": "330726" }, { "label": "?????????", "value": "330727" }, { "label": "?????????", "value": "330781" }, { "label": "?????????", "value": "330782" }, { "label": "?????????", "value": "330783" }, { "label": "?????????", "value": "330784" }], [{ "label": "?????????", "value": "330802" }, { "label": "?????????", "value": "330803" }, { "label": "?????????", "value": "330822" }, { "label": "?????????", "value": "330824" }, { "label": "?????????", "value": "330825" }, { "label": "?????????", "value": "330881" }], [{ "label": "?????????", "value": "330902" }, { "label": "?????????", "value": "330903" }, { "label": "?????????", "value": "330921" }, { "label": "?????????", "value": "330922" }], [{ "label": "?????????", "value": "331002" }, { "label": "?????????", "value": "331003" }, { "label": "?????????", "value": "331004" }, { "label": "?????????", "value": "331022" }, { "label": "?????????", "value": "331023" }, { "label": "?????????", "value": "331024" }, { "label": "?????????", "value": "331081" }, { "label": "?????????", "value": "331082" }, { "label": "?????????", "value": "331083" }], [{ "label": "?????????", "value": "331102" }, { "label": "?????????", "value": "331121" }, { "label": "?????????", "value": "331122" }, { "label": "?????????", "value": "331123" }, { "label": "?????????", "value": "331124" }, { "label": "?????????", "value": "331125" }, { "label": "?????????", "value": "331126" }, { "label": "?????????????????????", "value": "331127" }, { "label": "?????????", "value": "331181" }]], [[{ "label": "?????????", "value": "340102" }, { "label": "?????????", "value": "340103" }, { "label": "?????????", "value": "340104" }, { "label": "?????????", "value": "340111" }, { "label": "?????????", "value": "340121" }, { "label": "?????????", "value": "340122" }, { "label": "?????????", "value": "340123" }, { "label": "?????????", "value": "340124" }, { "label": "?????????????????????????????????", "value": "340171" }, { "label": "???????????????????????????", "value": "340172" }, { "label": "???????????????????????????????????????", "value": "340173" }, { "label": "?????????", "value": "340181" }], [{ "label": "?????????", "value": "340202" }, { "label": "?????????", "value": "340203" }, { "label": "?????????", "value": "340207" }, { "label": "?????????", "value": "340208" }, { "label": "?????????", "value": "340221" }, { "label": "?????????", "value": "340222" }, { "label": "?????????", "value": "340223" }, { "label": "?????????", "value": "340225" }, { "label": "???????????????????????????", "value": "340271" }, { "label": "???????????????????????????????????????", "value": "340272" }], [{ "label": "????????????", "value": "340302" }, { "label": "?????????", "value": "340303" }, { "label": "?????????", "value": "340304" }, { "label": "?????????", "value": "340311" }, { "label": "?????????", "value": "340321" }, { "label": "?????????", "value": "340322" }, { "label": "?????????", "value": "340323" }, { "label": "??????????????????????????????", "value": "340371" }, { "label": "????????????????????????", "value": "340372" }], [{ "label": "?????????", "value": "340402" }, { "label": "????????????", "value": "340403" }, { "label": "????????????", "value": "340404" }, { "label": "????????????", "value": "340405" }, { "label": "?????????", "value": "340406" }, { "label": "?????????", "value": "340421" }, { "label": "??????", "value": "340422" }], [{ "label": "?????????", "value": "340503" }, { "label": "?????????", "value": "340504" }, { "label": "?????????", "value": "340506" }, { "label": "?????????", "value": "340521" }, { "label": "?????????", "value": "340522" }, { "label": "??????", "value": "340523" }], [{ "label": "?????????", "value": "340602" }, { "label": "?????????", "value": "340603" }, { "label": "?????????", "value": "340604" }, { "label": "?????????", "value": "340621" }], [{ "label": "?????????", "value": "340705" }, { "label": "?????????", "value": "340706" }, { "label": "??????", "value": "340711" }, { "label": "?????????", "value": "340722" }], [{ "label": "?????????", "value": "340802" }, { "label": "?????????", "value": "340803" }, { "label": "?????????", "value": "340811" }, { "label": "?????????", "value": "340822" }, { "label": "?????????", "value": "340824" }, { "label": "?????????", "value": "340825" }, { "label": "?????????", "value": "340826" }, { "label": "?????????", "value": "340827" }, { "label": "?????????", "value": "340828" }, { "label": "???????????????????????????", "value": "340871" }, { "label": "?????????", "value": "340881" }], [{ "label": "?????????", "value": "341002" }, { "label": "?????????", "value": "341003" }, { "label": "?????????", "value": "341004" }, { "label": "??????", "value": "341021" }, { "label": "?????????", "value": "341022" }, { "label": "??????", "value": "341023" }, { "label": "?????????", "value": "341024" }], [{ "label": "?????????", "value": "341102" }, { "label": "?????????", "value": "341103" }, { "label": "?????????", "value": "341122" }, { "label": "?????????", "value": "341124" }, { "label": "?????????", "value": "341125" }, { "label": "?????????", "value": "341126" }, { "label": "?????????????????????", "value": "341171" }, { "label": "???????????????????????????", "value": "341172" }, { "label": "?????????", "value": "341181" }, { "label": "?????????", "value": "341182" }], [{ "label": "?????????", "value": "341202" }, { "label": "?????????", "value": "341203" }, { "label": "?????????", "value": "341204" }, { "label": "?????????", "value": "341221" }, { "label": "?????????", "value": "341222" }, { "label": "?????????", "value": "341225" }, { "label": "?????????", "value": "341226" }, { "label": "??????????????????????????????", "value": "341271" }, { "label": "???????????????????????????", "value": "341272" }, { "label": "?????????", "value": "341282" }], [{ "label": "?????????", "value": "341302" }, { "label": "?????????", "value": "341321" }, { "label": "??????", "value": "341322" }, { "label": "?????????", "value": "341323" }, { "label": "??????", "value": "341324" }, { "label": "?????????????????????????????????", "value": "341371" }, { "label": "???????????????????????????", "value": "341372" }], [{ "label": "?????????", "value": "341502" }, { "label": "?????????", "value": "341503" }, { "label": "?????????", "value": "341504" }, { "label": "?????????", "value": "341522" }, { "label": "?????????", "value": "341523" }, { "label": "?????????", "value": "341524" }, { "label": "?????????", "value": "341525" }], [{ "label": "?????????", "value": "341602" }, { "label": "?????????", "value": "341621" }, { "label": "?????????", "value": "341622" }, { "label": "?????????", "value": "341623" }], [{ "label": "?????????", "value": "341702" }, { "label": "?????????", "value": "341721" }, { "label": "?????????", "value": "341722" }, { "label": "?????????", "value": "341723" }], [{ "label": "?????????", "value": "341802" }, { "label": "?????????", "value": "341821" }, { "label": "?????????", "value": "341822" }, { "label": "??????", "value": "341823" }, { "label": "?????????", "value": "341824" }, { "label": "?????????", "value": "341825" }, { "label": "????????????????????????", "value": "341871" }, { "label": "?????????", "value": "341881" }]], [[{ "label": "?????????", "value": "350102" }, { "label": "?????????", "value": "350103" }, { "label": "?????????", "value": "350104" }, { "label": "?????????", "value": "350105" }, { "label": "?????????", "value": "350111" }, { "label": "?????????", "value": "350121" }, { "label": "?????????", "value": "350122" }, { "label": "?????????", "value": "350123" }, { "label": "?????????", "value": "350124" }, { "label": "?????????", "value": "350125" }, { "label": "?????????", "value": "350128" }, { "label": "?????????", "value": "350181" }, { "label": "?????????", "value": "350182" }], [{ "label": "?????????", "value": "350203" }, { "label": "?????????", "value": "350205" }, { "label": "?????????", "value": "350206" }, { "label": "?????????", "value": "350211" }, { "label": "?????????", "value": "350212" }, { "label": "?????????", "value": "350213" }], [{ "label": "?????????", "value": "350302" }, { "label": "?????????", "value": "350303" }, { "label": "?????????", "value": "350304" }, { "label": "?????????", "value": "350305" }, { "label": "?????????", "value": "350322" }], [{ "label": "?????????", "value": "350402" }, { "label": "?????????", "value": "350403" }, { "label": "?????????", "value": "350421" }, { "label": "?????????", "value": "350423" }, { "label": "?????????", "value": "350424" }, { "label": "?????????", "value": "350425" }, { "label": "?????????", "value": "350426" }, { "label": "??????", "value": "350427" }, { "label": "?????????", "value": "350428" }, { "label": "?????????", "value": "350429" }, { "label": "?????????", "value": "350430" }, { "label": "?????????", "value": "350481" }], [{ "label": "?????????", "value": "350502" }, { "label": "?????????", "value": "350503" }, { "label": "?????????", "value": "350504" }, { "label": "?????????", "value": "350505" }, { "label": "?????????", "value": "350521" }, { "label": "?????????", "value": "350524" }, { "label": "?????????", "value": "350525" }, { "label": "?????????", "value": "350526" }, { "label": "?????????", "value": "350527" }, { "label": "?????????", "value": "350581" }, { "label": "?????????", "value": "350582" }, { "label": "?????????", "value": "350583" }], [{ "label": "?????????", "value": "350602" }, { "label": "?????????", "value": "350603" }, { "label": "?????????", "value": "350622" }, { "label": "?????????", "value": "350623" }, { "label": "?????????", "value": "350624" }, { "label": "?????????", "value": "350625" }, { "label": "?????????", "value": "350626" }, { "label": "?????????", "value": "350627" }, { "label": "?????????", "value": "350628" }, { "label": "?????????", "value": "350629" }, { "label": "?????????", "value": "350681" }], [{ "label": "?????????", "value": "350702" }, { "label": "?????????", "value": "350703" }, { "label": "?????????", "value": "350721" }, { "label": "?????????", "value": "350722" }, { "label": "?????????", "value": "350723" }, { "label": "?????????", "value": "350724" }, { "label": "?????????", "value": "350725" }, { "label": "?????????", "value": "350781" }, { "label": "????????????", "value": "350782" }, { "label": "?????????", "value": "350783" }], [{ "label": "?????????", "value": "350802" }, { "label": "?????????", "value": "350803" }, { "label": "?????????", "value": "350821" }, { "label": "?????????", "value": "350823" }, { "label": "?????????", "value": "350824" }, { "label": "?????????", "value": "350825" }, { "label": "?????????", "value": "350881" }], [{ "label": "?????????", "value": "350902" }, { "label": "?????????", "value": "350921" }, { "label": "?????????", "value": "350922" }, { "label": "?????????", "value": "350923" }, { "label": "?????????", "value": "350924" }, { "label": "?????????", "value": "350925" }, { "label": "?????????", "value": "350926" }, { "label": "?????????", "value": "350981" }, { "label": "?????????", "value": "350982" }]], [[{ "label": "?????????", "value": "360102" }, { "label": "?????????", "value": "360103" }, { "label": "????????????", "value": "360104" }, { "label": "?????????", "value": "360105" }, { "label": "????????????", "value": "360111" }, { "label": "?????????", "value": "360112" }, { "label": "?????????", "value": "360121" }, { "label": "?????????", "value": "360123" }, { "label": "?????????", "value": "360124" }], [{ "label": "?????????", "value": "360202" }, { "label": "?????????", "value": "360203" }, { "label": "?????????", "value": "360222" }, { "label": "?????????", "value": "360281" }], [{ "label": "?????????", "value": "360302" }, { "label": "?????????", "value": "360313" }, { "label": "?????????", "value": "360321" }, { "label": "?????????", "value": "360322" }, { "label": "?????????", "value": "360323" }], [{ "label": "?????????", "value": "360402" }, { "label": "?????????", "value": "360403" }, { "label": "?????????", "value": "360404" }, { "label": "?????????", "value": "360423" }, { "label": "?????????", "value": "360424" }, { "label": "?????????", "value": "360425" }, { "label": "?????????", "value": "360426" }, { "label": "?????????", "value": "360428" }, { "label": "?????????", "value": "360429" }, { "label": "?????????", "value": "360430" }, { "label": "?????????", "value": "360481" }, { "label": "????????????", "value": "360482" }, { "label": "?????????", "value": "360483" }], [{ "label": "?????????", "value": "360502" }, { "label": "?????????", "value": "360521" }], [{ "label": "?????????", "value": "360602" }, { "label": "?????????", "value": "360622" }, { "label": "?????????", "value": "360681" }], [{ "label": "?????????", "value": "360702" }, { "label": "?????????", "value": "360703" }, { "label": "?????????", "value": "360704" }, { "label": "?????????", "value": "360722" }, { "label": "?????????", "value": "360723" }, { "label": "?????????", "value": "360724" }, { "label": "?????????", "value": "360725" }, { "label": "?????????", "value": "360726" }, { "label": "?????????", "value": "360727" }, { "label": "?????????", "value": "360728" }, { "label": "?????????", "value": "360729" }, { "label": "?????????", "value": "360730" }, { "label": "?????????", "value": "360731" }, { "label": "?????????", "value": "360732" }, { "label": "?????????", "value": "360733" }, { "label": "?????????", "value": "360734" }, { "label": "?????????", "value": "360735" }, { "label": "?????????", "value": "360781" }], [{ "label": "?????????", "value": "360802" }, { "label": "?????????", "value": "360803" }, { "label": "?????????", "value": "360821" }, { "label": "?????????", "value": "360822" }, { "label": "?????????", "value": "360823" }, { "label": "?????????", "value": "360824" }, { "label": "?????????", "value": "360825" }, { "label": "?????????", "value": "360826" }, { "label": "?????????", "value": "360827" }, { "label": "?????????", "value": "360828" }, { "label": "?????????", "value": "360829" }, { "label": "?????????", "value": "360830" }, { "label": "????????????", "value": "360881" }], [{ "label": "?????????", "value": "360902" }, { "label": "?????????", "value": "360921" }, { "label": "?????????", "value": "360922" }, { "label": "?????????", "value": "360923" }, { "label": "?????????", "value": "360924" }, { "label": "?????????", "value": "360925" }, { "label": "?????????", "value": "360926" }, { "label": "?????????", "value": "360981" }, { "label": "?????????", "value": "360982" }, { "label": "?????????", "value": "360983" }], [{ "label": "?????????", "value": "361002" }, { "label": "?????????", "value": "361003" }, { "label": "?????????", "value": "361021" }, { "label": "?????????", "value": "361022" }, { "label": "?????????", "value": "361023" }, { "label": "?????????", "value": "361024" }, { "label": "?????????", "value": "361025" }, { "label": "?????????", "value": "361026" }, { "label": "?????????", "value": "361027" }, { "label": "?????????", "value": "361028" }, { "label": "?????????", "value": "361030" }], [{ "label": "?????????", "value": "361102" }, { "label": "?????????", "value": "361103" }, { "label": "?????????", "value": "361121" }, { "label": "?????????", "value": "361123" }, { "label": "?????????", "value": "361124" }, { "label": "?????????", "value": "361125" }, { "label": "?????????", "value": "361126" }, { "label": "?????????", "value": "361127" }, { "label": "?????????", "value": "361128" }, { "label": "?????????", "value": "361129" }, { "label": "?????????", "value": "361130" }, { "label": "?????????", "value": "361181" }]], [[{ "label": "?????????", "value": "370102" }, { "label": "?????????", "value": "370103" }, { "label": "?????????", "value": "370104" }, { "label": "?????????", "value": "370105" }, { "label": "?????????", "value": "370112" }, { "label": "?????????", "value": "370113" }, { "label": "?????????", "value": "370114" }, { "label": "?????????", "value": "370124" }, { "label": "?????????", "value": "370125" }, { "label": "?????????", "value": "370126" }, { "label": "?????????????????????????????????", "value": "370171" }], [{ "label": "?????????", "value": "370202" }, { "label": "?????????", "value": "370203" }, { "label": "?????????", "value": "370211" }, { "label": "?????????", "value": "370212" }, { "label": "?????????", "value": "370213" }, { "label": "?????????", "value": "370214" }, { "label": "?????????", "value": "370215" }, { "label": "?????????????????????????????????", "value": "370271" }, { "label": "?????????", "value": "370281" }, { "label": "?????????", "value": "370283" }, { "label": "?????????", "value": "370285" }], [{ "label": "?????????", "value": "370302" }, { "label": "?????????", "value": "370303" }, { "label": "?????????", "value": "370304" }, { "label": "?????????", "value": "370305" }, { "label": "?????????", "value": "370306" }, { "label": "?????????", "value": "370321" }, { "label": "?????????", "value": "370322" }, { "label": "?????????", "value": "370323" }], [{ "label": "?????????", "value": "370402" }, { "label": "?????????", "value": "370403" }, { "label": "?????????", "value": "370404" }, { "label": "????????????", "value": "370405" }, { "label": "?????????", "value": "370406" }, { "label": "?????????", "value": "370481" }], [{ "label": "?????????", "value": "370502" }, { "label": "?????????", "value": "370503" }, { "label": "?????????", "value": "370505" }, { "label": "?????????", "value": "370522" }, { "label": "?????????", "value": "370523" }, { "label": "???????????????????????????", "value": "370571" }, { "label": "????????????????????????", "value": "370572" }], [{ "label": "?????????", "value": "370602" }, { "label": "?????????", "value": "370611" }, { "label": "?????????", "value": "370612" }, { "label": "?????????", "value": "370613" }, { "label": "?????????", "value": "370634" }, { "label": "?????????????????????????????????", "value": "370671" }, { "label": "???????????????????????????", "value": "370672" }, { "label": "?????????", "value": "370681" }, { "label": "?????????", "value": "370682" }, { "label": "?????????", "value": "370683" }, { "label": "?????????", "value": "370684" }, { "label": "?????????", "value": "370685" }, { "label": "?????????", "value": "370686" }, { "label": "?????????", "value": "370687" }], [{ "label": "?????????", "value": "370702" }, { "label": "?????????", "value": "370703" }, { "label": "?????????", "value": "370704" }, { "label": "?????????", "value": "370705" }, { "label": "?????????", "value": "370724" }, { "label": "?????????", "value": "370725" }, { "label": "?????????????????????????????????", "value": "370772" }, { "label": "?????????", "value": "370781" }, { "label": "?????????", "value": "370782" }, { "label": "?????????", "value": "370783" }, { "label": "?????????", "value": "370784" }, { "label": "?????????", "value": "370785" }, { "label": "?????????", "value": "370786" }], [{ "label": "?????????", "value": "370811" }, { "label": "?????????", "value": "370812" }, { "label": "?????????", "value": "370826" }, { "label": "?????????", "value": "370827" }, { "label": "?????????", "value": "370828" }, { "label": "?????????", "value": "370829" }, { "label": "?????????", "value": "370830" }, { "label": "?????????", "value": "370831" }, { "label": "?????????", "value": "370832" }, { "label": "?????????????????????????????????", "value": "370871" }, { "label": "?????????", "value": "370881" }, { "label": "?????????", "value": "370883" }], [{ "label": "?????????", "value": "370902" }, { "label": "?????????", "value": "370911" }, { "label": "?????????", "value": "370921" }, { "label": "?????????", "value": "370923" }, { "label": "?????????", "value": "370982" }, { "label": "?????????", "value": "370983" }], [{ "label": "?????????", "value": "371002" }, { "label": "?????????", "value": "371003" }, { "label": "????????????????????????????????????", "value": "371071" }, { "label": "???????????????????????????", "value": "371072" }, { "label": "?????????????????????????????????", "value": "371073" }, { "label": "?????????", "value": "371082" }, { "label": "?????????", "value": "371083" }], [{ "label": "?????????", "value": "371102" }, { "label": "?????????", "value": "371103" }, { "label": "?????????", "value": "371121" }, { "label": "??????", "value": "371122" }, { "label": "???????????????????????????", "value": "371171" }, { "label": "?????????????????????", "value": "371172" }], [{ "label": "?????????", "value": "371202" }, { "label": "?????????", "value": "371203" }], [{ "label": "?????????", "value": "371302" }, { "label": "?????????", "value": "371311" }, { "label": "?????????", "value": "371312" }, { "label": "?????????", "value": "371321" }, { "label": "?????????", "value": "371322" }, { "label": "?????????", "value": "371323" }, { "label": "?????????", "value": "371324" }, { "label": "??????", "value": "371325" }, { "label": "?????????", "value": "371326" }, { "label": "?????????", "value": "371327" }, { "label": "?????????", "value": "371328" }, { "label": "?????????", "value": "371329" }, { "label": "?????????????????????????????????", "value": "371371" }, { "label": "???????????????????????????", "value": "371372" }, { "label": "???????????????????????????", "value": "371373" }], [{ "label": "?????????", "value": "371402" }, { "label": "?????????", "value": "371403" }, { "label": "?????????", "value": "371422" }, { "label": "?????????", "value": "371423" }, { "label": "?????????", "value": "371424" }, { "label": "?????????", "value": "371425" }, { "label": "?????????", "value": "371426" }, { "label": "?????????", "value": "371427" }, { "label": "?????????", "value": "371428" }, { "label": "???????????????????????????", "value": "371471" }, { "label": "???????????????????????????", "value": "371472" }, { "label": "?????????", "value": "371481" }, { "label": "?????????", "value": "371482" }], [{ "label": "????????????", "value": "371502" }, { "label": "?????????", "value": "371521" }, { "label": "??????", "value": "371522" }, { "label": "?????????", "value": "371523" }, { "label": "?????????", "value": "371524" }, { "label": "??????", "value": "371525" }, { "label": "?????????", "value": "371526" }, { "label": "?????????", "value": "371581" }], [{ "label": "?????????", "value": "371602" }, { "label": "?????????", "value": "371603" }, { "label": "?????????", "value": "371621" }, { "label": "?????????", "value": "371622" }, { "label": "?????????", "value": "371623" }, { "label": "?????????", "value": "371625" }, { "label": "?????????", "value": "371626" }], [{ "label": "?????????", "value": "371702" }, { "label": "?????????", "value": "371703" }, { "label": "??????", "value": "371721" }, { "label": "??????", "value": "371722" }, { "label": "?????????", "value": "371723" }, { "label": "?????????", "value": "371724" }, { "label": "?????????", "value": "371725" }, { "label": "?????????", "value": "371726" }, { "label": "?????????", "value": "371728" }, { "label": "???????????????????????????", "value": "371771" }, { "label": "???????????????????????????", "value": "371772" }]], [[{ "label": "?????????", "value": "410102" }, { "label": "?????????", "value": "410103" }, { "label": "???????????????", "value": "410104" }, { "label": "?????????", "value": "410105" }, { "label": "?????????", "value": "410106" }, { "label": "?????????", "value": "410108" }, { "label": "?????????", "value": "410122" }, { "label": "???????????????????????????", "value": "410171" }, { "label": "?????????????????????????????????", "value": "410172" }, { "label": "????????????????????????????????????", "value": "410173" }, { "label": "?????????", "value": "410181" }, { "label": "?????????", "value": "410182" }, { "label": "?????????", "value": "410183" }, { "label": "?????????", "value": "410184" }, { "label": "?????????", "value": "410185" }], [{ "label": "?????????", "value": "410202" }, { "label": "???????????????", "value": "410203" }, { "label": "?????????", "value": "410204" }, { "label": "????????????", "value": "410205" }, { "label": "?????????", "value": "410212" }, { "label": "??????", "value": "410221" }, { "label": "?????????", "value": "410222" }, { "label": "?????????", "value": "410223" }, { "label": "?????????", "value": "410225" }], [{ "label": "?????????", "value": "410302" }, { "label": "?????????", "value": "410303" }, { "label": "???????????????", "value": "410304" }, { "label": "?????????", "value": "410305" }, { "label": "?????????", "value": "410306" }, { "label": "?????????", "value": "410311" }, { "label": "?????????", "value": "410322" }, { "label": "?????????", "value": "410323" }, { "label": "?????????", "value": "410324" }, { "label": "??????", "value": "410325" }, { "label": "?????????", "value": "410326" }, { "label": "?????????", "value": "410327" }, { "label": "?????????", "value": "410328" }, { "label": "?????????", "value": "410329" }, { "label": "?????????????????????????????????", "value": "410371" }, { "label": "?????????", "value": "410381" }], [{ "label": "?????????", "value": "410402" }, { "label": "?????????", "value": "410403" }, { "label": "?????????", "value": "410404" }, { "label": "?????????", "value": "410411" }, { "label": "?????????", "value": "410421" }, { "label": "??????", "value": "410422" }, { "label": "?????????", "value": "410423" }, { "label": "??????", "value": "410425" }, { "label": "????????????????????????????????????", "value": "410471" }, { "label": "?????????????????????", "value": "410472" }, { "label": "?????????", "value": "410481" }, { "label": "?????????", "value": "410482" }], [{ "label": "?????????", "value": "410502" }, { "label": "?????????", "value": "410503" }, { "label": "?????????", "value": "410505" }, { "label": "?????????", "value": "410506" }, { "label": "?????????", "value": "410522" }, { "label": "?????????", "value": "410523" }, { "label": "??????", "value": "410526" }, { "label": "?????????", "value": "410527" }, { "label": "?????????????????????????????????", "value": "410571" }, { "label": "?????????", "value": "410581" }], [{ "label": "?????????", "value": "410602" }, { "label": "?????????", "value": "410603" }, { "label": "?????????", "value": "410611" }, { "label": "??????", "value": "410621" }, { "label": "??????", "value": "410622" }, { "label": "???????????????????????????", "value": "410671" }], [{ "label": "?????????", "value": "410702" }, { "label": "?????????", "value": "410703" }, { "label": "?????????", "value": "410704" }, { "label": "?????????", "value": "410711" }, { "label": "?????????", "value": "410721" }, { "label": "?????????", "value": "410724" }, { "label": "?????????", "value": "410725" }, { "label": "?????????", "value": "410726" }, { "label": "?????????", "value": "410727" }, { "label": "?????????", "value": "410728" }, { "label": "?????????????????????????????????", "value": "410771" }, { "label": "???????????????????????????", "value": "410772" }, { "label": "???????????????????????????????????????", "value": "410773" }, { "label": "?????????", "value": "410781" }, { "label": "?????????", "value": "410782" }], [{ "label": "?????????", "value": "410802" }, { "label": "?????????", "value": "410803" }, { "label": "?????????", "value": "410804" }, { "label": "?????????", "value": "410811" }, { "label": "?????????", "value": "410821" }, { "label": "?????????", "value": "410822" }, { "label": "?????????", "value": "410823" }, { "label": "??????", "value": "410825" }, { "label": "??????????????????????????????", "value": "410871" }, { "label": "?????????", "value": "410882" }, { "label": "?????????", "value": "410883" }], [{ "label": "?????????", "value": "410902" }, { "label": "?????????", "value": "410922" }, { "label": "?????????", "value": "410923" }, { "label": "??????", "value": "410926" }, { "label": "?????????", "value": "410927" }, { "label": "?????????", "value": "410928" }, { "label": "????????????????????????", "value": "410971" }, { "label": "???????????????????????????", "value": "410972" }], [{ "label": "?????????", "value": "411002" }, { "label": "?????????", "value": "411003" }, { "label": "?????????", "value": "411024" }, { "label": "?????????", "value": "411025" }, { "label": "???????????????????????????", "value": "411071" }, { "label": "?????????", "value": "411081" }, { "label": "?????????", "value": "411082" }], [{ "label": "?????????", "value": "411102" }, { "label": "?????????", "value": "411103" }, { "label": "?????????", "value": "411104" }, { "label": "?????????", "value": "411121" }, { "label": "?????????", "value": "411122" }, { "label": "???????????????????????????", "value": "411171" }], [{ "label": "?????????", "value": "411202" }, { "label": "?????????", "value": "411203" }, { "label": "?????????", "value": "411221" }, { "label": "?????????", "value": "411224" }, { "label": "??????????????????????????????", "value": "411271" }, { "label": "?????????", "value": "411281" }, { "label": "?????????", "value": "411282" }], [{ "label": "?????????", "value": "411302" }, { "label": "?????????", "value": "411303" }, { "label": "?????????", "value": "411321" }, { "label": "?????????", "value": "411322" }, { "label": "?????????", "value": "411323" }, { "label": "?????????", "value": "411324" }, { "label": "?????????", "value": "411325" }, { "label": "?????????", "value": "411326" }, { "label": "?????????", "value": "411327" }, { "label": "?????????", "value": "411328" }, { "label": "?????????", "value": "411329" }, { "label": "?????????", "value": "411330" }, { "label": "?????????????????????????????????", "value": "411371" }, { "label": "?????????????????????????????????", "value": "411372" }, { "label": "?????????", "value": "411381" }], [{ "label": "?????????", "value": "411402" }, { "label": "?????????", "value": "411403" }, { "label": "?????????", "value": "411421" }, { "label": "??????", "value": "411422" }, { "label": "?????????", "value": "411423" }, { "label": "?????????", "value": "411424" }, { "label": "?????????", "value": "411425" }, { "label": "?????????", "value": "411426" }, { "label": "?????????????????????????????????", "value": "411471" }, { "label": "???????????????????????????", "value": "411472" }, { "label": "?????????", "value": "411481" }], [{ "label": "?????????", "value": "411502" }, { "label": "?????????", "value": "411503" }, { "label": "?????????", "value": "411521" }, { "label": "?????????", "value": "411522" }, { "label": "??????", "value": "411523" }, { "label": "?????????", "value": "411524" }, { "label": "?????????", "value": "411525" }, { "label": "?????????", "value": "411526" }, { "label": "?????????", "value": "411527" }, { "label": "??????", "value": "411528" }, { "label": "?????????????????????????????????", "value": "411571" }], [{ "label": "?????????", "value": "411602" }, { "label": "?????????", "value": "411621" }, { "label": "?????????", "value": "411622" }, { "label": "?????????", "value": "411623" }, { "label": "?????????", "value": "411624" }, { "label": "?????????", "value": "411625" }, { "label": "?????????", "value": "411626" }, { "label": "?????????", "value": "411627" }, { "label": "?????????", "value": "411628" }, { "label": "???????????????????????????", "value": "411671" }, { "label": "?????????", "value": "411681" }], [{ "label": "?????????", "value": "411702" }, { "label": "?????????", "value": "411721" }, { "label": "?????????", "value": "411722" }, { "label": "?????????", "value": "411723" }, { "label": "?????????", "value": "411724" }, { "label": "?????????", "value": "411725" }, { "label": "?????????", "value": "411726" }, { "label": "?????????", "value": "411727" }, { "label": "?????????", "value": "411728" }, { "label": "?????????", "value": "411729" }, { "label": "??????????????????????????????", "value": "411771" }], [{ "label": "?????????", "value": "419001" }]], [[{ "label": "?????????", "value": "420102" }, { "label": "?????????", "value": "420103" }, { "label": "?????????", "value": "420104" }, { "label": "?????????", "value": "420105" }, { "label": "?????????", "value": "420106" }, { "label": "?????????", "value": "420107" }, { "label": "?????????", "value": "420111" }, { "label": "????????????", "value": "420112" }, { "label": "?????????", "value": "420113" }, { "label": "?????????", "value": "420114" }, { "label": "?????????", "value": "420115" }, { "label": "?????????", "value": "420116" }, { "label": "?????????", "value": "420117" }], [{ "label": "????????????", "value": "420202" }, { "label": "????????????", "value": "420203" }, { "label": "?????????", "value": "420204" }, { "label": "?????????", "value": "420205" }, { "label": "?????????", "value": "420222" }, { "label": "?????????", "value": "420281" }], [{ "label": "?????????", "value": "420302" }, { "label": "?????????", "value": "420303" }, { "label": "?????????", "value": "420304" }, { "label": "?????????", "value": "420322" }, { "label": "?????????", "value": "420323" }, { "label": "?????????", "value": "420324" }, { "label": "??????", "value": "420325" }, { "label": "????????????", "value": "420381" }], [{ "label": "?????????", "value": "420502" }, { "label": "????????????", "value": "420503" }, { "label": "?????????", "value": "420504" }, { "label": "?????????", "value": "420505" }, { "label": "?????????", "value": "420506" }, { "label": "?????????", "value": "420525" }, { "label": "?????????", "value": "420526" }, { "label": "?????????", "value": "420527" }, { "label": "????????????????????????", "value": "420528" }, { "label": "????????????????????????", "value": "420529" }, { "label": "?????????", "value": "420581" }, { "label": "?????????", "value": "420582" }, { "label": "?????????", "value": "420583" }], [{ "label": "?????????", "value": "420602" }, { "label": "?????????", "value": "420606" }, { "label": "?????????", "value": "420607" }, { "label": "?????????", "value": "420624" }, { "label": "?????????", "value": "420625" }, { "label": "?????????", "value": "420626" }, { "label": "????????????", "value": "420682" }, { "label": "?????????", "value": "420683" }, { "label": "?????????", "value": "420684" }], [{ "label": "????????????", "value": "420702" }, { "label": "?????????", "value": "420703" }, { "label": "?????????", "value": "420704" }], [{ "label": "?????????", "value": "420802" }, { "label": "?????????", "value": "420804" }, { "label": "?????????", "value": "420821" }, { "label": "?????????", "value": "420822" }, { "label": "?????????", "value": "420881" }], [{ "label": "?????????", "value": "420902" }, { "label": "?????????", "value": "420921" }, { "label": "?????????", "value": "420922" }, { "label": "?????????", "value": "420923" }, { "label": "?????????", "value": "420981" }, { "label": "?????????", "value": "420982" }, { "label": "?????????", "value": "420984" }], [{ "label": "?????????", "value": "421002" }, { "label": "?????????", "value": "421003" }, { "label": "?????????", "value": "421022" }, { "label": "?????????", "value": "421023" }, { "label": "?????????", "value": "421024" }, { "label": "???????????????????????????", "value": "421071" }, { "label": "?????????", "value": "421081" }, { "label": "?????????", "value": "421083" }, { "label": "?????????", "value": "421087" }], [{ "label": "?????????", "value": "421102" }, { "label": "?????????", "value": "421121" }, { "label": "?????????", "value": "421122" }, { "label": "?????????", "value": "421123" }, { "label": "?????????", "value": "421124" }, { "label": "?????????", "value": "421125" }, { "label": "?????????", "value": "421126" }, { "label": "?????????", "value": "421127" }, { "label": "??????????????????", "value": "421171" }, { "label": "?????????", "value": "421181" }, { "label": "?????????", "value": "421182" }], [{ "label": "?????????", "value": "421202" }, { "label": "?????????", "value": "421221" }, { "label": "?????????", "value": "421222" }, { "label": "?????????", "value": "421223" }, { "label": "?????????", "value": "421224" }, { "label": "?????????", "value": "421281" }], [{ "label": "?????????", "value": "421303" }, { "label": "??????", "value": "421321" }, { "label": "?????????", "value": "421381" }], [{ "label": "?????????", "value": "422801" }, { "label": "?????????", "value": "422802" }, { "label": "?????????", "value": "422822" }, { "label": "?????????", "value": "422823" }, { "label": "?????????", "value": "422825" }, { "label": "?????????", "value": "422826" }, { "label": "?????????", "value": "422827" }, { "label": "?????????", "value": "422828" }], [{ "label": "?????????", "value": "429004" }, { "label": "?????????", "value": "429005" }, { "label": "?????????", "value": "429006" }, { "label": "???????????????", "value": "429021" }]], [[{ "label": "?????????", "value": "430102" }, { "label": "?????????", "value": "430103" }, { "label": "?????????", "value": "430104" }, { "label": "?????????", "value": "430105" }, { "label": "?????????", "value": "430111" }, { "label": "?????????", "value": "430112" }, { "label": "?????????", "value": "430121" }, { "label": "?????????", "value": "430181" }, { "label": "?????????", "value": "430182" }], [{ "label": "?????????", "value": "430202" }, { "label": "?????????", "value": "430203" }, { "label": "?????????", "value": "430204" }, { "label": "?????????", "value": "430211" }, { "label": "?????????", "value": "430221" }, { "label": "??????", "value": "430223" }, { "label": "?????????", "value": "430224" }, { "label": "?????????", "value": "430225" }, { "label": "???????????????", "value": "430271" }, { "label": "?????????", "value": "430281" }], [{ "label": "?????????", "value": "430302" }, { "label": "?????????", "value": "430304" }, { "label": "?????????", "value": "430321" }, { "label": "????????????????????????????????????", "value": "430371" }, { "label": "?????????????????????", "value": "430372" }, { "label": "?????????????????????", "value": "430373" }, { "label": "?????????", "value": "430381" }, { "label": "?????????", "value": "430382" }], [{ "label": "?????????", "value": "430405" }, { "label": "?????????", "value": "430406" }, { "label": "?????????", "value": "430407" }, { "label": "?????????", "value": "430408" }, { "label": "?????????", "value": "430412" }, { "label": "?????????", "value": "430421" }, { "label": "?????????", "value": "430422" }, { "label": "?????????", "value": "430423" }, { "label": "?????????", "value": "430424" }, { "label": "?????????", "value": "430426" }, { "label": "?????????????????????", "value": "430471" }, { "label": "????????????????????????????????????", "value": "430472" }, { "label": "?????????????????????????????????", "value": "430473" }, { "label": "?????????", "value": "430481" }, { "label": "?????????", "value": "430482" }], [{ "label": "?????????", "value": "430502" }, { "label": "?????????", "value": "430503" }, { "label": "?????????", "value": "430511" }, { "label": "?????????", "value": "430521" }, { "label": "?????????", "value": "430522" }, { "label": "?????????", "value": "430523" }, { "label": "?????????", "value": "430524" }, { "label": "?????????", "value": "430525" }, { "label": "?????????", "value": "430527" }, { "label": "?????????", "value": "430528" }, { "label": "?????????????????????", "value": "430529" }, { "label": "?????????", "value": "430581" }], [{ "label": "????????????", "value": "430602" }, { "label": "?????????", "value": "430603" }, { "label": "?????????", "value": "430611" }, { "label": "?????????", "value": "430621" }, { "label": "?????????", "value": "430623" }, { "label": "?????????", "value": "430624" }, { "label": "?????????", "value": "430626" }, { "label": "????????????????????????", "value": "430671" }, { "label": "?????????", "value": "430681" }, { "label": "?????????", "value": "430682" }], [{ "label": "?????????", "value": "430702" }, { "label": "?????????", "value": "430703" }, { "label": "?????????", "value": "430721" }, { "label": "?????????", "value": "430722" }, { "label": "??????", "value": "430723" }, { "label": "?????????", "value": "430724" }, { "label": "?????????", "value": "430725" }, { "label": "?????????", "value": "430726" }, { "label": "???????????????????????????", "value": "430771" }, { "label": "?????????", "value": "430781" }], [{ "label": "?????????", "value": "430802" }, { "label": "????????????", "value": "430811" }, { "label": "?????????", "value": "430821" }, { "label": "?????????", "value": "430822" }], [{ "label": "?????????", "value": "430902" }, { "label": "?????????", "value": "430903" }, { "label": "??????", "value": "430921" }, { "label": "?????????", "value": "430922" }, { "label": "?????????", "value": "430923" }, { "label": "???????????????????????????", "value": "430971" }, { "label": "????????????????????????????????????", "value": "430972" }, { "label": "?????????", "value": "430981" }], [{ "label": "?????????", "value": "431002" }, { "label": "?????????", "value": "431003" }, { "label": "?????????", "value": "431021" }, { "label": "?????????", "value": "431022" }, { "label": "?????????", "value": "431023" }, { "label": "?????????", "value": "431024" }, { "label": "?????????", "value": "431025" }, { "label": "?????????", "value": "431026" }, { "label": "?????????", "value": "431027" }, { "label": "?????????", "value": "431028" }, { "label": "?????????", "value": "431081" }], [{ "label": "?????????", "value": "431102" }, { "label": "????????????", "value": "431103" }, { "label": "?????????", "value": "431121" }, { "label": "?????????", "value": "431122" }, { "label": "?????????", "value": "431123" }, { "label": "??????", "value": "431124" }, { "label": "?????????", "value": "431125" }, { "label": "?????????", "value": "431126" }, { "label": "?????????", "value": "431127" }, { "label": "?????????", "value": "431128" }, { "label": "?????????????????????", "value": "431129" }, { "label": "???????????????????????????", "value": "431171" }, { "label": "????????????????????????", "value": "431172" }, { "label": "???????????????????????????", "value": "431173" }], [{ "label": "?????????", "value": "431202" }, { "label": "?????????", "value": "431221" }, { "label": "?????????", "value": "431222" }, { "label": "?????????", "value": "431223" }, { "label": "?????????", "value": "431224" }, { "label": "?????????", "value": "431225" }, { "label": "?????????????????????", "value": "431226" }, { "label": "?????????????????????", "value": "431227" }, { "label": "?????????????????????", "value": "431228" }, { "label": "???????????????????????????", "value": "431229" }, { "label": "?????????????????????", "value": "431230" }, { "label": "????????????????????????", "value": "431271" }, { "label": "?????????", "value": "431281" }], [{ "label": "?????????", "value": "431302" }, { "label": "?????????", "value": "431321" }, { "label": "?????????", "value": "431322" }, { "label": "????????????", "value": "431381" }, { "label": "?????????", "value": "431382" }], [{ "label": "?????????", "value": "433101" }, { "label": "?????????", "value": "433122" }, { "label": "?????????", "value": "433123" }, { "label": "?????????", "value": "433124" }, { "label": "?????????", "value": "433125" }, { "label": "?????????", "value": "433126" }, { "label": "?????????", "value": "433127" }, { "label": "?????????", "value": "433130" }, { "label": "???????????????????????????", "value": "433172" }, { "label": "???????????????????????????", "value": "433173" }]], [[{ "label": "?????????", "value": "440103" }, { "label": "?????????", "value": "440104" }, { "label": "?????????", "value": "440105" }, { "label": "?????????", "value": "440106" }, { "label": "?????????", "value": "440111" }, { "label": "?????????", "value": "440112" }, { "label": "?????????", "value": "440113" }, { "label": "?????????", "value": "440114" }, { "label": "?????????", "value": "440115" }, { "label": "?????????", "value": "440117" }, { "label": "?????????", "value": "440118" }], [{ "label": "?????????", "value": "440203" }, { "label": "?????????", "value": "440204" }, { "label": "?????????", "value": "440205" }, { "label": "?????????", "value": "440222" }, { "label": "?????????", "value": "440224" }, { "label": "?????????", "value": "440229" }, { "label": "?????????????????????", "value": "440232" }, { "label": "?????????", "value": "440233" }, { "label": "?????????", "value": "440281" }, { "label": "?????????", "value": "440282" }], [{ "label": "?????????", "value": "440303" }, { "label": "?????????", "value": "440304" }, { "label": "?????????", "value": "440305" }, { "label": "?????????", "value": "440306" }, { "label": "?????????", "value": "440307" }, { "label": "?????????", "value": "440308" }, { "label": "?????????", "value": "440309" }, { "label": "?????????", "value": "440310" }], [{ "label": "?????????", "value": "440402" }, { "label": "?????????", "value": "440403" }, { "label": "?????????", "value": "440404" }], [{ "label": "?????????", "value": "440507" }, { "label": "?????????", "value": "440511" }, { "label": "?????????", "value": "440512" }, { "label": "?????????", "value": "440513" }, { "label": "?????????", "value": "440514" }, { "label": "?????????", "value": "440515" }, { "label": "?????????", "value": "440523" }], [{ "label": "?????????", "value": "440604" }, { "label": "?????????", "value": "440605" }, { "label": "?????????", "value": "440606" }, { "label": "?????????", "value": "440607" }, { "label": "?????????", "value": "440608" }], [{ "label": "?????????", "value": "440703" }, { "label": "?????????", "value": "440704" }, { "label": "?????????", "value": "440705" }, { "label": "?????????", "value": "440781" }, { "label": "?????????", "value": "440783" }, { "label": "?????????", "value": "440784" }, { "label": "?????????", "value": "440785" }], [{ "label": "?????????", "value": "440802" }, { "label": "?????????", "value": "440803" }, { "label": "?????????", "value": "440804" }, { "label": "?????????", "value": "440811" }, { "label": "?????????", "value": "440823" }, { "label": "?????????", "value": "440825" }, { "label": "?????????", "value": "440881" }, { "label": "?????????", "value": "440882" }, { "label": "?????????", "value": "440883" }], [{ "label": "?????????", "value": "440902" }, { "label": "?????????", "value": "440904" }, { "label": "?????????", "value": "440981" }, { "label": "?????????", "value": "440982" }, { "label": "?????????", "value": "440983" }], [{ "label": "?????????", "value": "441202" }, { "label": "?????????", "value": "441203" }, { "label": "?????????", "value": "441204" }, { "label": "?????????", "value": "441223" }, { "label": "?????????", "value": "441224" }, { "label": "?????????", "value": "441225" }, { "label": "?????????", "value": "441226" }, { "label": "?????????", "value": "441284" }], [{ "label": "?????????", "value": "441302" }, { "label": "?????????", "value": "441303" }, { "label": "?????????", "value": "441322" }, { "label": "?????????", "value": "441323" }, { "label": "?????????", "value": "441324" }], [{ "label": "?????????", "value": "441402" }, { "label": "?????????", "value": "441403" }, { "label": "?????????", "value": "441422" }, { "label": "?????????", "value": "441423" }, { "label": "?????????", "value": "441424" }, { "label": "?????????", "value": "441426" }, { "label": "?????????", "value": "441427" }, { "label": "?????????", "value": "441481" }], [{ "label": "??????", "value": "441502" }, { "label": "?????????", "value": "441521" }, { "label": "?????????", "value": "441523" }, { "label": "?????????", "value": "441581" }], [{ "label": "?????????", "value": "441602" }, { "label": "?????????", "value": "441621" }, { "label": "?????????", "value": "441622" }, { "label": "?????????", "value": "441623" }, { "label": "?????????", "value": "441624" }, { "label": "?????????", "value": "441625" }], [{ "label": "?????????", "value": "441702" }, { "label": "?????????", "value": "441704" }, { "label": "?????????", "value": "441721" }, { "label": "?????????", "value": "441781" }], [{ "label": "?????????", "value": "441802" }, { "label": "?????????", "value": "441803" }, { "label": "?????????", "value": "441821" }, { "label": "?????????", "value": "441823" }, { "label": "???????????????????????????", "value": "441825" }, { "label": "?????????????????????", "value": "441826" }, { "label": "?????????", "value": "441881" }, { "label": "?????????", "value": "441882" }], [{ "label": "?????????", "value": "441900" }], [{ "label": "?????????", "value": "442000" }], [{ "label": "?????????", "value": "445102" }, { "label": "?????????", "value": "445103" }, { "label": "?????????", "value": "445122" }], [{ "label": "?????????", "value": "445202" }, { "label": "?????????", "value": "445203" }, { "label": "?????????", "value": "445222" }, { "label": "?????????", "value": "445224" }, { "label": "?????????", "value": "445281" }], [{ "label": "?????????", "value": "445302" }, { "label": "?????????", "value": "445303" }, { "label": "?????????", "value": "445321" }, { "label": "?????????", "value": "445322" }, { "label": "?????????", "value": "445381" }]], [[{ "label": "?????????", "value": "450102" }, { "label": "?????????", "value": "450103" }, { "label": "?????????", "value": "450105" }, { "label": "????????????", "value": "450107" }, { "label": "?????????", "value": "450108" }, { "label": "?????????", "value": "450109" }, { "label": "?????????", "value": "450110" }, { "label": "?????????", "value": "450123" }, { "label": "?????????", "value": "450124" }, { "label": "?????????", "value": "450125" }, { "label": "?????????", "value": "450126" }, { "label": "??????", "value": "450127" }], [{ "label": "?????????", "value": "450202" }, { "label": "?????????", "value": "450203" }, { "label": "?????????", "value": "450204" }, { "label": "?????????", "value": "450205" }, { "label": "?????????", "value": "450206" }, { "label": "?????????", "value": "450222" }, { "label": "?????????", "value": "450223" }, { "label": "?????????", "value": "450224" }, { "label": "?????????????????????", "value": "450225" }, { "label": "?????????????????????", "value": "450226" }], [{ "label": "?????????", "value": "450302" }, { "label": "?????????", "value": "450303" }, { "label": "?????????", "value": "450304" }, { "label": "?????????", "value": "450305" }, { "label": "?????????", "value": "450311" }, { "label": "?????????", "value": "450312" }, { "label": "?????????", "value": "450321" }, { "label": "?????????", "value": "450323" }, { "label": "?????????", "value": "450324" }, { "label": "?????????", "value": "450325" }, { "label": "?????????", "value": "450326" }, { "label": "?????????", "value": "450327" }, { "label": "?????????????????????", "value": "450328" }, { "label": "?????????", "value": "450329" }, { "label": "?????????", "value": "450330" }, { "label": "?????????", "value": "450331" }, { "label": "?????????????????????", "value": "450332" }], [{ "label": "?????????", "value": "450403" }, { "label": "?????????", "value": "450405" }, { "label": "?????????", "value": "450406" }, { "label": "?????????", "value": "450421" }, { "label": "??????", "value": "450422" }, { "label": "?????????", "value": "450423" }, { "label": "?????????", "value": "450481" }], [{ "label": "?????????", "value": "450502" }, { "label": "?????????", "value": "450503" }, { "label": "????????????", "value": "450512" }, { "label": "?????????", "value": "450521" }], [{ "label": "?????????", "value": "450602" }, { "label": "?????????", "value": "450603" }, { "label": "?????????", "value": "450621" }, { "label": "?????????", "value": "450681" }], [{ "label": "?????????", "value": "450702" }, { "label": "?????????", "value": "450703" }, { "label": "?????????", "value": "450721" }, { "label": "?????????", "value": "450722" }], [{ "label": "?????????", "value": "450802" }, { "label": "?????????", "value": "450803" }, { "label": "?????????", "value": "450804" }, { "label": "?????????", "value": "450821" }, { "label": "?????????", "value": "450881" }], [{ "label": "?????????", "value": "450902" }, { "label": "?????????", "value": "450903" }, { "label": "??????", "value": "450921" }, { "label": "?????????", "value": "450922" }, { "label": "?????????", "value": "450923" }, { "label": "?????????", "value": "450924" }, { "label": "?????????", "value": "450981" }], [{ "label": "?????????", "value": "451002" }, { "label": "?????????", "value": "451021" }, { "label": "?????????", "value": "451022" }, { "label": "?????????", "value": "451023" }, { "label": "?????????", "value": "451024" }, { "label": "?????????", "value": "451026" }, { "label": "?????????", "value": "451027" }, { "label": "?????????", "value": "451028" }, { "label": "?????????", "value": "451029" }, { "label": "?????????", "value": "451030" }, { "label": "?????????????????????", "value": "451031" }, { "label": "?????????", "value": "451081" }], [{ "label": "?????????", "value": "451102" }, { "label": "?????????", "value": "451103" }, { "label": "?????????", "value": "451121" }, { "label": "?????????", "value": "451122" }, { "label": "?????????????????????", "value": "451123" }], [{ "label": "????????????", "value": "451202" }, { "label": "?????????", "value": "451203" }, { "label": "?????????", "value": "451221" }, { "label": "?????????", "value": "451222" }, { "label": "?????????", "value": "451223" }, { "label": "?????????", "value": "451224" }, { "label": "????????????????????????", "value": "451225" }, { "label": "????????????????????????", "value": "451226" }, { "label": "?????????????????????", "value": "451227" }, { "label": "?????????????????????", "value": "451228" }, { "label": "?????????????????????", "value": "451229" }], [{ "label": "?????????", "value": "451302" }, { "label": "?????????", "value": "451321" }, { "label": "?????????", "value": "451322" }, { "label": "?????????", "value": "451323" }, { "label": "?????????????????????", "value": "451324" }, { "label": "?????????", "value": "451381" }], [{ "label": "?????????", "value": "451402" }, { "label": "?????????", "value": "451421" }, { "label": "?????????", "value": "451422" }, { "label": "?????????", "value": "451423" }, { "label": "?????????", "value": "451424" }, { "label": "?????????", "value": "451425" }, { "label": "?????????", "value": "451481" }]], [[{ "label": "?????????", "value": "460105" }, { "label": "?????????", "value": "460106" }, { "label": "?????????", "value": "460107" }, { "label": "?????????", "value": "460108" }], [{ "label": "?????????", "value": "460202" }, { "label": "?????????", "value": "460203" }, { "label": "?????????", "value": "460204" }, { "label": "?????????", "value": "460205" }], [{ "label": "????????????", "value": "460321" }, { "label": "????????????", "value": "460322" }, { "label": "?????????????????????????????????", "value": "460323" }], [{ "label": "?????????", "value": "460400" }], [{ "label": "????????????", "value": "469001" }, { "label": "?????????", "value": "469002" }, { "label": "?????????", "value": "469005" }, { "label": "?????????", "value": "469006" }, { "label": "?????????", "value": "469007" }, { "label": "?????????", "value": "469021" }, { "label": "?????????", "value": "469022" }, { "label": "?????????", "value": "469023" }, { "label": "?????????", "value": "469024" }, { "label": "?????????????????????", "value": "469025" }, { "label": "?????????????????????", "value": "469026" }, { "label": "?????????????????????", "value": "469027" }, { "label": "?????????????????????", "value": "469028" }, { "label": "???????????????????????????", "value": "469029" }, { "label": "???????????????????????????", "value": "469030" }]], [[{ "label": "?????????", "value": "500101" }, { "label": "?????????", "value": "500102" }, { "label": "?????????", "value": "500103" }, { "label": "????????????", "value": "500104" }, { "label": "?????????", "value": "500105" }, { "label": "????????????", "value": "500106" }, { "label": "????????????", "value": "500107" }, { "label": "?????????", "value": "500108" }, { "label": "?????????", "value": "500109" }, { "label": "?????????", "value": "500110" }, { "label": "?????????", "value": "500111" }, { "label": "?????????", "value": "500112" }, { "label": "?????????", "value": "500113" }, { "label": "?????????", "value": "500114" }, { "label": "?????????", "value": "500115" }, { "label": "?????????", "value": "500116" }, { "label": "?????????", "value": "500117" }, { "label": "?????????", "value": "500118" }, { "label": "?????????", "value": "500119" }, { "label": "?????????", "value": "500120" }, { "label": "?????????", "value": "500151" }, { "label": "?????????", "value": "500152" }, { "label": "?????????", "value": "500153" }, { "label": "?????????", "value": "500154" }, { "label": "?????????", "value": "500155" }, { "label": "?????????", "value": "500156" }], [{ "label": "?????????", "value": "500229" }, { "label": "?????????", "value": "500230" }, { "label": "?????????", "value": "500231" }, { "label": "??????", "value": "500233" }, { "label": "?????????", "value": "500235" }, { "label": "?????????", "value": "500236" }, { "label": "?????????", "value": "500237" }, { "label": "?????????", "value": "500238" }, { "label": "????????????????????????", "value": "500240" }, { "label": "??????????????????????????????", "value": "500241" }, { "label": "??????????????????????????????", "value": "500242" }, { "label": "??????????????????????????????", "value": "500243" }]], [[{ "label": "?????????", "value": "510104" }, { "label": "?????????", "value": "510105" }, { "label": "?????????", "value": "510106" }, { "label": "?????????", "value": "510107" }, { "label": "?????????", "value": "510108" }, { "label": "????????????", "value": "510112" }, { "label": "????????????", "value": "510113" }, { "label": "?????????", "value": "510114" }, { "label": "?????????", "value": "510115" }, { "label": "?????????", "value": "510116" }, { "label": "?????????", "value": "510117" }, { "label": "?????????", "value": "510121" }, { "label": "?????????", "value": "510129" }, { "label": "?????????", "value": "510131" }, { "label": "?????????", "value": "510132" }, { "label": "????????????", "value": "510181" }, { "label": "?????????", "value": "510182" }, { "label": "?????????", "value": "510183" }, { "label": "?????????", "value": "510184" }, { "label": "?????????", "value": "510185" }], [{ "label": "????????????", "value": "510302" }, { "label": "?????????", "value": "510303" }, { "label": "?????????", "value": "510304" }, { "label": "?????????", "value": "510311" }, { "label": "??????", "value": "510321" }, { "label": "?????????", "value": "510322" }], [{ "label": "??????", "value": "510402" }, { "label": "??????", "value": "510403" }, { "label": "?????????", "value": "510411" }, { "label": "?????????", "value": "510421" }, { "label": "?????????", "value": "510422" }], [{ "label": "?????????", "value": "510502" }, { "label": "?????????", "value": "510503" }, { "label": "????????????", "value": "510504" }, { "label": "??????", "value": "510521" }, { "label": "?????????", "value": "510522" }, { "label": "?????????", "value": "510524" }, { "label": "?????????", "value": "510525" }], [{ "label": "?????????", "value": "510603" }, { "label": "?????????", "value": "510604" }, { "label": "?????????", "value": "510623" }, { "label": "?????????", "value": "510681" }, { "label": "?????????", "value": "510682" }, { "label": "?????????", "value": "510683" }], [{ "label": "?????????", "value": "510703" }, { "label": "?????????", "value": "510704" }, { "label": "?????????", "value": "510705" }, { "label": "?????????", "value": "510722" }, { "label": "?????????", "value": "510723" }, { "label": "?????????", "value": "510725" }, { "label": "?????????????????????", "value": "510726" }, { "label": "?????????", "value": "510727" }, { "label": "?????????", "value": "510781" }], [{ "label": "?????????", "value": "510802" }, { "label": "?????????", "value": "510811" }, { "label": "?????????", "value": "510812" }, { "label": "?????????", "value": "510821" }, { "label": "?????????", "value": "510822" }, { "label": "?????????", "value": "510823" }, { "label": "?????????", "value": "510824" }], [{ "label": "?????????", "value": "510903" }, { "label": "?????????", "value": "510904" }, { "label": "?????????", "value": "510921" }, { "label": "?????????", "value": "510922" }, { "label": "?????????", "value": "510923" }], [{ "label": "?????????", "value": "511002" }, { "label": "?????????", "value": "511011" }, { "label": "?????????", "value": "511024" }, { "label": "?????????", "value": "511025" }, { "label": "?????????????????????", "value": "511071" }, { "label": "?????????", "value": "511083" }], [{ "label": "?????????", "value": "511102" }, { "label": "?????????", "value": "511111" }, { "label": "????????????", "value": "511112" }, { "label": "????????????", "value": "511113" }, { "label": "?????????", "value": "511123" }, { "label": "?????????", "value": "511124" }, { "label": "?????????", "value": "511126" }, { "label": "?????????", "value": "511129" }, { "label": "?????????????????????", "value": "511132" }, { "label": "?????????????????????", "value": "511133" }, { "label": "????????????", "value": "511181" }], [{ "label": "?????????", "value": "511302" }, { "label": "?????????", "value": "511303" }, { "label": "?????????", "value": "511304" }, { "label": "?????????", "value": "511321" }, { "label": "?????????", "value": "511322" }, { "label": "?????????", "value": "511323" }, { "label": "?????????", "value": "511324" }, { "label": "?????????", "value": "511325" }, { "label": "?????????", "value": "511381" }], [{ "label": "?????????", "value": "511402" }, { "label": "?????????", "value": "511403" }, { "label": "?????????", "value": "511421" }, { "label": "?????????", "value": "511423" }, { "label": "?????????", "value": "511424" }, { "label": "?????????", "value": "511425" }], [{ "label": "?????????", "value": "511502" }, { "label": "?????????", "value": "511503" }, { "label": "?????????", "value": "511521" }, { "label": "?????????", "value": "511523" }, { "label": "?????????", "value": "511524" }, { "label": "??????", "value": "511525" }, { "label": "??????", "value": "511526" }, { "label": "?????????", "value": "511527" }, { "label": "?????????", "value": "511528" }, { "label": "?????????", "value": "511529" }], [{ "label": "?????????", "value": "511602" }, { "label": "?????????", "value": "511603" }, { "label": "?????????", "value": "511621" }, { "label": "?????????", "value": "511622" }, { "label": "?????????", "value": "511623" }, { "label": "?????????", "value": "511681" }], [{ "label": "?????????", "value": "511702" }, { "label": "?????????", "value": "511703" }, { "label": "?????????", "value": "511722" }, { "label": "?????????", "value": "511723" }, { "label": "?????????", "value": "511724" }, { "label": "??????", "value": "511725" }, { "label": "?????????????????????", "value": "511771" }, { "label": "?????????", "value": "511781" }], [{ "label": "?????????", "value": "511802" }, { "label": "?????????", "value": "511803" }, { "label": "?????????", "value": "511822" }, { "label": "?????????", "value": "511823" }, { "label": "?????????", "value": "511824" }, { "label": "?????????", "value": "511825" }, { "label": "?????????", "value": "511826" }, { "label": "?????????", "value": "511827" }], [{ "label": "?????????", "value": "511902" }, { "label": "?????????", "value": "511903" }, { "label": "?????????", "value": "511921" }, { "label": "?????????", "value": "511922" }, { "label": "?????????", "value": "511923" }, { "label": "?????????????????????", "value": "511971" }], [{ "label": "?????????", "value": "512002" }, { "label": "?????????", "value": "512021" }, { "label": "?????????", "value": "512022" }], [{ "label": "????????????", "value": "513201" }, { "label": "?????????", "value": "513221" }, { "label": "??????", "value": "513222" }, { "label": "??????", "value": "513223" }, { "label": "?????????", "value": "513224" }, { "label": "????????????", "value": "513225" }, { "label": "?????????", "value": "513226" }, { "label": "?????????", "value": "513227" }, { "label": "?????????", "value": "513228" }, { "label": "?????????", "value": "513230" }, { "label": "?????????", "value": "513231" }, { "label": "????????????", "value": "513232" }, { "label": "?????????", "value": "513233" }], [{ "label": "?????????", "value": "513301" }, { "label": "?????????", "value": "513322" }, { "label": "?????????", "value": "513323" }, { "label": "?????????", "value": "513324" }, { "label": "?????????", "value": "513325" }, { "label": "?????????", "value": "513326" }, { "label": "?????????", "value": "513327" }, { "label": "?????????", "value": "513328" }, { "label": "?????????", "value": "513329" }, { "label": "?????????", "value": "513330" }, { "label": "?????????", "value": "513331" }, { "label": "?????????", "value": "513332" }, { "label": "?????????", "value": "513333" }, { "label": "?????????", "value": "513334" }, { "label": "?????????", "value": "513335" }, { "label": "?????????", "value": "513336" }, { "label": "?????????", "value": "513337" }, { "label": "?????????", "value": "513338" }], [{ "label": "?????????", "value": "513401" }, { "label": "?????????????????????", "value": "513422" }, { "label": "?????????", "value": "513423" }, { "label": "?????????", "value": "513424" }, { "label": "?????????", "value": "513425" }, { "label": "?????????", "value": "513426" }, { "label": "?????????", "value": "513427" }, { "label": "?????????", "value": "513428" }, { "label": "?????????", "value": "513429" }, { "label": "?????????", "value": "513430" }, { "label": "?????????", "value": "513431" }, { "label": "?????????", "value": "513432" }, { "label": "?????????", "value": "513433" }, { "label": "?????????", "value": "513434" }, { "label": "?????????", "value": "513435" }, { "label": "?????????", "value": "513436" }, { "label": "?????????", "value": "513437" }]], [[{ "label": "?????????", "value": "520102" }, { "label": "?????????", "value": "520103" }, { "label": "?????????", "value": "520111" }, { "label": "?????????", "value": "520112" }, { "label": "?????????", "value": "520113" }, { "label": "????????????", "value": "520115" }, { "label": "?????????", "value": "520121" }, { "label": "?????????", "value": "520122" }, { "label": "?????????", "value": "520123" }, { "label": "?????????", "value": "520181" }], [{ "label": "?????????", "value": "520201" }, { "label": "????????????", "value": "520203" }, { "label": "?????????", "value": "520221" }, { "label": "?????????", "value": "520281" }], [{ "label": "????????????", "value": "520302" }, { "label": "?????????", "value": "520303" }, { "label": "?????????", "value": "520304" }, { "label": "?????????", "value": "520322" }, { "label": "?????????", "value": "520323" }, { "label": "?????????", "value": "520324" }, { "label": "??????????????????????????????", "value": "520325" }, { "label": "??????????????????????????????", "value": "520326" }, { "label": "?????????", "value": "520327" }, { "label": "?????????", "value": "520328" }, { "label": "?????????", "value": "520329" }, { "label": "?????????", "value": "520330" }, { "label": "?????????", "value": "520381" }, { "label": "?????????", "value": "520382" }], [{ "label": "?????????", "value": "520402" }, { "label": "?????????", "value": "520403" }, { "label": "?????????", "value": "520422" }, { "label": "??????????????????????????????", "value": "520423" }, { "label": "??????????????????????????????", "value": "520424" }, { "label": "??????????????????????????????", "value": "520425" }], [{ "label": "????????????", "value": "520502" }, { "label": "?????????", "value": "520521" }, { "label": "?????????", "value": "520522" }, { "label": "?????????", "value": "520523" }, { "label": "?????????", "value": "520524" }, { "label": "?????????", "value": "520525" }, { "label": "?????????????????????????????????", "value": "520526" }, { "label": "?????????", "value": "520527" }], [{ "label": "?????????", "value": "520602" }, { "label": "?????????", "value": "520603" }, { "label": "?????????", "value": "520621" }, { "label": "?????????????????????", "value": "520622" }, { "label": "?????????", "value": "520623" }, { "label": "?????????", "value": "520624" }, { "label": "??????????????????????????????", "value": "520625" }, { "label": "?????????", "value": "520626" }, { "label": "????????????????????????", "value": "520627" }, { "label": "?????????????????????", "value": "520628" }], [{ "label": "?????????", "value": "522301" }, { "label": "?????????", "value": "522322" }, { "label": "?????????", "value": "522323" }, { "label": "?????????", "value": "522324" }, { "label": "?????????", "value": "522325" }, { "label": "?????????", "value": "522326" }, { "label": "?????????", "value": "522327" }, { "label": "?????????", "value": "522328" }], [{ "label": "?????????", "value": "522601" }, { "label": "?????????", "value": "522622" }, { "label": "?????????", "value": "522623" }, { "label": "?????????", "value": "522624" }, { "label": "?????????", "value": "522625" }, { "label": "?????????", "value": "522626" }, { "label": "?????????", "value": "522627" }, { "label": "?????????", "value": "522628" }, { "label": "?????????", "value": "522629" }, { "label": "?????????", "value": "522630" }, { "label": "?????????", "value": "522631" }, { "label": "?????????", "value": "522632" }, { "label": "?????????", "value": "522633" }, { "label": "?????????", "value": "522634" }, { "label": "?????????", "value": "522635" }, { "label": "?????????", "value": "522636" }], [{ "label": "?????????", "value": "522701" }, { "label": "?????????", "value": "522702" }, { "label": "?????????", "value": "522722" }, { "label": "?????????", "value": "522723" }, { "label": "?????????", "value": "522725" }, { "label": "?????????", "value": "522726" }, { "label": "?????????", "value": "522727" }, { "label": "?????????", "value": "522728" }, { "label": "?????????", "value": "522729" }, { "label": "?????????", "value": "522730" }, { "label": "?????????", "value": "522731" }, { "label": "?????????????????????", "value": "522732" }]], [[{ "label": "?????????", "value": "530102" }, { "label": "?????????", "value": "530103" }, { "label": "?????????", "value": "530111" }, { "label": "?????????", "value": "530112" }, { "label": "?????????", "value": "530113" }, { "label": "?????????", "value": "530114" }, { "label": "?????????", "value": "530115" }, { "label": "?????????", "value": "530124" }, { "label": "?????????", "value": "530125" }, { "label": "?????????????????????", "value": "530126" }, { "label": "?????????", "value": "530127" }, { "label": "???????????????????????????", "value": "530128" }, { "label": "???????????????????????????", "value": "530129" }, { "label": "?????????", "value": "530181" }], [{ "label": "?????????", "value": "530302" }, { "label": "?????????", "value": "530303" }, { "label": "?????????", "value": "530321" }, { "label": "?????????", "value": "530322" }, { "label": "?????????", "value": "530323" }, { "label": "?????????", "value": "530324" }, { "label": "?????????", "value": "530325" }, { "label": "?????????", "value": "530326" }, { "label": "?????????", "value": "530381" }], [{ "label": "?????????", "value": "530402" }, { "label": "?????????", "value": "530403" }, { "label": "?????????", "value": "530422" }, { "label": "?????????", "value": "530423" }, { "label": "?????????", "value": "530424" }, { "label": "?????????", "value": "530425" }, { "label": "?????????????????????", "value": "530426" }, { "label": "???????????????????????????", "value": "530427" }, { "label": "????????????????????????????????????", "value": "530428" }], [{ "label": "?????????", "value": "530502" }, { "label": "?????????", "value": "530521" }, { "label": "?????????", "value": "530523" }, { "label": "?????????", "value": "530524" }, { "label": "?????????", "value": "530581" }], [{ "label": "?????????", "value": "530602" }, { "label": "?????????", "value": "530621" }, { "label": "?????????", "value": "530622" }, { "label": "?????????", "value": "530623" }, { "label": "?????????", "value": "530624" }, { "label": "?????????", "value": "530625" }, { "label": "?????????", "value": "530626" }, { "label": "?????????", "value": "530627" }, { "label": "?????????", "value": "530628" }, { "label": "?????????", "value": "530629" }, { "label": "?????????", "value": "530630" }], [{ "label": "?????????", "value": "530702" }, { "label": "????????????????????????", "value": "530721" }, { "label": "?????????", "value": "530722" }, { "label": "?????????", "value": "530723" }, { "label": "?????????????????????", "value": "530724" }], [{ "label": "?????????", "value": "530802" }, { "label": "??????????????????????????????", "value": "530821" }, { "label": "????????????????????????", "value": "530822" }, { "label": "?????????????????????", "value": "530823" }, { "label": "???????????????????????????", "value": "530824" }, { "label": "???????????????????????????????????????", "value": "530825" }, { "label": "??????????????????????????????", "value": "530826" }, { "label": "????????????????????????????????????", "value": "530827" }, { "label": "????????????????????????", "value": "530828" }, { "label": "?????????????????????", "value": "530829" }], [{ "label": "?????????", "value": "530902" }, { "label": "?????????", "value": "530921" }, { "label": "??????", "value": "530922" }, { "label": "?????????", "value": "530923" }, { "label": "?????????", "value": "530924" }, { "label": "?????????????????????????????????????????????", "value": "530925" }, { "label": "???????????????????????????", "value": "530926" }, { "label": "?????????????????????", "value": "530927" }], [{ "label": "?????????", "value": "532301" }, { "label": "?????????", "value": "532322" }, { "label": "?????????", "value": "532323" }, { "label": "?????????", "value": "532324" }, { "label": "?????????", "value": "532325" }, { "label": "?????????", "value": "532326" }, { "label": "?????????", "value": "532327" }, { "label": "?????????", "value": "532328" }, { "label": "?????????", "value": "532329" }, { "label": "?????????", "value": "532331" }], [{ "label": "?????????", "value": "532501" }, { "label": "?????????", "value": "532502" }, { "label": "?????????", "value": "532503" }, { "label": "?????????", "value": "532504" }, { "label": "?????????????????????", "value": "532523" }, { "label": "?????????", "value": "532524" }, { "label": "?????????", "value": "532525" }, { "label": "?????????", "value": "532527" }, { "label": "?????????", "value": "532528" }, { "label": "?????????", "value": "532529" }, { "label": "?????????????????????????????????", "value": "532530" }, { "label": "?????????", "value": "532531" }, { "label": "?????????????????????", "value": "532532" }], [{ "label": "?????????", "value": "532601" }, { "label": "?????????", "value": "532622" }, { "label": "?????????", "value": "532623" }, { "label": "????????????", "value": "532624" }, { "label": "?????????", "value": "532625" }, { "label": "?????????", "value": "532626" }, { "label": "?????????", "value": "532627" }, { "label": "?????????", "value": "532628" }], [{ "label": "?????????", "value": "532801" }, { "label": "?????????", "value": "532822" }, { "label": "?????????", "value": "532823" }], [{ "label": "?????????", "value": "532901" }, { "label": "?????????????????????", "value": "532922" }, { "label": "?????????", "value": "532923" }, { "label": "?????????", "value": "532924" }, { "label": "?????????", "value": "532925" }, { "label": "?????????????????????", "value": "532926" }, { "label": "???????????????????????????", "value": "532927" }, { "label": "?????????", "value": "532928" }, { "label": "?????????", "value": "532929" }, { "label": "?????????", "value": "532930" }, { "label": "?????????", "value": "532931" }, { "label": "?????????", "value": "532932" }], [{ "label": "?????????", "value": "533102" }, { "label": "??????", "value": "533103" }, { "label": "?????????", "value": "533122" }, { "label": "?????????", "value": "533123" }, { "label": "?????????", "value": "533124" }], [{ "label": "?????????", "value": "533301" }, { "label": "?????????", "value": "533323" }, { "label": "??????????????????????????????", "value": "533324" }, { "label": "??????????????????????????????", "value": "533325" }], [{ "label": "???????????????", "value": "533401" }, { "label": "?????????", "value": "533422" }, { "label": "????????????????????????", "value": "533423" }]], [[{ "label": "?????????", "value": "540102" }, { "label": "???????????????", "value": "540103" }, { "label": "?????????", "value": "540121" }, { "label": "?????????", "value": "540122" }, { "label": "?????????", "value": "540123" }, { "label": "?????????", "value": "540124" }, { "label": "?????????", "value": "540126" }, { "label": "???????????????", "value": "540127" }, { "label": "???????????????????????????", "value": "540171" }, { "label": "???????????????????????????", "value": "540172" }, { "label": "??????????????????????????????", "value": "540173" }, { "label": "??????????????????", "value": "540174" }], [{ "label": "????????????", "value": "540202" }, { "label": "????????????", "value": "540221" }, { "label": "?????????", "value": "540222" }, { "label": "?????????", "value": "540223" }, { "label": "?????????", "value": "540224" }, { "label": "?????????", "value": "540225" }, { "label": "?????????", "value": "540226" }, { "label": "????????????", "value": "540227" }, { "label": "?????????", "value": "540228" }, { "label": "?????????", "value": "540229" }, { "label": "?????????", "value": "540230" }, { "label": "?????????", "value": "540231" }, { "label": "?????????", "value": "540232" }, { "label": "?????????", "value": "540233" }, { "label": "?????????", "value": "540234" }, { "label": "????????????", "value": "540235" }, { "label": "?????????", "value": "540236" }, { "label": "?????????", "value": "540237" }], [{ "label": "?????????", "value": "540302" }, { "label": "?????????", "value": "540321" }, { "label": "?????????", "value": "540322" }, { "label": "????????????", "value": "540323" }, { "label": "?????????", "value": "540324" }, { "label": "?????????", "value": "540325" }, { "label": "?????????", "value": "540326" }, { "label": "?????????", "value": "540327" }, { "label": "?????????", "value": "540328" }, { "label": "?????????", "value": "540329" }, { "label": "?????????", "value": "540330" }], [{ "label": "?????????", "value": "540402" }, { "label": "???????????????", "value": "540421" }, { "label": "?????????", "value": "540422" }, { "label": "?????????", "value": "540423" }, { "label": "?????????", "value": "540424" }, { "label": "?????????", "value": "540425" }, { "label": "??????", "value": "540426" }], [{ "label": "?????????", "value": "540502" }, { "label": "?????????", "value": "540521" }, { "label": "?????????", "value": "540522" }, { "label": "?????????", "value": "540523" }, { "label": "?????????", "value": "540524" }, { "label": "?????????", "value": "540525" }, { "label": "?????????", "value": "540526" }, { "label": "?????????", "value": "540527" }, { "label": "?????????", "value": "540528" }, { "label": "?????????", "value": "540529" }, { "label": "?????????", "value": "540530" }, { "label": "????????????", "value": "540531" }], [{ "label": "?????????", "value": "542421" }, { "label": "?????????", "value": "542422" }, { "label": "?????????", "value": "542423" }, { "label": "?????????", "value": "542424" }, { "label": "?????????", "value": "542425" }, { "label": "?????????", "value": "542426" }, { "label": "??????", "value": "542427" }, { "label": "?????????", "value": "542428" }, { "label": "?????????", "value": "542429" }, { "label": "?????????", "value": "542430" }, { "label": "?????????", "value": "542431" }], [{ "label": "?????????", "value": "542521" }, { "label": "?????????", "value": "542522" }, { "label": "?????????", "value": "542523" }, { "label": "?????????", "value": "542524" }, { "label": "?????????", "value": "542525" }, { "label": "?????????", "value": "542526" }, { "label": "?????????", "value": "542527" }]], [[{ "label": "?????????", "value": "610102" }, { "label": "?????????", "value": "610103" }, { "label": "?????????", "value": "610104" }, { "label": "?????????", "value": "610111" }, { "label": "?????????", "value": "610112" }, { "label": "?????????", "value": "610113" }, { "label": "?????????", "value": "610114" }, { "label": "?????????", "value": "610115" }, { "label": "?????????", "value": "610116" }, { "label": "?????????", "value": "610117" }, { "label": "?????????", "value": "610118" }, { "label": "?????????", "value": "610122" }, { "label": "?????????", "value": "610124" }], [{ "label": "?????????", "value": "610202" }, { "label": "?????????", "value": "610203" }, { "label": "?????????", "value": "610204" }, { "label": "?????????", "value": "610222" }], [{ "label": "?????????", "value": "610302" }, { "label": "?????????", "value": "610303" }, { "label": "?????????", "value": "610304" }, { "label": "?????????", "value": "610322" }, { "label": "?????????", "value": "610323" }, { "label": "?????????", "value": "610324" }, { "label": "??????", "value": "610326" }, { "label": "??????", "value": "610327" }, { "label": "?????????", "value": "610328" }, { "label": "?????????", "value": "610329" }, { "label": "??????", "value": "610330" }, { "label": "?????????", "value": "610331" }], [{ "label": "?????????", "value": "610402" }, { "label": "?????????", "value": "610403" }, { "label": "?????????", "value": "610404" }, { "label": "?????????", "value": "610422" }, { "label": "?????????", "value": "610423" }, { "label": "??????", "value": "610424" }, { "label": "?????????", "value": "610425" }, { "label": "?????????", "value": "610426" }, { "label": "??????", "value": "610427" }, { "label": "?????????", "value": "610428" }, { "label": "?????????", "value": "610429" }, { "label": "?????????", "value": "610430" }, { "label": "?????????", "value": "610431" }, { "label": "?????????", "value": "610481" }], [{ "label": "?????????", "value": "610502" }, { "label": "?????????", "value": "610503" }, { "label": "?????????", "value": "610522" }, { "label": "?????????", "value": "610523" }, { "label": "?????????", "value": "610524" }, { "label": "?????????", "value": "610525" }, { "label": "?????????", "value": "610526" }, { "label": "?????????", "value": "610527" }, { "label": "?????????", "value": "610528" }, { "label": "?????????", "value": "610581" }, { "label": "?????????", "value": "610582" }], [{ "label": "?????????", "value": "610602" }, { "label": "?????????", "value": "610603" }, { "label": "?????????", "value": "610621" }, { "label": "?????????", "value": "610622" }, { "label": "?????????", "value": "610623" }, { "label": "?????????", "value": "610625" }, { "label": "?????????", "value": "610626" }, { "label": "?????????", "value": "610627" }, { "label": "??????", "value": "610628" }, { "label": "?????????", "value": "610629" }, { "label": "?????????", "value": "610630" }, { "label": "?????????", "value": "610631" }, { "label": "?????????", "value": "610632" }], [{ "label": "?????????", "value": "610702" }, { "label": "?????????", "value": "610703" }, { "label": "?????????", "value": "610722" }, { "label": "??????", "value": "610723" }, { "label": "?????????", "value": "610724" }, { "label": "??????", "value": "610725" }, { "label": "?????????", "value": "610726" }, { "label": "?????????", "value": "610727" }, { "label": "?????????", "value": "610728" }, { "label": "?????????", "value": "610729" }, { "label": "?????????", "value": "610730" }], [{ "label": "?????????", "value": "610802" }, { "label": "?????????", "value": "610803" }, { "label": "?????????", "value": "610822" }, { "label": "?????????", "value": "610824" }, { "label": "?????????", "value": "610825" }, { "label": "?????????", "value": "610826" }, { "label": "?????????", "value": "610827" }, { "label": "??????", "value": "610828" }, { "label": "?????????", "value": "610829" }, { "label": "?????????", "value": "610830" }, { "label": "?????????", "value": "610831" }, { "label": "?????????", "value": "610881" }], [{ "label": "?????????", "value": "610902" }, { "label": "?????????", "value": "610921" }, { "label": "?????????", "value": "610922" }, { "label": "?????????", "value": "610923" }, { "label": "?????????", "value": "610924" }, { "label": "?????????", "value": "610925" }, { "label": "?????????", "value": "610926" }, { "label": "?????????", "value": "610927" }, { "label": "?????????", "value": "610928" }, { "label": "?????????", "value": "610929" }], [{ "label": "?????????", "value": "611002" }, { "label": "?????????", "value": "611021" }, { "label": "?????????", "value": "611022" }, { "label": "?????????", "value": "611023" }, { "label": "?????????", "value": "611024" }, { "label": "?????????", "value": "611025" }, { "label": "?????????", "value": "611026" }]], [[{ "label": "?????????", "value": "620102" }, { "label": "????????????", "value": "620103" }, { "label": "?????????", "value": "620104" }, { "label": "?????????", "value": "620105" }, { "label": "?????????", "value": "620111" }, { "label": "?????????", "value": "620121" }, { "label": "?????????", "value": "620122" }, { "label": "?????????", "value": "620123" }, { "label": "????????????", "value": "620171" }], [{ "label": "????????????", "value": "620201" }], [{ "label": "?????????", "value": "620302" }, { "label": "?????????", "value": "620321" }], [{ "label": "?????????", "value": "620402" }, { "label": "?????????", "value": "620403" }, { "label": "?????????", "value": "620421" }, { "label": "?????????", "value": "620422" }, { "label": "?????????", "value": "620423" }], [{ "label": "?????????", "value": "620502" }, { "label": "?????????", "value": "620503" }, { "label": "?????????", "value": "620521" }, { "label": "?????????", "value": "620522" }, { "label": "?????????", "value": "620523" }, { "label": "?????????", "value": "620524" }, { "label": "????????????????????????", "value": "620525" }], [{ "label": "?????????", "value": "620602" }, { "label": "?????????", "value": "620621" }, { "label": "?????????", "value": "620622" }, { "label": "?????????????????????", "value": "620623" }], [{ "label": "?????????", "value": "620702" }, { "label": "????????????????????????", "value": "620721" }, { "label": "?????????", "value": "620722" }, { "label": "?????????", "value": "620723" }, { "label": "?????????", "value": "620724" }, { "label": "?????????", "value": "620725" }], [{ "label": "?????????", "value": "620802" }, { "label": "?????????", "value": "620821" }, { "label": "?????????", "value": "620822" }, { "label": "?????????", "value": "620823" }, { "label": "?????????", "value": "620824" }, { "label": "?????????", "value": "620825" }, { "label": "?????????", "value": "620826" }, { "label": "??????????????????", "value": "620871" }], [{ "label": "?????????", "value": "620902" }, { "label": "?????????", "value": "620921" }, { "label": "?????????", "value": "620922" }, { "label": "????????????????????????", "value": "620923" }, { "label": "??????????????????????????????", "value": "620924" }, { "label": "?????????", "value": "620981" }, { "label": "?????????", "value": "620982" }], [{ "label": "?????????", "value": "621002" }, { "label": "?????????", "value": "621021" }, { "label": "??????", "value": "621022" }, { "label": "?????????", "value": "621023" }, { "label": "?????????", "value": "621024" }, { "label": "?????????", "value": "621025" }, { "label": "??????", "value": "621026" }, { "label": "?????????", "value": "621027" }], [{ "label": "?????????", "value": "621102" }, { "label": "?????????", "value": "621121" }, { "label": "?????????", "value": "621122" }, { "label": "?????????", "value": "621123" }, { "label": "?????????", "value": "621124" }, { "label": "??????", "value": "621125" }, { "label": "??????", "value": "621126" }], [{ "label": "?????????", "value": "621202" }, { "label": "??????", "value": "621221" }, { "label": "??????", "value": "621222" }, { "label": "?????????", "value": "621223" }, { "label": "??????", "value": "621224" }, { "label": "?????????", "value": "621225" }, { "label": "??????", "value": "621226" }, { "label": "??????", "value": "621227" }, { "label": "?????????", "value": "621228" }], [{ "label": "?????????", "value": "622901" }, { "label": "?????????", "value": "622921" }, { "label": "?????????", "value": "622922" }, { "label": "?????????", "value": "622923" }, { "label": "?????????", "value": "622924" }, { "label": "?????????", "value": "622925" }, { "label": "??????????????????", "value": "622926" }, { "label": "?????????????????????????????????????????????", "value": "622927" }], [{ "label": "?????????", "value": "623001" }, { "label": "?????????", "value": "623021" }, { "label": "?????????", "value": "623022" }, { "label": "?????????", "value": "623023" }, { "label": "?????????", "value": "623024" }, { "label": "?????????", "value": "623025" }, { "label": "?????????", "value": "623026" }, { "label": "?????????", "value": "623027" }]], [[{ "label": "?????????", "value": "630102" }, { "label": "?????????", "value": "630103" }, { "label": "?????????", "value": "630104" }, { "label": "?????????", "value": "630105" }, { "label": "???????????????????????????", "value": "630121" }, { "label": "?????????", "value": "630122" }, { "label": "?????????", "value": "630123" }], [{ "label": "?????????", "value": "630202" }, { "label": "?????????", "value": "630203" }, { "label": "???????????????????????????", "value": "630222" }, { "label": "?????????????????????", "value": "630223" }, { "label": "?????????????????????", "value": "630224" }, { "label": "????????????????????????", "value": "630225" }], [{ "label": "?????????????????????", "value": "632221" }, { "label": "?????????", "value": "632222" }, { "label": "?????????", "value": "632223" }, { "label": "?????????", "value": "632224" }], [{ "label": "?????????", "value": "632321" }, { "label": "?????????", "value": "632322" }, { "label": "?????????", "value": "632323" }, { "label": "????????????????????????", "value": "632324" }], [{ "label": "?????????", "value": "632521" }, { "label": "?????????", "value": "632522" }, { "label": "?????????", "value": "632523" }, { "label": "?????????", "value": "632524" }, { "label": "?????????", "value": "632525" }], [{ "label": "?????????", "value": "632621" }, { "label": "?????????", "value": "632622" }, { "label": "?????????", "value": "632623" }, { "label": "?????????", "value": "632624" }, { "label": "?????????", "value": "632625" }, { "label": "?????????", "value": "632626" }], [{ "label": "?????????", "value": "632701" }, { "label": "?????????", "value": "632722" }, { "label": "?????????", "value": "632723" }, { "label": "?????????", "value": "632724" }, { "label": "?????????", "value": "632725" }, { "label": "????????????", "value": "632726" }], [{ "label": "????????????", "value": "632801" }, { "label": "????????????", "value": "632802" }, { "label": "?????????", "value": "632821" }, { "label": "?????????", "value": "632822" }, { "label": "?????????", "value": "632823" }, { "label": "????????????????????????", "value": "632857" }, { "label": "?????????????????????", "value": "632858" }, { "label": "?????????????????????", "value": "632859" }]], [[{ "label": "?????????", "value": "640104" }, { "label": "?????????", "value": "640105" }, { "label": "?????????", "value": "640106" }, { "label": "?????????", "value": "640121" }, { "label": "?????????", "value": "640122" }, { "label": "?????????", "value": "640181" }], [{ "label": "????????????", "value": "640202" }, { "label": "?????????", "value": "640205" }, { "label": "?????????", "value": "640221" }], [{ "label": "?????????", "value": "640302" }, { "label": "????????????", "value": "640303" }, { "label": "?????????", "value": "640323" }, { "label": "?????????", "value": "640324" }, { "label": "????????????", "value": "640381" }], [{ "label": "?????????", "value": "640402" }, { "label": "?????????", "value": "640422" }, { "label": "?????????", "value": "640423" }, { "label": "?????????", "value": "640424" }, { "label": "?????????", "value": "640425" }], [{ "label": "????????????", "value": "640502" }, { "label": "?????????", "value": "640521" }, { "label": "?????????", "value": "640522" }]], [[{ "label": "?????????", "value": "650102" }, { "label": "???????????????", "value": "650103" }, { "label": "?????????", "value": "650104" }, { "label": "????????????", "value": "650105" }, { "label": "????????????", "value": "650106" }, { "label": "????????????", "value": "650107" }, { "label": "?????????", "value": "650109" }, { "label": "???????????????", "value": "650121" }, { "label": "?????????????????????????????????", "value": "650171" }, { "label": "???????????????????????????????????????", "value": "650172" }], [{ "label": "????????????", "value": "650202" }, { "label": "???????????????", "value": "650203" }, { "label": "????????????", "value": "650204" }, { "label": "????????????", "value": "650205" }], [{ "label": "?????????", "value": "650402" }, { "label": "?????????", "value": "650421" }, { "label": "????????????", "value": "650422" }], [{ "label": "?????????", "value": "650502" }, { "label": "???????????????????????????", "value": "650521" }, { "label": "?????????", "value": "650522" }], [{ "label": "?????????", "value": "652301" }, { "label": "?????????", "value": "652302" }, { "label": "????????????", "value": "652323" }, { "label": "????????????", "value": "652324" }, { "label": "?????????", "value": "652325" }, { "label": "???????????????", "value": "652327" }, { "label": "????????????????????????", "value": "652328" }], [{ "label": "?????????", "value": "652701" }, { "label": "???????????????", "value": "652702" }, { "label": "?????????", "value": "652722" }, { "label": "?????????", "value": "652723" }], [{ "label": "????????????", "value": "652801" }, { "label": "?????????", "value": "652822" }, { "label": "?????????", "value": "652823" }, { "label": "?????????", "value": "652824" }, { "label": "?????????", "value": "652825" }, { "label": "?????????????????????", "value": "652826" }, { "label": "?????????", "value": "652827" }, { "label": "?????????", "value": "652828" }, { "label": "?????????", "value": "652829" }, { "label": "??????????????????????????????", "value": "652871" }], [{ "label": "????????????", "value": "652901" }, { "label": "?????????", "value": "652922" }, { "label": "?????????", "value": "652923" }, { "label": "?????????", "value": "652924" }, { "label": "?????????", "value": "652925" }, { "label": "?????????", "value": "652926" }, { "label": "?????????", "value": "652927" }, { "label": "????????????", "value": "652928" }, { "label": "?????????", "value": "652929" }], [{ "label": "????????????", "value": "653001" }, { "label": "????????????", "value": "653022" }, { "label": "????????????", "value": "653023" }, { "label": "?????????", "value": "653024" }], [{ "label": "?????????", "value": "653101" }, { "label": "?????????", "value": "653121" }, { "label": "?????????", "value": "653122" }, { "label": "????????????", "value": "653123" }, { "label": "?????????", "value": "653124" }, { "label": "?????????", "value": "653125" }, { "label": "?????????", "value": "653126" }, { "label": "????????????", "value": "653127" }, { "label": "????????????", "value": "653128" }, { "label": "?????????", "value": "653129" }, { "label": "?????????", "value": "653130" }, { "label": "?????????????????????????????????", "value": "653131" }], [{ "label": "?????????", "value": "653201" }, { "label": "?????????", "value": "653221" }, { "label": "?????????", "value": "653222" }, { "label": "?????????", "value": "653223" }, { "label": "?????????", "value": "653224" }, { "label": "?????????", "value": "653225" }, { "label": "?????????", "value": "653226" }, { "label": "?????????", "value": "653227" }], [{ "label": "?????????", "value": "654002" }, { "label": "?????????", "value": "654003" }, { "label": "???????????????", "value": "654004" }, { "label": "?????????", "value": "654021" }, { "label": "???????????????????????????", "value": "654022" }, { "label": "?????????", "value": "654023" }, { "label": "?????????", "value": "654024" }, { "label": "?????????", "value": "654025" }, { "label": "?????????", "value": "654026" }, { "label": "????????????", "value": "654027" }, { "label": "????????????", "value": "654028" }], [{ "label": "?????????", "value": "654201" }, { "label": "?????????", "value": "654202" }, { "label": "?????????", "value": "654221" }, { "label": "?????????", "value": "654223" }, { "label": "?????????", "value": "654224" }, { "label": "?????????", "value": "654225" }, { "label": "??????????????????????????????", "value": "654226" }], [{ "label": "????????????", "value": "654301" }, { "label": "????????????", "value": "654321" }, { "label": "?????????", "value": "654322" }, { "label": "?????????", "value": "654323" }, { "label": "????????????", "value": "654324" }, { "label": "?????????", "value": "654325" }, { "label": "????????????", "value": "654326" }], [{ "label": "????????????", "value": "659001" }, { "label": "????????????", "value": "659002" }, { "label": "???????????????", "value": "659003" }, { "label": "????????????", "value": "659004" }, { "label": "????????????", "value": "659006" }]], [[{ "label": "??????", "value": "660101" }], [{ "label": "??????", "value": "660201" }], [{ "label": "??????", "value": "660301" }], [{ "label": "??????", "value": "660401" }], [{ "label": "??????", "value": "660501" }], [{ "label": "??????", "value": "660601" }], [{ "label": "??????", "value": "660701" }], [{ "label": "??????", "value": "660801" }], [{ "label": "??????", "value": "660901" }], [{ "label": "??????", "value": "661001" }], [{ "label": "??????", "value": "661101" }], [{ "label": "??????", "value": "661201" }], [{ "label": "??????", "value": "661301" }], [{ "label": "??????", "value": "661401" }], [{ "label": "??????", "value": "661501" }], [{ "label": "??????", "value": "661601" }], [{ "label": "??????", "value": "661701" }]], [[{ "label": "?????????", "value": "670101" }], [{ "label": "??????", "value": "670201" }], [{ "label": "??????", "value": "670301" }]], [[{ "label": "????????????", "value": "680101" }], [{ "label": "?????????", "value": "680201" }], [{ "label": "?????????", "value": "680301" }], [{ "label": "?????????", "value": "680401" }]]];var _default = areaData;exports.default = _default;

/***/ }),

/***/ 979:
/*!******************************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/components/u-parse/libs/MpHtmlParser.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * html ?????????
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20201029
 * @author JinYufeng
 * @listens MIT
 */
var cfg = __webpack_require__(/*! ./config.js */ 980),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 981),
windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;

function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.attrs = {};
  this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
  this.data = data;
  this.domain = options.domain;
  this.DOM = [];
  this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
  options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
  this.options = options;
  this.state = this.Text;
  this.STACK = [];
  // ????????????
  this.bubble = function () {
    for (var i = _this.STACK.length, item; item = _this.STACK[--i];) {
      if (cfg.richOnlyTags[item.name]) return false;
      item.c = 1;
    }
    return true;
  };
  this.decode = function (val, amp) {
    var i = -1,
    j,en;
    while (1) {
      if ((i = val.indexOf('&', i + 1)) == -1) break;
      if ((j = val.indexOf(';', i + 2)) == -1) break;
      if (val[i + 1] == '#') {
        en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
        if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
      } else {
        en = val.substring(i + 1, j);
        if (cfg.entities[en] || en == amp)
        val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
      }
    }
    return val;
  };
  this.getUrl = function (url) {
    if (url[0] == '/') {
      if (url[1] == '/') url = _this.options.prot + ':' + url;else
      if (_this.domain) url = _this.domain + url;
    } else if (_this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
    url = _this.domain + '/' + url;
    return url;
  };
  this.isClose = function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';};
  this.section = function () {return _this.data.substring(_this.start, _this.i);};
  this.parent = function () {return _this.STACK[_this.STACK.length - 1];};
  this.siblings = function () {return _this.STACK.length ? _this.parent().children : _this.DOM;};
}
MpHtmlParser.prototype.parse = function () {
  if (emoji) this.data = emoji.parseEmoji(this.data);
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  if (this.state == this.Text) this.setText();
  while (this.STACK.length) {this.popNode(this.STACK.pop());}
  return this.DOM;
};
// ????????????
MpHtmlParser.prototype.setAttr = function () {
  var name = this.attrName.toLowerCase(),
  val = this.attrVal;
  if (cfg.boolAttrs[name]) this.attrs[name] = 'T';else
  if (val) {
    if (name == 'src' || name == 'data-src' && !this.attrs.src) this.attrs.src = this.getUrl(this.decode(val, 'amp'));else
    if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else
    if (name.substr(0, 5) != 'data-') this.attrs[name] = val;
  }
  this.attrVal = '';
  while (blankChar[this.data[this.i]]) {this.i++;}
  if (this.isClose()) this.setNode();else
  {
    this.start = this.i;
    this.state = this.AttrName;
  }
};
// ??????????????????
MpHtmlParser.prototype.setText = function () {
  var back,text = this.section();
  if (!text) return;
  text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;
  if (back) {
    this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
    var j = this.start + text.length;
    for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}
    return;
  }
  if (!this.pre) {
    // ???????????????
    var flag,tmp = [];
    for (var i = text.length, c; c = text[--i];) {
      if (!blankChar[c]) {
        tmp.unshift(c);
        if (!flag) flag = 1;
      } else {
        if (tmp[0] != ' ') tmp.unshift(' ');
        if (c == '\n' && flag == void 0) flag = 0;
      }}
    if (flag == 0) return;
    text = tmp.join('');
  }
  this.siblings().push({
    type: 'text',
    text: this.decode(text) });

};
// ??????????????????
MpHtmlParser.prototype.setNode = function () {
  var node = {
    name: this.tagName.toLowerCase(),
    attrs: this.attrs },

  close = cfg.selfClosingTags[node.name];
  if (this.options.nodes.length) node.type = 'node';
  this.attrs = {};
  if (!cfg.ignoreTags[node.name]) {
    // ????????????
    var attrs = node.attrs,
    style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
    styleObj = {};
    if (attrs.id) {
      if (this.options.compress & 1) attrs.id = void 0;else
      if (this.options.useAnchor) this.bubble();
    }
    if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
    switch (node.name) {
      case 'a':
      case 'ad':


        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'embed':

        var src = node.attrs.src || '',
        type = node.attrs.type || '';
        if (type.includes('video') || src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8'))
        node.name = 'video';else
        if (type.includes('audio') || src.includes('.m4a') || src.includes('.wav') || src.includes('.mp3') || src.includes(
        '.aac'))
        node.name = 'audio';else
        break;
        if (node.attrs.autostart)
        node.attrs.autoplay = 'T';
        node.attrs.controls = 'T';





      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else
        this["".concat(node.name, "Num")]++;
        if (node.name == 'video') {
          if (this.videoNum > 3)
          node.lazyLoad = 1;
          if (attrs.width) {
            styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
            attrs.width = void 0;
          }
          if (attrs.height) {
            styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
            attrs.height = void 0;
          }
        }
        if (!attrs.controls && !attrs.autoplay) attrs.controls = 'T';
        attrs.source = [];
        if (attrs.src) {
          attrs.source.push(attrs.src);
          attrs.src = void 0;
        }
        this.bubble();
        break;
      case 'td':
      case 'th':
        if (attrs.colspan || attrs.rowspan)
        for (var k = this.STACK.length, item; item = this.STACK[--k];) {
          if (item.name == 'table') {
            item.flag = 1;
            break;
          }}}

    if (attrs.align) {
      if (node.name == 'table') {
        if (attrs.align == 'center') styleObj['margin-inline-start'] = styleObj['margin-inline-end'] = 'auto';else
        styleObj['float'] = attrs.align;
      } else styleObj['text-align'] = attrs.align;
      attrs.align = void 0;
    }
    // ?????? style
    var styles = style.split(';');
    style = '';
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var _key = info[0].trim().toLowerCase(),
      _value = info.slice(1).join(':').trim();
      if (_value[0] == '-' || _value.includes('safe'))
      style += ";".concat(_key, ":").concat(_value);else
      if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import'))
      styleObj[_key] = _value;
    }
    if (node.name == 'img') {
      if (attrs.src && !attrs.ignore) {
        if (this.bubble())
        attrs.i = (this.imgNum++).toString();else
        attrs.ignore = 'T';
      }
      if (attrs.ignore) {
        style += ';-webkit-touch-callout:none';
        styleObj['max-width'] = '100%';
      }
      var width;
      if (styleObj.width) width = styleObj.width;else
      if (attrs.width) width = attrs.width.includes('%') ? attrs.width : parseFloat(attrs.width) + 'px';
      if (width) {
        styleObj.width = width;
        attrs.width = '100%';
        if (parseInt(width) > windowWidth) {
          styleObj.height = '';
          if (attrs.height) attrs.height = void 0;
        }
      }
      if (styleObj.height) {
        attrs.height = styleObj.height;
        styleObj.height = '';
      } else if (attrs.height && !attrs.height.includes('%'))
      attrs.height = parseFloat(attrs.height) + 'px';
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (!value) continue;
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // ????????????
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      }
      // ?????? rpx
      else if (value.includes('rpx'))
        value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * windowWidth / 750 + 'px';});else
        if (key == 'white-space' && value.includes('pre') && !close)
        this.pre = node.pre = true;
      style += ";".concat(key, ":").concat(value);
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (!close) {
      node.children = [];
      if (node.name == 'pre' && cfg.highlight) {
        this.remove(node);
        this.pre = node.pre = true;
      }
      this.siblings().push(node);
      this.STACK.push(node);
    } else if (!cfg.filter || cfg.filter(node, this) != false)
    this.siblings().push(node);
  } else {
    if (!close) this.remove(node);else
    if (node.name == 'source') {
      var parent = this.parent();
      if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
      parent.attrs.source.push(node.attrs.src);
    } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
  }
  if (this.data[this.i] == '/') this.i++;
  this.start = this.i + 1;
  this.state = this.Text;
};
// ????????????
MpHtmlParser.prototype.remove = function (node) {var _this2 = this;
  var name = node.name,
  j = this.i;
  // ?????? svg
  var handleSvg = function handleSvg() {
    var src = _this2.data.substring(j, _this2.i + 1);
    node.attrs.xmlns = 'http://www.w3.org/2000/svg';
    for (var key in node.attrs) {
      if (key == 'viewbox') src = " viewBox=\"".concat(node.attrs.viewbox, "\"") + src;else
      if (key != 'style') src = " ".concat(key, "=\"").concat(node.attrs[key], "\"") + src;
    }
    src = '<svg' + src;
    var parent = _this2.parent();
    if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
    parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
    _this2.siblings().push({
      name: 'img',
      attrs: {
        src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
        style: node.attrs.style,
        ignore: 'T' } });


  };
  if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
  while (1) {
    if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
      if (name == 'pre' || name == 'svg') this.i = j;else
      this.i = this.data.length;
      return;
    }
    this.start = this.i += 2;
    while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}
    if (this.section().toLowerCase() == name) {
      // ???????????????
      if (name == 'pre') {
        this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.
        substr(this.i - 5);
        return this.i = j;
      } else if (name == 'style')
      this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else
      if (name == 'title')
      this.DOM.title = this.data.substring(j + 1, this.i - 7);
      if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
      if (name == 'svg') handleSvg();
      return;
    }
  }
};
// ??????????????????
MpHtmlParser.prototype.popNode = function (node) {
  // ???????????????
  if (node.pre) {
    node.pre = this.pre = void 0;
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].pre)
      this.pre = true;}
  }
  var siblings = this.siblings(),
  len = siblings.length,
  childs = node.children;
  if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false)
  return siblings.pop();
  var attrs = node.attrs;
  // ?????????????????????
  if (cfg.blockTags[node.name]) node.name = 'div';else
  if (!cfg.trustTags[node.name]) node.name = 'span';
  // ????????????
  if (node.c && (node.name == 'ul' || node.name == 'ol')) {
    if ((node.attrs.style || '').includes('list-style:none')) {
      for (var _i = 0, child; child = childs[_i++];) {
        if (child.name == 'li')
        child.name = 'div';}
    } else if (node.name == 'ul') {
      var floor = 1;
      for (var _i2 = this.STACK.length; _i2--;) {
        if (this.STACK[_i2].name == 'ul') floor++;}
      if (floor != 1)
      for (var _i3 = childs.length; _i3--;) {
        childs[_i3].floor = floor;}
    } else {
      for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
        if (_child.name == 'li') {
          _child.type = 'ol';
          _child.num = function (num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
              ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
              res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          }(num++, attrs.type) + '.';
        }}
    }
  }
  // ????????????
  if (node.name == 'table') {
    var padding = parseFloat(attrs.cellpadding),
    spacing = parseFloat(attrs.cellspacing),
    border = parseFloat(attrs.border);
    if (node.c) {
      if (isNaN(padding)) padding = 2;
      if (isNaN(spacing)) spacing = 2;
    }
    if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
    if (node.flag && node.c) {
      // ??? colspan ??? rowspan ?????????????????????????????? grid ????????????
      attrs.style = "".concat(attrs.style || '', ";").concat(spacing ? ";grid-gap:".concat(spacing, "px") : ';border-left:0;border-top:0');
      var row = 1,
      col = 1,
      colNum,
      trs = [],
      children = [],
      map = {};
      (function f(ns) {
        for (var i = 0; i < ns.length; i++) {
          if (ns[i].name == 'tr') trs.push(ns[i]);else
          f(ns[i].children || []);
        }
      })(node.children);
      for (var _i5 = 0; _i5 < trs.length; _i5++) {
        for (var j = 0, td; td = trs[_i5].children[j]; j++) {
          if (td.name == 'td' || td.name == 'th') {
            while (map[row + '.' + col]) {col++;}
            var cell = {
              name: 'div',
              c: 1,
              attrs: {
                style: (td.attrs.style || '') + (border ? ";border:".concat(border, "px solid gray") + (spacing ? '' :
                ';border-right:0;border-bottom:0') : '') + (padding ? ";padding:".concat(padding, "px") : '') },

              children: td.children };

            if (td.attrs.colspan) {
              cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + parseInt(td.attrs.colspan));
              if (!td.attrs.rowspan) cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + 1);
              col += parseInt(td.attrs.colspan) - 1;
            }
            if (td.attrs.rowspan) {
              cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + parseInt(td.attrs.rowspan));
              if (!td.attrs.colspan) cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + 1);
              for (var k = 1; k < td.attrs.rowspan; k++) {map[row + k + '.' + col] = 1;}
            }
            children.push(cell);
            col++;
          }
        }
        if (!colNum) {
          colNum = col - 1;
          attrs.style += ";grid-template-columns:repeat(".concat(colNum, ",auto)");
        }
        col = 1;
        row++;
      }
      node.children = children;
    } else {
      attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
      if (border || padding)
      (function f(ns) {
        for (var i = 0, n; n = ns[i]; i++) {
          if (n.name == 'th' || n.name == 'td') {
            if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style || '');
            if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style || '');
          } else f(n.children || []);
        }
      })(childs);
    }
    if (this.options.autoscroll) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:scroll' };

      node.children = [table];
    }
  }
  this.CssHandler.pop && this.CssHandler.pop(node);
  // ????????????
  if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
  siblings[len - 1] = childs[0];
};
// ?????????
MpHtmlParser.prototype.Text = function (c) {
  if (c == '<') {
    var next = this.data[this.i + 1],
    isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};
    if (isLetter(next)) {
      this.setText();
      this.start = this.i + 1;
      this.state = this.TagName;
    } else if (next == '/') {
      this.setText();
      if (isLetter(this.data[++this.i + 1])) {
        this.start = this.i + 1;
        this.state = this.EndTag;
      } else this.Comment();
    } else if (next == '!' || next == '?') {
      this.setText();
      this.Comment();
    }
  }
};
MpHtmlParser.prototype.Comment = function () {
  var key;
  if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
  if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
  key = '>';
  if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
  this.i += key.length - 1;
  this.start = this.i + 1;
  this.state = this.Text;
};
MpHtmlParser.prototype.TagName = function (c) {
  if (blankChar[c]) {
    this.tagName = this.section();
    while (blankChar[this.data[this.i]]) {this.i++;}
    if (this.isClose()) this.setNode();else
    {
      this.start = this.i;
      this.state = this.AttrName;
    }
  } else if (this.isClose()) {
    this.tagName = this.section();
    this.setNode();
  }
};
MpHtmlParser.prototype.AttrName = function (c) {
  if (c == '=' || blankChar[c] || this.isClose()) {
    this.attrName = this.section();
    if (blankChar[c])
    while (blankChar[this.data[++this.i]]) {;}
    if (this.data[this.i] == '=') {
      while (blankChar[this.data[++this.i]]) {;}
      this.start = this.i--;
      this.state = this.AttrValue;
    } else this.setAttr();
  }
};
MpHtmlParser.prototype.AttrValue = function (c) {
  if (c == '"' || c == "'") {
    this.start++;
    if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
    this.attrVal = this.section();
    this.i++;
  } else {
    for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
    this.attrVal = this.section();
  }
  this.setAttr();
};
MpHtmlParser.prototype.EndTag = function (c) {
  if (blankChar[c] || c == '>' || c == '/') {
    var name = this.section().toLowerCase();
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].name == name) break;}
    if (i != -1) {
      var node;
      while ((node = this.STACK.pop()).name != name) {this.popNode(node);}
      this.popNode(node);
    } else if (name == 'p' || name == 'br')
    this.siblings().push({
      name: name,
      attrs: {} });

    this.i = this.data.indexOf('>', this.i);
    this.start = this.i + 1;
    if (this.i == -1) this.i = this.data.length;else
    this.state = this.Text;
  }
};
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 980:
/*!************************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/components/u-parse/libs/config.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* ???????????? */
var cfg = {
  // ???????????????
  errorImg: null,
  // ???????????????
  filter: null,
  // ??????????????????
  highlight: null,
  // ??????????????????
  onText: null,
  // ??????????????????
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '???',
    mdash: '???',
    middot: '??',
    lsquo: '???',
    rsquo: '???',
    ldquo: '???',
    rdquo: '???',
    bull: '???',
    hellip: '???' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
  // ??????????????????????????? div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
  // ?????????????????????
  ignoreTags: makeMap('area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr'),
  // ????????? rich-text ???????????????
  richOnlyTags: makeMap('a,colgroup,fieldset,legend'),
  // ??????????????????
  selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // ???????????????
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'),
  // ?????????????????????
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = Object.create(null),
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}


if (wx.canIUse('editor')) {
  cfg.blockTags.pre = void 0;
  cfg.ignoreTags.rp = true;
  Object.assign(cfg.richOnlyTags, makeMap('bdi,bdo,caption,rt,ruby'));
  Object.assign(cfg.trustTags, makeMap('bdi,bdo,caption,pre,rt,ruby'));
}







module.exports = cfg;

/***/ }),

/***/ 981:
/*!****************************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/uview-ui/components/u-parse/libs/CssHandler.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cfg = __webpack_require__(/*! ./config.js */ 980),
isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};

function CssHandler(tagStyle) {
  var styles = Object.assign(Object.create(null), cfg.userAgentStyles);
  for (var item in tagStyle) {
    styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}
  this.styles = styles;
}
CssHandler.prototype.getStyle = function (data) {
  this.styles = new parser(data, this.styles).parse();
};
CssHandler.prototype.match = function (name, attrs) {
  var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
  if (attrs.class) {
    var items = attrs.class.split(' ');
    for (var i = 0, item; item = items[i]; i++) {
      if (tmp = this.styles['.' + item])
      matched += tmp + ';';}
  }
  if (tmp = this.styles['#' + attrs.id])
  matched += tmp + ';';
  return matched;
};
module.exports = CssHandler;

function parser(data, init) {
  this.data = data;
  this.floor = 0;
  this.i = 0;
  this.list = [];
  this.res = init;
  this.state = this.Space;
}
parser.prototype.parse = function () {
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  return this.res;
};
parser.prototype.section = function () {
  return this.data.substring(this.start, this.i);
};
// ?????????
parser.prototype.Space = function (c) {
  if (c == '.' || c == '#' || isLetter(c)) {
    this.start = this.i;
    this.state = this.Name;
  } else if (c == '/' && this.data[this.i + 1] == '*')
  this.Comment();else
  if (!cfg.blankChar[c] && c != ';')
  this.state = this.Ignore;
};
parser.prototype.Comment = function () {
  this.i = this.data.indexOf('*/', this.i) + 1;
  if (!this.i) this.i = this.data.length;
  this.state = this.Space;
};
parser.prototype.Ignore = function (c) {
  if (c == '{') this.floor++;else
  if (c == '}' && ! --this.floor) {
    this.list = [];
    this.state = this.Space;
  }
};
parser.prototype.Name = function (c) {
  if (cfg.blankChar[c]) {
    this.list.push(this.section());
    this.state = this.NameSpace;
  } else if (c == '{') {
    this.list.push(this.section());
    this.Content();
  } else if (c == ',') {
    this.list.push(this.section());
    this.Comma();
  } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
  this.state = this.Ignore;
};
parser.prototype.NameSpace = function (c) {
  if (c == '{') this.Content();else
  if (c == ',') this.Comma();else
  if (!cfg.blankChar[c]) this.state = this.Ignore;
};
parser.prototype.Comma = function () {
  while (cfg.blankChar[this.data[++this.i]]) {;}
  if (this.data[this.i] == '{') this.Content();else
  {
    this.start = this.i--;
    this.state = this.Name;
  }
};
parser.prototype.Content = function () {
  this.start = ++this.i;
  if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
  var content = this.section();
  for (var i = 0, item; item = this.list[i++];) {
    if (this.res[item]) this.res[item] += ';' + content;else
    this.res[item] = content;}
  this.list = [];
  this.state = this.Space;
};

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map