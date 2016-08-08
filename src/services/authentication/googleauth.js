import GoogleAuth from 'google-auth-library';
import {Authentication} from './auth';

class GoogleAuthentication extends Authentication {
  constructor(clientSecret){
    super();
    this.clientSecret_ = clientSecret;
    this.oauthclient_ = new GoogleAuth.OAuth2(this.clientSecret_.client_id, this.clientSecret_.client_secret);
  }

  verify(token){
    this.oauthclient_.verifyIdToken(token, this.clientSecret_.client_id, (something, login)=>{

    });
  }
}
