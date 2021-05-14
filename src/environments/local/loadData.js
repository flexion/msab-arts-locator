const localApplicationContext = require('./ApplicationContext');
const { createNewLocation } = require('../../controllers/createNewLocation');

const main = async ({ data }) => {
  const result = await createNewLocation({
    locationData: data,
    applicationContext: localApplicationContext(),
  });
  console.log(result);
};

let data = {
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
main({ data });
