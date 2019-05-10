import { props, state } from 'cerebral';
import { set } from 'cerebral/factories';

export const updateCitySearchSequence = [set(state.cityValue, props.cityValue)];
