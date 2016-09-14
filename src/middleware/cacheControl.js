const CacheControl = (maxage)=>{
  let k = 'no-cache';
  if(maxage){
    k = maxage;
  }

  if(typeof maxage == 'string'){
    return async (ctx, next)=>{
      ctx.set('Cache-Control', `max-age=${ctx.opts[k]}`);
      await next();
    };
  } else {
    return async (ctx, next)=>{
      ctx.set('Cache-Control', `max-age=${k}`);
      await next();
    };
  }
};

const ETag = async (ctx, next)=>{

};

export {CacheControl};
