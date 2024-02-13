// src/core/client.ts
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import Fastify from "fastify";
// src/core/constants.ts
var BASE_URL = "https://graph.facebook.com/";
var MESSAGE_URL = "".concat(BASE_URL, "v18.0/me/");
var Constants = {
    BASE_URL: BASE_URL,
    MESSAGE_URL: MESSAGE_URL
};
// src/core/client.ts
import { EventEmitter } from "events";
import { request } from "undici";
var Client = /*#__PURE__*/ function(EventEmitter) {
    "use strict";
    _inherits(Client, EventEmitter);
    var _super = _create_super(Client);
    function Client(options) {
        _class_call_check(this, Client);
        var _this;
        _this = _super.call(this);
        _this.page = {
            name: "",
            id: ""
        };
        _this.server = Fastify();
        _this.accessToken = options.accessToken;
        _this.verifyToken = options.verifyToken;
        _this.endpoint = options.endpoint || "/webhook";
        _this.port = options.port || 8080;
        _this.host = options.host || "localhost";
        return _this;
    }
    _create_class(Client, [
        {
            key: "handleVerifyRequest",
            value: function handleVerifyRequest(request2, reply) {
                var query = request2.query;
                var mode = query["hub.mode"], challenge = query["hub.challenge"], verifyToken = query["hub.verify_token"];
                if (mode !== "subscribe") return reply.code(400).send("Bad Request");
                if (verifyToken !== this.verifyToken) return reply.code(403).send("Forbidden");
                return reply.code(200).send(challenge);
            }
        },
        {
            key: "handleWebhookRequest",
            value: function handleWebhookRequest(request2, reply) {
                var _this = this;
                var body = request2.body;
                var object = body.object, entry = body.entry;
                if (object !== "page") {
                    reply.code(400).send("Bad Request");
                    return;
                }
                entry.forEach(function(entry2) {
                    var webhookEvent = entry2.messaging[0];
                    var message = webhookEvent.message, postback = webhookEvent.postback, template = webhookEvent.template;
                    var event = "error";
                    if (message && message.quick_reply) {
                        event = "quick_reply";
                    } else if (message) {
                        event = "message";
                    } else if (postback) {
                        event = "postback";
                    } else if (template) {
                        event = "template";
                    }
                    _this.emit(event, webhookEvent);
                });
                return reply.code(200).send("OK");
            }
        },
        {
            key: "start",
            value: /**
   * Start the server
   * @memberof Client
   * @example
   * client.start(async () => console.log(`Listening on ${client.page.name} (${client.page.id})`));
   * @param {Function} [callback]
   */ function start(callback) {
                var _this = this;
                return _async_to_generator(function() {
                    var startServer, err;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _this.server.post(_this.endpoint, _this.handleWebhookRequest.bind(_this));
                                _this.server.get(_this.endpoint, _this.handleVerifyRequest.bind(_this));
                                startServer = function() {
                                    var _ref = _async_to_generator(function() {
                                        var err;
                                        return _ts_generator(this, function(_state) {
                                            switch(_state.label){
                                                case 0:
                                                    _state.trys.push([
                                                        0,
                                                        2,
                                                        ,
                                                        3
                                                    ]);
                                                    return [
                                                        4,
                                                        _this.server.listen({
                                                            port: _this.port,
                                                            host: _this.host
                                                        })
                                                    ];
                                                case 1:
                                                    _state.sent();
                                                    if (callback) callback();
                                                    return [
                                                        3,
                                                        3
                                                    ];
                                                case 2:
                                                    err = _state.sent();
                                                    throw new Error("Failed to start server: ".concat(err));
                                                case 3:
                                                    return [
                                                        2
                                                    ];
                                            }
                                        });
                                    });
                                    return function startServer() {
                                        return _ref.apply(this, arguments);
                                    };
                                }();
                                if (!!_this.page.id) return [
                                    3,
                                    4
                                ];
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    3,
                                    ,
                                    4
                                ]);
                                return [
                                    4,
                                    _this.getPageInfo()
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    3,
                                    4
                                ];
                            case 3:
                                err = _state.sent();
                                throw new Error("Check your access token: ".concat(err));
                            case 4:
                                return [
                                    4,
                                    startServer()
                                ];
                            case 5:
                                _state.sent();
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "register",
            value: /**
   * Register a plugin
   * @memberof Client
   * @example
   * client.register(require('fastify-cors'), {
   *      origin: '*',
   * });
   * @param {Function} ...args
   */ function register() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _this = this;
                return _async_to_generator(function() {
                    var _this_server;
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            (_this_server = _this.server).register.apply(_this_server, _to_consumable_array(args))
                        ];
                    });
                })();
            }
        },
        {
            key: "sendRequest",
            value: function sendRequest(options) {
                var _this = this;
                return _async_to_generator(function() {
                    var accessToken, method, path, body, url, bodyString, headers, _ref, statusCode, response, responseBody;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                accessToken = _this.accessToken;
                                method = options.method, path = options.path, body = options.body;
                                url = "".concat(Constants.MESSAGE_URL).concat(path || "", "?access_token=").concat(accessToken);
                                bodyString = JSON.stringify(body);
                                headers = {
                                    "Content-Type": "application/json"
                                };
                                return [
                                    4,
                                    request(url, {
                                        method: method,
                                        body: bodyString,
                                        headers: headers
                                    })
                                ];
                            case 1:
                                _ref = _state.sent(), statusCode = _ref.statusCode, response = _ref.body;
                                if (statusCode !== 200) {
                                    throw new Error("Request failed: ".concat(statusCode, "\n").concat(response));
                                }
                                return [
                                    4,
                                    response.json()
                                ];
                            case 2:
                                responseBody = _state.sent();
                                return [
                                    2,
                                    responseBody
                                ];
                        }
                    });
                })();
            }
        },
        {
            /**
   * Send an API message
   * @memberof Client
   * @example
   * client.sendApiMessage("USER_ID", {
   *      text: "Hello, World!",
   *      quick_replies: [
   *          {
   *              content_type: "text",
   *              title: "Hello",
   *              payload: "HELLO",
   *          }
   *      ]
   * });
   * @param {string} recipientId
   * @param {object} message
   */ key: "sendApiMessage",
            value: function sendApiMessage(recipientId, message) {
                var body = {
                    recipient: {
                        id: recipientId
                    },
                    message: message
                };
                return this.sendRequest({
                    method: "POST",
                    path: "messages",
                    body: body
                });
            }
        },
        {
            /**
   * Send a message
   * @memberof Client
   * @example
   * client.send("USER_ID", {
   *      text: "Hello, World!",
   *      quick_replies: [
   *          {
   *              content_type: "text",
   *              title: "Hello",
   *              payload: "HELLO",
   *          }
   *      ]
   * });
   * @param {string} recipientId
   * @param {object} message
   */ key: "send",
            value: function send(recipientId, message) {
                return this.sendApiMessage(recipientId, message);
            }
        },
        {
            key: "getPageInfo",
            value: /**
   * Get page information
   * @memberof Client
   * @example
   * const pageInformation = await client.getPageInfo();
   * console.log(pageInformation);
   * @returns
   * { name: "Page Name", id: "PAGE_ID" }
   */ function getPageInfo() {
                var _this = this;
                return _async_to_generator(function() {
                    var body, name, id;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.sendRequest({
                                        method: "GET"
                                    })
                                ];
                            case 1:
                                body = _state.sent();
                                name = body.name, id = body.id;
                                _this.page.name = name;
                                _this.page.id = id;
                                return [
                                    2,
                                    {
                                        name: name,
                                        id: id
                                    }
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "sendTextMessage",
            value: /**
   * Send a text message
   * @memberof Client
   * @example
   * client.sendTextMessage("USER_ID", "Hello World!");
   * @param {string} recipientId
   * @param {string} text
   */ function sendTextMessage(recipientId, text) {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.sendApiMessage(recipientId, {
                                text: text
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "sendAttachment",
            value: /**
   * Send an attachment
   * @memberof Client
   * @example
   * client.sendAttachment("USER_ID", "image", "https://example.com/image.png");
   * @param {string} recipientId
   * @param {string} type - image, audio, video, file
   * @param {string} url
   * @param {boolean} [isReusable=false]
   */ function sendAttachment(recipientId, type, url) {
                var isReusable = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.sendApiMessage(recipientId, {
                                attachment: {
                                    type: type,
                                    // image, audio, video, file
                                    payload: {
                                        url: url,
                                        is_reusable: isReusable
                                    }
                                }
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "sendImage",
            value: /**
   * Send an image
   * @memberof Client
   * @example
   * client.sendImage("USER_ID", "https://example.com/image.png");
   * @param {string} recipientId
   * @param {string} url
   * @param {boolean} [isReusable=false]
   */ function sendImage(recipientId, url) {
                var isReusable = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.sendAttachment(recipientId, "image", url, isReusable)
                        ];
                    });
                })();
            }
        },
        {
            key: "sendAudio",
            value: /**
   * Send an audio
   * @memberof Client
   * @example
   * client.sendAudio("USER_ID", "https://example.com/audio.mp3");
   * @param {string} recipientId
   * @param {string} url
   * @param {boolean} [isReusable=false]
   */ function sendAudio(recipientId, url) {
                var isReusable = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.sendAttachment(recipientId, "audio", url, isReusable)
                        ];
                    });
                })();
            }
        },
        {
            key: "sendVideo",
            value: /**
   * Send a video
   * @memberof Client
   * @example
   * client.sendVideo("USER_ID", "https://example.com/video.mp4");
   * @param {string} recipientId
   * @param {string} url
   * @param {boolean} [isReusable=false]
   */ function sendVideo(recipientId, url) {
                var isReusable = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.sendAttachment(recipientId, "video", url, isReusable)
                        ];
                    });
                })();
            }
        },
        {
            key: "sendFile",
            value: /**
   * Send a file
   * @memberof Client
   * @example
   * client.sendFile("USER_ID", "https://example.com/file.pdf");
   * @param {string} recipientId
   * @param {string} url
   * @param {boolean} [isReusable=false]
   */ function sendFile(recipientId, url) {
                var isReusable = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.sendAttachment(recipientId, "file", url, isReusable)
                        ];
                    });
                })();
            }
        },
        {
            key: "setTyping",
            value: /**
   * Set typing indicator
   * @memberof Client
   * @example
   * client.setTyping("USER_ID", true);
   * @param {string} recipientId
   * @param {boolean} typing
   */ function setTyping(recipientId, typing) {
                var _this = this;
                return _async_to_generator(function() {
                    var body;
                    return _ts_generator(this, function(_state) {
                        body = {
                            recipient: {
                                id: recipientId
                            },
                            sender_action: typing ? "typing_on" : "typing_off"
                        };
                        return [
                            2,
                            _this.sendRequest({
                                method: "POST",
                                path: "messages",
                                body: body
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "setPersistentMenu",
            value: /**
   * Set persistent menu
   * @memberof Client
   * @example
   * const { PersistentMenu, PersistentMenuItem, CallToAction } = require('chat-bridge');
   *
   * const persistentMenu = new PersistentMenu('12345', [
   *     new PersistentMenuItem('default', false, [
   *         new CallToAction('postback', 'Help', 'HELP_PAYLOAD', '', ''),
   *         new CallToAction('postback', 'Start', 'START_PAYLOAD', '', '')
   *     ])
   * ]);
   *
   * client.setPersistentMenu(persistentMenu);
   * @param {PersistentMenu} persistentMenu
   */ function setPersistentMenu(psid, persistentMenu) {
                var _this = this;
                return _async_to_generator(function() {
                    var body;
                    return _ts_generator(this, function(_state) {
                        body = {
                            psid: psid,
                            persistent_menu: persistentMenu
                        };
                        return [
                            2,
                            _this.sendRequest({
                                method: "POST",
                                path: "custom_user_settings",
                                body: body
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "getPersistentMenu",
            value: /**
   * Get persistent menu
   * @memberof Client
   * @example
   * client.getPersistentMenu("12345");
   * @param {string} psid
   */ function getPersistentMenu(psid) {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.sendRequest({
                                method: "GET",
                                path: "custom_user_settings?psid=".concat(psid)
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "deletePersistentMenu",
            value: /**
   * Delete persistent menu
   * @memberof Client
   * @example
   * client.deletePersistentMenu("12345");
   * @param {string} psid
   */ function deletePersistentMenu(psid) {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.sendRequest({
                                method: "DELETE",
                                path: "custom_user_settings?psid=".concat(psid, '&params=["persistent_menu"]')
                            })
                        ];
                    });
                })();
            }
        }
    ]);
    return Client;
}(EventEmitter);
// src/core/collections.ts
var Collections = /*#__PURE__*/ function() {
    "use strict";
    function Collections() {
        _class_call_check(this, Collections);
        this.items = [];
    }
    _create_class(Collections, [
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            key: "add",
            value: function add(item) {
                this.items.push(item);
            }
        },
        {
            key: "get",
            value: function get(name) {
                return this.items.find(function(item) {
                    return item.name === name;
                });
            }
        }
    ]);
    return Collections;
}();
// src/button/CallButton.ts
var CallButton = /*#__PURE__*/ function() {
    "use strict";
    function CallButton(title, payload) {
        _class_call_check(this, CallButton);
        this.title = title;
        this.phoneNumber = payload;
    }
    _create_class(CallButton, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    type: "phone_number",
                    title: this.title,
                    payload: this.phoneNumber
                };
            }
        }
    ]);
    return CallButton;
}();
// src/button/PostbackButton.ts
var PostbackButton = /*#__PURE__*/ function() {
    "use strict";
    function PostbackButton(title, payload) {
        _class_call_check(this, PostbackButton);
        this.title = title;
        this.payload = payload;
    }
    _create_class(PostbackButton, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    type: "postback",
                    title: this.title,
                    payload: this.payload
                };
            }
        }
    ]);
    return PostbackButton;
}();
// src/button/UrlButton.ts
var UrlButton = /*#__PURE__*/ function() {
    "use strict";
    function UrlButton(title, url) {
        _class_call_check(this, UrlButton);
        this.title = title;
        this.url = url;
    }
    _create_class(UrlButton, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    type: "web_url",
                    title: this.title,
                    url: this.url
                };
            }
        }
    ]);
    return UrlButton;
}();
// src/elements/GenericElement.ts
var GenericElement = /*#__PURE__*/ function() {
    "use strict";
    function GenericElement(title, subtitle, imageUrl) {
        _class_call_check(this, GenericElement);
        this.buttons = [];
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
    }
    _create_class(GenericElement, [
        {
            key: "setItemUrl",
            value: function setItemUrl(itemUrl) {
                this.itemUrl = itemUrl;
                return this;
            }
        },
        {
            key: "addButtons",
            value: function addButtons(buttons) {
                this.buttons = this.buttons.concat(buttons);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    title: this.title,
                    subtitle: this.subtitle,
                    image_url: this.imageUrl,
                    item_url: this.itemUrl,
                    buttons: this.buttons
                };
            }
        }
    ]);
    return GenericElement;
}();
// src/elements/Greeting.ts
var Greeting = /*#__PURE__*/ function() {
    "use strict";
    function Greeting(locale, text) {
        _class_call_check(this, Greeting);
        this.locale = locale;
        this.text = text;
    }
    _create_class(Greeting, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    locale: this.locale,
                    text: this.text
                };
            }
        }
    ]);
    return Greeting;
}();
// src/elements/MediaElement.ts
var MediaElement = /*#__PURE__*/ function() {
    "use strict";
    function MediaElement(mediaType, media) {
        _class_call_check(this, MediaElement);
        this.buttons = [];
        this.mediaType = mediaType;
        if (mediaType === "image") {
            this.url = media;
        } else {
            this.attachmentId = media;
        }
    }
    _create_class(MediaElement, [
        {
            key: "addButtons",
            value: function addButtons(buttons) {
                this.buttons = this.buttons.concat(buttons);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    media_type: this.mediaType,
                    attachment_id: this.attachmentId,
                    url: this.url,
                    buttons: this.buttons
                };
            }
        }
    ]);
    return MediaElement;
}();
// src/elements/PersistentMenu.ts
var PersistentMenu = /*#__PURE__*/ function() {
    "use strict";
    function PersistentMenu(psid, persistentMenu) {
        _class_call_check(this, PersistentMenu);
        this.psid = psid;
        this.persistentMenu = persistentMenu;
    }
    _create_class(PersistentMenu, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    psid: this.psid,
                    persistent_menu: this.persistentMenu
                };
            }
        }
    ]);
    return PersistentMenu;
}();
var PersistentMenuItem = /*#__PURE__*/ function() {
    "use strict";
    function PersistentMenuItem(locale, composerInputDisabled, callToActions) {
        _class_call_check(this, PersistentMenuItem);
        this.locale = locale;
        this.composerInputDisabled = composerInputDisabled;
        this.callToActions = callToActions;
    }
    _create_class(PersistentMenuItem, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    locale: this.locale,
                    composer_input_disabled: this.composerInputDisabled,
                    call_to_actions: this.callToActions
                };
            }
        }
    ]);
    return PersistentMenuItem;
}();
var CallToAction = /*#__PURE__*/ function() {
    "use strict";
    function CallToAction(type, title, payload, url, webviewHeightRatio) {
        _class_call_check(this, CallToAction);
        this.type = type;
        this.title = title;
        this.payload = payload;
        this.url = url;
        this.webviewHeightRatio = webviewHeightRatio;
    }
    _create_class(CallToAction, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    type: this.type,
                    title: this.title,
                    payload: this.payload,
                    url: this.url,
                    webview_height_ratio: this.webviewHeightRatio
                };
            }
        }
    ]);
    return CallToAction;
}();
// src/elements/ProductElement.ts
var ProductElement = /*#__PURE__*/ function() {
    "use strict";
    function ProductElement(id) {
        _class_call_check(this, ProductElement);
        this.id = id;
    }
    _create_class(ProductElement, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    id: this.id
                };
            }
        }
    ]);
    return ProductElement;
}();
// src/elements/ReceiptElement.ts
var ReceiptElement = /*#__PURE__*/ function() {
    "use strict";
    function ReceiptElement(title, subtitle, quantity, price, currency, imageUrl) {
        _class_call_check(this, ReceiptElement);
        this.title = title;
        this.subtitle = subtitle;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
        this.imageUrl = imageUrl;
    }
    _create_class(ReceiptElement, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    title: this.title,
                    subtitle: this.subtitle,
                    quantity: this.quantity,
                    price: this.price,
                    currency: this.currency,
                    image_url: this.imageUrl
                };
            }
        }
    ]);
    return ReceiptElement;
}();
// src/templates/ButtonTemplate.ts
var ButtonTemplate = /*#__PURE__*/ function() {
    "use strict";
    function ButtonTemplate(text) {
        _class_call_check(this, ButtonTemplate);
        this.buttons = [];
        this.text = text;
    }
    _create_class(ButtonTemplate, [
        {
            key: "addButtons",
            value: function addButtons(buttons) {
                this.buttons = this.buttons.concat(buttons);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "button",
                            text: this.text,
                            buttons: this.buttons
                        }
                    }
                };
            }
        }
    ]);
    return ButtonTemplate;
}();
// src/templates/CouponTemplate.ts
var CouponTemplate = /*#__PURE__*/ function() {
    "use strict";
    function CouponTemplate(title, couponCode, couponUrl) {
        _class_call_check(this, CouponTemplate);
        this.title = title;
        this.couponCode = couponCode;
        this.couponUrl = couponUrl;
    }
    _create_class(CouponTemplate, [
        {
            key: "setTitle",
            value: function setTitle(title) {
                this.title = title;
                return this;
            }
        },
        {
            key: "setSubtitle",
            value: function setSubtitle(subtitle) {
                this.subtitle = subtitle;
                return this;
            }
        },
        {
            key: "setCouponCode",
            value: function setCouponCode(couponCode) {
                this.couponCode = couponCode;
                return this;
            }
        },
        {
            key: "setCouponUrl",
            value: function setCouponUrl(couponUrl) {
                this.couponUrl = couponUrl;
                return this;
            }
        },
        {
            key: "setCouponUrlButtonTitle",
            value: function setCouponUrlButtonTitle(couponUrlButtonTitle) {
                this.couponUrlButtonTitle = couponUrlButtonTitle;
                return this;
            }
        },
        {
            key: "setCouponPreMessage",
            value: function setCouponPreMessage(couponPreMessage) {
                this.couponPreMessage = couponPreMessage;
                return this;
            }
        },
        {
            key: "setImageUrl",
            value: function setImageUrl(imageUrl) {
                this.imageUrl = imageUrl;
                return this;
            }
        },
        {
            key: "setPayload",
            value: function setPayload(payload) {
                this.payload = payload;
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "coupon",
                            title: this.title,
                            subtitle: this.subtitle,
                            coupon_code: this.couponCode,
                            coupon_url: this.couponUrl,
                            coupon_url_button_title: this.couponUrlButtonTitle,
                            coupon_pre_message: this.couponPreMessage,
                            image_url: this.imageUrl,
                            payload: this.payload
                        }
                    }
                };
            }
        }
    ]);
    return CouponTemplate;
}();
// src/templates/FeedbackTemplate.ts
var FeedbackQuestionType = /* @__PURE__ */ function(FeedbackQuestionType2) {
    FeedbackQuestionType2["CSAT"] = "csat";
    FeedbackQuestionType2["NPS"] = "nps";
    FeedbackQuestionType2["CES"] = "ces";
    return FeedbackQuestionType2;
}(FeedbackQuestionType || {});
var FeedbackTemplate = /*#__PURE__*/ function() {
    "use strict";
    function FeedbackTemplate(title, subtitle, buttonTitle) {
        _class_call_check(this, FeedbackTemplate);
        this.feedbackScreens = [];
        this.title = title;
        this.subtitle = subtitle;
        this.buttonTitle = buttonTitle;
        this.businessPrivacy = "";
    }
    _create_class(FeedbackTemplate, [
        {
            key: "addFeedbackScreens",
            value: function addFeedbackScreens(feedbackScreens) {
                this.feedbackScreens = this.feedbackScreens.concat(feedbackScreens);
                return this;
            }
        },
        {
            key: "setBusinessPrivacy",
            value: function setBusinessPrivacy(url) {
                this.businessPrivacy = url;
                return this;
            }
        },
        {
            key: "setExpiresInDays",
            value: function setExpiresInDays(expiresInDays) {
                this.expiresInDays = expiresInDays;
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "customer_feedback",
                            title: this.title,
                            subtitle: this.subtitle,
                            button_title: this.buttonTitle,
                            feedback_screens: this.feedbackScreens,
                            business_privacy: {
                                url: this.businessPrivacy
                            },
                            expires_in_days: this.expiresInDays
                        }
                    }
                };
            }
        }
    ]);
    return FeedbackTemplate;
}();
var FeedbackScreen = /*#__PURE__*/ function() {
    "use strict";
    function FeedbackScreen() {
        _class_call_check(this, FeedbackScreen);
        this.questions = [];
    }
    _create_class(FeedbackScreen, [
        {
            key: "addQuestions",
            value: function addQuestions(questions) {
                this.questions = this.questions.concat(questions);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    questions: this.questions
                };
            }
        }
    ]);
    return FeedbackScreen;
}();
var FeedbackQuestion = /*#__PURE__*/ function() {
    "use strict";
    function FeedbackQuestion(id, type) {
        _class_call_check(this, FeedbackQuestion);
        this.id = id;
        this.type = type;
    }
    _create_class(FeedbackQuestion, [
        {
            key: "setTitle",
            value: function setTitle(title) {
                this.title = title;
                return this;
            }
        },
        {
            key: "setScoreLabel",
            value: function setScoreLabel(scoreLabel) {
                this.scoreLabel = scoreLabel;
                return this;
            }
        },
        {
            key: "setScoreOption",
            value: function setScoreOption(scoreOption) {
                this.scoreOption = scoreOption;
                return this;
            }
        },
        {
            key: "setFollowUp",
            value: function setFollowUp(followUp) {
                this.followUp = followUp;
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    id: this.id,
                    type: this.type,
                    title: this.title,
                    score_label: this.scoreLabel,
                    score_option: this.scoreOption,
                    follow_up: this.followUp
                };
            }
        }
    ]);
    return FeedbackQuestion;
}();
var FollowUp = /*#__PURE__*/ function() {
    "use strict";
    function FollowUp(type) {
        _class_call_check(this, FollowUp);
        this.type = type;
    }
    _create_class(FollowUp, [
        {
            key: "setPlaceholder",
            value: function setPlaceholder(placeholder) {
                this.placeholder = placeholder;
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    type: this.type,
                    placeholder: this.placeholder
                };
            }
        }
    ]);
    return FollowUp;
}();
// src/templates/GenericTemplate.ts
var GenericTemplate = /*#__PURE__*/ function() {
    "use strict";
    function GenericTemplate() {
        _class_call_check(this, GenericTemplate);
        this.elements = [];
    }
    _create_class(GenericTemplate, [
        {
            key: "addElement",
            value: function addElement(element) {
                this.elements.push(element);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "generic",
                            elements: this.elements
                        }
                    }
                };
            }
        }
    ]);
    return GenericTemplate;
}();
// src/templates/MediaTemplate.ts
var MediaTemplate = /*#__PURE__*/ function() {
    "use strict";
    function MediaTemplate() {
        _class_call_check(this, MediaTemplate);
        this.elements = [];
    }
    _create_class(MediaTemplate, [
        {
            key: "addElement",
            value: function addElement(element) {
                this.elements.push(element);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "media",
                            elements: this.elements
                        }
                    }
                };
            }
        }
    ]);
    return MediaTemplate;
}();
// src/templates/ProductTemplate.ts
var ProductTemplate = /*#__PURE__*/ function() {
    "use strict";
    function ProductTemplate() {
        _class_call_check(this, ProductTemplate);
        this.elements = [];
    }
    _create_class(ProductTemplate, [
        {
            key: "addElement",
            value: function addElement(element) {
                this.elements.push(element);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "product",
                            elements: this.elements
                        }
                    }
                };
            }
        }
    ]);
    return ProductTemplate;
}();
// src/templates/QuickReplies.ts
var QuickReplies = /*#__PURE__*/ function() {
    "use strict";
    function QuickReplies(title) {
        _class_call_check(this, QuickReplies);
        this.quickReplies = [];
        this.title = title;
    }
    _create_class(QuickReplies, [
        {
            key: "addQuickReply",
            value: function addQuickReply(quickReplies) {
                this.quickReplies = this.quickReplies.concat(quickReplies);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    text: this.title,
                    quick_replies: this.quickReplies
                };
            }
        }
    ]);
    return QuickReplies;
}();
var QuickReply = /*#__PURE__*/ function() {
    "use strict";
    function QuickReply(title) {
        _class_call_check(this, QuickReply);
        this.title = title;
    }
    _create_class(QuickReply, [
        {
            key: "setPayload",
            value: function setPayload(payload) {
                this.payload = payload;
                return this;
            }
        },
        {
            key: "setImageUrl",
            value: function setImageUrl(imageUrl) {
                this.imageUrl = imageUrl;
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    content_type: "text",
                    title: this.title,
                    payload: this.payload,
                    image_url: this.imageUrl
                };
            }
        }
    ]);
    return QuickReply;
}();
// src/templates/ReceiptTemplate.ts
var ReceiptTemplate = /*#__PURE__*/ function() {
    "use strict";
    function ReceiptTemplate(recipientName, orderNumber, currency, paymentMethod, timestamp) {
        _class_call_check(this, ReceiptTemplate);
        this.elements = [];
        this.adjustments = [];
        this.recipientName = recipientName;
        this.orderNumber = orderNumber;
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.timestamp = timestamp;
    }
    _create_class(ReceiptTemplate, [
        {
            key: "addElement",
            value: function addElement(element) {
                this.elements.push(element);
                return this;
            }
        },
        {
            key: "setAddress",
            value: function setAddress(address) {
                this.address = address;
                return this;
            }
        },
        {
            key: "setSummary",
            value: function setSummary(summary) {
                this.summary = summary;
                return this;
            }
        },
        {
            key: "addAdjustments",
            value: function addAdjustments(adjustments) {
                this.adjustments = this.adjustments.concat(adjustments);
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "receipt",
                            recipient_name: this.recipientName,
                            order_number: this.orderNumber,
                            currency: this.currency,
                            payment_method: this.paymentMethod,
                            timestamp: this.timestamp,
                            elements: this.elements,
                            address: this.address,
                            summary: this.summary,
                            adjustments: this.adjustments
                        }
                    }
                };
            }
        }
    ]);
    return ReceiptTemplate;
}();
var Address = /*#__PURE__*/ function() {
    "use strict";
    function Address(street1, city, postalCode, state, country) {
        _class_call_check(this, Address);
        this.street1 = street1;
        this.city = city;
        this.postalCode = postalCode;
        this.state = state;
        this.country = country;
    }
    _create_class(Address, [
        {
            key: "setStreet2",
            value: function setStreet2(street2) {
                this.street2 = street2;
                return this;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    street_1: this.street1,
                    street_2: this.street2,
                    city: this.city,
                    postal_code: this.postalCode,
                    state: this.state,
                    country: this.country
                };
            }
        }
    ]);
    return Address;
}();
var Summary = /*#__PURE__*/ function() {
    "use strict";
    function Summary(subtotal, shippingCost, totalTax, totalCost) {
        _class_call_check(this, Summary);
        this.subtotal = subtotal;
        this.shippingCost = shippingCost;
        this.totalTax = totalTax;
        this.totalCost = totalCost;
    }
    _create_class(Summary, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    subtotal: this.subtotal,
                    shipping_cost: this.shippingCost,
                    total_tax: this.totalTax,
                    total_cost: this.totalCost
                };
            }
        }
    ]);
    return Summary;
}();
var Adjustment = /*#__PURE__*/ function() {
    "use strict";
    function Adjustment(name, amount) {
        _class_call_check(this, Adjustment);
        this.name = name;
        this.amount = amount;
    }
    _create_class(Adjustment, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    name: this.name,
                    amount: this.amount
                };
            }
        }
    ]);
    return Adjustment;
}();
export { Address, Adjustment, ButtonTemplate, CallButton, CallToAction, Client, Collections, Constants, CouponTemplate, FeedbackQuestion, FeedbackQuestionType, FeedbackScreen, FeedbackTemplate, FollowUp, GenericElement, GenericTemplate, Greeting, MediaElement, MediaTemplate, PersistentMenu, PersistentMenuItem, PostbackButton, ProductElement, ProductTemplate, QuickReplies, QuickReply, ReceiptElement, ReceiptTemplate, Summary, UrlButton };
