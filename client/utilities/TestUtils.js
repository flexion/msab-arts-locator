/**
 *
 * @param options
 */
function createMockApplicationContext(options) {
  return {
    getUniqueIdString: () => {
      return '413f62ce-d7c8-446e-aeda-14a2a625a626';
    },
    getCurrentTimestamp: () => {
      return 1554070560001;
    },
    getJsonValidator: () => ({
      validateJson: () => {},
    }),
    getPersistenceGateway: () => ({
      createTodo: () => {},
      readAllTodos: () => {},
      deleteAllTodos: () => {},
    }),
    ...options,
  };
}

function createSchemaValidationApplicationContext() {
  const { validateJson } = require('./AjvJsonValidator');
  return createMockApplicationContext({
    getJsonValidator: () => {
      return {
        validateJson,
      };
    },
  });
}

module.exports = {
  createMockApplicationContext,
  createSchemaValidationApplicationContext,
};
