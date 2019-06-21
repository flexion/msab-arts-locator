'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const putImage = async (
  { base64Image, ext, entityId, contentType },
  applicationContext,
) => {
  try {
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const bucket = applicationContext.environment.imageBucket;
    let params = {
      Body: imageBuffer,
      Bucket: bucket,
      Key: `${entityId}.${ext}`,
      ContentType: contentType,
      ACL: 'public-read',
    };
    const response = await s3.upload(params).promise();
    console.log('response: ', response);
    return { status: 'success', data: response };
  } catch (e) {
    console.log('something failed on s3 put', e);
    return { status: 's3 put failed' };
  }
};

const getImage = async ({ imageId }) => {
  try {
    let params = {
      Bucket: 'msab-arts-locator-pre-us-east-images',
      Key: imageId,
    };
    const image = s3.getObject(params, function(err, data) {});
    return { status: 'success', image: image };
  } catch (e) {
    console.log('something failed on s3 get', e);
    return { status: 's3 get failed' };
  }
};

module.exports = { putImage, getImage };
