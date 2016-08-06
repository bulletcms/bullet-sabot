import Router from 'koa-router';

const Sector = 'Pages';

const pages = new Router();

const pagesCollection = async (ctx, next)=>{
  const {repository} = ctx.services;
  ctx.body = repository.retrieveSector(Sector);
  await next();
};

const pagesItem = async (ctx, next)=>{
  const {repository} = ctx.services;
  ctx.body = repository.retrieve(Sector, ctx.params.pageId);
  await next();
};

pages
  .get('/', pagesCollection)
  .get('/:pageId', pagesItem);

export {pages};
