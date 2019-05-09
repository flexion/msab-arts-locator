import { CerebralTest } from 'cerebral/test';
import { createMockApplicationContext } from '../../../utilities/TestUtils';
import { presenter } from '../presenter';

describe('NewTodoSequence', () => {
  it('should invoke the new Todo use case interactor', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getUseCases: () => ({
        newTodo: request => {
          expect(request.requestData).toMatchObject({
            description: 'Make a sammich.',
          });
          expect(request.responseCallback).toBeDefined();
          expect(request.applicationContext).toBeDefined();
        },
      }),
    });

    presenter.providers.applicationContext = mockApplicationContext;
    const test = CerebralTest(presenter);
    test.setState('todoPage.todoForm.description', 'Make a sammich.');

    await test.runSequence('SubmitNewTodoSequence');
  });

  it('should add the interactor response to cerebral state', async () => {
    const mockApplicationContext = createMockApplicationContext({
      getUseCases: () => ({
        newTodo: request => {
          request.responseCallback(responseData);
        },
      }),
    });

    presenter.providers.applicationContext = mockApplicationContext;
    const test = CerebralTest(presenter);
    test.setState('todoPage.todoForm.description', 'Make a sammich.');

    await test.runSequence('SubmitNewTodoSequence');

    expect(test.getState('todoPage.todos')).toMatchObject(responseData.data);
  });
});

const responseData = {
  status: 'success',
  data: {
    description: 'Make a sammich.',
    createdAt: 1554070560001,
    todoId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
  },
};
