import murmurhash3 from 'murmurhash3js';


const abstractMethod = ()=>{
  throw new Error('unimplemented abstract method');
};


const SEED = Date.now();
const hashCode = (inp)=>{
  let arch = 'x86';
  const architecture = require('os').arch();
  if(architecture == 'x64'){
    arch = 'x64';
  }
  return murmurhash3[arch].hash128(inp, SEED);
};


export {abstractMethod, hashCode};
