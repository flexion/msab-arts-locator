const assert = require('assert');
const mockData = require('./mockData');
const { createMockApplicationContext } = require('../utilities/TestUtils');
const { readAllLocationsByCity } = require('./StaticPersistence');
describe('StaticPersistence', () => {
  let mockApplicationContext = createMockApplicationContext({ mockData });

  describe('readAllLocationsByCity()', () => {
    it('returns no locations when a city is not provided', () => {
      const locations = readAllLocationsByCity({
        applicationContext: mockApplicationContext,
        city: '',
      });
      assert.deepStrictEqual(locations, mockData); // no input brings back all data
    });
    it('returns locations when city is provided', () => {
      const locations = readAllLocationsByCity({
        applicationContext: mockApplicationContext,
        city: 'Mankato',
      });

      assert.ok(locations.length > 0);
    });
  });
});
