const {ensureFileExists}=require('./utils')
const {processCommands} = require('./taskManger');
const path = require('path');

ensureFileExists(path.join(__dirname, 'data.json'));

const [command, ...args] = process.argv.slice(2);
processCommands(command,...args)

