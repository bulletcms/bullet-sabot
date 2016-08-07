import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import Logger from 'koa-logger';

import {MockRepo} from 'services/repository';
import {pages} from 'routes';

/**
application
*/
const app = new Koa();


/**
dependencies
*/
app.context.services = {
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
  .use('/api', api.routes(), api.allowedMethods());

/**
middleware
*/
app
  .use(Logger())
  .use(BodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export {app};
