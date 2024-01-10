const BASE_URL = 'https://graph.facebook.com/';
const MESSAGE_URL = `${BASE_URL}v18.0/me/`;

/**
 * Constants
 * @example
 * const { Constants } = require('chat-bridge');
 *
 * console.log(Constants.BASE_URL); // https://graph.facebook.com/
 * console.log(Constants.MESSAGE_URL); // https://graph.facebook.com/v18.0/me/
 */
export const Constants = {
    BASE_URL,
    MESSAGE_URL
};
