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
const {
  getArtLocationById,
} = require('../../interactors/getArtLocationByIdInteractor');
const {
  getArtLocationsInCity,
} = require('../../interactors/getArtLocationsInCityInteractor');
const {
  updateArtLocation,
} = require('../../interactors/updateArtLocationInteractor');
const {
  deleteArtLocation,
} = require('../../interactors/deleteArtLocationInteractor');
const {
  sendAdminEmail,
} = require('../../interactors/sendAdminEmailInteractor');
const { sendUserEmail } = require('../../interactors/sendUserEmailInteractor');
const { getCoordsFromAddress } = require('../../persistence/MapsAPIGateway');
const {
  saveNewLocationGeo,
  getLocationsByGeo,
  getLocationsInCity,
  getLocationById,
  updateLocationApproval,
  deleteLocation,
} = require('../../persistence/GeoDynamoGateway');
const { confirmCaptcha } = require('../../persistence/CaptchaGateway');
const { putImage, getImage } = require('../../persistence/s3Gateway');
const { sendEmail } = require('../../persistence/emailGateway');
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
  domainName: process.env.DOMAIN_NAME,
};
const emailConfig = {
  from: 'artsaroundmn.admin@state.mn.us',
  logger: true,
  debug: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW,
  },
};

module.exports = () => {
  return {
    apiURLs: () => {
      return apiURLs;
    },
    environment,
    emailConfig,
    getPersistenceGateway: () => {
      return {
        putImage,
        getImage,
        getCoordsFromAddress,
        saveNewLocationGeo,
        getLocationsByGeo,
        confirmCaptcha,
        getLocationsInCity,
        getLocationById,
        updateLocationApproval,
        deleteLocation,
        sendEmail,
      };
    },
    getUniqueId: () => {
      return uuidv4();
    },
    getUseCases: () => {
      return {
        getArtLocationById,
        putArtLocationImage,
        saveNewArtLocation,
        getLocationCoordinates,
        validateArtLocation,
        getArtLocationsByGeo,
        validateCaptcha,
        validateImageFileType,
        getArtLocationsInCity,
        updateArtLocation,
        deleteArtLocation,
        sendAdminEmail,
        sendUserEmail,
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
