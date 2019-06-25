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
const formatLocation = (location, requestData) => {
  //alter data in here before it gets sent
  location.distance = conversions(
    getDistance(requestData, JSON.parse(location.geoJson).coordinates),
    'meters',
    'miles',
  );
  location.coordinates = JSON.parse(location.geoJson).coordinates;
  delete location.geoJson;
  delete location.hashKey;
  delete location.rangeKey;
  delete location.geohash;

  return location;
};

const get = async (event, context) => {
  const applicationContext = createApplicationContext();
  let requestData = null;
  let results = null;
  let queryResults = null;
  let newResults = null;
  let msg = null;
  let status = null;
  try {
    console.log('event data: ', event.queryStringParameters);
    if (!event || !event.queryStringParameters)
      throw new Error('data not-found error');
    requestData = event.queryStringParameters;
    if (requestData.lat && requestData.lon) {
      queryResults = await applicationContext
        .getUseCases()
        .getArtLocationsByGeo({
          applicationContext,
          requestData,
        });
      status = queryResults.status;
      results = queryResults.results;
      console.log('geoResults: ', results);
      newResults = results.map((result) => {
        let location = AWS.DynamoDB.Converter.unmarshall(result, {
          convertEmptyValues: true,
        });
        location = formatLocation(location, requestData);
        console.log('location: ', location);
        return location;
      });
    } else if (requestData.city) {
      console.log('requestdata.city:', requestData.city);
      queryResults = await applicationContext
        .getUseCases()
        .getArtLocationsInCity({
          applicationContext,
          requestData,
        });
      status = queryResults.status;
      results = queryResults.results;
      console.log('citysearch results: ', results);
      newResults = results.map((result) => {
        let location = AWS.DynamoDB.Converter.unmarshall(result, {
          convertEmptyValues: true,
        });
        console.log('location: ', location);
        return location;
      });
    }

    if (status === 'success') {
      if (results.length > 0) {
        return {
          statusCode: 201,
          body: JSON.stringify({
            message: 'success',
            results: newResults,
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
