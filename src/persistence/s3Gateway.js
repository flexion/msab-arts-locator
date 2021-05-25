'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const putImage = async (
  { base64Image, contentType, entityId, ext },
  applicationContext,
) => {
  let params = {};
  try {
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const bucket = applicationContext.environment.imageBucket;
    params = {
      ACL: 'public-read',
      Body: imageBuffer,
      Bucket: bucket,
      ContentType: contentType,
      Key: `${entityId}.${ext}`,
    };
    const response = await s3.upload(params).promise();
    return { data: response, status: 'success' };
  } catch (e) {
    delete params.Body; // don't log image buffer
    console.log('something failed on s3 put: ' + JSON.stringify(params), e);
    return { status: 's3 put failed' };
  }
};

// const getImage = async ({ imageId }) => {
//   try {
//     let params = {
//       Bucket: 'msab-arts-locator-pre-us-east-images',
//       Key: imageId,
//     };
//     const image = s3.getObject(params, function(err, data) {});
//     return { status: 'success', image: image };
//   } catch (e) {
//     console.log('something failed on s3 get', e);
//     return { status: 's3 get failed' };
//   }
// };

module.exports = { putImage };
