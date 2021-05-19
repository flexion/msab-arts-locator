const { validateRequestData } = require('../utilities/CleanUtils');

exports.getArtLocationById = async ({ applicationContext, requestData }) => {
  const dataSchema = {
    additionalProperties: false,
    errorMessage: 'Failed to provide required values',
    properties: {
      actionType: { type: 'string' },
      entityId: { type: 'string' },
    },
    required: ['entityId', 'actionType'],
    type: 'object',
  };

  // An interactor validates that the required objects are present.
  validateRequestData({ applicationContext, data: requestData, dataSchema });

  const { actionType, entityId } = requestData;
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = await applicationContext
    .getPersistenceGateway()
    .getLocationById({ actionType, applicationContext, entityId });
  return artLocationData;
};
