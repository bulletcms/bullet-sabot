import GoogleCloud from 'google-cloud';
import {Repository} from './repo';

class GoogleDatastore extends Repository {
  constructor(projectId, keyFilename){
    super();
    if(typeof keyFilename == 'string'){
      this.datastore = GoogleCloud.datastore({
        projectId: projectId,
        keyFilename: keyFilename
      });
    }else {
      this.datastore = GoogleCloud.datastore({
        projectId: projectId,
        credentials: keyFilename
      });
    }
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
    const {limit, offset, filters} = opts;
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
    return new Promise((resolve, reject)=>{
      this.datastore.insert({
        key: this.datastore.key([...sector.split('.'), id]),
        data: data
      }, (err)=>{
        if(err){
          return resolve(false);
        } else {
          return resolve(data);
        }
      });
    });
  }

  async update(sector, id, data){
    return new Promise((resolve, reject)=>{
      this.datastore.update({
        key: this.datastore.key([...sector.split('.'), id]),
        data: data
      }, (err)=>{
        if(err){
          return resolve(false);
        } else {
          return resolve(data);
        }
      });
    });
  }

  async remove(sector, id){
    return new Promise((resolve, reject)=>{
      const transaction = this.datastore.transaction();
      const key = this.datastore.key([...sector.split('.'), id]);
      transaction.run((err)=>{
        if(err){
          return resolve(false);
        }
        transaction.get(key, (err, entity)=>{
          if(err){
            return transaction.rollback((err2)=>{
              return resolve(false);
            });
          }
          transaction.delete(key);
          transaction.commit((err)=>{
            if(err){
              return resolve(false);
            }
            return resolve(entity.data);
          });
        });
      });
    });
  }
}

export {GoogleDatastore};
