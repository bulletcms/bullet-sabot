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
  }
};

const traverse = (object, sector, data=NotDefined, update=false)=>{
  if(typeof sector == 'string'){
    return traverse(object, sector.split('.'), data);
  } else if(sector.length > 1){
    return traverse(object[sector.shift()], sector, data);
  } else if(sector.length == 0){
    return object;
  } else {
    if(data == Delete){
      delete object[sector[0]];
      return undefined;
    } else if(data != NotDefined){
      if(update){
        object[sector[0]] = {...object[sector[0]], ...data};
      } else {
        object[sector[0]] = {...data};
      }
    }
    return object[sector[0]];
  }
};

class MockRepo extends Repository{
  constructor(){
    super();
  }

  retrieve(sector, id){
    return traverse(theRepo, sector+'.'+id);
  }

  retrieveSector(sector, quantity){
    return Object.keys(traverse(theRepo, sector));
  }

  store(sector, id, data){
    traverse(theRepo, sector+'.'+id, data);
  }

  update(sector, id, data){
    traverse(theRepo, sector+'.'+id, data, true);
  }

  remove(sector, id){
    traverse(theRepo, sector+'.'+id, Delete);
  }
}

export {MockRepo};
