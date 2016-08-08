import {abstractMethod} from 'utility';

class Authentication {
  verify(token){
    /**
    parameters:
      token - user identification information

    returns:
      user information | false
    */
    abstractMethod();
  }
}

export {Authentication};
