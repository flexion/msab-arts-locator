const { createMockApplicationContext } = require('../utilities/TestUtils');
const { save: saveLocation } = require('./saveLocation');

let captchaSuccess = 'failure';
let usecasesCalled = [];
const mockApplicationContext = createMockApplicationContext({
  getUseCases: () => {
    return {
      checkUpdate: async () => {
        usecasesCalled.push('checkUpdate');
        return {
          isUpdateValid: true,
        };
      },
      deleteArtLocation: async () => {
        usecasesCalled.push('deleteArtLocation');
        return {
          status: 'success',
        };
      },
      getLocationCoordinates: async () => {
        usecasesCalled.push('getLocationCoordinates');
        return {
          cityName: 'Mankato',
          status: 'success',
        };
      },
      putArtLocationImage: async () => {
        usecasesCalled.push('putArtLocationImage');
        return {
          data: {
            Location: 'http://example.com',
          },
          status: 'success',
        };
      },
      saveNewArtLocation: async () => {
        usecasesCalled.push('saveNewArtLocation');
        return {
          status: 'success',
        };
      },
      sendAdminEmail: async () => {
        usecasesCalled.push('sendAdminEmail');
      },
      sendUserEmail: async () => {
        usecasesCalled.push('sendUserEmail');
      },
      validateArtLocation: async () => {
        usecasesCalled.push('validateArtLocation');
        return {
          artLocation: {},
          status: 'success',
        };
      },
      validateCaptcha: async () => {
        usecasesCalled.push('validateCaptcha');
        return {
          status: captchaSuccess,
        };
      },
      validateImageFileType: async () => {
        usecasesCalled.push('validateImageFileType');
        return {
          contentType: {
            type: 'image/jpg',
          },
          status: 'success',
        };
      },
    };
  },
});

