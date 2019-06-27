import { setPageAction } from '../actions/setPageAction';
import { setEntityAction } from '../actions/setPageAction';
import { getLocationAction } from '../actions/getLocationAction';
import { setLocationAction } from '../actions/setLocationAction';

export const routeChangeSequence = [
  setPageAction,
  setEntityAction,
  getLocationAction,
  setLocationAction,
];
