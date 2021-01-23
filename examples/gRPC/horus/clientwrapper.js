const { v4: uuidv4 } = require("uuid");
const grpc = require('@grpc/grpc-js');


function makeMethods(clientWrapper, client, metadata, names) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    metadata[name] = {
      methodName: name,
      responseTime: null,
      id: null,
      trace: {},
    };
    
    clientWrapper[name] = function (message, callback, meta = null) {
      let currentMetadata;
      if (meta) {
        currentMetadata = meta;
      } else {
        //get metadata from link 
        currentMetadata = this.link.metadata;
      }
      console.log('metadata in clientwrapper: ', currentMetadata);
      client[name](message, currentMetadata, (error, response) => {
        callback(error, response);
      });
    };
  }
}

class HorusClientWrapper {
  constructor(client, service) {
    this.metadata = {};
    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names);
  }
}

module.exports = HorusClientWrapper;
