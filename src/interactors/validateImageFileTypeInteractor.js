const fileType = require('file-type');
/**
 *
 * @param image
 * @param applicationContext
 * @returns {success}
 */
exports.validateImageFileType = async (image) => {
  try {
    const imageBuffer = null;
    if (typeof image === 'string') {
      imageBuffer = Buffer.from(image, 'base64');
    } else {
      imageBuffer = image;
    }
    const contentType = fileType(imageBuffer);
    console.log('contentType after finding: ', contentType);

    return { status: 'success', contentType, imageBuffer };
  } catch (e) {
    console.log('e: ', e.message);
    return { status: 'error: unsupported filetype', data: e.message };
  }
};
