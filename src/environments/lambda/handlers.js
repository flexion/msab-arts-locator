module.exports = {
  saveLocation: require('./lambdas/saveLocation').post,
  getLocations: require('./lambdas/getLocations').get,
};
