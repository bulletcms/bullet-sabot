import Router from 'koa-router';
import {Authenticator} from 'middleware';

const Sector = 'Pages';

const authentication = Authenticator(async (username, params, services)=>{
  const {username: userId} = params;
  return username == userId;
}, ['admin']);

const users = new Router();

users
  .get('/:username', async (ctx, next)=>{

  })
  .get('/:username/private', authentication, async (ctx, next)=>{

  })
  .post('/', async (ctx, next)=>{

  })
  .put('/:username', authentication, async (ctx, next)=>{

  })
  .del('/:username', authentication, async (ctx, next)=>{

  });

export {users};
