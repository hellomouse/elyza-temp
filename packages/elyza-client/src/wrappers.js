/**
 * wrappers.js - Adds helpful methods
 * to the client object
 */

/**
 * Extends client functionality
 * @param {Client} client Client to extend
 */
module.exports = function(client) {
    Object.assign(client.prototype, {
        _sendMsg: function(target, message) {
            this.send(`PRIVMSG ${target} :${message}`);
        },

        sendMsg: function(target, message, trunc = false) {
            if (target === undefined || message === undefined) 
                throw new Error('Channel/message are required');
     
            message = message.toString();

            /* Multi line messages are broken up
             * into several messages to send */
            if (message.indexOf('\n') > -1) {
                message.split('\n').forEach(line => this.sendMsg(target, line, trunc));
                return;
            }

            /* IRC servers do not allow sending of blank lines */
            if (message === '') message = ' ';

            // TODO add hostmask in length: ':Elyza!elyza@hellomouse/bin/Elyza'
            const maxlen = this.config.maxMessageLength - target.length - 'PRIVMSG :\r\n'.length;

            if (message.length > maxlen) {
                if (trunc) {
                    const truncatedStr = '\x02 (Truncated)';
                    this._sendMsg(target, message.slice(0, maxlen - truncatedStr.length) + truncatedStr);
                } else {
                    /* Chunk the message into chunks of 430
                     * TODO Figure out why 430 and replace with max len */
                    const chunk = message.match(/.{1,430}/g);
                    for (let i = 0; i < chunk.length; i++) this._sendMsg(target, chunk[i]);
                }
            } else {
                this._sendMsg(target, message);
            }
        },

        notice: function(user, message) {
            this.send(`NOTICE ${user} :${message}`);
        },

        ctcp: function(user, message) {
            this.send(`NOTICE ${user} :\x01${message}\x01`);
        },
    });
};
