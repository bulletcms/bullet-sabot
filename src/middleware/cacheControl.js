const CacheControl = (maxage)=>{
  let k = 'no-cache';
  if(maxage){
    k = maxage;
  }

  if(typeof maxage == 'string'){
    return async (ctx, next)=>{
      ctx.set('Cache-Control', ctx.opts[k]);
      await next();
    };
  } else {
    return async (ctx, next)=>{
      ctx.set('Cache-Control', k);
      await next();
    };
  }
};

const ETag = async (ctx, next)=>{

};

export {CacheControl};
