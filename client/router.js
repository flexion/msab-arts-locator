//import { queryStringDecoder } from './queryStringDecoder';
import route from 'riot-route';
console.log('in router');
route.base('/');
const pageTitleSuffix = ' | MN Arts Board';

const router = {
  initialize: (app) => {
    document.title = 'Art Around MN';
    // const checkLoggedIn = (cb) => {
    //   return function() {
    //     if (!app.getState('user')) {
    //       const path = app.getState('cognitoLoginUrl');
    //       window.location.replace(path);
    //     } else {
    //       cb.apply(null, arguments);
    //     }
    //   };
    //};
    route('/', () => {
      console.log('in main route');
    });
    route('/submit-location/*', () => {
      document.title = `Submit Location ${pageTitleSuffix}`;
    });
    route(
      '/curate-locations/*',
      checkLoggedIn((docketNumber, documentId) => {
        document.title = `Document details ${pageTitleSuffix}`;
        app.getSequence('gotoDocumentDetailSequence')({
          docketNumber,
          documentId,
        });
      }),
    );

    route.start(true);
  },
};

export { route, router };
