const assert = require('assert');
const mockData = require('../persistence/mockData');
const { createMockApplicationContext } = require('../utilities/TestUtils');
const { getGeoLocationInteractor } = require('./getGeoLocationInteractor');
describe('valid city', () => {
  it('should reject requests with data in the requestData', async () => {
    const mockApplicationContext = createMockApplicationContext({ mockData });

    try {
      await getGeoLocationInteractor({
        applicationContext: mockApplicationContext,
        requestData: { meow: 'meow' },
      });
    } catch (e) {
      console.log('e: ', e);
      assert.ok(e.message.includes('should be an empty object'));
    }
  });

  it('should accept well formed and complete requests', async () => {
    const mockApplicationContext = createMockApplicationContext({
      mockData,
    });

    try {
      await getGeoLocationInteractor({
        applicationContext: mockApplicationContext,
        requestData: {},
      });
    } catch (e) {
      assert.fail('should not have thrown an exception');
    }
  });
});
