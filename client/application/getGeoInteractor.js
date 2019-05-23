const { validateRequestData } = require('../utilities/CleanUtils');

exports.getGeoLocationInteractor = async ({
  requestData,
  applicationContext,
}) => {
  const dataSchema = {
    type: 'object',
    additionalProperties: false,
    errorMessage: 'should be an empty object',
  };

  // An interactor validates that the required objects are present.
  validateRequestData({ data: requestData, dataSchema, applicationContext });

  // The interactor invokes a very specific persistence gateway operation.
  const geoLocationData = await applicationContext
    .getPersistenceGateway()
    .getGeoLocation({ applicationContext });
  return { status: 'success', data: geoLocationData };
};
