import JWT from 'jsonwebtoken';
import fetch from 'node-fetch';
import {Authentication} from './auth';

class GoogleAuth extends Authentication {
  constructor(clientSecret){
    super();
    this.clientSecret_ = clientSecret;
  }

  async getGoogleCerts(KId, box){
    fetch(this.clientSecret_.auth_provider_x509_cert_url)
      .then((res)=>{
        return res.json();
      }).then((json)=>{
        const key = json[KId];
      }).catch(function(ex) {
        const exception = ex;
      });
  }

  verify(token){
    const decodedToken = JWT.decode(token, {complete: true, json: true});
    if(!decodedToken){
      return [false, 'Error: invalid token'];
    }

  }
}

export {GoogleAuth};
