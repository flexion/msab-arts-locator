import { goBackAction } from './goBackAction';
import { presenter } from '../../../presenter/presenter';
import { runAction } from 'cerebral/test';

describe('goBackAction', () => {
  it('should call `back` on history', () => {
    const backMock = jest.fn();
    const mockWindow = {
      history: () => {
        return {
          back: backMock,
        };
      },
    };

    presenter.providers.humbleWindow = mockWindow;
    runAction(goBackAction, {
      modules: {
        presenter,
      },
    });
    expect(backMock).toHaveBeenCalled();
  });
});
