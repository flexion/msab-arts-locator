const save = async ({ applicationContext, requestData }) => {
  const { checkUpdate } = applicationContext.getUseCases();
  let saveResult = null;
  let validateResult = true;
  let msg = null;
  let imageUrl = null;
  let artLocation = null;

  const captchaResult = await applicationContext
    .getUseCases()
    .validateCaptcha({ applicationContext, value: requestData.gresp });
  console.log('captcharesult: ', captchaResult);
  requestData.approved = false; // always false, if admin action handled later
  if (captchaResult.status === 'success') {
    const {
      isUpdate,
      isUpdateValid,
      locationData: currentLocationData,
    } = await checkUpdate({
      applicationContext,
      locationIds: requestData.update,
    });
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
          emailResults = await applicationContext.getUseCases().sendAdminEmail({
            applicationContext,
            artLocation,
          });
          console.log('admin email Results: ', emailResults);
          emailResults = await applicationContext.getUseCases().sendUserEmail({
            applicationContext,
            approved: false,
            artLocation,
            initial: true,
          });
          console.log('user email Results: ', emailResults);
        }

        return 'success';
      } else {
        return msg;
      }
    }
  } else {
    throw new Error(
      `error: ${captchaResult.msg}, status: ${captchaResult.status}`,
    );
  }
};

module.exports = { save };
