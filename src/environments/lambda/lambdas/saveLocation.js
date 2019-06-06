const createApplicationContext = require('../applicationContext');
// const { getUserFromAuthHeader } = require("../middleware/apiGatewayHelper");
const { handle } = require('../middleware/apiGatewayHelper');

/**
 * used for saving new locations
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
module.exports.handler = (event, requestData) =>
  handle(event, async () => {
    console.log('meow');
    //const user = getUserFromAuthHeader(event);
    const applicationContext = createApplicationContext();
    applicationContext.logger.info('Event', event);
    try {
      const validateResult = await applicationContext
        .getUseCases()
        .validateArtLocation({
          applicationContext,
          requestData,
        });
      if ((validateResult.status = 'success')) {
        const coordResult = await applicationContext
          .getUseCases()
          .getLocationCoordinates({
            applicationContext,
            requestData,
          });
        if (coordResult.status === 'success') {
          const saveResult = await applicationContext
            .getUseCases()
            .saveNewArtLocation({
              applicationContext,
              requestData,
            });
          if (saveResult.status === 'success') {
            return {
              statusCode: 200,
              body: JSON.stringify({
                message: 'success',
                input: event,
              }),
            };
          }
        }
      }
      return { statusCode: 500, body: JSON.stringify({ message: 'error' }) };
    } catch (e) {
      applicationContext.logger.error(e);
      return { statusCode: 500, body: JSON.stringify({ message: 'error' }) };
    }
  });
