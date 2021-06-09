const { createMockApplicationContext } = require('../utilities/TestUtils');
const { deleteArtLocation } = require('./deleteArtLocationInteractor');

describe('deleteArtLocationInteractor', () => {
  it('should invoke deleteLocation on persistence gateway', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getPersistenceGateway: () => {
        return {
          deleteLocation: () => {
            expect(true).toBeTruthy();
            return {
              status: 'success',
            };
          },
        };
      },
    });

    expect.assertions(2);
    const result = await deleteArtLocation({
      applicationContext: mockApplicationContext,
      requestData: {},
    });
    expect(result).toBeDefined();
  });

  it('should fail with an error if deleteLocation returns non-success', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getPersistenceGateway: () => {
        return {
          deleteLocation: () => {
            expect(true).toBeTruthy();
            return {
              status: 'failure',
            };
          },
        };
      },
    });

    // expect.assertions(2);
    await expect(
      deleteArtLocation({
        applicationContext: mockApplicationContext,
        requestData: {},
      }),
    ).rejects.toThrowError(/failed to delete/i);
  });
});
