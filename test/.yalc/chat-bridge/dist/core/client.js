"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var fastify_1 = __importDefault(require("fastify"));
var constants_1 = require("./constants");
var events_1 = require("events");
var undici_1 = require("undici");
/**
 * @type {Client}
 * @example
 * const { Client } = require('@badend/chatbridge');
 *
 * const client = new Client({
 *      accessToken: "YOUR_ACCESS_TOKEN", // required
 *      verifyToken: "YOUR_VERIFY_TOKEN", // required
 *      // webHookPath: "/webhook", // default
 *      // port: 8080, // default
 *      // host: "localhost", // default (only for development) or 0.0.0.0 (for production)
 * });
 */
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(options) {
        var _this = _super.call(this) || this;
        _this.page = {
            name: '',
            id: ''
        };
        _this.server = (0, fastify_1.default)();
        _this.accessToken = options.accessToken;
        _this.verifyToken = options.verifyToken;
        _this.endpoint = options.endpoint || '/webhook';
        _this.port = options.port || 8080;
        _this.host = options.host || 'localhost';
        return _this;
    }
    Client.prototype.handleVerifyRequest = function (request, reply) {
        var query = request.query;
        var mode = query["hub.mode"], challenge = query["hub.challenge"], verifyToken = query["hub.verify_token"];
        if (mode !== 'subscribe')
            return reply.code(400).send('Bad Request');
        if (verifyToken !== this.verifyToken)
            return reply.code(403).send('Forbidden');
        return reply.code(200).send(challenge);
    };
    Client.prototype.handleWebhookRequest = function (request, reply) {
        var _this = this;
        var body = request.body;
        var _a = body, object = _a.object, entry = _a.entry;
        if (object !== 'page') {
            reply.code(400).send('Bad Request');
            return;
        }
        entry.forEach(function (entry) {
            var webhookEvent = entry.messaging[0];
            var message = webhookEvent.message, postback = webhookEvent.postback, template = webhookEvent.template;
            var event = 'error';
            if (message && message.quick_reply) {
                event = 'quick_reply';
            }
            else if (message) {
                event = 'message';
            }
            else if (postback) {
                event = 'postback';
            }
            else if (template) {
                event = 'template';
            }
            _this.emit(event, webhookEvent);
        });
        return reply.code(200).send('OK');
    };
    /**
     * Start the server
     * @memberof Client
     * @example
     * client.start(async () => console.log(`Listening on ${client.page.name} (${client.page.id})`));
     * @param {Function} [callback]
     */
    Client.prototype.start = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var startServer, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.server.post(this.endpoint, this.handleWebhookRequest.bind(this));
                        this.server.get(this.endpoint, this.handleVerifyRequest.bind(this));
                        startServer = function () { return __awaiter(_this, void 0, void 0, function () {
                            var err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.server.listen({ port: this.port, host: this.host })];
                                    case 1:
                                        _a.sent();
                                        if (callback)
                                            callback();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_2 = _a.sent();
                                        throw new Error("Failed to start server: ".concat(err_2));
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        if (!!this.page.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getPageInfo()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Check your access token: ".concat(err_1));
                    case 4: return [4 /*yield*/, startServer()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Register a plugin
     * @memberof Client
     * @example
     * client.register(require('fastify-cors'), {
     *      origin: '*',
     * });
     * @param {Function} ...args
     */
    Client.prototype.register = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.server).register.apply(_a, args)];
            });
        });
    };
    Client.prototype.sendRequest = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, method, path, body, url, bodyString, headers, _a, statusCode, response, responseBody;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accessToken = this.accessToken;
                        method = options.method, path = options.path, body = options.body;
                        url = "".concat(constants_1.Constants.MESSAGE_URL).concat(path || '', "?access_token=").concat(accessToken);
                        bodyString = JSON.stringify(body);
                        headers = {
                            'Content-Type': 'application/json'
                        };
                        return [4 /*yield*/, (0, undici_1.request)(url, {
                                method: method,
                                body: bodyString,
                                headers: headers
                            })];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, response = _a.body;
                        if (statusCode !== 200) {
                            throw new Error("Request failed: ".concat(statusCode, "\n").concat(response));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseBody = _b.sent();
                        return [2 /*return*/, responseBody];
                }
            });
        });
    };
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
     */
    Client.prototype.sendApiMessage = function (recipientId, message) {
        var body = {
            recipient: {
                id: recipientId
            },
            message: message
        };
        return this.sendRequest({ method: 'POST', path: 'messages', body: body });
    };
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
     */
    Client.prototype.send = function (recipientId, message) {
        return this.sendApiMessage(recipientId, message);
    };
    /**
     * Get page information
     * @memberof Client
     * @example
     * const pageInformation = await client.getPageInfo();
     * console.log(pageInformation);
     * @returns
     * { name: "Page Name", id: "PAGE_ID" }
     */
    Client.prototype.getPageInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, name, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.sendRequest({ method: 'GET' })];
                    case 1:
                        body = _b.sent();
                        _a = body, name = _a.name, id = _a.id;
                        this.page.name = name;
                        this.page.id = id;
                        return [2 /*return*/, { name: name, id: id }];
                }
            });
        });
    };
    /**
     * Send a text message
     * @memberof Client
     * @example
     * client.sendTextMessage("USER_ID", "Hello World!");
     * @param {string} recipientId
     * @param {string} text
     */
    Client.prototype.sendTextMessage = function (recipientId, text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendApiMessage(recipientId, { text: text })];
            });
        });
    };
    /**
     * Send an attachment
     * @memberof Client
     * @example
     * client.sendAttachment("USER_ID", "image", "https://example.com/image.png");
     * @param {string} recipientId
     * @param {string} type - image, audio, video, file
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    Client.prototype.sendAttachment = function (recipientId, type, url, isReusable) {
        if (isReusable === void 0) { isReusable = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendApiMessage(recipientId, {
                        attachment: {
                            type: type, // image, audio, video, file
                            payload: {
                                url: url,
                                is_reusable: isReusable
                            }
                        }
                    })];
            });
        });
    };
    /**
     * Send an image
     * @memberof Client
     * @example
     * client.sendImage("USER_ID", "https://example.com/image.png");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    Client.prototype.sendImage = function (recipientId, url, isReusable) {
        if (isReusable === void 0) { isReusable = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendAttachment(recipientId, 'image', url, isReusable)];
            });
        });
    };
    /**
     * Send an audio
     * @memberof Client
     * @example
     * client.sendAudio("USER_ID", "https://example.com/audio.mp3");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    Client.prototype.sendAudio = function (recipientId, url, isReusable) {
        if (isReusable === void 0) { isReusable = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendAttachment(recipientId, 'audio', url, isReusable)];
            });
        });
    };
    /**
     * Send a video
     * @memberof Client
     * @example
     * client.sendVideo("USER_ID", "https://example.com/video.mp4");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    Client.prototype.sendVideo = function (recipientId, url, isReusable) {
        if (isReusable === void 0) { isReusable = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendAttachment(recipientId, 'video', url, isReusable)];
            });
        });
    };
    /**
     * Send a file
     * @memberof Client
     * @example
     * client.sendFile("USER_ID", "https://example.com/file.pdf");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    Client.prototype.sendFile = function (recipientId, url, isReusable) {
        if (isReusable === void 0) { isReusable = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendAttachment(recipientId, 'file', url, isReusable)];
            });
        });
    };
    /**
     * Set typing indicator
     * @memberof Client
     * @example
     * client.setTyping("USER_ID", true);
     * @param {string} recipientId
     * @param {boolean} typing
     */
    Client.prototype.setTyping = function (recipientId, typing) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    recipient: {
                        id: recipientId
                    },
                    sender_action: typing ? 'typing_on' : 'typing_off'
                };
                return [2 /*return*/, this.sendRequest({ method: 'POST', path: 'messages', body: body })];
            });
        });
    };
    /**
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
     */
    Client.prototype.setPersistentMenu = function (psid, persistentMenu) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    psid: psid,
                    persistent_menu: persistentMenu
                };
                return [2 /*return*/, this.sendRequest({ method: 'POST', path: 'custom_user_settings', body: body })];
            });
        });
    };
    /**
     * Get persistent menu
     * @memberof Client
     * @example
     * client.getPersistentMenu("12345");
     * @param {string} psid
     */
    Client.prototype.getPersistentMenu = function (psid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendRequest({ method: 'GET', path: "custom_user_settings?psid=".concat(psid) })];
            });
        });
    };
    /**
     * Delete persistent menu
     * @memberof Client
     * @example
     * client.deletePersistentMenu("12345");
     * @param {string} psid
     */
    Client.prototype.deletePersistentMenu = function (psid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendRequest({
                        method: 'DELETE',
                        path: "custom_user_settings?psid=".concat(psid, "&params=[\"persistent_menu\"]")
                    })];
            });
        });
    };
    return Client;
}(events_1.EventEmitter));
exports.Client = Client;
