import { CerebralTest } from 'cerebral/test';
import { createMockApplicationContext } from '../../../utilities/TestUtils';
import { presenter } from '../../presenter';
import { runAction } from 'cerebral/test';

describe('getGeoLocationSequence', () => {
  it('should invoke the searchByCity use case interactor', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getUseCases: () => ({
        getGeoLocationInteractor: (request) => {
          expect(request.requestData).toMatchObject({});
          expect(request.applicationContext).toBeDefined();
          return {
            status: 'success',
            data: {
              coords: { latitude: 10, longitude: 10 },
            },
          };
        },
        getReverseCityLookupInteractor: (req) => {
          expect(req.requestData).toMatchObject({
            result: { lat: 10, long: 10 },
          });
          expect(req.applicationContext).toBeDefined();
          return {
            status: 'success',
            data: {
              cityValue: 'Mankato',
            },
          };
        },
        getArtLocationsInCity: (requ) => {
          expect(requ.requestData).toMatchObject({
            city: 'Mankato',
          });
          expect(requ.applicationContext).toBeDefined();
          return {
            status: 'success',
            data: {
              list: [],
            },
          };
        },
        getArtLocationsInRadius: (request) => {
         return {
          status: 'success',
          data: {
           list: [],
          },
         };
        },
      }),
    });

    presenter.providers.applicationContext = mockApplicationContext;
    const test = CerebralTest(presenter);
    await test.runSequence('getGeoLocationSequence');
    expect(test.getState('haveGeo')).toBeTrue;
    const geo = {
      lat: 10,
      long: 10,
    };
    expect(test.getState('position')).toMatchObject(geo);
    // expect(test.getState('cityValue')).toMatch('Mankato');
  });
});
