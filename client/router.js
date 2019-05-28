//import { queryStringDecoder } from './queryStringDecoder';
import route from 'riot-route';
console.log('in router');
route.base('/');
const pageTitleSuffix = ' | MN Arts Board';

const router = {
  initialize: (app) => {
    document.title = 'Art Around MN';
    const checkLoggedIn = (cb) => {
      return function() {
        // if (!app.getState('user')) {
        //   const path = app.getState('cognitoLoginUrl');
        //   window.location.replace(path);
        // } else {
        cb.apply(null, arguments);
        //}
      };
    };
    route('/', () => {
      app.getSequence('routeChangeSequence')({ page: 'Home' });
    });

    route('/submit-location', () => {
      document.title = `Submit Location ${pageTitleSuffix}`;
      app.getSequence('routeChangeSequence')({ page: 'LocationInput' });
    });

    route(
      '/curate-locations',
      checkLoggedIn(() => {
        document.title = `Curate Locations ${pageTitleSuffix}`;
        app.getSequence('routeChangeSequence')({ page: 'Curate' });
      }),
    );

    route.start(true);
  },
};

export { route, router };
