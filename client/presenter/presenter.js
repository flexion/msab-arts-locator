import { SubmitNewTodoSequence } from './sequences/SubmitNewTodoSequence';
import { updateNewTodoDescription } from './sequences/updateNewTodoDescription';

// Cerebral module
export const presenter = {
  catch: [
    [ServerInvalidResponseError, setCurrentPageErrorSequence], // 501, 503, etc
    [UnauthorizedRequestError, unauthorizedErrorSequence], // 403
    [NotFoundError, notFoundErrorSequence], //404
    [UnidentifiedUserError, unidentifiedUserErrorSequence], //401
    [ActionError, setCurrentPageErrorSequence], // generic error handler
  ],
  providers: {},
  sequences: { updateNewTodoDescription, SubmitNewTodoSequence },
  state: {
    todoPage: {
      todos: [{ description: 'make lunch' }, { description: 'make dinner' }],
      todoForm: { description: '' },
    },
  },
};
