const createApplicationContext = require('../applicationContext');
// const { getUserFromAuthHeader } = require("../middleware/apiGatewayHelper");
const { handle } = require('../middleware/apiGatewayHelper');

/**
 * used for saving new locations
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
module.exports.handler = (event) =>
  handle(event, async () => {
    console.log('meow');
    //const user = getUserFromAuthHeader(event);
    const applicationContext = createApplicationContext();
    applicationContext.logger.info('Event', event);
    try {
      await applicationContext.getUseCases().saveNewLocation({
        applicationContext,
        documentId: (event.pathParameters || event.path).documentId,
      });
    } catch (e) {
      applicationContext.logger.error(e);
      throw e;
    }
  });
