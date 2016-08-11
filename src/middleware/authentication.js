const Authenticator = (permissionTier, user)=>{
  return async (ctx, next)=>{
    const {authentication, repository} = ctx.services;
    const {username, idToken} = ctx.request.body;
    const {googleId} = await authentication.verify(idToken);
    const profile = await repository.retrieve(username);
    if(profile.googleId == googleId){
      // if request's user is a part of the permissionTier or the user is granted access because of ownership
      if(permissionTier && profile.tags.indexOf(permissionTier) || user && user == profile.username){
        await next();
      }
    }
  };
};

export {Authenticator};
