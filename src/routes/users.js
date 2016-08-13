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
        returnedUser[i] = retrievedUser[i];
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
    const storedUser = await repository.store(Sector, ctx.request.body.username, ctx.request.body);
    if(!storedUser){
      ctx.status = 403;
    } else {
      ctx.body = {username: storedUser.username, status: true};
    }
  })
  .put('/:username', authentication, async (ctx, next)=>{
    const {repository} = ctx.services;
    const updatedUser = await repository.update(Sector, ctx.request.body.username, ctx.request.body);
    if(!updatedUser){
      ctx.status = 404;
    } else {
      ctx.body = {username: updatedUser.username, status: true};
    }
  })
  .del('/:username', authentication, async (ctx, next)=>{
    const {repository} = ctx.services;
    const removedUser = await repository.remove(Sector, ctx.request.body.username);
    if(!removedUser){
      ctx.status = 404;
    } else {
      ctx.body = {username: removedUser.username, status: true};
    }
  });

export {users};
