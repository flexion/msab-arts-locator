//business object goes here
const { validateRequestData } = require('../utilities/CleanUtils');
const { toJSON } = require('../utilities/ObjectUtils');

/**
 * constructor
 * @param rawArtLocation
 * @param applicationContext
 * @constructor
 */
function ArtLocation({ rawArtLocation, applicationContext }) {
  Object.assign(this, rawArtLocation, {
    createdAt:
      rawArtLocation.createdAt || applicationContext.getCurrentTimestamp(),
    enitityId: rawArtLocation.id || applicationContext.getUniqueIdString(),
  });

  // An business object owns the interface of the request. It will validate
  // that the requestData is well-formed using a JSON Schema validator.
  var dataSchema = {
    type: 'object',
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
    allOf: [
      {
        properties: {
          artistName: { type: 'string', minLength: 1 },
          locationName: { type: 'string', minLength: 1 },
          category: { type: 'object' },
          website: { type: 'string', minLength: 1 },
          street: { type: 'string', minLength: 1 },
          city: { type: 'string', minLength: 1 },
          state: { type: 'string', minLength: 2, maxLength: 2 },
          zip: { type: 'string', minLength: 5 },
          contactName: { type: 'string', minLength: 1 },
          contactEmail: { type: 'string', minLength: 1 },
          contactPhone: { type: 'string', minLength: 1 },
          description: { type: 'string', minLength: 1, maxLength: 250 },
          long: { type: 'number' },
          lat: { type: 'number' },
        },
        additionalProperties: true,
      },
    ],
    errorMessage: {
      type: 'data should be an object',
      properties: {
        description:
          'description should be at least 1 characters long and less than 250 characters',
        name: 'name should be a string at least 1 characters long',
        url: 'url should be a string at least 1 characters long',
        phone: 'phone should be a string at least 1 characters long',
        email: 'email should be a string at least 1 characters long',
        street: 'street should be a string at least 1 characters long',
        city: 'city should be a string 1 characters long',
        state: 'state should be a string 2 characters long',
        zip: 'zip should be a number at least 5 numbers long',
      },
      _: 'data should include a description, creation date, and unique id',
    },
  };

  // An object validates that the arguments are as valid as can be determined at this point.
  const entityData = toJSON(this);
  validateRequestData({ data: entityData, dataSchema, applicationContext });
}

module.exports = { ArtLocation };
