const uuidv4 = require('uuid/v4');
const rawEntityData = require('../../../sample-data/sample-data');
const { newArtLocation } = require('../../application/artLocationInteractor');
const {
  getArtLocationsInCity,
} = require('../../application/getArtLocationsInCityInteractor');
const {
  getGeoLocationInteractor,
} = require('../../application/getGeoInteractor');
const {
  getReverseCityLookupInteractor,
} = require('../../application/getReverseCityLookupInteractor');
const { validateJson } = require('../../utilities/AjvJsonValidator');
const {
  readAllLocationsByCity,
} = require('../../persistence/StaticPersistence');
const { getGeoLocation } = require('../../persistence/GeoLocationGateway');
const {
  getCityFromGeo,
} = require('../../persistence/ReverseCityLookupGateway');

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
      getGeoLocation,
      getCityFromGeo,
    };
  },
  getDataReader: () => {
    return rawEntityData;
  },
  getUseCases: () => {
    return {
      newArtLocation,
      getArtLocationsInCity,
      getGeoLocationInteractor,
      getReverseCityLookupInteractor,
    };
  },
};

module.exports = applicationContext;
