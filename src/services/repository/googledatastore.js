import GoogleCloud from 'google-cloud';
import {Repository} from './repo';

const convertData = (dataObject)=>{
  const arr = [];
  for(let prop in dataObject){
    const obj = {
      name: prop,
      value: dataObject[prop],
      excludeFromIndexes: typeof dataObject[prop] == 'string' && Buffer.byteLength(dataObject[prop], 'utf8') > 1024
    };
    if(Array.isArray(obj.value) && obj.value.length > 0 && Array.isArray(obj.value[0])){
      obj.value = obj.value.map((i)=>{
        return JSON.stringify(i);
      });
    }
    arr.push(obj);
  }
  return arr;
};

const invertData = (dataObject)=>{
  const obj = dataObject;
  for(let prop in obj){
    if(Array.isArray(obj[prop]) && obj[prop].length > 0){
      try {
        JSON.parse(obj[prop][0]);
        obj[prop] = obj[prop].map((i)=>{
          return JSON.parse(i);
        });
      } catch(err){

      }
    }
  }
  return obj;
};

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
          if(entity){
            return resolve(invertData(entity.data));
          } else {
            return resolve(false);
          }
        }
      });
    });
  }

  async retrieveSector(sector, opts={}){
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
          return resolve(entities.map((value)=>{return value.key.name;}));
        }
      })
    });
  }

  async store(sector, id, data){
    return new Promise((resolve, reject)=>{
      this.datastore.insert({
        key: this.datastore.key([...sector.split('.'), id]),
        data: convertData(data)
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
        data: convertData(data)
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
