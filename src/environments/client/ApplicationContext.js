const rawEntityData = require('../../../sample-data/sample-data');
const {
  getArtLocationById,
} = require('../../interactors/getArtLocationByIdInteractor');
const {
  getArtLocationsInCity,
} = require('../../interactors/getArtLocationsInCityInteractor');
const {
  getArtLocationsInRadius,
} = require('../../interactors/getArtLocationsInRadiusInteractor');
const {
  getCityFromGeo,
} = require('../../persistence/ReverseCityLookupGateway');
const {
  getGeoLocationInteractor,
} = require('../../interactors/getGeoLocationInteractor');
const {
  getLocationsByRadius,
} = require('../../persistence/GetLocationsByRadiusGateway');
const {
  getLocationsInCity,
} = require('../../persistence/GetLocationsInCityGateway');
const {
  getReverseCityLookupInteractor,
} = require('../../interactors/getReverseCityLookupInteractor');
const {
  readAllLocationsByCity,
} = require('../../persistence/StaticPersistence');
const {
  sendArtLocation,
} = require('../../interactors/sendArtLocationInteractor');
const {
  submitNewLocation,
} = require('../../persistence/SubmitNewLocationGateway');
const {
  updateArtLocation,
} = require('../../interactors/updateArtLocationInteractor');
const {
  updateLocationApproval,
} = require('../../persistence/UpdateLocationGateway');
const {
  validateArtLocation,
} = require('../../interactors/validateArtLocationInteractor');
const {
  validateImageFileType,
} = require('../../interactors/validateImageFileTypeInteractor');
const { getCoordsFromAddress } = require('../../persistence/MapsAPIGateway');
const { getGeoLocation } = require('../../persistence/GeoLocationGateway');
const { getLocationById } = require('../../persistence/GetLocationByIdGateway');
const { v4: uuidv4 } = require('uuid');
const { validateJson } = require('../../utilities/AjvJsonValidator');
const environment = {
  apiURL: `${window.location.origin}/api/v1/`,
  domain: window.location.href,
};

const apiURLs = {
  captchaURL: 'https://www.google.com/recaptcha/api/siteverify',
  geocodeAPIUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
  reverseApiUrl: 'https://nominatim.openstreetmap.org/reverse?format=json',
};
const applicationContext = {
  apiURLs: () => {
    return apiURLs;
  },
  environment: () => {
    return environment;
  },
  getCurrentTimestamp: () => {
    return Date.now();
  },
  getDataReader: () => {
    return rawEntityData;
  },
  getJsonValidator: () => {
    return {
      validateJson,
    };
  },
  getPersistenceGateway: () => {
    return {
      getCityFromGeo,
      getCoordsFromAddress,
      getGeoLocation,
      getLocationById,
      getLocationsByRadius,
      getLocationsInCity,
      readAllLocationsByCity,
      submitNewLocation,
      updateLocationApproval,
    };
  },
  getUniqueIdString: () => {
    return uuidv4();
  },
  getUseCases: () => {
    return {
      getArtLocationById,
      getArtLocationsInCity,
      getArtLocationsInRadius,
      getGeoLocationInteractor,
      getReverseCityLookupInteractor,
      sendArtLocation,
      updateArtLocation,
      validateArtLocation,
      validateImageFileType,
    };
  },
};

module.exports = applicationContext;
