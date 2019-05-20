import { searchByCitySequence } from './cerebral/sequences/searchByCitySequence';
import { updateCitySearchSequence } from './cerebral/sequences/updateCitySearchSequence';
import { geoLocationFailSequence } from './cerebral/sequences/geoLocationFailSequence';
import { geoLocationSuccessSequence } from './cerebral/sequences/geoLocationSuccessSequence';
import applicationContext from '../environments/dev/ApplicationContext';
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
    geoLocationSuccessSequence,
    geoLocationFailSequence,
  },
  state: {
    cityValue: '',
    locationsList: [],
    locationListHelper,
    haveGeo: false,
    position: {},
  },
};
