import { getGeoAction } from '../actions/getGeoAction';
import { setGeoAction } from '../actions/setGeoAction';
import { setCityAction } from '../actions/setCityAction';
import { getReverseCityAction } from '../actions/getReverseCityAction';
import { searchByGeoAction } from '../actions/searchByGeoAction';

export const getGeoLocationSequence = [
  getGeoAction,
  setGeoAction,
  getReverseCityAction,
  setCityAction,
  searchByGeoAction,
];
