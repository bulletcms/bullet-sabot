import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import Cors from 'kcors';
import Logger from 'koa-logger';

import {MockRepo} from 'services/repository';
import {GoogleAuth} from 'services/authentication';

import {users, pages, config} from 'routes';

const Services = {MockRepo, GoogleAuth};

class Sabot {
  constructor(dependencies){
    /**
    application
    */
    this.app_ = new Koa();

    /**
    dependencies
    */
    this.app_.context.services = dependencies;

    /**
    api routes
    */
    const api = new Router();

    api
      .use('/users', users.routes(), users.allowedMethods())
      .use('/pages', pages.routes(), pages.allowedMethods())
      .use('/config', config.routes(), config.allowedMethods());

    /**
    app routes
    */
    const router = new Router();

    router
      .use('/api', BodyParser(), api.routes(), api.allowedMethods());

    /**
    middleware
    */
    this.app_
      .use(Logger())
      .use(Cors())
      .use(router.routes())
      .use(router.allowedMethods());
  }

  listen(port){
    this.app_.listen(port, () => console.log('sabot server launched on localhost:'+port));
  }
}

export {Sabot, Services};
