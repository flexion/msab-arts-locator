import { submitLocationAction } from '../actions/submitLocationAction';
import { submitLocationResultAction } from '../actions/submitLocationResultAction';

export const submitLocationSequence = [
  submitLocationAction,
  submitLocationResultAction,
];
