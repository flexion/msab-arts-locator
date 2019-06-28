const createApplicationContext = require('../ApplicationContext');
const AWS = require('aws-sdk');
const getDistance = require('geolib/es/getDistance').default;
var conversions = require('conversions');
/**
 * used for retrieving locations based on geocoords
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */

const removeKeys = (location) => {
  location.coordinates = JSON.parse(location.geoJson).coordinates;
  delete location.geoJson;
  delete location.hashKey;
  delete location.rangeKey;
  delete location.geohash;
  delete location.adminId;
  delete location.updateId;
  delete location.entityId;
  return location;
};

const get = async (event, context) => {
  const applicationContext = createApplicationContext();
  let requestData = null;
  let results = null;
  let queryResults = null;

  let msg = null;
  let status = null;
  try {
    console.log('event data: ', event.queryStringParameters);
    if (!event || !event.queryStringParameters)
      throw new Error('data not-found error');
    requestData = event.queryStringParameters;
    if (requestData.entityId && requestData.actionType) {
      queryResults = await applicationContext.getUseCases().getArtLocationById({
        applicationContext,
        requestData,
      });

      results = queryResults.results;
      status = queryResults.status;
      if (status === 'success') {
        if (results.Count > 0) {
          location = removeKeys(results.Items[0]);
          return {
            statusCode: 201,
            body: JSON.stringify({
              message: 'success',
              results: location,
            }),
          };
        } else {
          //no results found
          return {
            statusCode: 204,
            body: JSON.stringify({
              message: 'success',
              input: event,
              results,
            }),
          };
        }
      }
    } else {
      return {
        statusCode: 406,
        body: JSON.stringify({
          message: msg,
          input: event,
        }),
      };
    }
  } catch (e) {
    console.log('e: ', e);
    applicationContext.logger.error(e);
    return { statusCode: 500, body: JSON.stringify({ message: 'error', e }) };
  }
};

module.exports = { get };
