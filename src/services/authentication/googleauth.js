import {Authentication} from './auth';

class GoogleAuth extends Authentication {
  constructor(clientSecret){
    super();
    this.clientSecret_ = clientSecret;
  }

  verify(token){

  }
}

export {GoogleAuth};
