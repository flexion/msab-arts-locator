import { searchByGeoAction } from '../actions/searchByGeoAction';
import { setLocationsListAction } from '../actions/setLocationsListAction';
import { setRadiusAction } from '../actions/setRadiusAction';

export const setRadiusSequence = [
  setRadiusAction,
  searchByGeoAction,
  setLocationsListAction,
];
