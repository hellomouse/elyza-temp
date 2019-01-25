/*
 * command.js - Contains all the commands
 * that are run by the bot
 */

/**
 * Add a new command with the following function
 * and options
 *
 * @param {object} cmdDict Object for commands, bot.commands
 * @param {function} func Function for the command
 * @param {object} opts Options for commands
 */
function addCommand(cmdDict, func, opts) {
    /* Default settings */
    if (!opts.chanRestrictions || typeof opts.chanRestrictions !== 'object') opts.chanRestrictions = [];
    if (!opts.category || typeof opts.category !== 'string') opts.category = 'general';
    if (!opts.name || typeof opts.name !== 'string') opts.name = func.name;
    if (opts.hidden === undefined) opts.hidden = false;
    if (!opts.helpText || typeof opts.helpText !== 'string') opts.helpText = 'Default help message';
    if (!opts.permLevel || typeof opts.permLevel !== 'number') opts.permLevel = 0;
    if (!opts.commandChar || typeof opts.commandChar !== 'string') opts.commandChar = '';
    if (opts.autoHelp === undefined) opts.autoHelp = true;
    if (!opts.alias || typeof opts.alias !== 'object') opts.alias = [];
    if (opts.exist === undefined) opts.exist = true;
    if (!opts.canExec || typeof opts.canExec !== 'function') opts.canExec = event => event.uperms > opts.permLevel;
    opts.func = func;

    cmdDict[opts.name] = opts;
}

module.exports = addCommand;
