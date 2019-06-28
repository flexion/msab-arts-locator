import { submitLocationAction } from '../actions/submitLocationAction';
import { submitLocationResultAction } from '../actions/submitLocationResultAction';
import { updateLocationAction } from '../actions/updateLocationAction';
import { validateLocationAction } from '../actions/validateLocationAction';

export const submitLocationSequence = [
  validateLocationAction,
  { update: [updateLocationAction], submit: [submitLocationAction] },
  submitLocationResultAction,
];
