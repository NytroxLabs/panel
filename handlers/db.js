const Keyv = require('keyv');
const db = new Keyv('sqlite://nytrox.db');

module.exports = { db }