const { toJSON } = require('../utilities/ObjectUtils');
const { validateRequestData } = require('../utilities/CleanUtils');

exports.getArtLocationsInCity = async ({
  requestData,
  responseCallback,
  applicationContext,
}) => {
  const dataSchema = {
    type: 'object',
    properties: {
      city: { type: 'string' },
    },
    required: ['city'],
    additionalProperties: false,
    errorMessage: "should be an object with string properties 'city'",
  };

  // An interactor validates that the required objects are present.
  validateRequestData({ data: requestData, dataSchema, applicationContext });

  const { city } = requestData;
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = await applicationContext
    .getPersistenceGateway()
    .readAllLocationsByCity({ city, applicationContext });

  // The interactor invokes a callback (probably in the presenter) to provide results. The
  // function signature should be at the same semantic level as the interactor.
  responseCallback({ status: 'success', data: artLocationData });
};
