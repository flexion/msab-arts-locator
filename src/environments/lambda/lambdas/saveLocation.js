const createApplicationContext = require('../ApplicationContext');
// const { getUserFromAuthHeader } = require("../middleware/apiGatewayHelper");
//const { handle } = require('../middleware/apiGatewayHelper');
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'max-age=0, private, no-cache, no-store, must-revalidate',
  'Content-Type': 'application/json',
};

/**
 * used for saving new locations
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */

const post = async (event) => {
  const applicationContext = createApplicationContext();
  let requestData = null;
  let saveResult = null;
  let msg = null;
  try {
    if (!event || !event.body) throw new Error('data not-found error');
    requestData = JSON.parse(event.body);
    console.log(`Event: ${JSON.stringify(event)}`);
    console.log(`requestData: ${JSON.stringify(requestData)}`);

    const validateResult = await applicationContext
      .getUseCases()
      .validateArtLocation({
        applicationContext,
        requestData,
      });
    msg = validateResult.status;
    if (msg === 'success') {
      const artLocation = validateResult.artLocation;
      const coordResult = await applicationContext
        .getUseCases()
        .getLocationCoordinates({
          applicationContext,
          artLocation,
        });
      msg = coordResult.status;
      console.log('coordResult: ', coordResult);
      if (msg === 'success') {
        saveResult = await applicationContext.getUseCases().saveNewArtLocation({
          applicationContext,
          artLocation,
          coords: coordResult.coords,
        });
        msg = saveResult.status;
        console.log('saveResult: ', saveResult);
      }
    }
    if (msg === 'success') {
      console.log('should return a 201');
      return {
        statusCode: 201,
        isBase64Encoded: false,
        headers: headers,
        body: JSON.stringify({
          message: 'success',
          input: event,
        }),
      };
    } else {
      console.log('should return a 406');
      return {
        statusCode: 406,
        headers: headers,
        body: JSON.stringify({
          message: msg,
          input: event,
        }),
      };
    }
  } catch (e) {
    console.log('e: ', e);
    applicationContext.logger.error(e);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: 'error', e }),
    };
  }
};

module.exports = { post };
