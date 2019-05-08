const assert = require('assert');

const { readAllLocationsByCity } = require('./StaticPersistence');

describe('inMemoryStorageClient', () => {
  let mockApplicationContext = {};
  describe('readAllLocationsByCity()', () => {
    it('returns no locations when a city is not provided', () => {
      const locations = readAllLocationsByCity('', mockApplicationContext);
      assert.deepStrictEqual(locations, []);
    });
    it('returns locations when city is provided', () => {
      const locations = readAllLocationsByCity(
        'Mankato',
        mockApplicationContext
      );

      assert.ok(locations.length > 0);
    });
  });
});
