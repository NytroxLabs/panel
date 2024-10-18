const { db } = require('../handlers/db.js');
const config = require('../config.json');
const { v4: uuidv4 } = require('uuid');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();

async function init() {
    const Nytrox = await db.get('Nytrox_instance');
    if (!Nytrox) {
        log.init('this is probably your first time starting Nytrox, welcome!');
        log.init('you can find documentation for the panel at Nytrox.dev');

        let imageCheck = await db.get('images');
        if (!imageCheck) {
            log.error('before starting Nytrox for the first time, you didn\'t run the seed command!');
            log.error('please run: npm run seed');
            log.error('if you didn\'t do it already, make a user for yourself: npm run createUser');
            process.exit();
        }

        let NytroxId = uuidv4();
        let setupTime = Date.now();
        
        let info = {
            NytroxId: NytroxId,
            setupTime: setupTime,
            originalVersion: config.version
        }

        await db.set('Nytrox_instance', info)
        log.info('initialized Nytrox panel with id: ' + NytroxId)
    }        

    log.info('init complete!')
}

module.exports = { init }