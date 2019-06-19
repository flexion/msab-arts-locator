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
const { getCoordsFromAddress } = require('../../persistence/MapsAPIGateway');
const {
  saveNewLocationGeo,
  getLocationsByGeo,
} = require('../../persistence/GeoDynamoGateway');
const { confirmCaptcha } = require('../../persistence/CaptchaGateway');
// const AWS =
//   process.env.NODE_ENV === 'production'
//     ? AWSXRay.captureAWS(require('aws-sdk'))
//     : require('aws-sdk');
const AWS = require('aws-sdk');

const uuidv4 = require('uuid/v4');
const { S3, DynamoDB } = AWS;

const environment = {
  dynamoDbEndpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  masterDynamoDbEndpoint:
    process.env.MASTER_DYNAMODB_ENDPOINT || 'dynamodb.us-east-1.amazonaws.com',
  masterRegion: process.env.MASTER_REGION || 'us-east-1',
  region: process.env.AWS_REGION || 'us-east-1',
  s3Endpoint: process.env.S3_ENDPOINT || 'localhost',
  stage: process.env.STAGE || 'local',
  apiKey: process.env.API_KEY,
  captchaKey: process.env.CAPTCHA_KEY,
};

let dynamoClientCache = {};
let s3Cache;

module.exports = () => {
  return {
    environment,
    getPersistenceGateway: () => {
      return {
        getCoordsFromAddress,
        saveNewLocationGeo,
        getLocationsByGeo,
        confirmCaptcha,
      };
    },
    getStorageClient: () => {
      if (!s3Cache) {
        s3Cache = new S3({
          endpoint: environment.s3Endpoint,
          region: environment.region,
          s3ForcePathStyle: true,
        });
      }
      return s3Cache;
    },
    getUniqueId: () => {
      return uuidv4();
    },
    getUseCases: () => {
      return {
        saveNewArtLocation,
        getLocationCoordinates,
        validateArtLocation,
        getArtLocationsByGeo,
        validateCaptcha,
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
