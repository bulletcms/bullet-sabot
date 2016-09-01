import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import {Authentication} from './auth';

class GoogleAuth extends Authentication {
  constructor(clientSecret){
    super();
    this.clientSecret_ = clientSecret;
    this.cert_ = false;
  }

  async getGoogleCerts(KId){
    if(this.cert_){
      return this.cert_[KId];
    } else {
      this.cert_ = await fetch(this.clientSecret_.auth_provider_x509_cert_url)
        .then((res)=>{
          return res.json();
        }).catch((err)=>{
          return false;
        });

      if(this.cert_){
        return this.cert_[KId];
      } else {
        return false;
      }
    }
  }

  async verify(token){
    const decodedToken = jwt.decode(token, {complete: true, json: true});
    if(!decodedToken){
      return false;
    }
    const KId = decodedToken.header.kid;
    const cert = await this.getGoogleCerts(KId);
    const options = {
      audience: this.clientSecret_.client_id,
      issuer: ['accounts.google.com', 'https://accounts.google.com']
    };

    try {
      const decoded = jwt.verify(token, cert, options);
      const name = decoded.given_name;
      const fullName = decoded.name;
      const lastName = decoded.family_name;
      const email = decoded.email;
      const emailVerified = decoded.email_verified;
      const googleId = decoded.sub;
      const profilePicture = decoded.picture;
      return {name, fullName, lastName, email, emailVerified, googleId, profilePicture};
    } catch(err){
      return false;
    }
  }
}

export {GoogleAuth};
