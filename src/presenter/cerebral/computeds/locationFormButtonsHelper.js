import { state } from 'cerebral';

export const locationFormButtonsHelper = (get) => {
  const update = get(state.form.update);
  if (!update) return { showSubmit: true, showAdmin: false, showUpdate: false };
  return {
    showSubmit: !update.actionType,
    showAdmin: update.actionType === 'admin',
    showUpdate: update.actionType === 'update',
  };
};
