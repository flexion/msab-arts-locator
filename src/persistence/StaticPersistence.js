const findLocationsByCity = function (rawData, city) {
  if (city) {
    return rawData.filter(
      location => location.city.toUpperCase() === city.toUpperCase(),
    );
  }
  return rawData;
};

const readAllLocationsByCity = function ({ applicationContext, city }) {
  const rawData = applicationContext.getDataReader();
  return findLocationsByCity(rawData, city);
};

module.exports = { readAllLocationsByCity };
