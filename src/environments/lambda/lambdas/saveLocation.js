const createApplicationContext = require('../ApplicationContext');

// const { getUserFromAuthHeader } = require("../middleware/apiGatewayHelper");
//const { handle } = require('../middleware/apiGatewayHelper');
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS, POST',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'max-age=0, private, no-cache, no-store, must-revalidate',
  'Content-Type': 'application/json',
};

/**
 * used for saving new locations
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */

const post = async event => {
  const applicationContext = createApplicationContext();
  let requestData = null;
  let saveResult = null;
  let validateResult = true;
  let currentLocationData = null;
  let msg = null;
  let imageUrl = null;
  let isUpdateValid = true;
  let isUpdate = false;
  let artLocation = null;
  try {
    console.log('event:', event);
    if (!event || !event.body) throw new Error('data not-found error');
    requestData = JSON.parse(event.body);
    console.log('requestData: ', requestData);
    const captchaResult = await applicationContext
      .getUseCases()
      .validateCaptcha({ applicationContext, value: requestData.gresp });
    console.log('captcharesult: ', captchaResult);
    requestData.approved = false; // always false, if admin action handled later
    if (captchaResult.status === 'success') {
      //if updating an existing location, need to validate id
      if (
        requestData.update &&
        requestData.update.actionType &&
        requestData.update.entityId
      ) {
        isUpdate = true;
        //if valid, will return with the existing location
        currentLocationData = await applicationContext
          .getUseCases()
          .getArtLocationById({
            applicationContext,
            requestData: {
              actionType: requestData.update.actionType,
              entityId: requestData.update.entityId,
            },
          });
        if (currentLocationData.results.Count < 1) {
          console.log(
            'update is invalid: ',
            requestData.update.entityId,
            requestData.update.actionType,
          );
          isUpdateValid = false;
        } else {
          currentLocationData = currentLocationData.results.Items[0];
        }
      }
      if (isUpdateValid) {
        validateResult = await applicationContext
          .getUseCases()
          .validateArtLocation({
            applicationContext,
            requestData,
          });
        msg = validateResult.status;
        if (msg === 'success') {
          ({ artLocation } = validateResult);
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
                      base64Image: requestData.base64Image,
                      contentType: validateResult.contentType.type,
                      entityId: artLocation.entityId,
                      ext: validateResult.contentType.ext,
                    },
                    applicationContext,
                  );
                msg = saveResult.status;
                imageUrl = saveResult.data.Key;
              }
            }

            if (msg === 'success') {
              if (imageUrl) {
                artLocation.imageURL = imageUrl;
              } else if (currentLocationData && currentLocationData.imageURL) {
                artLocation.imageURL = currentLocationData.imageURL;
              }
              if (isUpdate) {
                //need replace admin and update id with existing ids
                artLocation.adminId = currentLocationData.adminId;
                artLocation.updateId = currentLocationData.updateId;
                if (requestData.update.actionType === 'admin') {
                  artLocation.approved = true;
                } else {
                  // admins need to re-approve changes
                  artLocation.approved = false;
                }
              }

              artLocation.city = coordResult.cityName;
              console.log(
                'setting city name based on geocoords: ',
                coordResult.cityName,
              );
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
        if (msg === 'success' && isUpdate) {
          //need to delete previous location record
          const deleteResults = await applicationContext
            .getUseCases()
            .deleteArtLocation({
              applicationContext,
              requestData: currentLocationData,
            });
          console.log('delete results: ', deleteResults);
          if (deleteResults.status !== 'success') {
            //uh oh, we might now have duplicate rows
            //email admin?
          }
        }
        if (msg === 'success') {
          let emailResults = null;
          if (isUpdate) {
            if (artLocation.approved) {
              //is admin action
              emailResults = await applicationContext
                .getUseCases()
                .sendUserEmail({
                  applicationContext,
                  approved: true,
                  artLocation,
                  initial: false,
                });
              console.log('user email Results: ', emailResults);
            } else {
              // user updated action
              emailResults = await applicationContext
                .getUseCases()
                .sendAdminEmail({
                  applicationContext,
                  artLocation,
                });
              console.log('admin email Results: ', emailResults);
            }
          } else {
            //is first time submission or update
            emailResults = await applicationContext
              .getUseCases()
              .sendAdminEmail({
                applicationContext,
                artLocation,
              });
            console.log('admin email Results: ', emailResults);
            emailResults = await applicationContext
              .getUseCases()
              .sendUserEmail({
                applicationContext,
                approved: false,
                artLocation,
                initial: true,
              });
            console.log('user email Results: ', emailResults);
          }

          console.log('should return a 201');
          return {
            body: JSON.stringify({
              input: event,
              message: 'success',
            }),
            headers,
            statusCode: 201,
          };
        } else {
          console.log('should return a 406', msg);
          return {
            body: JSON.stringify({
              input: event,
              message: msg,
            }),
            headers,
            statusCode: 406,
          };
        }
      }
    }
  } catch (e) {
    console.log('e: ', e);
    applicationContext.logger.error(e);
    return {
      body: JSON.stringify({ e, message: 'error' }),
      headers,
      statusCode: 500,
    };
  }
};

module.exports = { post };
