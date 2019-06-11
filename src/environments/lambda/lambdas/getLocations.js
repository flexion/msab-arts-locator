const createApplicationContext = require('../ApplicationContext');

/**
 * used for retrieving locations based on geocoords
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
const get = async (event) => {
  const applicationContext = createApplicationContext();
  let requestData = null;

  let msg = null;
  try {
    if (!event || !event.query) throw new Error('data not-found error');
    requestData = event.query;

    console.log('requestdata: ', requestData);
    const geoResults = await applicationContext
      .getUseCases()
      .getArtLocationsByGeo({
        applicationContext,
        requestData,
      });
    console.log('geoResults: ', geoResults);
    const { status, results } = geoResults;
    if (status === 'success') {
      if (results.length > 0) {
        return {
          statusCode: 201,
          body: JSON.stringify({
            message: 'success',
            input: event,
            results,
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
