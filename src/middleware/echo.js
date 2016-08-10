const echo = async (ctx, next)=>{
  ctx.body = ctx.request.body;
  await next();
};

export {echo};
