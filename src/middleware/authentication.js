const Authenticator = (userCheck, permissionTiers)=>{
  /**
  userCheck - function that takes a username, params, and services, checks user ownership for a resource, and returns if valid
  permissionTiers - array of accepted tiers from most common to least
  */
  return async (ctx, next)=>{
    const {authentication, repository} = ctx.services;
    let username;
    let idToken;
    if(ctx.request.body.username){
      username = ctx.request.body.username;
      idToken = ctx.request.body.idToken;
    } else {
      username = ctx.request.get('username');
      idToken = ctx.request.get('idToken');
    }

    const reqUser = await authentication.verify(idToken);

    // if idToken is not valid
    if(!reqUser){
      ctx.status = 403;
      return;
    }
    const user = await repository.retrieve('Users', username);

    // if username is invalid
    if(!user){
      ctx.status = 403;
      return;
    }

    // if username does not match idToken
    if(user.googleId !== reqUser.googleId){
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


    } else
    // if permissionTiers present
    if(permissionTiers){
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
