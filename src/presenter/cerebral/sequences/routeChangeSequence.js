import { setPageAction } from '../actions/setPageAction';
import { resetFormAction } from '../actions/resetFormAction';

export const routeChangeSequence = [setPageAction, resetFormAction];
