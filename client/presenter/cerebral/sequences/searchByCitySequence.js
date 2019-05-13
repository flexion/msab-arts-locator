import { searchByCityAction } from '../actions/searchByCityAction';
import { setLocationsListAction } from '../actions/setLocationsListAction';

export const searchByCitySequence = [
  searchByCityAction,
  setLocationsListAction,
];
