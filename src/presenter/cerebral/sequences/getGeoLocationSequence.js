import { getGeoAction } from '../actions/getGeoAction';
// import { getReverseCityAction } from '../actions/getReverseCityAction';
import { searchByGeoAction } from '../actions/searchByGeoAction';
// import { setCityAction } from '../actions/setCityAction';
import { setGeoAction } from '../actions/setGeoAction';
import { setLocationsListAction } from '../actions/setLocationsListAction';

export const getGeoLocationSequence = [
  getGeoAction,
  setGeoAction,
  //getReverseCityAction,
  //setCityAction,
  searchByGeoAction,
  setLocationsListAction,
];
