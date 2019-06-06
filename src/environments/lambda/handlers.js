module.exports = {
  saveLocation: require('./lambdas/saveLocation').handler,
  hello: require('./lambdas/test-lambda').hello,
};
