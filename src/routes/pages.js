import Router from 'koa-router';
import {Authenticator} from 'middleware';

const Sector = 'Pages';

const authentication = Authenticator(false, ['editor']);

const cache = CacheControl('dynamicMaxAge');

const pages = new Router();

pages
  .get('/', cache, async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedPages = await repository.retrieveSector(Sector);
    if(!retrievedPages){
      ctx.status = 404;
    } else {
      ctx.body = retrievedPages;
    }
    await next();
  })
  .get('/:pageId', cache, async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedPage = await repository.retrieve(Sector, ctx.params.pageId);
    if(!retrievedPage){
      ctx.status = 404;
    } else {
      ctx.body = retrievedPage;
    }
    await next();
  })
  .post('/', authentication, async (ctx, next)=>{
    const {repository} = ctx.services;
    const storedPage = await repository.store(Sector, ctx.request.body.data.pageid, ctx.request.body.data);
    if(!storedPage){
      ctx.status = 403;
    } else {
      ctx.body = {pageid: storedPage.pageid, status: true};
    }
    await next();
  })
  .put('/:pageId', authentication, async (ctx, next)=>{
    if(ctx.request.body.data.pageid !== ctx.params.pageId){
      ctx.status = 409;
    } else {
      const {repository} = ctx.services;
      const updatedPage = await repository.update(Sector, ctx.request.body.data.pageid, ctx.request.body.data);
      if(!updatedPage){
        ctx.status = 404;
      } else {
        ctx.body = {pageid: updatedPage.pageid, status: true};
      }
    }
    await next();
  })
  .del('/:pageId', authentication, async (ctx, next)=>{
    if(ctx.request.body.data.pageid !== ctx.params.pageId){
      ctx.status = 409;
    } else {
      const {repository} = ctx.services;
      const removedPage = await repository.remove(Sector, ctx.request.body.data.pageid);
      if(!removedPage){
        ctx.status = 404;
      } else {
        ctx.body = {pageid: removedPage.pageid, status: true};
      }
    }
    await next();
  });

export {pages};
