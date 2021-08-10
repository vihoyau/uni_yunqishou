(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/public/common/vendor"],{

/***/ 1109:
/*!**************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/pages/public/chat/shopro/chat.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));










var _env = __webpack_require__(/*! @/env.js */ 19);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}



var service = _env.BASE_URL.split('://')[1].split(':')[0];var

Socket = /*#__PURE__*/function () {
  function Socket(initData, callback) {_classCallCheck(this, Socket);var

    ping =



    initData.ping,is_ssl = initData.is_ssl,gateway_port = initData.gateway_port,ssl_type = initData.ssl_type;

    var url = "".concat(is_ssl ? 'wss' : 'ws', "://").concat(service, ":").concat(gateway_port, "/");
    if (is_ssl && ssl_type === 'reverse_proxy') {
      url = "wss://".concat(service, "/websocket/");
    }
    this.config = {
      url: url,
      session_id: uni.getStorageSync('chatSessionId'),
      token: uni.getStorageSync('token'),
      identify: 'user' };

    this.callback = callback; //onmsg回调
    this.timeoutObj = null; //心跳检测定时器对象
    this.lockReconnect = false; //检测次数锁
    this.isClose = false; //链接断开
    this.timer = null; // 检测定时器
    this.limit = 0; //检测次数，默认最大12
    this.timout = ping;
    uni.setStorageSync('isSocketOpen', false);
    this.init();
  }

  // 初始化
  _createClass(Socket, [{ key: "init", value: function () {var _init = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                  this.connect());case 2:case "end":return _context.stop();}}}, _callee, this);}));function init() {return _init.apply(this, arguments);}return init;}()


    // 连接
  }, { key: "connect", value: function () {var _connect = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var _yield$uni$connectSoc, _yield$uni$connectSoc2, error, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (
                uni.getStorageSync('isSocketOpen')) {_context2.next = 8;break;}_context2.next = 3;return (
                  uni.connectSocket({
                    url: "".concat(this.config.url, "?identify=").concat(this.config.identify, "&token=").concat(this.config.token, "&session_id=").concat(this.config.session_id) }));case 3:_yield$uni$connectSoc = _context2.sent;_yield$uni$connectSoc2 = _slicedToArray(_yield$uni$connectSoc, 2);error = _yield$uni$connectSoc2[0];res = _yield$uni$connectSoc2[1];

                if (res.errMsg === 'connectSocket:ok') {
                  this.initEventHandle();
                }case 8:case "end":return _context2.stop();}}}, _callee2, this);}));function connect() {return _connect.apply(this, arguments);}return connect;}()



    // 发送消息
  }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var msg,_yield$uni$sendSocket,_yield$uni$sendSocket2,error,res,_args3 = arguments;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:msg = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : "";if (!
                uni.getStorageSync('isSocketOpen')) {_context3.next = 9;break;}_context3.next = 4;return (
                  uni.sendSocketMessage({
                    data: msg }));case 4:_yield$uni$sendSocket = _context3.sent;_yield$uni$sendSocket2 = _slicedToArray(_yield$uni$sendSocket, 2);error = _yield$uni$sendSocket2[0];res = _yield$uni$sendSocket2[1];return _context3.abrupt("return",

                Promise.resolve(res));case 9:case "end":return _context3.stop();}}}, _callee3);}));function send() {return _send.apply(this, arguments);}return send;}()



    // 监听消息
  }, { key: "onMsg", value: function onMsg() {var _this = this;
      uni.onSocketMessage(function (res) {
        if (res.code === 1 && res.type === 'init') {
          _this.config.session_id = res.data.session_id;
        }
        _this.callback(res);
      });
    }

    // 关闭连接
  }, { key: "close", value: function close() {
      uni.closeSocket();
      uni.removeStorage({
        key: 'isSocketOpen',
        success: function success(res) {
          console.log('移除isSocketOpensuccess');
        } });

      clearTimeout(this.timer);
      clearTimeout(this.timeoutObj);
    }

    //心跳检测
  }, { key: "start", value: function start() {var _this2 = this;
      clearTimeout(this.timeoutObj);
      this.timeoutObj = setTimeout(function () {
        var obj = {
          type: 'ping' };

        var objStr = JSON.stringify(obj);
        uni.sendSocketMessage({
          data: objStr });

        _this2.start();
      }, this.timout);
    }

    // 监听事件集
  }, { key: "initEventHandle", value: function initEventHandle() {var _this3 = this;
      // 监听打开
      uni.onSocketOpen(function (res) {
        uni.setStorageSync('isSocketOpen', true);
        console.log('连接成功！');
        _this3.lockReconnect = true;
        _this3.isClose = false;
        _this3.start();
      });

      // 监听消息
      this.onMsg();

      // 监听错误
      uni.onSocketError(function (err) {
        console.log('连接错误', err);
        uni.closeSocket();
      });

      // 监听关闭
      uni.onSocketClose(function (res) {
        console.log('关闭链接');
        _this3.isClose = true;
        if (uni.getStorageSync('isSocketOpen')) {
          _this3.lockReconnect = false;
          _this3.reconnect();
        }


      });
    }

    // 重连
  }, { key: "reconnect", value: function reconnect() {var _this4 = this;
      if (this.lockReconnect) return;
      clearTimeout(this.timer);
      if (this.limit < 12) {
        this.timer = setTimeout(function () {
          console.log('重连中', _this4.limit);
          _this4.init();
          _this4.reconnect();
        }, 5000);
        this.limit += 1;
      }
    } }]);return Socket;}();exports.default = Socket;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 1117:
