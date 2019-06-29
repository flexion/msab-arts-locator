const createApplicationContext = require('../ApplicationContext');

// const { getUserFromAuthHeader } = require("../middleware/apiGatewayHelper");
//const { handle } = require('../middleware/apiGatewayHelper');
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'max-age=0, private, no-cache, no-store, must-revalidate',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'OPTIONS, POST',
  'Access-Control-Allow-Headers': 'Content-Type',
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
  let updateResults = null;
  let msg = null;
  try {
    console.log('event:', event);
    if (!event || !event.body) throw new Error('data not-found error');
    requestData = JSON.parse(event.body);
    console.log('requestData: ', requestData);
    const { entityId, actionType } = requestData.update;
    if (entityId && actionType) {
      const captchaResult = await applicationContext
        .getUseCases()
        .validateCaptcha({ value: requestData.gresp, applicationContext });
      console.log('captcharesult: ', captchaResult);

      if (captchaResult.status === 'success') {
        updateResults = await applicationContext
          .getUseCases()
          .updateArtLocation({ requestData, applicationContext });
        msg = updateResults.status;
        console.log('updateResults: ', updateResults);
      }
    }
    if (msg === 'success') {
      console.log('should return a 201');
      return {
        statusCode: 201,
        headers: headers,
        body: JSON.stringify({
          message: 'success',
          input: event,
          results: updateResults.results,
        }),
      };
    } else {
      console.log('should return a 406', msg);
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
