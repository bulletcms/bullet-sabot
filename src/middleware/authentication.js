const Authenticator = (user, permissionTiers)=>{
  /**
  user - username of allowed user
  permissionTiers - array of accepted tiers from most common to least
  */
  return async (ctx, next)=>{
    const {authentication, repository} = ctx.services;
    const {username, idToken} = ctx.request.body;
    const {googleId} = await authentication.verify(idToken);
    const profile = await repository.retrieve(username);
    if( (profile.googleId == googleId) && ((user && user == profile.username) || (permissionTiers && permissionTiers.filter((tier)=>{
      return profile.tags.indexOf(tier) > -1;
    }).length > 0)) ){
      // if request's user is granted access because of ownership or user is a part of the permissionTiers
      await next();
    }
  };
};

export {Authenticator};
