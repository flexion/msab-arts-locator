import { CerebralTest } from 'cerebral/test';
import { createMockApplicationContext } from '../../../utilities/TestUtils';
import { presenter } from '../../presenter';

describe('updateCitySearchSequence', () => {
  it('should update cerebral state with city', async () => {
    const mockApplicationContext = createMockApplicationContext();

    presenter.providers.applicationContext = mockApplicationContext;
    const test = CerebralTest(presenter);
    test.setState('cityValue', '');

    await test.runSequence('updateCitySearchSequence', {
      cityValue: 'Mankato',
    });

    expect(test.getState('cityValue')).toMatch('Mankato');
  });
});
