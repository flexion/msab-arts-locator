import { goBackAction } from '../actions/goBackAction';
import { resetFormAction } from '../actions/resetFormAction';

export const cancelLocationInputSequence = [resetFormAction, goBackAction];
