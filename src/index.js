import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import Cors from 'kcors';
import Logger from 'koa-logger';

import {MockRepo} from 'services/repository';
import {GoogleAuth} from 'services/authentication';

import routes from 'routes';

const Services = {MockRepo, GoogleAuth};

class Sabot {
  constructor(dependencies, log=false){
    /**
    application
    */
    this.app_ = new Koa();

    /**
    dependencies
    */
    this.app_.context.services = dependencies;

    /**
    app routes
    */
    const router = new Router();

    router
      .use('/api', BodyParser(), routes.routes(), routes.allowedMethods());

    /**
    middleware
    */
    if(log){
      this.app_
      .use(Logger())
    }
    this.app_
      .use(Cors())
      .use(router.routes())
      .use(router.allowedMethods());
  }

  listen(port){
    this.app_.listen(port, () => console.log('sabot server launched on localhost:'+port));
  }
}

export {Sabot, Services};
