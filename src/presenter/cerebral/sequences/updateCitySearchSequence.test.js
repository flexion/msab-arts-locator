import { CerebralTest } from 'cerebral/test';
import { createMockApplicationContext } from '../../../utilities/TestUtils';
import { updateCitySearchSequence } from './updateCitySearchSequence';

describe('updateCitySearchSequence', () => {
  it('should update cerebral state with city', async () => {
    const mockApplicationContext = createMockApplicationContext();

    const test = CerebralTest({
      providers: { mockApplicationContext },
      sequences: {
        updateCitySearchSequence,
      },
      state: {
        citySearch: false,
        cityValue: '',
      },
    });
    test.setState('cityValue', '');

    await test.runSequence('updateCitySearchSequence', {
      cityValue: 'Mankato',
    });

    expect(test.getState('cityValue')).toMatch('Mankato');
  });
});
