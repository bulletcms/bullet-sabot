import {abstractMethod} from '../../util';

class Repository {
  /**
  arguments:
    sector   - category of data
      ex: pages, blog.month
    id       - the item identifier
      ex: <hash>, title
    data     - the data
    quantity - amount of keys to retrieve, blank for all keys
  */
  retrieve(sector, id){
    /**
    gets item
    returns item
    */
    abstractMethod();
  }

  retrieveSector(sector, quantity){
    /**
    gets item keys of a sector
    returns array of keys
    */
    abstractMethod();
  }

  store(sector, id, data){
    /**
    stores item
    */
    abstractMethod();
  }

  update(sector, id, data){
    /**
    update item
    */
    abstractMethod();
  }

  remove(sector, id){
    /**
    delete item
    */
    abstractMethod();
  }
}

export {Repository};
