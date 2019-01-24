/**
 * utils.js - Misc utils for Elyza client
 *
 * Code modified from otherbot-client by iczero
 * which can be found at the following url:
 * https://github.com/hellomouse/otherbot-new
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS
 * ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO
 * EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
 * ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
 * OF THIS SOFTWARE.
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
