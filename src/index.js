import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import Logger from 'koa-logger';

import {MockRepo} from 'services/repository';
import {pages} from 'routes';


class Sabot {
  constructor(){
    /**
    application
    */
    this.app_ = new Koa();

    /**
    dependencies
    */
    this.app_.context.services = {
      repository: new MockRepo()
    };

    /**
    api routes
    */
    const api = new Router();

    api
      .use('/pages', pages.routes(), pages.allowedMethods());

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
      .use(router.routes())
      .use(router.allowedMethods());
  }

  listen(port){
    this.app_.listen(port, () => console.log('sabot server launched on localhost:'+port));
  }
}


export {Sabot};
