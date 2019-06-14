const uuidv4 = require('uuid/v4');
const rawEntityData = require('../../../sample-data/sample-data');
const {
  getArtLocationsInCity,
} = require('../../interactors/getArtLocationsInCityInteractor');
const {
  getArtLocationsInRadius,
} = require('../../interactors/getArtLocationsInRadiusInteractor');
const {
  getGeoLocationInteractor,
} = require('../../interactors/getGeoInteractor');
const {
  getReverseCityLookupInteractor,
} = require('../../interactors/getReverseCityLookupInteractor');
const {
  sendArtLocation,
} = require('../../interactors/sendArtLocationInteractor');
const {
  validateArtLocation,
} = require('../../interactors/validateArtLocationInteractor');
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
} = require('../../persistence/SubmitNewLocationGateway');
const { getCoordsFromAddress } = require('../../persistence/MapsAPIGateway');
const {
  getLocationsByRadius,
} = require('../../persistence/GetLocationsByRadiusGateway');

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
      getCoordsFromAddress,
      getLocationsByRadius,
    };
  },
  getDataReader: () => {
    return rawEntityData;
  },
  getDataWriter: (newLocation) => {
    locations.push(newLocation);
    return locations;
  },
  getCoords: () => {
    return { getCoordsHandler: getCoords.handler };
  },
  getUseCases: () => {
    return {
      getArtLocationsInCity,
      getGeoLocationInteractor,
      getReverseCityLookupInteractor,
      validateArtLocation,
      sendArtLocation,
      getArtLocationsInRadius,
    };
  },
};

module.exports = applicationContext;
