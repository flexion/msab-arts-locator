import { state } from 'cerebral';
let conversions = require('conversions');

export const setRadiusAction = ({ props, store }) => {
  const radius = conversions(props.value, 'miles', 'meters');
  store.set(state.radius, radius);
};
