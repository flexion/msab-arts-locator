const { validateRequestData } = require('../utilities/CleanUtils');

exports.getReverseCityLookupInteractor = async ({
  requestData,
  applicationContext,
}) => {
  const dataSchema = {
    type: 'object',
    properties: {
      lat: { type: 'number' },
      long: { type: 'number' },
    },
    required: ['lat', 'long'],
    additionalProperties: false,
    errorMessage: 'should be an object with lat and long properties',
  };

  // An interactor validates that the required objects are present.
  validateRequestData({
    data: requestData.result,
    dataSchema,
    applicationContext,
  });

  // The interactor invokes a very specific persistence gateway operation.
  const data = requestData.result;
  const cityFromGeo = await applicationContext
    .getPersistenceGateway()
    .getCityFromGeo({ data, applicationContext });
  return { status: 'success', data: cityFromGeo };
};
