import { state } from 'cerebral';

export const locationFormButtonsHelper = (get) => {
  const update = get(state.form.update);
  return {
    showSubmit: !update.actionType,
    showAdmin: update.actionType === 'admin',
    showUpdate: update.actionType === 'update',
  };
};
