//Interactor goes here
const { toJSON } = require('../utilities/ObjectUtils');
const { validateRequestData } = require('../utilities/CleanUtils');
const { ArtLocation } = require('../domain/ArtLocation');

/**
 *
 * @param requestData
 * @param applicationContext
 * @param responseCallback
 * @returns {Promise<*>}
 */
exports.saveNewArtLocation = async ({
  requestData,
  responseCallback,
  applicationContext,
}) => {
  // An interactor owns the interface of the request. It will validate that the requestData is
  // well-formed using a JSON Schema validator. Detailed validation is handled by entities later.
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

  // An interactor knows the data strucures of the entities it mediates and assembles
  // those datastructures as approptiate. It doesn't blindly pass them what it receives from its caller.

  // The interactor doesn't know the details of what constitutes valid entitiy data. It relies
  // on entities for that validation.
  const artLocation = new ArtLocation({
    rawArtLocation: requestData.data,
    applicationContext,
  });

  // Once the entities have done thier work, if the results need to be persisted, the interactor
  // extracts entity data and assebles data records that is passes to the persistencd gateway.
  const artLocationData = toJSON(artLocation);
  // The interactor invokes a very specific persistence gateway operation.
  await applicationContext
    .getPersistenceGateway()
    .submitNewLocation({ artLocationData, applicationContext });

  return { status: 'success', data: artLocationData };
};
