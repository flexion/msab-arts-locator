//Interactor goes here
const { toJSON } = require('../utilities/ObjectUtils');
const { validateRequestData } = require('../utilities/CleanUtils');
const { ArtLocation } = require('../entities/ArtLocation');

/**
 *
 * @param requestData
 * @param applicationContext
 * @param responseCallback
 * @returns {Promise<*>}
 */
exports.sendArtLocation = async ({ requestData, applicationContext }) => {
  // An interactor owns the interface of the request. It will validate that the requestData is
  // well-formed using a JSON Schema validator. Detailed validation is handled by entities later.
  console.log('sendartlocationInteractor');
  const dataSchema = {
    type: 'object',
    properties: {
      artistName: { type: 'string' },
      locationName: { type: 'string' },
      category: { type: 'object' },
      website: { type: 'string' },
      street: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      zip: { type: 'string' },
      contactName: { type: 'string' },
      contactEmail: { type: 'string' },
      contactPhone: { type: 'string' },
      description: { type: 'string' },
      long: { type: 'number' },
      lat: { type: 'number' },
    },
    required: [
      'artistName',
      'locationName',
      'street',
      'city',
      'state',
      'zip',
      'contactName',
      'contactEmail',
      'contactPhone',
    ],
    additionalProperties: true,
    errorMessage:
      "should be an object with a string properties 'artistName','locationName','street','city','state','zip','contactName','contactEmail','contactPhone','description',",
  };

  // An interactor validates that the required objects are present.
  validateRequestData({
    data: requestData.data,
    dataSchema,
    applicationContext,
  });

  await applicationContext.getPersistenceGateway().submitNewLocation({
    artLocationData: requestData.data,
    applicationContext,
  });

  return { status: 'success', data: requestData.data };
};
