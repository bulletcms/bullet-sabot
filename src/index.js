import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';

import {MockRepo} from 'services/repository';

import {pages} from 'routes';


const app = new Koa();

app.context.services = {
  repository: new MockRepo()
};


const requestTimeLogger = async (ctx, next)=>{
  const timeStart = new Date();
  await next();
  const timeElapsed = Date.now() - timeStart.getTime();
  console.log(`${timeStart} | ${ctx.method} ${ctx.url}, time elapsed: ${timeElapsed}ms`);
};

const echo = async (ctx, next)=>{
  ctx.body = ctx.request.body;
  await next();
};


const router = new Router({
  prefix: '/api'
});

router
  .use('/pages', pages.routes(), pages.allowedMethods());

app
  .use(requestTimeLogger)
  .use(BodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export {app};
