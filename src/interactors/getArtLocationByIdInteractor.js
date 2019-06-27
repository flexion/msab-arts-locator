const { validateRequestData } = require('../utilities/CleanUtils');

exports.getArtLocationById = async ({ requestData, applicationContext }) => {
  console.log('requestData: ', requestData);
  const dataSchema = {
    type: 'object',
    properties: {
      entityId: { type: 'string' },
      actionType: { type: 'string' },
    },
    required: ['entityId', 'actionType'],
    additionalProperties: false,
    errorMessage: 'Failed to provide required values',
  };

  // An interactor validates that the required objects are present.
  validateRequestData({ data: requestData, dataSchema, applicationContext });

  const { entityId, actionType } = requestData;
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = await applicationContext
    .getPersistenceGateway()
    .getLocationById({ entityId, actionType, applicationContext });
  return artLocationData;
};
