import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

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

router
  .get('*', echo)
  .post('*', echo)
  .put('*', echo)
  .del('*', echo);

app
  .use(requestTimeLogger)
  .use(BodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export {app};
