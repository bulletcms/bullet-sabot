import {Repository} from './repo';

const NotDefined = Symbol('NotDefined');
const Delete = Symbol('Delete');

const theRepo = {
  'Pages': {
    'kevin': {
      'pageid': 'kevin',
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
        }
      ]
    },
    'about': {
      'pageid': 'about',
      'title': 'About',
      'tags': [],
      'content': [
        {
          'component': 'PageHeader',
          'children': 'About'
        },
        {
          'component': 'p',
          'children': 'BulletAPI is a minimal and configural system for content management.'
        }
      ]
    },
    'indexroute': {
      'pageid': 'indexroute',
      'title': 'Home',
      'tags': [],
      'content': [
        {
          'component': 'PageHeader',
          'children': 'Article View'
        },
        {
          'component': 'Article',
          'props': {
            'title': 'Article Title',
            'author': 'Kevin Wang',
            'date': 1471759742287
          },
          'children': [
            {
              'component': 'p',
              'children': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquet nunc. Maecenas commodo libero arcu, vitae ultrices quam iaculis vitae. Nulla eros purus, auctor sed laoreet in, pharetra eget mi. Phasellus molestie id odio eu mollis. Proin nec tellus et lectus suscipit cursus quis eget eros. Nunc interdum lacus elit, id gravida ligula placerat eu. Nullam hendrerit iaculis lorem, nec scelerisque turpis pretium ac. Morbi blandit dolor massa, cursus lobortis eros malesuada ut. Sed semper ullamcorper gravida. Integer at diam urna. In ligula tortor, egestas nec dictum eu, suscipit vitae mauris. Sed imperdiet sit amet massa at fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
            },
            {
              'component': 'p',
              'children': 'Maecenas vulputate nec mi non posuere. Vestibulum malesuada erat justo, at aliquet enim posuere vestibulum. Ut viverra porta est, eu semper lacus euismod et. Curabitur elementum vestibulum nisi imperdiet ornare. Nulla lobortis mi eu dictum viverra. Donec rhoncus, tortor vitae lobortis fringilla, eros nibh malesuada erat, faucibus condimentum risus urna ut elit. Phasellus non ullamcorper lectus, eu rutrum risus. Nullam convallis scelerisque justo ac sollicitudin. Duis nisi arcu, condimentum non eros in, rutrum mollis urna. Integer elit orci, rhoncus sit amet rutrum vitae, ullamcorper ut leo. Donec ut tempus eros.'
            }
          ]
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

  async retrieve(sector, id){
    return traverse(theRepo, sector+'.'+id);
  }

  async retrieveSector(sector, quantity){
    const sec = traverse(theRepo, sector);
    if(!sec){
      return false;
    }
    return Object.keys(sec);
  }

  async store(sector, id, data){
    return traverse(theRepo, sector+'.'+id, data);
  }

  async update(sector, id, data){
    return traverse(theRepo, sector+'.'+id, data, true);
  }

  async remove(sector, id){
    return traverse(theRepo, sector+'.'+id, Delete);
  }
}

export {MockRepo};
