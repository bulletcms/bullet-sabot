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
  async retrieve(sector, id){
    /**
    gets item
    returns item or false
    */
    abstractMethod();
  }

  async retrieveSector(sector, quantity){
    /**
    gets item keys of a sector
    returns array of keys or false
    */
    abstractMethod();
  }

  async store(sector, id, data){
    /**
    stores item
    returns new data or false if id already exists
    */
    abstractMethod();
  }

  async update(sector, id, data){
    /**
    update item
    returns new data or false
    */
    abstractMethod();
  }

  async remove(sector, id){
    /**
    delete item
    returns deleted data or false
    */
    abstractMethod();
  }
}

export {Repository};
