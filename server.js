const BulletSabot = require('./lib');
const Sabot = BulletSabot.Sabot;
const Services = BulletSabot.Services;

const sabot = new Sabot(
  {
    repository   : new Services.GoogleDatastore(require('./service_account_key.json').project_id, require('./service_account_key.json')),
    authentication: new Services.GoogleAuth(require('./client_secret.json').web),
  },
  {
    log: true,
    servePath: __dirname + '/public',
    staticMaxAge: 16384,
    dynamicMaxAge: 128
  }
);

sabot.listen(8080);
