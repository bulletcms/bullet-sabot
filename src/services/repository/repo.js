import {abstractMethod} from '../../util';

class Repository {
  /**
  arguments:
    sector - category of data
      ex: pages, blog.month
    id     - the item identifier
      ex: <hash>, title
    data   - the data
  */
  retrieve(sector, id){
    abstractMethod();
  }

  store(sector, id, data){
    abstractMethod();
  }

  update(sector, id, data){
    abstractMethod();
  }

  remove(sector, id){
    abstractMethod();
  }
}

export {Repository};
