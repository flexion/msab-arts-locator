//business object goes here
const { toJSON } = require('../utilities/ObjectUtils');
const { validateRequestData } = require('../utilities/CleanUtils');

/**
 * constructor
 *
 * @param rawArtLocation.rawArtLocation
 * @param rawArtLocation
 * @param applicationContext
 * @param rawArtLocation.applicationContext
 * @class
 */
function ArtLocation({ applicationContext, rawArtLocation }) {
  Object.assign(this, rawArtLocation, {
    adminId: applicationContext.getUniqueIdString(),
    createdAt:
      rawArtLocation.createdAt || applicationContext.getCurrentTimestamp(),
    entityId: rawArtLocation.id || applicationContext.getUniqueIdString(),
    updateId: applicationContext.getUniqueIdString(),
  });

  // An business object owns the interface of the request. It will validate
  // that the requestData is well-formed using a JSON Schema validator.
  let dataSchema = {
    allOf: [
      {
        additionalProperties: true,
        properties: {
          approved: { type: 'boolean' },
          category: { type: 'object' },
          city: { minLength: 1, type: 'string' },
          contactEmail: { minLength: 1, type: 'string' },
          contactName: { minLength: 1, type: 'string' },
          contactPhone: { minLength: 1, type: 'string' },
          gresp: { minLength: 1, type: 'string' },
          lat: { type: 'number' },
          long: { type: 'number' },
          name: { minLength: 1, type: 'string' },
          state: { maxLength: 2, minLength: 2, type: 'string' },
          street: { minLength: 1, type: 'string' },
          zip: { minLength: 5, type: 'string' },
        },
      },
    ],
    errorMessage: {
      _: 'Location should include a name, street address, city name, zip code, contact name, contact phone, and contact email.',
      properties: {
        city: 'City should be a string 1 characters long',
        contactEmail:
          'Contact e-mail should be a string at least 1 characters long',
        contactName:
          'Contact name should be a string at least 1 characters long',
        contactPhone:
          'Contact phone should be a string at least 1 characters long',
        gresp: 'Please complete the CAPTCHA to submit',
        name: 'Name should be a string at least 1 characters long',
        state: 'State should be a string 2 characters long',
        street: 'Street should be a string at least 1 characters long',
        zip: 'Zip should be a number at least 5 numbers long',
      },
      type: 'Data should be an object',
    },
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
    type: 'object',
  };

  // An object validates that the arguments are as valid as can be determined at this point.
  const entityData = toJSON(this);
  validateRequestData({
    applicationContext,
    data: entityData,
    dataSchema,
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
