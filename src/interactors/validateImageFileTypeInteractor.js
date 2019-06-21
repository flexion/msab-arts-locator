const fileType = require('file-type');

const getBase64 = (image) => {
  let file = null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      file = reader.result.split(',')[1];
      resolve(file);
    };
  });
};

/**
 *
 * @param image
 * @returns {success, contentType, image}
 */
exports.validateImageFileType = async (image) => {
  // converts to base64 to buffer to check the mime type
  try {
    const types = ['image/jpeg', 'image/png', 'image/gif'];
    let imageBuffer = null;
    let base64Image = null;
    if (typeof image === 'string') {
      imageBuffer = Buffer.from(image, 'base64');
      base64Image = image;
    } else {
      base64Image = await getBase64(image);
      imageBuffer = Buffer.from(base64Image, 'base64');
    }
    const contentType = fileType(imageBuffer);
    if (
      contentType &&
      contentType.mime &&
      types.indexOf(contentType.mime) > -1
    ) {
      return { status: 'success', contentType, base64Image };
    } else {
      return {
        status:
          'error: Image you selected is an unsupported file type. Please choose a file of type: png, gif, jpeg/jpg',
      };
    }
  } catch (e) {
    console.log('e: ', e.message);
    return { status: 'error: unsupported filetype', data: e.message };
  }
};
