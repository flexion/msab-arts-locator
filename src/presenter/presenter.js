import { searchByCitySequence } from './cerebral/sequences/searchByCitySequence';
import { updateCitySearchSequence } from './cerebral/sequences/updateCitySearchSequence';
import { getGeoLocationSequence } from './cerebral/sequences/getGeoLocationSequence';
import { updateFormValueSequence } from './cerebral/sequences/updateFormValueSequence';
import { routeChangeSequence } from './cerebral/sequences/routeChangeSequence';
import { submitLocationSequence } from './cerebral/sequences/submitLocationSequence';
import { setImageSequence } from './cerebral/sequences/setImageSequence';
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
    setImageSequence,
  },

  state: {
    submitLocationSuccess: false,
    submitLocationFailure: false,
    selectImageFailure: false,
    selectImageMsg: '',
    submitLocationMsg: '',
    cityValue: '',
    locationsList: [],
    locationListHelper,
    haveGeo: false,
    radius: 40233, //in meters
    position: { lat: 0, long: 0 },
    currentPage: 'Home',
    categories: {
      folk: 'Folk/Traditional',
      visual: 'Visual Arts',
      literary: 'Literary Arts',
      music: 'Music',
      craft: 'Craft/Textiles',
      photo: 'Photography/Film/Media',
      opera: 'Theater/Opera',
      dance: 'Dance',
    },
    form: {
      gresp: '',
      name: null,
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
      website: null,
      street: null,
      city: null,
      state: 'MN',
      zip: null,
      contactName: null,
      contactEmail: null,
      contactPhone: null,
      description: null,
      image: null,
      base64Image: null,
    },
  },
};
