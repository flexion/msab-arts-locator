import { goToHomeAction } from './goToHomeAction';
import { presenter } from '../../../presenter/presenter';
import { runAction } from 'cerebral/test';

describe('goToHomeAction', () => {
  it('should route to /', () => {
    const mockRouter = {
      route: path => {
        expect(path).toEqual('/');
      },
    };

    presenter.providers.router = mockRouter;
    expect.assertions(1);
    return runAction(goToHomeAction, {
      modules: {
        presenter,
      },
    });
  });
});
