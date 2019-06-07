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
  let requestData = null;
  try {
    if (!event || !event.body) throw new Error('data not-found error');
    requestData = event.body;

    console.log('requestData: ', requestData);
    const validateResult = await applicationContext
      .getUseCases()
      .validateArtLocation({
        applicationContext,
        requestData,
      });
    console.log('validateResult: ', validateResult);
    if (validateResult.status === 'success') {
      const artLocation = validateResult.artLocation;
      const coordResult = await applicationContext
        .getUseCases()
        .getLocationCoordinates({
          applicationContext,
          artLocation,
        });
      console.log('coordResult: ', coordResult);
      if (coordResult.status === 'success') {
        const saveResult = await applicationContext
          .getUseCases()
          .saveNewArtLocation({
            applicationContext,
            artLocation,
          });
        console.log('saveResult: ', saveResult);
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
