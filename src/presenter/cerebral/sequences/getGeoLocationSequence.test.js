import { CerebralTest } from 'cerebral/test';
import { createMockApplicationContext } from '../../../utilities/TestUtils';
import { presenter } from '../../presenter';

describe('getGeoLocationSequence', () => {
  it('should invoke the searchByCity use case interactor', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getUseCases: () => ({
        getArtLocationsInCity: requ => {
          expect(requ.requestData).toMatchObject({
            city: 'Mankato',
          });
          expect(requ.applicationContext).toBeDefined();
          return {
            data: {
              list: [],
            },
            status: 'success',
          };
        },
        getArtLocationsInRadius: () => {
          return {
            data: {
              list: [],
            },
            status: 'success',
          };
        },
        getGeoLocationInteractor: request => {
          expect(request.requestData).toMatchObject({});
          expect(request.applicationContext).toBeDefined();
          return {
            data: {
              coords: { latitude: 10, longitude: 10 },
            },
            status: 'success',
          };
        },
        getReverseCityLookupInteractor: req => {
          expect(req.requestData).toMatchObject({
            result: { lat: 10, long: 10 },
          });
          expect(req.applicationContext).toBeDefined();
          return {
            data: {
              cityValue: 'Mankato',
            },
            status: 'success',
          };
        },
      }),
    });

    presenter.providers.applicationContext = mockApplicationContext;
    const test = CerebralTest(presenter);
    await test.runSequence('getGeoLocationSequence');
    expect(test.getState('haveGeo')).toEqual(true);
    const geo = {
      lat: 10,
      long: 10,
    };
    expect(test.getState('position')).toMatchObject(geo);
  });
});
