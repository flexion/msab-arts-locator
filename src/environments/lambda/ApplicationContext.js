/* eslint-disable security/detect-object-injection */
//const AWSXRay = require('aws-xray-sdk');
const { validateJson } = require('../../utilities/AjvJsonValidator');
const {
  validateArtLocation,
} = require('../../interactors/validateArtLocationInteractor');
const {
  getArtLocationsByGeo,
} = require('../../interactors/getArtLocationsByGeoInteractor');
const {
  saveNewArtLocation,
} = require('../../interactors/saveNewArtLocationInteractor');
const {
  getLocationCoordinates,
} = require('../../interactors/getLocationCoordinatesInteractor');
const {
  validateCaptcha,
} = require('../../interactors/validateCaptchaInteractor');
const {
  putArtLocationImage,
} = require('../../interactors/putArtLocationImageInteractor');
const {
  validateImageFileType,
} = require('../../interactors/validateImageFileTypeInteractor');
const { getCoordsFromAddress } = require('../../persistence/MapsAPIGateway');
const {
  saveNewLocationGeo,
  getLocationsByGeo,
} = require('../../persistence/GeoDynamoGateway');
const { confirmCaptcha } = require('../../persistence/CaptchaGateway');
const { putImage, getImage } = require('../../persistence/s3Gateway');
const uuidv4 = require('uuid/v4');

const apiURLs = {
  captchaURL: `https://www.google.com/recaptcha/api/siteverify`,
  geocodeAPIUrl: `https://maps.googleapis.com/maps/api/geocode/json`,
  reverseApiUrl: 'https://nominatim.openstreetmap.org/reverse?format=json',
};

const environment = {
  stage: process.env.STAGE || 'local',
  apiKey: process.env.API_KEY,
  captchaKey: process.env.CAPTCHA_KEY,
  imageBucket: process.env.IMAGE_BUCKET,
};

module.exports = () => {
  return {
    apiURLs: () => {
      return apiURLs;
    },
    environment,
    getPersistenceGateway: () => {
      return {
        putImage,
        getImage,
        getCoordsFromAddress,
        saveNewLocationGeo,
        getLocationsByGeo,
        confirmCaptcha,
      };
    },
    getUniqueId: () => {
      return uuidv4();
    },
    getUseCases: () => {
      return {
        putArtLocationImage,
        saveNewArtLocation,
        getLocationCoordinates,
        validateArtLocation,
        getArtLocationsByGeo,
        validateCaptcha,
        validateImageFileType,
      };
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
