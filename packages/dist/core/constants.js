"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
var BASE_URL = 'https://graph.facebook.com/';
var MESSAGE_URL = "".concat(BASE_URL, "v18.0/me/");
/**
 * Constants
 * @example
 * import { Constants } from "@messenger/core";
 *
 * console.log(Constants.BASE_URL); // https://graph.facebook.com/
 * console.log(Constants.MESSAGE_URL); // https://graph.facebook.com/v18.0/me/
 */
exports.Constants = {
    BASE_URL: BASE_URL,
    MESSAGE_URL: MESSAGE_URL
};
