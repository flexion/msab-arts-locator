const assert = require('assert');
const { createMockApplicationContext } = require('../utilities/TestUtils');
const {
  getReverseCityLookupInteractor,
} = require('./getReverseCityLookupInteractor');
const mockData = require('../persistence/mockData');
describe('valid city', () => {
  it('should reject requests with missing coords in the requestData', async () => {
    const mockApplicationContext = createMockApplicationContext({ mockData });

    try {
      await getReverseCityLookupInteractor({
        requestData: { meow: 'meow' },
        applicationContext: mockApplicationContext,
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
        requestData: { result: { lat: 10, long: 10 } },
        applicationContext: mockApplicationContext,
      });
    } catch (e) {
      assert.fail('should not have thrown an exception');
    }
  });
});
