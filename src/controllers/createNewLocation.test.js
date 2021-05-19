const { createMockApplicationContext } = require('../utilities/TestUtils');
const { createNewLocation } = require('./createNewLocation');

const mockLocationData = {
  approved: true,
  category: {
    craft: true,
    dance: true,
    folk: true,
    literary: true,
    music: true,
    opera: true,
    photo: true,
    visual: true,
  },
  city: 'Valid City',
  contactEmail: 'curator@example.com',
  contactName: 'Art Curator',
  contactPhone: '555-123-2345',
  gresp: 'abc1234',
  name: 'Another Cool Art Location',
  state: 'MN',
  street: '123 Valid Street',
  zip: '00000',
};

const mockApplicationContext = createMockApplicationContext({
  getUseCases: () => {
    return {
      getLocationCoordinates: () => {
        return {
          cityName: 'the city',
          coords: {
            lat: '0.0',
            lng: '0.0',
          },
          status: 'success',
        };
      },
      saveNewArtLocation: () => {
        return {
          status: 'success',
        };
      },
    };
  },
});

describe('createNewLocation controller', () => {
  it('validates ArtLocation, determines coordinates, and saves location', async () => {
    let data = mockLocationData;

    const result = await createNewLocation({
      applicationContext: mockApplicationContext,
      locationData: data,
    });

    expect(result.validateArtLocation.status).toEqual('success');
    expect(result.validateArtLocation.artLocation).toBeDefined();
    expect(result.locationCoordinates.status).toEqual('success');
    expect(result.locationCoordinates.coords).toHaveProperty('lat');
    expect(result.locationCoordinates.coords).toHaveProperty('lng');
    expect(result.locationCoordinates.cityName).toBeDefined();
    expect(result.saveResult.status).toEqual('success');
  });

  it('throws error for invalid ArtLocation', async () => {
    let data = {
      name: 'foo',
    };

    const emptyApplicationContext = createMockApplicationContext();
    await expect(
      createNewLocation({
        applicationContext: emptyApplicationContext,
        locationData: data,
      }),
    ).rejects.toThrowError(/invalid artlocation/i);
  });

  it('throws error when geolocation fails', async () => {
    const failingApplicationContext = createMockApplicationContext({
      getUseCases: () => {
        return {
          getLocationCoordinates: () => {
            return {
              status: 'error',
            };
          },
        };
      },
    });

    await expect(
      createNewLocation({
        applicationContext: failingApplicationContext,
        locationData: mockLocationData,
      }),
    ).rejects.toThrowError(/error getting location/i);
  });
});
