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

    const returnedUser = {};
    for(let i of retrievedUser.public){
      returnedUser[i] = user[i];
    }
    return returnedUser;
  })
  .get('/:username/private', authentication, async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedUser = await repository.retrieve(Sector, ctx.params.username);
    return retrievedUser;
  })
  .post('/', async (ctx, next)=>{
    const {repository} = ctx.services;

  })
  .put('/:username', authentication, async (ctx, next)=>{

  })
  .del('/:username', authentication, async (ctx, next)=>{

  });

export {users};
