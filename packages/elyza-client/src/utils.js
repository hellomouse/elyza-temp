/**
 * utils.js - Misc utils for Elyza client
 *
 * Code modified from otherbot-client by iczero
 * which can be found at the following url:
 * https://github.com/hellomouse/otherbot-new
 *
 * (c) Hellomouse 2019
 */

/**
* Strips formatting from IRC messages
* @param {string} msg
* @return {string}
*/
function stripFormatting(msg) {
    /* eslint-disable no-control-regex */
    const ccodes = ['\\x0f', '\\x16', '\\x1d', '\\x1f', '\\x02', '\\x03([0-9][0-6]?)?,?([0-9][0-6]?)?'];
    /* eslint-enable no-control-regex */

    for (const cc of ccodes)
        msg = msg.replace(new RegExp(cc, 'g'), '');
    return msg;
}

module.export = {
    stripFormatting
};
