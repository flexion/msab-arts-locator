import { state } from 'cerebral';

export const setLocationsListAction = ({ store, props }) => {
  if (location.hostname === 'localhost') {
    props.result = {
      message: 'success',
      results: [
        {
          contactEmail: 'cbarrett@flexion.us',
          website: 'https://www.jaxidosydynopo.org.au',
          zip: '53703',
          entityId: '4664690c-4be4-4926-8565-5f8fdcb184f1',
          createdAt: 1562105803421,
          name: 'Maisie Mcneil',
          state: 'MN',
          city: 'madison',
          approved: true,
          contactName: 'Raphael Bentley',
          displayCity: 'Madison',
          category:
            '{"craft":true,"dance":true,"folk":false,"literary":true,"music":true,"photo":true,"opera":true,"visual":true}',
          contactPhone: '+1 (127) 423-6077',
          description:
            'Temporibus praesentium sequi dolore cum nihil laboriosam nisi',
          street: '223 W Main St, ',
          distance: 9.147202,
          coordinates: [-89.385217, 43.071836],
        },
        {
          website: 'https://www.rygaxawoqizeb.me',
          contactEmail: 'cbarrett@flexion.us',
          zip: '53590',
          entityId: 'c9c5abb7-e786-44ad-ae1f-9d556f964197',
          createdAt: 1562105928386,
          name: 'Michael Bolton',
          state: 'MN',
          city: 'sun prairie',
          approved: true,
          contactName: 'Vincent Simpson',
          displayCity: 'Sun Prairie',
          category:
            '{"craft":false,"dance":false,"folk":true,"literary":true,"music":false,"photo":true,"opera":false,"visual":true}',
          contactPhone: '+1 (279) 841-4104',
          description:
            'Iste quis quasi beatae elit facilis quia dolorem consequat Aliquam pariatur Magni ducimus debitis ut voluptatem consectetur',
          street: '1326 W Main St',
          distance: 2.223887,
          coordinates: [-89.2361739, 43.1794345],
        },
        {
          contactEmail: 'cbarrett@flexion.us',
          website: 'https://www.lunaxydi.mobi',
          zip: '53590',
          entityId: 'a8bd61ab-1e77-4307-b0c2-6dbe31371c2c',
          createdAt: 1562099786615,
          name: 'CHris',
          state: 'MN',
          city: 'sun prairie',
          approved: true,
          imageURL:
            'https://msab-arts-locator-pre-us-east-images.s3.us-east-2.amazonaws.com/a8bd61ab-1e77-4307-b0c2-6dbe31371c2c.gif',
          contactName: 'Minerva Hunt',
          displayCity: 'Sun Prairie',
          category:
            '{"craft":true,"dance":true,"folk":false,"literary":false,"music":true,"photo":true,"opera":false,"visual":true}',
          contactPhone: '+1 (968) 144-4932',
          description:
            'Rem aut ipsam minus cupidatat eum est sed id et reprehenderit dolor doloremque fugiat architecto obcaecati',
          street: '3107 Collingwood Dr',
          distance: 0.00435,
          coordinates: [-89.28032879999999, 43.1796686],
        },
      ],
    };
  }
  if (typeof props.result === 'string') {
    props.result = JSON.parse(props.result);
  }
  if (props.result.message === 'success') {
    store.set(state.findingLocations, false);
    store.set(state.locationsList, props.result.results);
    store.set(state.locationsListBk, props.result.results); //keep backup
  }
};
