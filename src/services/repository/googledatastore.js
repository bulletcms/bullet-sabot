import GoogleCloud from 'google-cloud';
import {Repository} from './repo';

class GoogleDatastore extends Repository {
  constructor(projectId, keyFilename){
    super();
    this.datastore = GoogleCloud.datastore({
      projectId: projectId,
      keyFilename: keyFilename
    });
  }

  async retrieve(sector, id){
    return new Promise((resolve, reject)=>{
      this.datastore.get(this.datastore.key([...sector.split('.'), id]), (err, entity)=>{
        if(err){
          return resolve(false);
        } else {
          return resolve(entity.data);
        }
      });
    });
  }

  async retrieveSector(sector, opts){
    let {limit, offset, filters} = opts;
    return new Promise((resolve, reject)=>{
      let query = this.datastore.createQuery(sector).select('__key__');
      if(limit){
        query = query.limit(limit);
        if(offset){
          query = query.offset(offset);
        }
      }
      if(filters){
        for(let [j, k] in filters){
          query = query.filter(j, k);
        }
      }
      this.datastore.runQuery(query, (err, entities)=>{
        if(err){
          return resolve(false);
        } else {
          return resolve(entities.map((value)=>{return value.pop();}));
        }
      })
    });
  }

  async store(sector, id, data){

  }

  async update(sector, id, data){

  }

  async remove(sector, id){

  }
}
