import { routeChangeSequence } from './routeChangeSequence';
import { submitLocationAction } from '../actions/submitLocationAction';
import { submitLocationResultAction } from '../actions/submitLocationResultAction';
import { updateLocationAction } from '../actions/updateLocationAction';
import { validateLocationAction } from '../actions/validateLocationAction';

export const submitLocationSequence = [
  validateLocationAction,
  { submit: [submitLocationAction], update: [updateLocationAction] },
  submitLocationResultAction,
  { success: [routeChangeSequence] },
];
