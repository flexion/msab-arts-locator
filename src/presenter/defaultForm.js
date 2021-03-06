export const defaultForm = () => {
  return {
    ToS: false,
    approved: false,
    base64Image: null,
    category: {
      craft: false,
      dance: false,
      folk: false,
      literary: false,
      music: false,
      opera: false,
      photo: false,
      visual: false,
    },
    city: null,
    contactEmail: null,
    contactName: null,
    contactPhone: null,
    description: null,
    formDirty: false,
    gresp: '',
    image: null,
    name: null,
    state: 'MN',
    street: null,
    update: {
      actionType: '',
      entityId: '',
    },
    website: null,
    zip: null,
  };
};
