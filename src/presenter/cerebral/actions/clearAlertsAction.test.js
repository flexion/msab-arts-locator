import { runAction } from 'cerebral/test';

import { clearAlertsAction } from './clearAlertsAction';

describe('clearAlertsAction', () => {
  it('should clear alerts data', async () => {
    const initialState = {
      state: {
        submitLocationErrors: ['City', 'ZIP'],
        submitLocationMsg: 'something',
        submitLocationMsgDetail: 'something detailed',
        submitLocationSuccess: true,
      },
    };
    const { state } = await runAction(clearAlertsAction, initialState);
    expect(state.submitLocationErrors.length).toBe(0);
    expect(state.submitLocationMsg).toBeFalsy();
    expect(state.submitLocationMsgDetail).toBeFalsy();
    expect(state.submitLocationSuccess).toBeFalsy();
  });
});
