const { createNewLocation } = require('./createNewLocation');
const { createMockApplicationContext } = require('../utilities/TestUtils');
const {
 getLocationCoordinates,
} = require('../interactors/getLocationCoordinatesInteractor');
const environment = {
 apiKey: process.env.API_KEY,
};
const { getCoordsFromAddress } = require('../persistence/MapsAPIGateway');
const apiURLs = {
 geocodeAPIUrl: `https://maps.googleapis.com/maps/api/geocode/json`,
};

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
 street: '730 31st St NE',
 city: 'Rochester',
 state: 'MN',
 zip: '55906',
 contactName: 'Brice',
 contactEmail: 'bruth@flexion.us',
 contactPhone: '555-123-2345',
 gresp: '03AGdBq2421EsxsLwlQqp6hVIkRb7o-01a7eJmbD1mqkreiwJ21_VvKOS2EXybQmRYLX4hfOtHh-ovZjDEXOfzUL04D_59f-FGVXnCyxp3xzwzWPkZgbHhvkvVf-U8T2GbYohHUDazg4Lb7-q9FLH8iAI5UUTKXYLSxccn7Wq084qkVOERE1w5SREDK45mArq30WUnKW7wbVMnS-fpUQG4eo8fzKPm0h36HjAKc4NbriMltR58Cw42Zn5iWg-DfTxuNOnQTOwNz0lo0zTNEto6XlGwJu8xjjn-yiX1MQJdv-CKLrCdXdEBiY4mq-RHOnL4VEeIaAA4lMOL6KEx8y45F4bKFETYMHeSSCHOhyB9s666VQusJPlL3Muj8f2JxfYdC_KnGSadv0LTpBdV1I1wfM4BeilIqs8L1HB_Jy9LXt4VYJY7YbDIEoJZbprox7awY78uLK-89FOn',
 approved: true,
};

const mockApplicationContext = createMockApplicationContext({
 apiURLs: () => {
  return apiURLs;
 },
 getUseCases: () => {
  return {
   getLocationCoordinates
  }
 },
 environment,
 getPersistenceGateway: () => {
  return {
   getCoordsFromAddress
  }
 }
});

describe('createNewLocation controller', () => {
  it('return a valid geolocation', async () => {
   let data = mockLocationData;
   
   const result = await createNewLocation({
    locationData: data,
    applicationContext: mockApplicationContext,
   });
   expect(result.status).toEqual('success');
   expect(result.coords).toHaveProperty('lat');
   expect(result.coords).toHaveProperty('lng');
   expect(result.cityName).toBeTruthy();
  });

  it('does not return success for invalid ArtLocation', async () => {
    let data = {
     name: 'foo',
    }

    const emptyApplicationContext = createMockApplicationContext();
    await expect(createNewLocation({
      locationData: data,
      applicationContext: emptyApplicationContext,
     })
    ).rejects.toThrow();
  });

  it('return a valid geolocation', async () => {
   let data = {
    street: 'An invalid address',
    city: 'Non-existant city',
    state: 'XX',
    zip: '00000',
    mockLocationData
   };
   
   await expect(createNewLocation({
    locationData: data,
    applicationContext: mockApplicationContext,
   })).rejects.toThrow();
  });
});