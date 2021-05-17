const localApplicationContext = require('./ApplicationContext');
const { createNewLocation } = require('../../controllers/createNewLocation');
const sampleData = require('../../../sample-data/sample-data');

const main = async (entities) => {
  return Promise.all(entities.map(transformSampleData).map(entity => createNewLocation({
   locationData: entity,
   applicationContext: localApplicationContext(),
 })));
}

const transformSampleData = (data) => {
 return {
  name: data.name,
  street: data.address1,
  city: data.city,
  state: data.st,
  zip: data.zip,
  contactName: data.primary_contact,
  contactEmail: data.email,
  contactPhone: data.phone,
  gresp: 'abc123',
  approved: true,
  category: {
   visual: true,
  }
 }
}

main(sampleData);
