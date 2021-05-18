//import { queryStringDecoder } from './queryStringDecoder';
import route from 'riot-route';
route.base('/');
const pageTitleSuffix = ' | MN Arts Board';

const router = {
  initialize: app => {
    window.document.title = 'Art Around MN';

    route('/', () => {
      app.getSequence('routeChangeSequence')({ page: 'Home' });
    });

    route('/submit-location', () => {
      window.document.title = `Submit Location ${pageTitleSuffix}`;
      app.getSequence('routeChangeSequence')({ page: 'LocationInput' });
    });

    route('/tos', () => {
      window.document.title = `Terms of Service ${pageTitleSuffix}`;
      app.getSequence('routeChangeSequence')({ page: 'TOS' });
    });

    route('/curate-location/*', entityId => {
      window.document.title = `Curate Location ${pageTitleSuffix}`;
      app.getSequence('getLocationSequence')({
        actionType: 'admin',
        entityId,
        page: 'LocationInput',
      });
    });

    route('/update-location/*', entityId => {
      window.document.title = `Update Location ${pageTitleSuffix}`;
      app.getSequence('getLocationSequence')({
        actionType: 'update',
        entityId,
        page: 'LocationInput',
      });
    });

    route.start(true);
  },
};

export { route, router };
