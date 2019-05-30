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
const {
  submitNewLocation,
} = require('../../persistence/SubmitLocationGateway');

let locations = [];

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
      submitNewLocation,
    };
  },
  getDataReader: () => {
    return rawEntityData;
  },
  getDataWriter: () => {
    return (newLocation) => {
      locations.push(newLocation);
      return locations;
    };
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
