const { v4: uuidv4 } = require('uuid');
const { validateJson } = require('../../utilities/AjvJsonValidator');

module.exports = () => {
  return {
    getUniqueIdString: () => {
      return uuidv4();
    },
    getCurrentTimestamp: () => {
      return Date.now();
    },
    getJsonValidator: () => {
      return {
        validateJson,
      };
    },
    logger: {
      error: (value) => {
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(value));
      },
      info: (key, value) => {
        // eslint-disable-next-line no-console
        console.info(key, JSON.stringify(value));
      },
    },
  };
};
