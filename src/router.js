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

    route('/curate-locations/*', (entityId) => {
      document.title = `Curate Locations ${pageTitleSuffix}`;
      app.getSequence('routeChangeSequence')({
        page: 'LocationInput',
        entityId,
      });
    });

    route('/update-location/*', (entityId) => {
      document.title = `Update Location ${pageTitleSuffix}`;
      app.getSequence('routeChangeSequence')({
        page: 'LocationInput',
        entityId,
      });
    });

    route.start(true);
  },
};

export { route, router };
