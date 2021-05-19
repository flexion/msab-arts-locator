const Ajv = require('ajv').default;
const ajv = new Ajv({
  allErrors: true,
});
require('ajv-errors')(ajv);

/**
 *
 * @param object
 * @param data
 * @param schema
 */
function validateJson(data, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    return validate.errors;
  }
}

module.exports = { validateJson };
