import { state } from 'cerebral';

export const newTodoAction = async ({ applicationContext, store, get }) => {
  const responseCallback = response => {
    if (response.status == 'success') {
      console.log(response.data);
      store.push('todoPage.todos', response.data);
    }
  };

  applicationContext.getUseCases().newTodo({
    requestData: { description: get(state`todoPage.todoForm.description`) },
    responseCallback,
    applicationContext,
  });
};
