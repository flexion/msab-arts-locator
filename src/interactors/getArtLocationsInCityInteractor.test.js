const assert = require('assert');
const { createMockApplicationContext } = require('../utilities/TestUtils');
const { getArtLocationsInCity } = require('./getArtLocationsInCityInteractor');
const { validateJson } = require('../utilities/AjvJsonValidator');
describe('valid city', () => {
  it('should reject requests with missing city in the requestData', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getJsonValidator: () => {
        return {
          validateJson,
        };
      },
    });

    try {
      await getArtLocationsInCity({
        applicationContext: mockApplicationContext,
        requestData: { meow: 'meow' },
      });
    } catch (e) {
      assert.ok(
        e.message.includes("should be an object with string properties 'city'"),
      );
    }
  });

  it('should accept well formed and complete requests', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getJsonValidator: () => {
        return {
          validateJson,
        };
      },
    });

    try {
      await getArtLocationsInCity({
        applicationContext: mockApplicationContext,
        requestData: {
          city: 'Mankato',
        },
      });
    } catch (e) {
      console.log(e);
      assert.fail('should not have thrown an exception');
    }
  });
});
