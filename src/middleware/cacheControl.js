const CacheControl = (maxage)=>{
  return async (ctx, next)=>{
    ctx.set('Cache-Control', (maxage && `maxage=${maxage}`) || 'no-cache');
  };
};

const ETag = async (ctx, next)=>{

};

export {CacheControl};
