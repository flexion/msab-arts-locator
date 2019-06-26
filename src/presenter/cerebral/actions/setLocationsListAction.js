import { state } from 'cerebral';

export const setLocationsListAction = ({ store, props }) => {
  if (location.hostname === 'localhost') {
    props.result = {
      message: 'success',
      results: [
        {
          website: 'www.arts.state.mn.us/',
          contactEmail: 'cbarrett@flexion.us',
          zip: '55101',
          entityId: '109dc14a-be46-470c-a6cd-9abfe741629a',
          createdAt: 1561556339462,
          name: 'Arts Midwest',
          state: 'MN',
          city: 'Minneapolis',
          approved: false,
          imageURL:
            'https://msab-arts-locator-pre-us-east-images.s3.us-east-2.amazonaws.com/109dc14a-be46-470c-a6cd-9abfe741629a.jpg',
          contactName: 'Mr. Meow',
          category:
            '{"folk":"on","visual":"on","literary":"on","music":false,"craft":false,"photo":false,"opera":false,"dance":false}',
          adminId: '283363db-29e6-4e36-aee5-9a4961691aba',
          contactPhone: '1231231234',
          updateId: '88fea348-5aaa-40ec-9361-1a74728760d4',
          street: '2908 Hennepin Ave # 200',
          coordinates: [-93.2985542, 44.9489132],
        },
        {
          website: 'www.mn.gov',
          contactEmail: 'meow@cats.com',
          zip: '55408',
          entityId: '6ea1eef4-c8d5-407e-996c-23e4f11329fc',
          createdAt: 1561564866685,
          name: 'Arts Midwest',
          state: 'MN',
          city: 'Minneapolis',
          approved: false,
          contactName: 'Mr. Meow',
          category:
            '{"folk":"on","visual":"on","literary":false,"music":false,"craft":false,"photo":false,"opera":false,"dance":false}',
          adminId: 'bff70c2f-d247-411a-80ed-4f247dd2b958',
          contactPhone: '1231231233',
          description: 'meow meow meow meow meow',
          updateId: '1d4ced59-0dac-4c20-a20c-b7bd9db2dfa0',
          street: '2908 Hennepin Ave # 200',
          coordinates: [-93.2985542, 44.9489132],
        },
        {
          website: 'www.meow.com',
          contactEmail: 'meow@cats.com',
          zip: '55101',
          entityId: 'ab36ad48-a1ce-4a7d-89a7-9ef1592d725f',
          createdAt: 1561558082722,
          name: 'Arts Midwest',
          state: 'MN',
          city: 'Minneapolis',
          approved: false,
          imageURL:
            'https://msab-arts-locator-pre-us-east-images.s3.us-east-2.amazonaws.com/ab36ad48-a1ce-4a7d-89a7-9ef1592d725f.jpg',
          contactName: 'Mr. Meow',
          category:
            '{"folk":false,"visual":false,"literary":false,"music":"on","craft":false,"photo":false,"opera":false,"dance":false}',
          adminId: '0758abb1-4045-4c7c-910e-77453832d39a',
          contactPhone: '1231231231',
          updateId: 'c4163c5b-1a16-4c24-8470-c36eaac89bd9',
          street: '2908 Hennepin Ave # 200',
          coordinates: [-93.2985542, 44.9489132],
        },
        {
          contactEmail: 'nkurz@flexion.us',
          zip: '12345',
          entityId: 'f16cb9f6-13f1-41ee-9add-651530cfd7c4',
          createdAt: 1561568741155,
          name: 'Testing',
          state: 'MN',
          city: 'Minneapolis',
          approved: false,
          imageURL:
            'https://msab-arts-locator-pre-us-east-images.s3.us-east-2.amazonaws.com/f16cb9f6-13f1-41ee-9add-651530cfd7c4.jpg',
          contactName: 'Natalie',
          category:
            '{"folk":"on","visual":"on","literary":false,"music":false,"craft":false,"photo":false,"opera":false,"dance":false}',
          adminId: 'ada0ae49-2329-4b24-a707-b21347a03f46',
          contactPhone: '1234567890',
          description:
            'This is a great place you should really come here to see all the fantastic art and support local artists. We have paintings, pottery, rugs, sculpture, textiles, crafts, masks, musical instruments on display, everything! You have to come see this.',
          updateId: '909344bc-b64a-4319-8ecb-94775e2a094e',
          street: '123 Main',
          coordinates: [-93.2603537, 44.9885686],
        },
      ],
    };
  }
  if (typeof props.result === 'string') {
    props.result = JSON.parse(props.result);
  }
  if (props.result.message === 'success')
    store.set(state.locationsList, props.result.results);
};
