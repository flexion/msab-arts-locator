//business object goes here
const { validateRequestData } = require('../utilities/CleanUtils');
const { toJSON } = require('../utilities/ObjectUtils');

/**
 * constructor
 * @param rawArtLocation
 * @param applicationContext
 * @constructor
 */
function NewArtLocation({ rawArtLocation, applicationContext }) {
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
      'name',
      'discipline',
      'primaryType',
      'url',
      'phone',
      'email',
      'add1',
      'add2',
      'city',
      'state',
      'zip',
      'description',
    ],
    allOf: [
      {
        properties: {
          description: { type: 'string', minLength: 5 },
          name: { type: 'string', minLength: 5 },
          discipline: { type: 'string', minLength: 5 },
          primaryType: { type: 'string', minLength: 5 },
          url: { type: 'string', minLength: 5 },
          phone: { type: 'string', minLength: 10 },
          email: { type: 'string', minLength: 5 },
          add1: { type: 'string', minLength: 5 },
          add2: { type: 'string' },
          city: { type: 'string', minLength: 5 },
          state: { type: 'string', minLength: 2 },
          zip: { type: 'number' },
        },
        additionalProperties: true,
      },
    ],
    errorMessage: {
      type: 'data should be an object',
      properties: {
        description:
          'description should be a string at least 5 characters long',
        name: 'name should be a string at least 5 characters long',
        discipline: 'discipline should be a string at least 5 characters long',
        primaryType:
          'primaryType should be a string at least 5 characters long',
        url: 'url should be a string at least 5 characters long',
        phone: 'phone should be a string at least 10 characters long',
        email: 'email should be a string at least 5 characters long',
        add1: 'add1 should be a string at least 5 characters long',
        add2: 'add2 should be a string',
        city: 'city should be a string 2 characters long',
        state: 'state should be a string at least 5 characters long',
        zip: 'zip should be a string at least 5 characters long',
      },
      _: 'data should include a description, creation date, and unique id',
    },
  };

  // An object validates that the arguments are as valid as can be determined at this point.
  const entityData = toJSON(this);
  validateRequestData({ data: entityData, dataSchema, applicationContext });
}

module.exports = { NewArtLocation };
