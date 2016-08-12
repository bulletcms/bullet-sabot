import {abstractMethod} from 'utility';

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
    returns item or false
    */
    abstractMethod();
  }

  retrieveSector(sector, quantity){
    /**
    gets item keys of a sector
    returns array of keys or false
    */
    abstractMethod();
  }

  store(sector, id, data){
    /**
    stores item
    returns new data or false
    */
    abstractMethod();
  }

  update(sector, id, data){
    /**
    update item
    returns new data or false
    */
    abstractMethod();
  }

  remove(sector, id){
    /**
    delete item
    returns true if deleted or false
    */
    abstractMethod();
  }
}

export {Repository};
