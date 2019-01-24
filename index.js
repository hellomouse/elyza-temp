
require('app-module-path').addPath(__dirname + '/packages');
const Client = require('elyza-client').Client;

let client = new Client('irc.freenode.net', 6697);
client.connect();
