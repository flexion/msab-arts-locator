const submitNewLocation = function({ artLocationData, applicationContext }) {
  const response = applicationContext.getDataWriter(artLocationData);
  return { results: response };
};

module.exports = { submitNewLocation };
