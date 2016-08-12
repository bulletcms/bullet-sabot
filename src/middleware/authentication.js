const Authenticator = (userCheck, permissionTiers)=>{
  /**
  userCheck - function that takes a username, params, and services, checks user ownership for a resource, and returns if valid
  permissionTiers - array of accepted tiers from most common to least
  */
  return async (ctx, next)=>{
    const {authentication, repository} = ctx.services;
    const {username, idToken} = ctx.request.body;

    const reqUser = await authentication.verify(idToken);

    // if idToken is not valid
    if(!reqUser){
      ctx.status = 403;
      return;
    }

    const user = await repository.retrieve(username);

    // if username is invalid
    if(!user){
      ctx.status = 403;
      return;
    }

    // if username does not match idToken
    if(user.googleId == reqUser.googleId){
      ctx.status = 403;
      return;
    }

    // if userCheck present
    if(userCheck){
      const validUserCheck = await userCheck(user.username, ctx.params, ctx.services);
      // if userCheck not valid
      if(!validUserCheck){
        ctx.status = 403;
        return;
      }

      // or if permissionTiers present
    } else if(permissionTiers){
      let intersection = false;
      for(let i of permissionTiers){
        if(user.tags.indexOf(i) > -1){
          intersection = true;
          break;
        }
      }

      // if there is no intersection of permissionTiers and user tags
      if(!intersection){
        ctx.status = 403;
        return;
      }
    }

    await next();
  };
};

export {Authenticator};