/*!************************************************************************************!*\
  !*** /Users/hfy/Documents/business/1kpdj/yunqishou/pages/public/chat/wm/config.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _env = __webpack_require__(/*! @/env.js */ 19);


var expression = [{
  'title': '[zy]',
  'src': '/emoji/1.png' },
{
  'title': '[zm]',
  'src': '/emoji/2.png' },
{
  'title': '[jy]',
  'src': '/emoji/3.png' },

{
  'title': '[jyb]',
  'src': '/emoji/4.png' },
{
  'title': '[bx]',
  'src': '/emoji/5.png' },
{
  'title': '[kzn]',
  'src': '/emoji/6.png' },

{
  'title': '[gg]',
  'src': '/emoji/7.png' },
{
  'title': '[ll]',
  'src': '/emoji/8.png' },
{
  'title': '[jyll]',
  'src': '/emoji/9.png' },

{
  'title': '[o]',
  'src': '/emoji/10.png' },
{
  'title': '[yz]',
  'src': '/emoji/11.png' },
{
  'title': '[wx]',
  'src': '/emoji/12.png' },

{
  'title': '[zyb]',
  'src': '/emoji/13.png' },
{
  'title': '[tp]',
  'src': '/emoji/14.png' },
{
  'title': '[wxb]',
  'src': '/emoji/15.png' },

{
  'title': '[zyc]',
  'src': '/emoji/16.png' },
{
  'title': '[llb]',
  'src': '/emoji/17.png' },
{
  'title': '[xm]',
  'src': '/emoji/18.png' },

{
  'title': '[qz]',
  'src': '/emoji/19.png' },
{
  'title': '[zmb]',
  'src': '/emoji/20.png' },
{
  'title': '[kx]',
  'src': '/emoji/21.png' },

{
  'title': '[mm]',
  'src': '/emoji/22.png' },
{
  'title': '[bz]',
  'src': '/emoji/23.png' },
{
  'title': '[bkx]',
  'src': '/emoji/24.png' },

{
  'title': '[mg]',
  'src': '/emoji/25.png' },
{
  'title': '[pz]',
  'src': '/emoji/26.png' },
{
  'title': '[pzb]',
  'src': '/emoji/27.png' },

{
  'title': '[wxc]',
  'src': '/emoji/28.png' },
{
  'title': '[jyc]',
  'src': '/emoji/29.png' },
{
  'title': '[jyd]',
  'src': '/emoji/30.png' },

{
  'title': '[dm]',
  'src': '/emoji/31.png' },
{
  'title': '[tpb]',
  'src': '/emoji/32.png' },
{
  'title': '[tpc]',
  'src': '/emoji/33.png' },

{
  'title': '[tpd]',
  'src': '/emoji/34.png' },
{
  'title': '[ly]',
  'src': '/emoji/35.png' },
{
  'title': '[zyd]',
  'src': '/emoji/36.png' }];



var service = _env.BASE_URL.split('://')[1].split(':')[0];var _default =
{
  baseURL: service, // dev.7wpp.com 启动workerman服务的域名，无需填写协议和端口
  https_switch: false, // 是否启用https协议(默认关，正式版必开，且需要参考文档创建wss服务)
  expression: expression };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/public/common/vendor.js.map