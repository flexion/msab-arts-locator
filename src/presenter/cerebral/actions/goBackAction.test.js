import { goBackAction } from './goBackAction';
import { presenter } from '../../../presenter/presenter';
import { runAction } from 'cerebral/test';

describe('goBackAction', () => {
  it('should call `back` on history', () => {
    const mockWindow = {
      history: () => {
        return {
          back: () => {
            expect(true).toBeTruthy();
          },
        };
      },
    };

    presenter.providers.humbleWindow = mockWindow;
    expect.assertions(1);
    return runAction(goBackAction, {
      modules: {
        presenter,
      },
    });
  });
});
