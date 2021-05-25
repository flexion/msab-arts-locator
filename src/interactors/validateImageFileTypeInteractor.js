const FileType = require('file-type');

const getBase64 = image => {
  let file = null;
  return new Promise(resolve => {
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
exports.validateImageFileType = async image => {
  // converts to base64 to buffer to check the mime type
  if (!image) {
    return { base64Image: null, status: 'success' };
  }
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

    const contentType = await FileType.fromBuffer(imageBuffer);
    const maxSize = 1000000;
    if (
      contentType &&
      contentType.mime &&
      types.indexOf(contentType.mime) > -1 &&
      imageBuffer.length <= maxSize
    ) {
      return { base64Image, contentType, status: 'success' };
    } else {
      console.warn(
        `File type: ${contentType.mime} (supported: ${types}), size: ${imageBuffer.length}/${maxSize}`,
        contentType,
      );
      return {
        status:
          'error: Image you selected is an unsupported file type or too large. Please choose a file of type: png, gif, jpeg/jpg, less than 1MB in size.',
      };
    }
  } catch (e) {
    console.error(e);
    return { data: e.message, status: 'error: unsupported filetype' };
  }
};
