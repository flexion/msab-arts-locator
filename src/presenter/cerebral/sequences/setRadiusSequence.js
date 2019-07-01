import { setRadiusAction } from '../actions/setRadiusAction';
import { searchByGeoAction } from '../actions/searchByGeoAction';
import { setLocationsListAction } from '../actions/setLocationsListAction';

export const setRadiusSequence = [
  setRadiusAction,
  searchByGeoAction,
  setLocationsListAction,
];
