const createApplicationContext = require('../ApplicationContext');
const multipart = require('aws-lambda-multipart-parser');
// const { getUserFromAuthHeader } = require("../middleware/apiGatewayHelper");
//const { handle } = require('../middleware/apiGatewayHelper');
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'max-age=0, private, no-cache, no-store, must-revalidate',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'OPTIONS, POST',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * used for saving new locations
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */

const post = async (event) => {
  const applicationContext = createApplicationContext();
  let requestData = null;
  let saveResult = null;
  let msg = null;
  let imageUrl = null;
  try {
    console.log('event:', event);
    if (!event || !event.body) throw new Error('data not-found error');
    requestData = JSON.parse(event.body);
    console.log('requestData: ', requestData);
    const captchaResult = await applicationContext
      .getUseCases()
      .validateCaptcha({ value: requestData.gresp, applicationContext });
    console.log('captcharesult: ', captchaResult);

    if (captchaResult.status === 'success') {
      const validateResult = await applicationContext
        .getUseCases()
        .validateArtLocation({
          applicationContext,
          requestData,
        });
      msg = validateResult.status;
      if (msg === 'success') {
        const artLocation = validateResult.artLocation;
        const coordResult = await applicationContext
          .getUseCases()
          .getLocationCoordinates({
            applicationContext,
            artLocation,
          });
        msg = coordResult.status;
        console.log('coordResult: ', coordResult);
        if (msg === 'success') {
          if (requestData.base64Image) {
            validateResult = await applicationContext
              .getUseCases()
              .validateImageFileType(requestData.base64Image);
            msg = validateResult.status;
            if (msg === 'success') {
              saveResult = await applicationContext
                .getUseCases()
                .putArtLocationImage(
                  {
                    contentType: validateResult.contentType.type,
                    ext: validateResult.contentType.ext,
                    entityId: artLocation.entityId,
                    base64Image: requestData.base64Image,
                  },
                  applicationContext,
                );
              msg = saveResult.status;
              imageUrl = saveResult.data.Location;
            }
          }

          if (msg === 'success') {
            artLocation.imageURL = imageUrl;
            saveResult = await applicationContext
              .getUseCases()
              .saveNewArtLocation({
                applicationContext,
                artLocation,
                coords: coordResult.coords,
              });
            msg = saveResult.status;
            console.log('saveResult: ', saveResult);
          }
        }
      }
      if (msg === 'success') {
        console.log('should return a 201');
        return {
          statusCode: 201,
          headers: headers,
          body: JSON.stringify({
            message: 'success',
            input: event,
          }),
        };
      } else {
        console.log('should return a 406', msg);
        return {
          statusCode: 406,
          headers: headers,
          body: JSON.stringify({
            message: msg,
            input: event,
          }),
        };
      }
    }
  } catch (e) {
    console.log('e: ', e);
    applicationContext.logger.error(e);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: 'error', e }),
    };
  }
};

module.exports = { post };
