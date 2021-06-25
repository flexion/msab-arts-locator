import { defaultForm } from '../../defaultForm';
import { runAction } from 'cerebral/test';

import { resetFormAction } from './resetFormAction';

describe('resetFormAction', () => {
  it('should reset form data', async () => {
    const initialState = {
      state: {
        form: {
          ...defaultForm(),
          city: 'Testing',
        },
      },
    };
    const { state } = await runAction(resetFormAction, initialState);
    expect(state.form).toMatchObject(defaultForm());
  });
});
