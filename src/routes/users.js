import Router from 'koa-router';
import {Authenticator} from 'middleware';

const Sector = 'Users';

const authentication = Authenticator(async (username, params, services)=>{
  const {username: userId} = params;
  return username == userId;
}, ['admin']);

const users = new Router();

users
  .get('/:username', async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedUser = await repository.retrieve(Sector, ctx.params.username);
    if(!retrievedUser){
      ctx.status = 404;
    } else {
      const returnedUser = {};
      for(let i of retrievedUser.public){
        returnedUser[i] = user[i];
      }
      ctx.body = returnedUser;
    }
  })
  .get('/:username/private', authentication, async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedUser = await repository.retrieve(Sector, ctx.params.username);
    if(!retrievedUser){
      ctx.status = 404;
    } else {
      ctx.body = retrievedUser;
    }
  })
  .post('/', async (ctx, next)=>{
    const {repository} = ctx.services;
    const storedUser = await repository.store(Sector, ctx.request.username, ctx.request.body);
    if(!storedUser){
      ctx.status = 403;
    } else {
      ctx.body = {username: storedUser.username, status: true};
    }
  })
  .put('/:username', authentication, async (ctx, next)=>{

  })
  .del('/:username', authentication, async (ctx, next)=>{

  });

export {users};
