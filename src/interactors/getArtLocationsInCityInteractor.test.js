const assert = require('assert');
const { createMockApplicationContext } = require('../utilities/TestUtils');
const { getArtLocationsInCity } = require('./getArtLocationsInCityInteractor');
const { validateJson } = require('../utilities/AjvJsonValidator');
const mockData = require('../persistence/mockData');
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
        requestData: { meow: 'meow' },
        applicationContext: mockApplicationContext,
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
        requestData: {
          city: 'Mankato',
        },
        applicationContext: mockApplicationContext,
      });
    } catch (e) {
      console.log(e);
      assert.fail('should not have thrown an exception');
    }
  });

  // it('should invoke persistence with the same application context', async () => {
  //   const mockApplicationContext = createMockApplicationContext({
  //     getUniqueIdString: () => {
  //       return '413f62ce-d7c8-446e-aeda-14a2a625a626';
  //     },
  //     getCurrentTimestamp: () => {
  //       return 1554070560001;
  //     },
  //     getPersistenceGateway: () => ({
  //       createTodo: (request) => {
  //         assert.equal(request.applicationContext, mockApplicationContext);
  //         assert.deepStrictEqual(request.todoData, {
  //           description: 'Make a sammich.',
  //           createdAt: 1554070560001,
  //           todoId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
  //         });
  //       },
  //     }),
  //   });

  //   const testResponseCallback = () => {};

  //   await getArtLocationsInCity({
  //     requestData: {
  //       city: 'Mankato',
  //     },
  //     responseCallback: testResponseCallback,
  //     applicationContext: mockApplicationContext,
  //   });
  // });

  // it('should invoke response callback with a success code and new todo data', async () => {
  //   const mockApplicationContext = createMockApplicationContext({
  //     getUniqueIdString: () => {
  //       return '413f62ce-d7c8-446e-aeda-14a2a625a626';
  //     },
  //     getCurrentTimestamp: () => {
  //       return 1554070560001;
  //     },
  //   });

  //   const testResponseCallback = (response) => {
  //     assert.deepStrictEqual(response, {
  //       status: 'success',
  //       data: {
  //         description: 'Make a sammich.',
  //         createdAt: 1554070560001,
  //         todoId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
  //       },
  //     });
  //   };

  //   await getArtLocationsInCity({
  //     requestData: {
  //       description: 'Make a sammich.',
  //     },
  //     responseCallback: testResponseCallback,
  //     applicationContext: mockApplicationContext,
  //   });
  // });
});
