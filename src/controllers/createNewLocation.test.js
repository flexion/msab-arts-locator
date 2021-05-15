const { createNewLocation } = require('./createNewLocation');
const { createMockApplicationContext } = require('../utilities/TestUtils');

const mockLocationData = {
 name: 'Another Cool Art Location',
 category: {
   craft: true,
   dance: true,
   folk: true,
   literary: true,
   music: true,
   photo: true,
   opera: true,
   visual: true
 },
 street: '123 Valid Street',
 city: 'Valid City',
 state: 'MN',
 zip: '00000',
 contactName: 'Art Curator',
 contactEmail: 'curator@example.com',
 contactPhone: '555-123-2345',
 gresp: 'abc1234',
 approved: true,
};

const mockApplicationContext = createMockApplicationContext({
 getUseCases: () => {
  return {
   getLocationCoordinates: () => {
    return {
     status: 'success',
     coords: {
      lat: '0.0',
      lng: '0.0',
     },
     cityName: 'the city',
    }
   },
   saveNewArtLocation: () => {
    return {
     status: 'success'
    }
   },
  }
 },
});

describe('createNewLocation controller', () => {
  it('validates ArtLocation, determines coordinates, and saves location', async () => {
   let data = mockLocationData;
   
   const result = await createNewLocation({
    locationData: data,
    applicationContext: mockApplicationContext,
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
    }

    const emptyApplicationContext = createMockApplicationContext();
    await expect(createNewLocation({
      locationData: data,
      applicationContext: emptyApplicationContext,
     })
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
   
   await expect(createNewLocation({
    locationData: mockLocationData,
    applicationContext: failingApplicationContext,
   })).rejects.toThrowError(/error getting location/i);
  });
});