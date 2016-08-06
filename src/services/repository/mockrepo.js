import {Repository} from './repo';

const theRepo = {

};

const traverse = (object, sector, data, update=false)=>{
  if(typeof sector == 'string'){
    return traverse(object, sector.split('.'), data);
  } else if(sector.length > 0){
    return traverse(object[sector.shift()], sector, data);
  } else {
    if(data != undefined){
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

  store(sector, id, data){
    traverse(theRepo, sector+'.'+id, data);
  }

  update(sector, id, data){
    traverse(theRepo, sector+'.'+id, data, true);
  }

  remove(sector, id){
    traverse(theRepo, sector+'.'+id, null);
  }
}

export {MockRepo};
