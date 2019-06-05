const assert = require('assert');
const applicationContext = require('./ApplicationContext');

describe('AplicationContext', () => {
  describe('API', () => {
    it('should provide a unique IDs', () => {
      assert.ok(applicationContext.getUniqueIdString());
    });

    it('should provide a current timestamp', () => {
      assert.ok(applicationContext.getCurrentTimestamp());
    });

    it('should provide a JSON Schema validator', () => {
      assert.ok(applicationContext.getJsonValidator());
    });

    it('should provide a persistence gateway', () => {
      assert.ok(applicationContext.getPersistenceGateway());
    });
  });
});
