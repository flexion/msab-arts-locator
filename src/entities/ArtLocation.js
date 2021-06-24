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
        city: 'City',
        contactEmail: 'Contact e-mail',
        contactName: 'Contact name',
        contactPhone: 'Contact phone',
        gresp: 'Please complete the CAPTCHA to submit',
        name: 'Name',
        state: 'State',
        street: 'Street',
        zip: 'ZIP',
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
  let cats = this.category;
  if (typeof cats === 'string') {
    cats = JSON.parse(cats);
  }

  let numberOfEnabledCategories = Object.values(cats).filter(
    categoryEnabled => categoryEnabled === true,
  ).length;
  if (numberOfEnabledCategories < 1 || numberOfEnabledCategories > 3) {
    throw new Error(
      '[{"message": "Between one and three art location Type identifiers are required"}]',
    );
  }
}

module.exports = { ArtLocation };
