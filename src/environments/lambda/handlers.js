module.exports = {
  getLocation: require('./lambdas/getLocation').get,
  getLocations: require('./lambdas/getLocations').get,
  saveLocation: require('./lambdas/saveLocation').post,
  updateLocationApproval: require('./lambdas/updateLocationApproval').post,
};
