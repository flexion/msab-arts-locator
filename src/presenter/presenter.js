import { searchByCitySequence } from './cerebral/sequences/searchByCitySequence';
import { updateCitySearchSequence } from './cerebral/sequences/updateCitySearchSequence';
import { getGeoLocationSequence } from './cerebral/sequences/getGeoLocationSequence';
import { updateFormValueSequence } from './cerebral/sequences/updateFormValueSequence';
import { routeChangeSequence } from './cerebral/sequences/routeChangeSequence';
import { submitLocationSequence } from './cerebral/sequences/submitLocationSequence';
import applicationContext from '../environments/client/ApplicationContext';
import { locationListHelper } from './cerebral/computeds/locationListHelper';
// Cerebral module

export const presenter = {
  catch: [
    // [ServerInvalidResponseError, setCurrentPageErrorSequence], // 501, 503, etc
    // [UnauthorizedRequestError, unauthorizedErrorSequence], // 403
    // [NotFoundError, notFoundErrorSequence], //404
    // [UnidentifiedUserError, unidentifiedUserErrorSequence], //401
    // [ActionError, setCurrentPageErrorSequence], // generic error handler
  ],
  providers: { applicationContext },
  sequences: {
    searchByCitySequence,
    updateCitySearchSequence,
    getGeoLocationSequence,
    updateFormValueSequence,
    routeChangeSequence,
    submitLocationSequence,
  },
  state: {
    submitLocationSuccess: false,
    submitLocationFailure: false,
    submitLocationMsg: '',
    cityValue: '',
    locationsList: [],
    locationListHelper,
    haveGeo: false,
    radius: 40233, //in meters
    position: { lat: 0, long: 0 },
    currentPage: 'Home',
    form: {
      name: '',
      category: {
        folk: false,
        visual: false,
        literary: false,
        music: false,
        craft: false,
        photo: false,
        opera: false,
        dance: false,
      },
      website: '',
      street: '',
      city: '',
      state: 'MN',
      zip: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      description: '',
    },
  },
};
