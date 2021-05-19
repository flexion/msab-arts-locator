const createApplicationContext = require('../ApplicationContext');

// const { getUserFromAuthHeader } = require("../middleware/apiGatewayHelper");
//const { handle } = require('../middleware/apiGatewayHelper');
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS, POST',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'max-age=0, private, no-cache, no-store, must-revalidate',
  'Content-Type': 'application/json',
};

/**
 * used for saving new locations
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */

const post = async event => {
  const applicationContext = createApplicationContext();
  let requestData = null;
  let updateResults = null;
  let msg = null;
  try {
    console.log('event:', event);
    if (!event || !event.body) throw new Error('data not-found error');
    requestData = JSON.parse(event.body);
    console.log('requestData: ', requestData);
    const { actionType, entityId } = requestData.update;
    if (entityId && actionType) {
      const captchaResult = await applicationContext
        .getUseCases()
        .validateCaptcha({ applicationContext, value: requestData.gresp });
      console.log('captcharesult: ', captchaResult);

      if (captchaResult.status === 'success') {
        updateResults = await applicationContext
          .getUseCases()
          .updateArtLocation({ applicationContext, requestData });
        msg = updateResults.status;
        console.log('updateResults: ', updateResults);
      }
    }
    if (msg === 'success') {
      const emailResults = await applicationContext
        .getUseCases()
        .sendUserEmail({
          applicationContext,
          approved: requestData.approved,
          artLocation: updateResults.artLocation,
          initial: false,
        });
      console.log('send user email results: ', emailResults);
      console.log('should return a 201');
      return {
        body: JSON.stringify({
          input: event,
          message: 'success',
          results: updateResults.results,
        }),
        headers,
        statusCode: 201,
      };
    } else {
      console.log('should return a 406', msg);
      return {
        body: JSON.stringify({
          input: event,
          message: msg,
        }),
        headers,
        statusCode: 406,
      };
    }
  } catch (e) {
    console.log('e: ', e);
    applicationContext.logger.error(e);
    return {
      body: JSON.stringify({ e, message: 'error' }),
      headers,
      statusCode: 500,
    };
  }
};

module.exports = { post };
