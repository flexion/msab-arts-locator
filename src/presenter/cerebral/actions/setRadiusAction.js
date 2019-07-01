import { state } from 'cerebral';
var conversions = require('conversions');

export const setRadiusAction = ({ store, props }) => {
  const radius = conversions(props.value, 'miles', 'meters');
  store.set(state.radius, radius);
};
