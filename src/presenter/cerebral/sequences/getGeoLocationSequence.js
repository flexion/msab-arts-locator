import { getGeoAction } from '../actions/getGeoAction';
import { setGeoAction } from '../actions/setGeoAction';
import { setCityAction } from '../actions/setCityAction';
import { getReverseCityAction } from '../actions/getReverseCityAction';
import { searchByGeoAction } from '../actions/searchByGeoAction';
import { setLocationsListAction } from '../actions/setLocationsListAction';

export const getGeoLocationSequence = [
  getGeoAction,
  setGeoAction,
  //getReverseCityAction,
  //setCityAction,
  searchByGeoAction,
  setLocationsListAction,
];
