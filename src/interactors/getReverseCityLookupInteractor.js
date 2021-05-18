const { validateRequestData } = require('../utilities/CleanUtils');

exports.getReverseCityLookupInteractor = async ({
  applicationContext,
  requestData,
}) => {
  const dataSchema = {
    additionalProperties: false,
    errorMessage: 'should be an object with lat and long properties',
    properties: {
      lat: { type: 'number' },
      long: { type: 'number' },
    },
    required: ['lat', 'long'],
    type: 'object',
  };

  // An interactor validates that the required objects are present.
  validateRequestData({
    applicationContext,
    data: requestData.result,
    dataSchema,
  });

  // The interactor invokes a very specific persistence gateway operation.
  const data = requestData.result;
  const cityFromGeo = await applicationContext
    .getPersistenceGateway()
    .getCityFromGeo({ applicationContext, data });
  return { data: cityFromGeo, status: 'success' };
};
