const { validateRequestData } = require('../utilities/CleanUtils');

exports.getArtLocationsInCity = async ({ applicationContext, requestData }) => {
  const dataSchema = {
    additionalProperties: false,
    errorMessage: "should be an object with string properties 'city'",
    properties: {
      city: { type: 'string' },
    },
    required: ['city'],
    type: 'object',
  };

  // An interactor validates that the required objects are present.
  validateRequestData({ applicationContext, data: requestData, dataSchema });

  const { city } = requestData;
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = await applicationContext
    .getPersistenceGateway()
    .getLocationsInCity({ applicationContext, city });
  return artLocationData;
};
