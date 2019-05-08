const findLocationsByCity = function(rawData, city) {
  return rawData.filter((location) => location.city === city);
};

const readAllLocationsByCity = function(city, applicationContext) {
  const rawData = applicationContext.getDataReader();
  return findLocationsByCity(rawData, city);
};

module.exports = { readAllLocationsByCity };
