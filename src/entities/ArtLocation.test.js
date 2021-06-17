const { ArtLocation } = require('./ArtLocation');
const { createMockApplicationContext } = require('../utilities/TestUtils');

const mockLocationData = {
  approved: true,
  category: {
    craft: true,
    dance: true,
    folk: true,
    literary: true,
    music: true,
    opera: true,
    photo: true,
    visual: true,
  },
  city: 'Valid City',
  contactEmail: 'curator@example.com',
  contactName: 'Art Curator',
  contactPhone: '555-123-2345',
  gresp: 'abc1234',
  name: 'Another Cool Art Location',
  state: 'MN',
  street: '123 Valid Street',
  zip: '00000',
};

const mockApplicationContext = createMockApplicationContext();

describe('ArtLocation', () => {
  it('should fail validation when zero categories are selected', () => {
    const mockLocationWithNoCategories = {
      ...mockLocationData,
      category: {
        craft: false,
        dance: false,
        folk: false,
        literary: false,
        music: false,
        opera: false,
        photo: false,
        visual: false,
      },
    };

    expect(() => {
      new ArtLocation({
        applicationContext: mockApplicationContext,
        rawArtLocation: mockLocationWithNoCategories,
      });
    }).toThrowError();
  });

  it('should fail validation when more than three categories are selected', () => {
    const mockLocationWithTooManyCategories = {
      ...mockLocationData,
      category: {
        craft: true,
        dance: true,
        folk: true,
        literary: true,
        music: false,
        opera: false,
        photo: false,
        visual: false,
      },
    };

    expect(() => {
      new ArtLocation({
        applicationContext: mockApplicationContext,
        rawArtLocation: mockLocationWithTooManyCategories,
      });
    }).toThrowError();
  });
});
