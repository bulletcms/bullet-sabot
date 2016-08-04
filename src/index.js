import 'babel-polyfill';
import Koa from 'koa';
const app = new Koa();

// response
app.use(async (ctx) => {
  ctx.body = 'Hello World!';
});

export {app};
