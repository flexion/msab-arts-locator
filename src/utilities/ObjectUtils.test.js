const assert = require('assert');
const { toJSON } = require('./ObjectUtils');

/**
 * @param raw
 */
function MockEntity1(raw) {
  Object.assign(this, raw);
}

const MockEntity2 = function (raw) {
  Object.assign(this, raw);
};

describe('ObjectUtils', () => {
  describe('toJSON', () => {
    it('returns valid JSON', () => {
      const validNested = new MockEntity1({
        favoriteNumber: 7,
        hasNickname: false,
        name: 'MockEntity1',
      });
      const entity = new MockEntity2({
        arry1: [{ baz: validNested, foo: 'bar' }, {}],
        name: 'MockEntity2',
        optionalThing: validNested,
      });

      const expected = {
        arry1: [
          {
            baz: { favoriteNumber: 7, hasNickname: false, name: 'MockEntity1' },
            foo: 'bar',
          },
          {},
        ],
        name: 'MockEntity2',
        optionalThing: {
          favoriteNumber: 7,
          hasNickname: false,
          name: 'MockEntity1',
        },
      };
      assert.deepStrictEqual(toJSON(entity), expected);
    });
  });
});
