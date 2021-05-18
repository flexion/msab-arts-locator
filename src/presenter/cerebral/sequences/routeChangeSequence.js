import { resetFormAction } from '../actions/resetFormAction';
import { setPageAction } from '../actions/setPageAction';

export const routeChangeSequence = [setPageAction, resetFormAction];
