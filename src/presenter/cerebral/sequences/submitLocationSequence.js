import { submitLocationAction } from '../actions/submitLocationAction';
import { submitLocationResultAction } from '../actions/submitLocationResultAction';
import { validateLocationAction } from '../actions/validateLocationAction';

export const submitLocationSequence = [
  validateLocationAction,
  submitLocationAction,
  submitLocationResultAction,
];
