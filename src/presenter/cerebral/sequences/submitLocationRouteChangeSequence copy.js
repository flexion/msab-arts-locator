import { clearAlertsAction } from '../actions/clearAlertsAction';
import { routeChangeSequence } from './routeChangeSequence';

export const submitLocationRouteChangeSequence = [
  routeChangeSequence,
  clearAlertsAction,
];
