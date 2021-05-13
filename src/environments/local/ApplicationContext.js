module.exports = () => {
  return {
    getUniqueIdString: () => {
      return uuidv4();
    },
    getCurrentTimestamp: () => {
      return Date.now();
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
