//import { queryStringDecoder } from './queryStringDecoder';
import route from 'riot-route';
route.base('/');
const pageTitleSuffix = ' | MN Arts Board';

const router = {
  initialize: (app) => {
    document.title = 'Art Around MN';

    route('/', () => {
      app.getSequence('routeChangeSequence')({ page: 'Home' });
    });

    route('/submit-location', () => {
      document.title = `Submit Location ${pageTitleSuffix}`;
      app.getSequence('routeChangeSequence')({ page: 'LocationInput' });
    });

    route('/tos', () => {
      document.title = `Terms of Service ${pageTitleSuffix}`;
      app.getSequence('routeChangeSequence')({ page: 'TOS' });
    });

    route('/curate-location/*', (entityId) => {
      document.title = `Curate Location ${pageTitleSuffix}`;
      app.getSequence('getLocationSequence')({
        page: 'LocationInput',
        entityId,
        actionType: 'admin',
      });
    });

    route('/update-location/*', (entityId) => {
      document.title = `Update Location ${pageTitleSuffix}`;
      app.getSequence('getLocationSequence')({
        page: 'LocationInput',
        entityId,
        actionType: 'update',
      });
    });

    route.start(true);
  },
};

export { route, router };
