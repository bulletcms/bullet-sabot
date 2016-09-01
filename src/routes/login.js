import Router from 'koa-router';

const login = new Router();

login.post('/', async (ctx, next)=>{
  const {authentication} = ctx.services;
  const {idToken} = ctx.request.body;

  const reqUser = await authentication.verify(idToken);

  ctx.body = reqUser;

  await next();
});

export {login};
