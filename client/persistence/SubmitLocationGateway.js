const submitNewLocation = function({ city, applicationContext }) {
  const response = applicationContext.getDataWriter();
  return { results: response };
};

module.exports = { submitNewLocation };
