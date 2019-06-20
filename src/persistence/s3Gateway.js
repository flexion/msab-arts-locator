'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const putImage = async ({ image, entityId }, applicationContext) => {
  try {
    console.log('image:', image);
    const imageBuffer = Buffer.from(image.content, 'base64');
    console.log('typeof buffer: ', typeof imageBuffer);
    console.log('image buffer:', imageBuffer);
    const contentType = image.contentType;
    const fileExtension = contentType.split('/')[1];
    console.log('fileExtension: ', fileExtension);
    const bucket = applicationContext.environment.imageBucket;
    console.log('bucket: ', bucket);
    let params = {
      Body: imageBuffer.stream(),
      Bucket: bucket,
      Key: `${entityId}.${fileExtension}`,
      ContentType: image.contentType,
      ACL: 'public-read',
      ContentEncoding: 'base64',
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
