import { getLocationAction } from '../actions/getLocationAction';
import { setEntityAction } from '../actions/setEntityAction';
import { setLocationAction } from '../actions/setLocationAction';
import { setPageAction } from '../actions/setPageAction';

export const getLocationSequence = [
  setPageAction,
  setEntityAction,
  getLocationAction,
  setLocationAction,
];
