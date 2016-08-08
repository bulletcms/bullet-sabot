const Sabot = require('./lib').Sabot;

const port = 5000;

const authClientSecret = require('./client_secret.json').web;

const sabot = new Sabot(authClientSecret);

sabot.listen(port);
