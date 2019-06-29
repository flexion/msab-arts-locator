import { state } from 'cerebral';

export const getLocationAction = async ({
  applicationContext,
  get,
  store,
  props,
}) => {
  store.set(state.gettingLocation, true);
  // const result = await applicationContext.getUseCases().getArtLocationById({
  //   requestData: { entityId: props.entityId, actionType: props.actionType },
  //   applicationContext,
  // });

  const result = {
    message: 'success',
    results: {
      website: 'www.culvers.com',
      contactEmail: 'cbarrett@flexion.us',
      zip: '53590',
      entityId: '5ee69aeb-d538-4cbc-a053-9e000b085918',
      createdAt: 1561080977900,
      name: 'Culvers',
      state: 'WI',
      city: 'Sun Prairie',
      approved: false,
      imageURL:
        'https://msab-arts-locator-pre-us-east-images.s3.us-east-2.amazonaws.com/5ee69aeb-d538-4cbc-a053-9e000b085918.png',
      contactName: 'Geoffrey Yang',
      category:
        '{"folk":true,"visual":false,"literary":true,"music":false,"craft":false,"photo":false,"opera":false,"dance":false}',
      contactPhone: '+1 (275) 264-7344',
      description:
        'Temporibus dolores libero pariatur Voluptas qui nemo quod odio eu beatae recusandae. Delicious! ',
      street: '100 main st',
      coordinates: [-89.21376889999999, 43.1834882],
    },
  };
  return { result };
};
