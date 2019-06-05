/* eslint-disable security/detect-object-injection */
const AWSXRay = require('aws-xray-sdk');

const AWS =
  process.env.NODE_ENV === 'production'
    ? AWSXRay.captureAWS(require('aws-sdk'))
    : require('aws-sdk');

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
};

let dynamoClientCache = {};
let s3Cache;

module.exports = () => {
  return {
    environment,
    getPersistenceGateway: () => {
      return {};
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
      return { saveNewLocation };
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
