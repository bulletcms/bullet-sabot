import Router from 'koa-router';
import {Authenticator, CacheControl} from 'middleware';

const Sector = 'Users';

const authentication = Authenticator(async (username, params, services)=>{
  const {username: userId} = params;
  return username == userId;
}, ['admin']);

const authenticationAdmin = Authenticator(false, ['admin']);

const cache = CacheControl('dynamicMaxAge');

const users = new Router();

users
  .get('/:username', cache, async (ctx, next)=>{
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
    if(ctx.request.body.data.tags){
      ctx.status = 403;
    } else {
      const {repository} = ctx.services;
      let user = ctx.request.body.data;
      user.tags = ['user'];
      user.public = ['name', 'lastName', 'fullName', 'profilePicture', 'tags'];
      const storedUser = await repository.store(Sector, ctx.request.body.data.username, user);
      if(!storedUser){
        ctx.status = 403;
      } else {
        ctx.body = {username: storedUser.username, status: true};
      }
    }
  })
  .put('/:username', authentication, async (ctx, next)=>{
    if(ctx.request.body.data.tags){
      ctx.status = 403;
    } else {
      if(ctx.request.body.data.username !== ctx.params.username){
        ctx.status = 409;
      } else {
        const {repository} = ctx.services;
        const updatedUser = await repository.update(Sector, ctx.request.body.data.username, ctx.request.body.data);
        if(!updatedUser){
          ctx.status = 404;
        } else {
          ctx.body = {username: updatedUser.username, status: true};
        }
      }
    }
  })
  .put('/:username/tags', authenticationAdmin, async (ctx, next)=>{
    if(ctx.request.body.data.username !== ctx.params.username){
      ctx.status = 409;
    } else {
      const {repository} = ctx.services;
      const updatedUser = await repository.update(Sector, ctx.request.body.data.username, ctx.request.body.data);
      if(!updatedUser){
        ctx.status = 404;
      } else {
        ctx.body = {username: updatedUser.username, status: true};
      }
    }
  })
  .del('/:username', authentication, async (ctx, next)=>{
    if(ctx.request.body.data.username !== ctx.params.username){
      ctx.status = 409;
    } else {
      const {repository} = ctx.services;
      const removedUser = await repository.remove(Sector, ctx.request.body.data.username);
      if(!removedUser){
        ctx.status = 404;
      } else {
        ctx.body = {username: removedUser.username, status: true};
      }
    }
  });

export {users};
