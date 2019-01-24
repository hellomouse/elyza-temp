/**
 * client.js - Main IRC Client for Elyza
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

const EventEmitter = require('events');
const net = require('net');
const tls = require('tls');
const Parser = require('irc-stream-parser');
const Logger = require('elyza-logger');

const { stripFormatting } = require('./utils');
const misc = require('./misc.js');

let log;


/** Represents an IRC client */
class Client extends EventEmitter {
    /**
     * Construct a new Client
     *
     * @param {string} server The server hostname, ie 'irc.website.com'
     * @param {number} port The server port, ie 6667
     * @param {Object<string, any>} config The config object
     */
    constructor(server, port, config = {}) {
        // TODO helpful errors about missing stuff

        super();

        this.generateConfig(config);
        this.server = { datapart: '', capabilities: [], capreq: [] };
        this.client = { capabilities: ['multi-prefix', 'extended-join'] };

        const opts = {
            port: port,
            host: server,
            localaddress: this.config.localAddress
        };

        /* Update some configs based on auth type */
        if (this.config.auth.type === 'certfp') {
            opts.cert = this.config.auth.cert;
            opts.key = this.config.auth.key;
            opts.passphrase = this.config.auth.password;
        }
        else if (this.config.auth.type === 'sasl') {
            this.client.capabilities.push('sasl');
        }

        this.socket = this.config.ssl ?
            tls.connect(opts) : net.connect(opts);
    }

    /**
     * Generates the client config, filling in default
     * values as needed
     * @param {Object<string, any>} config IRC Config object
     */
    generateConfig(config) {
        this.config = {
            nick: 'Elyza2',
            ident: 'Hellomouse',
            backupNicks: ['Elyza_', 'Elyza__'],
            channels: ['#hellomouse'],
            realName: 'Elyza',
            logLevel: 'all',
            autoReconnect: true,
            localAddress: null,
            ssl: true,
            floodProtectionDelay: 700,
            serverReconnect: {
                count: 5,
                delay: 10000
            },
            stripColors: true,
            maxMessageLength: 512,
            auth: {
                type: 'none'
            }
        };

        misc.setDefaultKeys(this.config, config);
        log = new Logger(this.config.logLevel);
    }

    /**
     * Connect to the IRC server and handle login, commands,
     * and on data recieved events.
     */
    connect() {
        this.parser = new Parser();
        this.socket
        /* Handle login and nickname while connecting */
        .once('connect', () => {
            log.info('Connected');

            this.send('CAP LS 302');

            if (this.config.auth.type === 'pass')
                this.send('PASS ' + this.config.auth.password);

            this.send(`NICK ${this.config.nick}`);
            this.send(`USER ${this.config.ident} * * :${this.config.realName}`);
            this.send('CAP END');
        });

        // TODO on close

        this.socket.pipe(this.parser)
        /* Handle event emitting on data */
        .on('data', event => {
            log.debug('[RECV] ' + stripFormatting(event.raw));

            try {
                this.emit(event.command, this, event);
                this.emit('all', this, event);
            } catch (e) {
                log.error(e.stack);
            }
        })
        /* Handle errors */
        .on('error', err => {
            log.error(err.stack);
            this.socket.close();
        });
    }

    /**
     * Send data to the server (Raw, not queued!)
     * @param {string} data Data to send
     */
    _send(data) {
        this.socket.write(data + '\r\n');
    }

    // TEMP, this will be queued
    send(data) {
        this._send(data);
    }

    /**
     * Join an IRC channel
     * @param {string} channel Channel to join, ie #channel
     * @param {string} key Channel password (optional)
     */
    join(channel, key = '') {
        // TODO
    }
}

module.exports = Client;
