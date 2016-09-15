import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import Send from 'koa-send';
import Serve from 'koa-static';
import BodyParser from 'koa-bodyparser';
import Cors from 'kcors';
import Logger from 'koa-logger';

import {GoogleDatastore, MockRepo} from 'services/repository';
import {GoogleAuth} from 'services/authentication';

import routes from 'routes';

const Services = {GoogleDatastore, GoogleAuth, MockRepo};

class Sabot {
  constructor(dependencies, opts={}){
    /**
    application
    */
    this.app_ = new Koa();

    /**
    dependencies
    */
    this.app_.context.services = dependencies;

    /**
     * opts
     */
    const {log, servePath, dashboardPath, indexPath, staticMaxAge} = opts;
    const serveOpts = {maxage: staticMaxAge*1000 || 16384*1000}; // 4.5 hour cache for static objects
    const defaultOpts = {dynamicMaxAge: 128}; // 2 minute cache for dynamic objects
    this.app_.context.opts = {...defaultOpts, ...opts};

    /**
    app routes
    */
    const router = new Router();

    router
      .use('/api', BodyParser(), routes.routes(), routes.allowedMethods())
      .get('/*', async (ctx, next)=>{
        if(/^\/[A-Za-z0-9_\-\/]+$/.test(ctx.path)){
          console.log('triggered');
          await Send(ctx, '/index.html', {...serveOpts, root: servePath});
        }
      });

    /**
    middleware
    */
    if(log){
      this.app_
        .use(Logger());
    }

    if(servePath){
      this.app_
      .use(Serve(servePath, serveOpts));
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
