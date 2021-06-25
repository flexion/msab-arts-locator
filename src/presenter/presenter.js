import { cancelLocationInputSequence } from './cerebral/sequences/cancelLocationInputSequence';
import { getGeoLocationSequence } from './cerebral/sequences/getGeoLocationSequence';
import { getLocationSequence } from './cerebral/sequences/getLocationSequence';
import { locationFormButtonsHelper } from './cerebral/computeds/locationFormButtonsHelper';
import { locationListHelper } from './cerebral/computeds/locationListHelper';
import { routeChangeSequence } from './cerebral/sequences/routeChangeSequence';
import { searchByCitySequence } from './cerebral/sequences/searchByCitySequence';
import { setActiveFilterSequence } from './cerebral/sequences/setActiveFilterSequence';
import { setImageSequence } from './cerebral/sequences/setImageSequence';
import { setRadiusSequence } from './cerebral/sequences/setRadiusSequence';
import { submitLocationRouteChangeSequence } from './cerebral/sequences/submitLocationRouteChangeSequence copy';
import { submitLocationSequence } from './cerebral/sequences/submitLocationSequence';
import { updateCitySearchSequence } from './cerebral/sequences/updateCitySearchSequence';
import { updateFormValueSequence } from './cerebral/sequences/updateFormValueSequence';
import applicationContext from '../environments/client/ApplicationContext';
import humbleWindow from './cerebral/frameworks/humbleBrowser';

// Cerebral module

export const presenter = {
  catch: [
    // [ServerInvalidResponseError, setCurrentPageErrorSequence], // 501, 503, etc
    // [UnauthorizedRequestError, unauthorizedErrorSequence], // 403
    // [NotFoundError, notFoundErrorSequence], //404
    // [UnidentifiedUserError, unidentifiedUserErrorSequence], //401
    // [ActionError, setCurrentPageErrorSequence], // generic error handler
  ],
  providers: { applicationContext, humbleWindow },
  sequences: {
    cancelLocationInputSequence,
    getGeoLocationSequence,
    getLocationSequence,
    routeChangeSequence,
    searchByCitySequence,
    setActiveFilterSequence,
    setImageSequence,
    setRadiusSequence,
    submitLocationRouteChangeSequence,
    submitLocationSequence,
    updateCitySearchSequence,
    updateFormValueSequence,
  },
  state: {
    activeFilter: null,
    askingLocation: false,
    categories: {
      craft: 'Craft/Textiles',
      dance: 'Dance',
      folk: 'Folk/Traditional',
      literary: 'Literary Arts',
      music: 'Music',
      opera: 'Theater/Opera',
      photo: 'Photography/Film/Media',
      visual: 'Visual Arts',
    },
    citySearch: false,
    cityValue: '',
    codeVersion: applicationContext.getCodeVersion(),
    currentPage: 'Home',
    findingLocations: false,
    form: {
      ToS: false,
      approved: false,
      base64Image: null,
      category: {
        craft: false,
        dance: false,
        folk: false,
        literary: false,
        music: false,
        opera: false,
        photo: false,
        visual: false,
      },
      city: null,
      contactEmail: null,
      contactName: null,
      contactPhone: null,
      description: null,
      formDirty: false,
      gresp: '',
      image: null,
      name: null,
      state: 'MN',
      street: null,
      update: {
        actionType: '',
        entityId: '',
      },
      website: null,
      zip: null,
    },
    gettingLocation: false,
    haveGeo: false,
    locationFormButtonsHelper,
    locationListHelper,
    locationsList: [],
    locationsListBk: [],
    //in meters
    position: { lat: 0, long: 0 },

    radius: 16093,

    selectImageFailure: false,

    selectImageMsg: '',

    submitLocationErrors: [],

    submitLocationFailure: false,
    submitLocationMsg: '',
    submitLocationMsgDetail: '',
    submitLocationSuccess: false,
    update: {
      actionType: '',
      entityId: '',
    },
  },
};
