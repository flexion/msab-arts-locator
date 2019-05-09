import { props, state } from 'cerebral';
import { set } from 'cerebral/factories';

export const updateNewTodoDescription = [
  set(state.todoPage.todoForm.description, props.description),
];
