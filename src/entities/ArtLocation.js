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
    entityId: rawArtLocation.id || applicationContext.getUniqueIdString(),
    adminId: applicationContext.getUniqueIdString(),
    updateId: applicationContext.getUniqueIdString(),
  });

  // An business object owns the interface of the request. It will validate
  // that the requestData is well-formed using a JSON Schema validator.
  var dataSchema = {
    type: 'object',
    required: [
      'name',
      'street',
      'city',
      'state',
      'zip',
      'contactName',
      'contactEmail',
      'contactPhone',
      'gresp',
      'approved',
    ],
    allOf: [
      {
        properties: {
          name: { type: 'string', minLength: 1 },
          category: { type: 'object' },
          street: { type: 'string', minLength: 1 },
          city: { type: 'string', minLength: 1 },
          state: { type: 'string', minLength: 2, maxLength: 2 },
          zip: { type: 'string', minLength: 5 },
          contactName: { type: 'string', minLength: 1 },
          contactEmail: { type: 'string', minLength: 1 },
          contactPhone: { type: 'string', minLength: 1 },
          long: { type: 'number' },
          lat: { type: 'number' },
          gresp: { type: 'string', minLength: 1 },
          approved: { type: 'boolean' },
        },
        additionalProperties: true,
      },
    ],
    errorMessage: {
      type: 'Data should be an object',
      properties: {
        name: 'Name should be a string at least 1 characters long',
        contactPhone:
          'Contact phone should be a string at least 1 characters long',
        contactName:
          'Contact name should be a string at least 1 characters long',
        contactEmail:
          'Contact e-mail should be a string at least 1 characters long',
        street: 'Street should be a string at least 1 characters long',
        city: 'City should be a string 1 characters long',
        state: 'State should be a string 2 characters long',
        zip: 'Zip should be a number at least 5 numbers long',
        gresp: 'Please complete the CAPTCHA to submit',
      },
      _: 'Location should include a name, street address, city name, zip code, contact name, contact phone, and contact email.',
    },
  };

  // An object validates that the arguments are as valid as can be determined at this point.
  const entityData = toJSON(this);
  validateRequestData({
    data: entityData,
    dataSchema,
    applicationContext,
  });
  // need to loop through categories to see if type is true
  let atLeastOne = false;
  let cats = this.category;
  if (typeof cats === 'string') {
    cats = JSON.parse(cats);
  }

  Object.keys(cats).forEach(function (cat) {
    if (cats[cat]) {
      atLeastOne = true;
    }
  });
  if (!atLeastOne) {
    throw new Error('[{"message": "At least one category type is required"}]');
  }
}

module.exports = { ArtLocation };