describe('saveLocation controller', () => {
  it('should throw an error if the captcha is not valid', async () => {
    captchaSuccess = 'failure';
    usecasesCalled = [];
    await expect(
      saveLocation({
        applicationContext: mockApplicationContext,
        requestData: {},
      }),
    ).rejects.toThrowError(/failure/);
    expect(usecasesCalled).toEqual(['validateCaptcha']);
  });

  it('should validate art location', async () => {
    captchaSuccess = 'success';
    const mockAppContext = {
      ...mockApplicationContext,
      getUseCases: () => {
        return {
          ...mockApplicationContext.getUseCases(),
          validateArtLocation: async () => {
            usecasesCalled.push('validateArtLocation');
            return {
              status: 'failure',
            };
          },
        };
      },
    };

    usecasesCalled = [];
    await saveLocation({
      applicationContext: mockAppContext,
      requestData: {},
    });
    expect(usecasesCalled).toEqual([
      'validateCaptcha',
      'checkUpdate',
      'validateArtLocation',
    ]);
  });

  it('should save a new location without an image', async () => {
    captchaSuccess = 'success';

    usecasesCalled = [];
    await saveLocation({
      applicationContext: mockApplicationContext,
      requestData: {},
    });
    expect(usecasesCalled).toEqual([
      'validateCaptcha',
      'checkUpdate',
      'validateArtLocation',
      'getLocationCoordinates',
      'saveNewArtLocation',
      'sendAdminEmail',
      'sendUserEmail',
    ]);
  });

  it('should save a new location with an image', async () => {
    captchaSuccess = 'success';

    usecasesCalled = [];
    await saveLocation({
      applicationContext: mockApplicationContext,
      requestData: { base64Image: 1 },
    });
    expect(usecasesCalled).toEqual([
      'validateCaptcha',
      'checkUpdate',
      'validateArtLocation',
      'getLocationCoordinates',
      'validateImageFileType',
      'putArtLocationImage',
      'saveNewArtLocation',
      'sendAdminEmail',
      'sendUserEmail',
    ]);
  });

  it('should save an update without any images', async () => {
    captchaSuccess = 'success';
    const modifiedMockApplicationContext = {
      ...mockApplicationContext,
      getUseCases: () => {
        return {
          ...mockApplicationContext.getUseCases(),
          checkUpdate: async () => {
            usecasesCalled.push('checkUpdate');
            return {
              isUpdate: true,
              isUpdateValid: true,
              locationData: {},
            };
          },
        };
      },
    };

    usecasesCalled = [];
    await saveLocation({
      applicationContext: modifiedMockApplicationContext,
      requestData: { update: {} },
    });
    expect(usecasesCalled).toEqual([
      'validateCaptcha',
      'checkUpdate',
      'validateArtLocation',
      'getLocationCoordinates',
      'saveNewArtLocation',
      'deleteArtLocation',
      'sendAdminEmail',
    ]);
  });

  it('should save an update with a new image', async () => {
    captchaSuccess = 'success';
    const modifiedMockApplicationContext = {
      ...mockApplicationContext,
      getUseCases: () => {
        return {
          ...mockApplicationContext.getUseCases(),
          checkUpdate: async () => {
            usecasesCalled.push('checkUpdate');
            return {
              isUpdate: true,
              isUpdateValid: true,
              locationData: {},
            };
          },
          putArtLocationImage: async () => {
            usecasesCalled.push('putArtLocationImage');
            return {
              data: {
                Key: 'photos/blah-blah.jpg',
              },
              status: 'success',
            };
          },
          saveNewArtLocation: async ({ artLocation }) => {
            usecasesCalled.push('saveNewArtLocation');
            expect(artLocation.imageURL).toEqual('photos/blah-blah.jpg');
            return {
              status: 'success',
            };
          },
        };
      },
    };

    usecasesCalled = [];
    expect.assertions(2);
    await saveLocation({
      applicationContext: modifiedMockApplicationContext,
      requestData: { base64Image: 1, update: {} },
    });
    expect(usecasesCalled).toEqual([
      'validateCaptcha',
      'checkUpdate',
      'validateArtLocation',
      'getLocationCoordinates',
      'validateImageFileType',
      'putArtLocationImage',
      'saveNewArtLocation',
      'deleteArtLocation',
      'sendAdminEmail',
    ]);
  });

  it('should save an update for ArtLocation with existing image', async () => {
    captchaSuccess = 'success';
    const modifiedMockApplicationContext = {
      ...mockApplicationContext,
      getUseCases: () => {
        return {
          ...mockApplicationContext.getUseCases(),
          checkUpdate: async () => {
            usecasesCalled.push('checkUpdate');
            return {
              isUpdate: true,
              isUpdateValid: true,
              locationData: { imageURL: 'foo' },
            };
          },
          saveNewArtLocation: async ({ artLocation }) => {
            usecasesCalled.push('saveNewArtLocation');
            expect(artLocation.imageURL).toEqual('foo');
            return {
              status: 'success',
            };
          },
        };
      },
    };

    usecasesCalled = [];
    expect.assertions(2);
    await saveLocation({
      applicationContext: modifiedMockApplicationContext,
      requestData: { update: {} },
    });
    expect(usecasesCalled).toEqual([
      'validateCaptcha',
      'checkUpdate',
      'validateArtLocation',
      'getLocationCoordinates',
      'saveNewArtLocation',
      'deleteArtLocation',
      'sendAdminEmail',
    ]);
  });

  it('should save an admin update with approval', async () => {
    captchaSuccess = 'success';
    const modifiedMockApplicationContext = {
      ...mockApplicationContext,
      getUseCases: () => {
        return {
          ...mockApplicationContext.getUseCases(),
          checkUpdate: async () => {
            usecasesCalled.push('checkUpdate');
            return {
              isUpdate: true,
              isUpdateValid: true,
              locationData: {},
            };
          },
          saveNewArtLocation: async ({ artLocation }) => {
            usecasesCalled.push('saveNewArtLocation');
            expect(artLocation.approved).toEqual(true);
            return {
              status: 'success',
            };
          },
        };
      },
    };

    usecasesCalled = [];
    expect.assertions(2);
    await saveLocation({
      applicationContext: modifiedMockApplicationContext,
      requestData: { update: { actionType: 'admin' } },
    });
    expect(usecasesCalled).toEqual([
      'validateCaptcha',
      'checkUpdate',
      'validateArtLocation',
      'getLocationCoordinates',
      'saveNewArtLocation',
      'deleteArtLocation',
      'sendUserEmail',
    ]);
  });
});
