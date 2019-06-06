module.exports = {
  saveLocation: require('./lambdas/saveLocation').post,
  hello: require('./lambdas/test-lambda').hello,
};
