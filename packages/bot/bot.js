/**
 * bot.js - The main bot class for Elyza
 * Contains a client, a command handler and various
 * utilities that can be extended with the modules
 */

const Client = require('elyza-client');
const addCmd = require('./commands');

/** Main bot class */
class Bot {
    /**
     * Construct a bot
     * @param {object} config Config for options
     */
    constructor(config) {
        this.version = '0.0.1-beta';

        this.commands = {};
        this.commandGroups = {};
    }

    /**
     * Add a new command to the bot
     * @param {string} name Name of command
     * @param {string} group Group for command
     * @param {function} code Function of command
     * @param {string} help Help text for command
     * @param {object} opts Command options, see commands.js
     */
    addCmd(name, group, code, help, opts) {
        opts.category = group;
        opts.name = name;
        opts.helpText = help;
        addCmd(this.commands, code, opts);
    }
}
