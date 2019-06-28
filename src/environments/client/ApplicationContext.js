const uuidv4 = require('uuid/v4');
const rawEntityData = require('../../../sample-data/sample-data');
const {
  getArtLocationsInCity,
} = require('../../interactors/getArtLocationsInCityInteractor');
const {
  getArtLocationById,
} = require('../../interactors/getArtLocationByIdInteractor');
const {
  getArtLocationsInRadius,
} = require('../../interactors/getArtLocationsInRadiusInteractor');
const {
  getGeoLocationInteractor,
} = require('../../interactors/getGeoLocationInteractor');
const {
  getReverseCityLookupInteractor,
} = require('../../interactors/getReverseCityLookupInteractor');
const {
  sendArtLocation,
} = require('../../interactors/sendArtLocationInteractor');
const {
  validateArtLocation,
} = require('../../interactors/validateArtLocationInteractor');
const {
  validateImageFileType,
} = require('../../interactors/validateImageFileTypeInteractor');
const {
  updateArtLocation,
} = require('../../interactors/updateArtLocationInteractor');
const { validateJson } = require('../../utilities/AjvJsonValidator');
const {
  readAllLocationsByCity,
} = require('../../persistence/StaticPersistence');
const {
  getLocationsInCity,
} = require('../../persistence/GetLocationsInCityGateway');
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
const { getLocationById } = require('../../persistence/GetLocationByIdGateway');
const environment = {
  domain: window.location.href,
  apiURL: `${window.location.origin}/api/v1/`,
};

const apiURLs = {
  captchaURL: `https://www.google.com/recaptcha/api/siteverify`,
  geocodeAPIUrl: `https://maps.googleapis.com/maps/api/geocode/json`,
  reverseApiUrl: 'https://nominatim.openstreetmap.org/reverse?format=json',
};
const applicationContext = {
  apiURLs: () => {
    return apiURLs;
  },
  environment: () => {
    return environment;
  },
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
      getLocationById,
      readAllLocationsByCity,
      getGeoLocation,
      getCityFromGeo,
      submitNewLocation,
      getCoordsFromAddress,
      getLocationsByRadius,
      getLocationsInCity,
    };
  },
  getDataReader: () => {
    return rawEntityData;
  },
  getCoords: () => {
    return { getCoordsHandler: getCoords.handler };
  },
  getUseCases: () => {
    return {
      getArtLocationById,
      getArtLocationsInCity,
      getGeoLocationInteractor,
      getReverseCityLookupInteractor,
      validateArtLocation,
      sendArtLocation,
      getArtLocationsInRadius,
      validateImageFileType,
      updateArtLocation,
    };
  },
};

module.exports = applicationContext;
