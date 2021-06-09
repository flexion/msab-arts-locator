const { v4: uuidv4 } = require('uuid');

/**
 *
 * @param options
 */
function createMockApplicationContext(options = {}) {
  return {
    getCurrentTimestamp: () => {
      return 1554070560001;
    },
    getDataReader: () => {
      return options.mockData;
    },
    getJsonValidator: () => ({
      validateJson: () => {},
    }),
    getPersistenceGateway: () => ({
      getCityFromGeo: () => {},
      getGeoLocation: () => {},
      getLocationsInCity: () => {},
      readAllLocationsByCity: () => {},
    }),
    getUniqueId: () => {
      return uuidv4();
    },
    getUniqueIdString: () => {
      return '413f62ce-d7c8-446e-aeda-14a2a625a626';
    },
    ...options,
  };
}

/**
 *
 */
function createSchemaValidationApplicationContext(options = {}) {
  const { validateJson } = require('./AjvJsonValidator');
  return createMockApplicationContext({
    getJsonValidator: () => {
      return {
        validateJson,
      };
    },
    ...options,
  });
}

module.exports = {
  createMockApplicationContext,
  createSchemaValidationApplicationContext,
};
