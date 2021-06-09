const {
  createSchemaValidationApplicationContext,
} = require('../utilities/TestUtils');
const { getArtLocationById } = require('./getArtLocationByIdInteractor');

describe('getArtLocationByIdInteractor', () => {
  it('fail with an error if required fields are not present', async () => {
    const mockApplicationContext = createSchemaValidationApplicationContext();
    await expect(
      getArtLocationById({
        applicationContext: mockApplicationContext,
        requestData: {},
      }),
    ).rejects.toThrowError();
  });

  it('calls getLocationById if required fields are present', async () => {
    const mockApplicationContext = createSchemaValidationApplicationContext({
      getPersistenceGateway: () => {
        return {
          getLocationById: () => {
            return { status: 'success' };
          },
        };
      },
    });

    const result = await getArtLocationById({
      applicationContext: mockApplicationContext,
      requestData: {
        actionType: 'some string',
        entityId: 'some string',
      },
    });
    expect(result).toBeDefined();
    expect(result.status).toEqual('success');
  });
});
