module.exports = {
  saveLocation: require('./lambdas/saveLocation').post,
  getLocations: require('./lambdas/getLocations').get,
  getLocation: require('./lambdas/getLocation').get,
  updateLocationApproval: require('./lambdas/updateLocationApproval').post,
};
