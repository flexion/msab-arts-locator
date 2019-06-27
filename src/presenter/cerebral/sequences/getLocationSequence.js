import { setPageAction } from '../actions/setPageAction';
import { setEntityAction } from '../actions/setEntityAction';
import { getLocationAction } from '../actions/getLocationAction';
import { setLocationAction } from '../actions/setLocationAction';

export const getLocationSequence = [
  setPageAction,
  setEntityAction,
  getLocationAction,
  setLocationAction,
];
