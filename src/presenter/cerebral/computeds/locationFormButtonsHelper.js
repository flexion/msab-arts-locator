import { state } from 'cerebral';

export const locationFormButtonsHelper = get => {
  const update = get(state.form.update);
  if (!update) return { showAdmin: false, showSubmit: true, showUpdate: false };
  return {
    showAdmin: update.actionType === 'admin',
    showSubmit: !update.actionType,
    showUpdate: update.actionType === 'update',
  };
};
