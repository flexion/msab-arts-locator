/**
 *
 * @param data
 * @param dataSchema
 * @param applicationContext
 */
function validateRequestData({ data, dataSchema, applicationContext }) {
  const validationResult = applicationContext
    .getJsonValidator()
    .validateJson(data, dataSchema);
  if (validationResult) throw new Error(JSON.stringify(validationResult));
}

module.exports = { validateRequestData };
