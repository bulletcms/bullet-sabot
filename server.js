const Sabot = require('./lib').Sabot;

const port = 5000;

const sabot = new Sabot();

sabot.listen(port);
