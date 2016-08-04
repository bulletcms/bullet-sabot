import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

const requestTimeLogger = async (ctx, next)=>{
  const timeStart = new Date();
  await next();
  const timeElapsed = Date.now() - timeStart.getTime();
  console.log(`request at ${timeStart}, time elapsed: ${timeElapsed}ms`);
};

const helloWorld = async (ctx, next)=>{
  ctx.body = 'Hello World!';
  await next();
};

router
  .get('/', helloWorld);

app
  .use(requestTimeLogger)
  .use(router.routes())
  .use(router.allowedMethods());

export {app};
