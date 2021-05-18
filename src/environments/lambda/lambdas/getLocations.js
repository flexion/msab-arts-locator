const AWS = require('aws-sdk');
const createApplicationContext = require('../ApplicationContext');
const { getDistance } = require('geolib');
let conversions = require('conversions');
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
const formatLocation = (location, requestData) => {
  //alter data in here before it gets sent
  location.distance = conversions(
    getDistance(requestData, JSON.parse(location.geoJson).coordinates),
    'meters',
    'miles',
  );
  location = removeKeys(location);
  return location;
};

const get = async event => {
  const applicationContext = createApplicationContext();
  let requestData = null;
  let results = null;
  let queryResults = null;
  let newResults = [];
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
      ({ results, status } = queryResults);
      console.log('geoResults: ', results);
      results.forEach(result => {
        let location = AWS.DynamoDB.Converter.unmarshall(result, {
          convertEmptyValues: true,
        });
        if (location.approved) {
          location = formatLocation(location, requestData);
          console.log('location: ', location);
          newResults.push(location);
        }
      });
      newResults.sort((a, b) => (a.distance > b.distance ? 1 : -1));
    } else if (requestData.city) {
      const geocode = {
        city: requestData.city,
        state: 'MN',
        street: '',
        zip: '',
      };
      //need to standardize city name:
      const coordResult = await applicationContext
        .getUseCases()
        .getLocationCoordinates({
          applicationContext,
          artLocation: geocode,
        });
      ({ status } = coordResult);
      let city = coordResult.cityName;
      console.log('standardized city name: ', city);
      if (city) {
        queryResults = await applicationContext
          .getUseCases()
          .getArtLocationsInCity({
            applicationContext,
            requestData: { city },
          });
        ({ results, status } = queryResults);
        console.log('queryResults: ', queryResults);
        results.Items.forEach(location => {
          if (location.approved) {
            location = removeKeys(location);
            console.log('location: ', location);
            newResults.push(location);
          }
        });
      }
    }
    if (status === 'success') {
      return {
        body: JSON.stringify({
          message: 'success',
          results: newResults,
        }),
        statusCode: 201,
      };
    } else {
      return {
        body: JSON.stringify({
          input: event,
          message: status,
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
