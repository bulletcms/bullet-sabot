import {Repository} from './repo';

const NotDefined = Symbol('NotDefined');
const Delete = Symbol('Delete');

const theRepo = {

};

const traverse = (object, sector, data=NotDefined, update=false)=>{
  if(typeof sector == 'string'){
    return traverse(object, sector.split('.'), data);
  } else if(sector.length > 0){
    return traverse(object[sector.shift()], sector, data);
  } else {
    if(data == Delete){
      delete object;
      return undefined;
    } else if(data != NotDefined){
      if(update){
        object = {...object, ...data};
      } else {
        object = {...data};
      }
    }
    return object;
  }
};

class MockRepo extends Repository{
  constructor(){

  }

  retrieve(sector, id){
    return traverse(theRepo, sector+'.'+id);
  }

  retrieve(sector, quantity){
    return traverse(theRepo, sector).keys();
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
