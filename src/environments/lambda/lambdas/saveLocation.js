const createApplicationContext = require('../ApplicationContext');
// const { getUserFromAuthHeader } = require("../middleware/apiGatewayHelper");
//const { handle } = require('../middleware/apiGatewayHelper');

/**
 * used for saving new locations
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
const post = async (event) => {
  const applicationContext = createApplicationContext();
  try {
    console.log('event.body:', event);
    if (!event || !event.body) throw new Error('data not-found error');
    const requestData = event.body;
    //const user = getUserFromAuthHeader(event);
    console.log('requestData: ', requestData);
    console.log('applicationContext: ', applicationContext);
    applicationContext.logger.info('Event', event);

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
  } catch (e) {
    console.log('e: ', e);
    applicationContext.logger.error(e);
    return { statusCode: 500, body: JSON.stringify({ message: 'error', e }) };
  }
};

module.exports = { post };
