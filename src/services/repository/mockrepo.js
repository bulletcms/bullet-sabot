import {Repository} from './repo';

const NotDefined = Symbol('NotDefined');
const Delete = Symbol('Delete');

const theRepo = {
  'Pages': {
    'kevin': {
      'title': 'Kevin',
      'tags': [],
      'content': [
        {
          'component': 'h1',
          'children': 'Kevin'
        },
        {
          'component': 'p',
          'children': 'Hi, I am Kevin'
        },
        {
          'component': 'DateView',
          'props': {
            'date': 1460146245,
            'author': 'xorkevin'
          }
        }
      ]
    },
    'about': {
      'title': 'About',
      'tags': [],
      'content': [
        {
          'component': 'h1',
          'children': 'About'
        },
        {
          'component': 'p',
          'children': 'BulletAPI is a minimal and configural system for content management.'
        },
        {
          'component': 'DateView',
          'props': {
            'date': 1461113451,
            'author': 'xorkevin'
          }
        }
      ]
    },
    'indexroute': {
      'title': 'BulletAPI',
      'tags': [],
      'content': [
        {
          'component': 'h1',
          'children': 'BulletAPI'
        },
        {
          'component': 'p',
          'children': 'Hello World!'
        },
        {
          'component': 'DateView',
          'props': {
            'date': 1461052472,
            'author': 'xorkevin'
          }
        }
      ]
    }
  },
  'Users': {
    'xorkevin': {
      'username': 'xorkevin',
      'name': 'Kevin',
      'lastName': 'Wang',
      'fullName': 'Kevin Wang',
      'email': 'example@example.com',
      'emailVerified': true,
      'profilePicture': false,
      'tags': ['admin', 'mod', 'editor', 'user'],
      'public': ['name', 'lastName', 'fullName', 'profilePicture', 'tags']
    }
  }
};

const traverse = (object, sector, data=NotDefined, update=false)=>{
  if(typeof sector == 'string'){
    return traverse(object, sector.split('.'), data);
  } else if(sector.length > 1){
    if(!object[sector[0]]){
      return false;
    }
    return traverse(object[sector.shift()], sector, data);
  } else if(sector.length == 0){
    return object;
  } else {
    if(data == Delete){
      if(!object[sector[0]]){
        return false;
      }
      const deleted = object[sector[0]];
      delete object[sector[0]];
      return deleted;
    } else if(data != NotDefined){
      if(update){
        if(!object[sector[0]]){
          return false;
        }
        object[sector[0]] = {...object[sector[0]], ...data};
      } else {
        if(object[sector[0]]){
          return false;
        }
        object[sector[0]] = {...data};
      }
    }
    if(!object[sector[0]]){
      return false;
    }
    return object[sector[0]];
  }
};

class MockRepo extends Repository {
  constructor(){
    super();
  }

  retrieve(sector, id){
    return traverse(theRepo, sector+'.'+id);
  }

  retrieveSector(sector, quantity){
    const sec = traverse(theRepo, sector);
    if(!sec){
      return false;
    }
    return Object.keys(sec);
  }

  store(sector, id, data){
    return traverse(theRepo, sector+'.'+id, data);
  }

  update(sector, id, data){
    return traverse(theRepo, sector+'.'+id, data, true);
  }

  remove(sector, id){
    return traverse(theRepo, sector+'.'+id, Delete);
  }
}

export {MockRepo};
