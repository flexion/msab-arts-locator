//const AWSXRay = require('aws-xray-sdk');
const {
  confirmCaptcha: confirmCaptchaGoogle,
} = require('../../persistence/CaptchaGateway');
const {
  confirmCaptcha: confirmCaptchaNoOp,
} = require('../../persistence/NoOpCaptchaGateway');
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
  sendEmail: sendEmailDummy,
} = require('../../persistence/emailGatewayDummy');
const {
  sendEmail: sendEmailGmail,
} = require('../../persistence/emailGatewayGmail');
const {
  sendEmail: sendEmailO365,
} = require('../../persistence/emailGatewayO365');
const {
  sendEmail: sendEmailSES,
} = require('../../persistence/emailGatewaySES');
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
const { getCoordsFromAddress } = require('../../persistence/MapsAPIGateway');
const { getImage, putImage } = require('../../persistence/s3Gateway');
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
  captchaGateway: process.env.GOOGLE_CAPTCHA_GATEWAY,
  captchaKey: process.env.CAPTCHA_KEY,
  domainName: process.env.DOMAIN_NAME,
  emailGateway: process.env.EMAIL_GATEWAY,
  imageBucket: process.env.IMAGE_BUCKET,
  stage: process.env.STAGE || 'local',
};
let confirmCaptcha;
if (environment.captchaGateway == 'noop') {
  confirmCaptcha = confirmCaptchaNoOp;
} else {
  confirmCaptcha = confirmCaptchaGoogle;
}
const sendEmailGateways = {
  dummy: sendEmailDummy,
  gmail: sendEmailGmail,
  o365: sendEmailO365,
  ses: sendEmailSES,
};
const sendEmail = sendEmailGateways[environment.emailGateway];

const emailConfig = {
  auth: {
    pass: process.env.EMAIL_PW,
    user: process.env.EMAIL_USER,
  },
  debug: false,
  from: process.env.EMAIL_USER,
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
