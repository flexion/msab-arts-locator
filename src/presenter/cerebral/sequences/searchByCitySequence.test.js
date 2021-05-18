import { CerebralTest } from 'cerebral/test';
import { createMockApplicationContext } from '../../../utilities/TestUtils';
import { presenter } from '../../../presenter/presenter';

describe('searchByCitySequence', () => {
  it('should invoke the searchByCity use case interactor', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getUseCases: () => ({
        getArtLocationsInCity: request => {
          expect(request.requestData).toMatchObject({
            city: 'Mankato',
          });
          expect(request.applicationContext).toBeDefined();
          return { data: responseData.data, status: 'success' };
        },
      }),
    });

    presenter.providers.applicationContext = mockApplicationContext;
    const test = CerebralTest(presenter);
    test.setState('cityValue', 'Mankato');

    await test.runSequence('searchByCitySequence');
  });

  it('should add the interactor response to cerebral state', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getUseCases: () => ({
        getArtLocationsInCity: () => {
          return { message: 'success', results: responseData.data };
        },
      }),
    });

    presenter.providers.applicationContext = mockApplicationContext;
    const test = CerebralTest(presenter);
    test.setState('locationsList', []);

    await test.runSequence('searchByCitySequence');

    expect(test.getState('locationsList')).toMatchObject(responseData.data);
  });
});

const responseData = {
  data: {
    locationsList: [
      {
        city: 'Mankato',
        description:
          "Andria Theatre will enrich people's lives while providing unique performance and educational opportunities.",
      },
    ],
  },
  status: 'success',
};
