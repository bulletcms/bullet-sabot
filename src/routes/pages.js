import Router from 'koa-router';
import {Authenticator} from 'middleware';

const Sector = 'Pages';

const authentication = Authenticator(false, ['editor']);

const pages = new Router();

pages
  .get('/', async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedPages = await repository.retrieveSector(Sector);
    if(!retrievedPages){

    } else {
      ctx.body = retrievedPages;
    }
    await next();
  })
  .get('/:pageId', async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedPage = await repository.retrieve(Sector, ctx.params.pageId);
    if(!retrievedPage){
      
    } else {
      ctx.body = retrievedPage;
    }
    await next();
  })
  .post('/', authentication, async (ctx, next)=>{

  })
  .put('/:pageId', authentication, async (ctx, next)=>{

  })
  .del('/:pageId', authentication, async (ctx, next)=>{

  });

export {pages};
