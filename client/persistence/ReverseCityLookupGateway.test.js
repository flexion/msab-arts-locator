const assert = require('assert');
const { getCityFromGeo } = require('./ReverseCityLookupGateway');
import mock from 'xhr-mock';
describe('ReverseCityLookupGateway', () => {
  beforeEach(() => mock.setup());
  afterEach(() => mock.teardown());
  describe('getCityFromGeo()', () => {
    it('returns no city when coords are not provided', async () => {
      mock.use((req, res) => {
        return res.status(201).body('{"data":{"id":"abc-123"}}');
      });

      const city = await getCityFromGeo({
        data: {},
      });
      assert.deepStrictEqual(city, {});
    });
    it('returns locations when city is provided', async () => {
      mock.use((req, res) => {
        return res.status(201).body('{"address":{"town":"Sun Prairie"}}');
      });
      const city = await getCityFromGeo({
        data: { lat: 43.1796, long: -89.2802 },
      });
      assert.deepStrictEqual(city.cityValue, 'Sun Prairie');
    });
  });
});
