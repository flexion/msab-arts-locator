const { validateRequestData } = require('../utilities/CleanUtils');

exports.getGeoLocationInteractor = async ({
  applicationContext,
  requestData,
}) => {
  const dataSchema = {
    additionalProperties: false,
    errorMessage: 'should be an empty object',
    type: 'object',
  };
  // An interactor validates that the required objects are present.
  validateRequestData({ applicationContext, data: requestData, dataSchema });

  // The interactor invokes a very specific persistence gateway operation.
  const geoLocationData = await applicationContext
    .getPersistenceGateway()
    .getGeoLocation({ applicationContext });
  return { data: geoLocationData, status: 'success' };
};
