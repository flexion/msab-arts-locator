/**
 *
 * @param data.data
 * @param data
 * @param dataSchema
 * @param applicationContext
 * @param data.dataSchema
 * @param data.applicationContext
 */
function validateRequestData({ applicationContext, data, dataSchema }) {
  const validationResult = applicationContext
    .getJsonValidator()
    .validateJson(data, dataSchema);
  if (validationResult) throw new Error(JSON.stringify(validationResult));
}

module.exports = { validateRequestData };
