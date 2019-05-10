const uuidv4 = require('uuid/v4');
const rawEntityData = require('../../../sample-data/sample-data');
const { newArtLocation } = require('../../application/artLocationInteractor');
const {
  getArtLocationsInCity,
} = require('../../application/getArtLocationsInCityInteractor');
const { validateJson } = require('../../utilities/AjvJsonValidator');
const {
  readAllLocationsByCity,
} = require('../../persistence/StaticPersistence');

const applicationContext = {
  getUniqueIdString: () => {
    return uuidv4();
  },
  getCurrentTimestamp: () => {
    return Date.now();
  },
  getJsonValidator: () => {
    return {
      validateJson,
    };
  },
  getPersistenceGateway: () => {
    return {
      readAllLocationsByCity,
    };
  },
  getDataReader: () => {
    return rawEntityData;
  },
  getUseCases: () => {
    return {
      newArtLocation,
      getArtLocationsInCity,
    };
  },
};

module.exports = applicationContext;
