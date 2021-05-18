const { v4: uuidv4 } = require('uuid');
const { validateJson } = require('../../utilities/AjvJsonValidator');
const {
  getLocationCoordinates,
} = require('../../interactors/getLocationCoordinatesInteractor');
const environment = {
  apiKey: process.env.API_KEY,
};
const { getCoordsFromAddress } = require('../../persistence/MapsAPIGateway');
const apiURLs = {
  geocodeAPIUrl: `https://maps.googleapis.com/maps/api/geocode/json`,
};
const {
  saveNewArtLocation,
} = require('../../interactors/saveNewArtLocationInteractor');
const { saveNewLocationGeo } = require('../../persistence/GeoDynamoGateway');

module.exports = () => {
  return {
    apiURLs: () => {
      return apiURLs;
    },
    getUseCases: () => {
      return {
        getLocationCoordinates,
        saveNewArtLocation,
      };
    },
    environment,
    getPersistenceGateway: () => {
      return {
        getCoordsFromAddress,
        saveNewLocationGeo,
      };
    },
    getUniqueIdString: () => {
      return uuidv4();
    },
    getUniqueId: () => {
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
    logger: {
      error: (value) => {
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(value));
      },
      info: (key, value) => {
        // eslint-disable-next-line no-console
        console.info(key, JSON.stringify(value));
      },
    },
  };
};
