import Router from 'koa-router';
import {Authenticator} from 'middleware';

const Sector = 'Pages';

const authentication = Authenticator(false, ['editor']);

const pages = new Router();

pages
  .get('/', async (ctx, next)=>{
    const {repository} = ctx.services;
    ctx.body = repository.retrieveSector(Sector);
    await next();
  })
  .get('/:pageId', async (ctx, next)=>{
    const {repository} = ctx.services;
    ctx.body = repository.retrieve(Sector, ctx.params.pageId);
    await next();
  })
  .post('/', async (ctx, next)=>{

  });

export {pages};
