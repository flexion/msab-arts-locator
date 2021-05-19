const createApplicationContext = require('../ApplicationContext');

/**
 * used for retrieving locations based on geocoords
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */

const removeKeys = location => {
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

const get = async event => {
  const applicationContext = createApplicationContext();
  let requestData = null;
  let results = null;
  let queryResults = null;

  let msg = null;
  let status = null;
  try {
    if (!event || !event.queryStringParameters)
      throw new Error('data not-found error');
    console.log('event data: ', event.queryStringParameters);
    requestData = event.queryStringParameters;
    if (requestData.entityId && requestData.actionType) {
      queryResults = await applicationContext.getUseCases().getArtLocationById({
        applicationContext,
        requestData,
      });

      ({ results, status } = queryResults);
      if (status === 'success') {
        if (results.Count > 0) {
          location = removeKeys(results.Items[0]);
          return {
            body: JSON.stringify({
              message: 'success',
              results: location,
            }),
            statusCode: 201,
          };
        } else {
          //no results found
          return {
            body: JSON.stringify({
              input: event,
              message: 'success',
              results,
            }),
            statusCode: 204,
          };
        }
      }
    } else {
      return {
        body: JSON.stringify({
          input: event,
          message: msg,
        }),
        statusCode: 406,
      };
    }
  } catch (e) {
    console.log('e: ', e);
    applicationContext.logger.error(e);
    return { body: JSON.stringify({ e, message: 'error' }), statusCode: 500 };
  }
};

module.exports = { get };
