/**
 *
 * @param object
 */
function toJSON(object) {
  const keys = Object.keys(object);
  const json = {};
  for (let key of keys) {
    const value = object[key];
    if (Array.isArray(value)) {
      json[key] = value.map(v => toJSON(v));
    } else if (value !== null && typeof value === 'object') {
      json[key] = toJSON(value);
    } else {
      json[key] = value;
    }
  }
  return json;
}

exports.toJSON = toJSON;
