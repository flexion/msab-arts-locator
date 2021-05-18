const assert = require('assert');
const mockData = require('../persistence/mockData');
const {
  getReverseCityLookupInteractor,
} = require('./getReverseCityLookupInteractor');
const { createMockApplicationContext } = require('../utilities/TestUtils');
describe('valid city', () => {
  it('should reject requests with missing coords in the requestData', async () => {
    const mockApplicationContext = createMockApplicationContext({ mockData });

    try {
      await getReverseCityLookupInteractor({
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
      await getReverseCityLookupInteractor({
        applicationContext: mockApplicationContext,
        requestData: { result: { lat: 10, long: 10 } },
      });
    } catch (e) {
      assert.fail('should not have thrown an exception');
    }
  });
});
