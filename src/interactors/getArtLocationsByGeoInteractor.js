const { validateRequestData } = require('../utilities/CleanUtils');

exports.getArtLocationsByGeo = async ({ requestData, applicationContext }) => {
  const dataSchema = {
    type: 'object',
    properties: {
      lat: { type: 'string' },
      long: { type: 'string' },
      radius: { type: 'string' },
    },
    required: ['lat', 'long', 'radius'],
    additionalProperties: false,
    errorMessage:
      "should be an object with string properties 'lat', 'long', 'radius'",
  };

  // An interactor validates that the required objects are present.
  validateRequestData({ data: requestData, dataSchema, applicationContext });

  const lat = parseFloat(requestData.lat);
  const long = parseFloat(requestData.long);
  const radius = parseFloat(requestData.radius);
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = await applicationContext
    .getPersistenceGateway()
    .getLocationsByGeo({ lat, long, radius });

  return artLocationData;
};