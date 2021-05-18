const localApplicationContext = require('./ApplicationContext');
const sampleData = require('../../../sample-data/sample-data');
const { createNewLocation } = require('../../controllers/createNewLocation');

const main = async entities => {
  return Promise.all(
    entities.map(transformSampleData).map(entity =>
      createNewLocation({
        applicationContext: localApplicationContext(),
        locationData: entity,
      }),
    ),
  );
};

const transformSampleData = data => {
  return {
    approved: true,
    category: {
      visual: true,
    },
    city: data.city,
    contactEmail: data.email,
    contactName: data.primary_contact,
    contactPhone: data.phone,
    gresp: 'abc123',
    name: data.name,
    state: data.st,
    street: data.address1,
    zip: data.zip,
  };
};

main(sampleData);
