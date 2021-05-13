const localApplicationContext = require('./ApplicationContext');
const { createNewLocation } = require('../../controllers/createNewLocation');

const main = async ({ data }) => {
  await createNewLocation({
    locationData: {},
    applicationContext: localApplicationContext,
  });
};

let data = {
 update: { entityId: '', actionType: '' },
 formDirty: true,
 gresp: '03AGdBq2421EsxsLwlQqp6hVIkRb7o-01a7eJmbD1mqkreiwJ21_VvKOS2EXybQmRYLX4hfOtHh-ovZjDEXOfzUL04D_59f-FGVXnCyxp3xzwzWPkZgbHhvkvVf-U8T2GbYohHUDazg4Lb7-q9FLH8iAI5UUTKXYLSxccn7Wq084qkVOERE1w5SREDK45mArq30WUnKW7wbVMnS-fpUQG4eo8fzKPm0h36HjAKc4NbriMltR58Cw42Zn5iWg-DfTxuNOnQTOwNz0lo0zTNEto6XlGwJu8xjjn-yiX1MQJdv-CKLrCdXdEBiY4mq-RHOnL4VEeIaAA4lMOL6KEx8y45F4bKFETYMHeSSCHOhyB9s666VQusJPlL3Muj8f2JxfYdC_KnGSadv0LTpBdV1I1wfM4BeilIqs8L1HB_Jy9LXt4VYJY7YbDIEoJZbprox7awY78uLK-89FOn',
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
 website: 'https://some-cool-site.com',
 street: '730 31st St NE',
 city: 'Rochester',
 state: 'MN',
 zip: '55906',
 contactName: 'Brice',
 contactEmail: 'bruth@flexion.us',
 contactPhone: '555-123-2345',
 description: 'a cool description',
 image: null,
 approved: true,
 base64Image: null,
 ToS: true,
 createdAt: 1620852706490,
 entityId: '49049922-980a-4792-a6a2-f699f3599e67',
 adminId: 'aa0df026-f600-420f-bb3b-f7cb93157291',
 updateId: 'f2317543-4c8c-4df9-b3a4-5d6ea5977ef4'
};
main({ data });
