import Router from 'koa-router';
import {Authenticator} from 'middleware';

const Sector = 'Users';

const authentication = Authenticator(async (username, params, services)=>{
  const {username: userId} = params;
  return username == userId;
}, ['admin']);

const authenticationAdmin = Authenticator(false, ['admin']);

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
    await next();
  })
  .get('/:username/private', authentication, async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedUser = await repository.retrieve(Sector, ctx.params.username);
    if(!retrievedUser){
      ctx.status = 404;
    } else {
      ctx.body = retrievedUser;
    }
    await next();
  })
  .post('/', async (ctx, next)=>{
    if(ctx.request.body.tags){
      ctx.status = 403;
    } else {
      const {repository} = ctx.services;
      let user = ctx.request.body;
      user.tags = ['user'];
      const storedUser = await repository.store(Sector, ctx.request.body.username, ctx.request.body);
      if(!storedUser){
        ctx.status = 403;
      } else {
        ctx.body = {username: storedUser.username, status: true};
      }
    }
    await next();
  })
  .put('/:username', authentication, async (ctx, next)=>{
    if(ctx.request.body.tags){
      ctx.status = 403;
    } else {
      if(ctx.request.body.username !== ctx.params.username){
        ctx.status = 409;
      } else {
        const {repository} = ctx.services;
        const updatedUser = await repository.update(Sector, ctx.request.body.username, ctx.request.body);
        if(!updatedUser){
          ctx.status = 404;
        } else {
          ctx.body = {username: updatedUser.username, status: true};
        }
      }
    }
    await next();
  })
  .put('/:username/tags', authenticationAdmin, async (ctx, next)=>{
    if(ctx.request.body.username !== ctx.params.username){
      ctx.status = 409;
    } else {
      const {repository} = ctx.services;
      const updatedUser = await repository.update(Sector, ctx.request.body.username, ctx.request.body);
      if(!updatedUser){
        ctx.status = 404;
      } else {
        ctx.body = {username: updatedUser.username, status: true};
      }
    }
  })
  .del('/:username', authentication, async (ctx, next)=>{
    if(ctx.request.body.username !== ctx.params.username){
      ctx.status = 409;
    } else {
      const {repository} = ctx.services;
      const removedUser = await repository.remove(Sector, ctx.request.body.username);
      if(!removedUser){
        ctx.status = 404;
      } else {
        ctx.body = {username: removedUser.username, status: true};
      }
    }
    await next();
  });

export {users};
