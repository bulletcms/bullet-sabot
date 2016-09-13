const BulletSabot = require('./lib');
const Sabot = BulletSabot.Sabot;
const Services = BulletSabot.Services;

const sabot = new Sabot(
  {
    repository   : new Services.MockRepo(),
    authentication: new Services.GoogleAuth(require('./client_secret.json').web),
  },
  {
    log: true,
    staticMaxAge: 16384,
    dynamicMaxAge: 128
  }
);

sabot.listen(8080);
