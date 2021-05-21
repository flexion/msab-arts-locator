//const AWSXRay = require('aws-xray-sdk');
const {
  deleteArtLocation,
} = require('../../interactors/deleteArtLocationInteractor');
const {
  deleteLocation,
  getLocationById,
  getLocationsByGeo,
  getLocationsInCity,
  saveNewLocationGeo,
  updateLocationApproval,
} = require('../../persistence/GeoDynamoGateway');
const {
  getArtLocationById,
} = require('../../interactors/getArtLocationByIdInteractor');
const {
  getArtLocationsByGeo,
} = require('../../interactors/getArtLocationsByGeoInteractor');
const {
  getArtLocationsInCity,
} = require('../../interactors/getArtLocationsInCityInteractor');
const {
  getLocationCoordinates,
} = require('../../interactors/getLocationCoordinatesInteractor');
const {
  putArtLocationImage,
} = require('../../interactors/putArtLocationImageInteractor');
const {
  saveNewArtLocation,
} = require('../../interactors/saveNewArtLocationInteractor');
const {
  sendAdminEmail,
} = require('../../interactors/sendAdminEmailInteractor');
const {
  updateArtLocation,
} = require('../../interactors/updateArtLocationInteractor');
const {
  validateArtLocation,
} = require('../../interactors/validateArtLocationInteractor');
const {
  validateCaptcha,
} = require('../../interactors/validateCaptchaInteractor');
const {
  validateImageFileType,
} = require('../../interactors/validateImageFileTypeInteractor');
const { confirmCaptcha } = require('../../persistence/CaptchaGateway');
const { getCoordsFromAddress } = require('../../persistence/MapsAPIGateway');
const { getImage, putImage } = require('../../persistence/s3Gateway');
const { sendEmail } = require('../../persistence/emailGatewaySES');
const { sendUserEmail } = require('../../interactors/sendUserEmailInteractor');
const { v4: uuidv4 } = require('uuid');
const { validateJson } = require('../../utilities/AjvJsonValidator');

const apiURLs = {
  captchaURL: 'https://www.google.com/recaptcha/api/siteverify',
  geocodeAPIUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
  reverseApiUrl: 'https://nominatim.openstreetmap.org/reverse?format=json',
};

const environment = {
  apiKey: process.env.API_KEY,
  captchaKey: process.env.CAPTCHA_KEY,
  domainName: process.env.DOMAIN_NAME,
  imageBucket: process.env.IMAGE_BUCKET,
  stage: process.env.STAGE || 'local',
};
const emailConfig = {
  auth: {
    pass: process.env.EMAIL_PW,
    user: process.env.EMAIL_USER,
  },
  debug: false,
  from: 'bruth+msab@flexion.us',
  logger: false,
};

module.exports = () => {
  return {
    apiURLs: () => {
      return apiURLs;
    },
    emailConfig,
    environment,
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
        confirmCaptcha,
        deleteLocation,
        getCoordsFromAddress,
        getImage,
        getLocationById,
        getLocationsByGeo,
        getLocationsInCity,
        putImage,
        saveNewLocationGeo,
        sendEmail,
        updateLocationApproval,
      };
    },

    getUniqueId: () => {
      return uuidv4();
    },
    getUniqueIdString: () => {
      return uuidv4();
    },
    getUseCases: () => {
      return {
        deleteArtLocation,
        getArtLocationById,
        getArtLocationsByGeo,
        getArtLocationsInCity,
        getLocationCoordinates,
        putArtLocationImage,
        saveNewArtLocation,
        sendAdminEmail,
        sendUserEmail,
        updateArtLocation,
        validateArtLocation,
        validateCaptcha,
        validateImageFileType,
      };
    },
    logger: {
      error: value => {
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
