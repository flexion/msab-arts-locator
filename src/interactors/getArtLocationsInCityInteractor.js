const { toJSON } = require('../utilities/ObjectUtils');
const { validateRequestData } = require('../utilities/CleanUtils');

exports.getArtLocationsInCity = async ({ requestData, applicationContext }) => {
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
  console.log('use case city: ', city);
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = await applicationContext
    .getPersistenceGateway()
    .getLocationsInCity({ city, applicationContext });
  console.log('artLocationData: ', artLocationData);
  return { status: 'success', data: artLocationData };
};
