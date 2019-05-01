const uuidv4 = require('uuid/v4');

const applicationContext = {
  getUniqueIdString: () => {
    return uuidv4();
  },
  getCurrentTimestamp: () => {
    return Date.now();
  },
  getJsonValidator: () => {
    return {
      
    };
  },
  getPersistenceGateway: () => {
    return {
      
    };
  },
};

export { applicationContext };
