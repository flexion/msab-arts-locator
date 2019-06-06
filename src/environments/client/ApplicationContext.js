const uuidv4 = require('uuid/v4');
const rawEntityData = require('../../../sample-data/sample-data');
const {
  sendArtLocation,
} = require('../../interactors/sendArtLocationInteractor');
const {
  getArtLocationsInCity,
} = require('../../interactors/getArtLocationsInCityInteractor');
const {
  getLocationCoordinatesInteractor,
} = require('../../interactors/getLocationCoordinatesInteractor');
const {
  getGeoLocationInteractor,
} = require('../../interactors/getGeoInteractor');
const {
  getReverseCityLookupInteractor,
} = require('../../interactors/getReverseCityLookupInteractor');
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
      sendArtLocation,
      getArtLocationsInCity,
      getGeoLocationInteractor,
      getReverseCityLookupInteractor,
      getLocationCoordinatesInteractor,
    };
  },
};

module.exports = applicationContext;
