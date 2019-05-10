// //Interactor goes here
// const { toJSON } = require('../utilities/ObjectUtils');
// const { validateRequestData } = require('../utilities/CleanUtils');
// const { NewArtLocation } = require('../domain/NewArtLocation');

// /**
//  *
//  * @param requestData
//  * @param applicationContext
//  * @param responseCallback
//  * @returns {Promise<*>}
//  */
// exports.ArtLocation = async ({
//   requestData,
//   responseCallback,
//   applicationContext,
// }) => {
//   // An interactor owns the interface of the request. It will validate that the requestData is
//   // well-formed using a JSON Schema validator. Detailed validation is handled by entities later.
//   const dataSchema = {
//     type: 'object',
//     properties: {
//       name: { type: 'string' },
//       discipline: { type: 'string' },
//       primaryType: { type: 'string' },
//       url: { type: 'string' },
//       phone: { type: 'string' },
//       email: { type: 'string' },
//       add1: { type: 'string' },
//       add2: { type: 'string' },
//       city: { type: 'string' },
//       state: { type: 'string' },
//       zip: { type: 'string' },
//       description: { type: 'string' },
//       long: { type: 'number' },
//       lat: { type: 'number' },
//     },
//     required: [
//       'name',
//       'discipline',
//       'primaryType',
//       'url',
//       'phone',
//       'email',
//       'add1',
//       'city',
//       'state',
//       'zip',
//       'lat',
//       'long',
//       'description',
//     ],
//     additionalProperties: true,
//     errorMessage:
//       "should be an object with a string properties 'name','discipline','primaryType','url','phone','email','add1','city','state','zip','description', 'lat', 'long'",
//   };

//   // An interactor validates that the required objects are present.
//   validateRequestData({ data: requestData, dataSchema, applicationContext });

//   // An interactor knows the data strucures of the entities it mediates and assembles
//   // those datastructures as approptiate. It doesn't blindly pass them what it receives from its caller.
//   const rawArtLocation = { description: requestData.description };

//   // The interactor doesn't know the details of what constitutes valid entitiy data. It relies
//   // on entities for that validation.
//   const artLocation = new NewArtLocation({
//     rawArtLocation,
//     applicationContext,
//   });

//   // Once the entities have done thier work, if the results need to be persisted, the interactor
//   // extracts entity data and assebles data records that is passes to the persistencd gateway.
//   const artLocationData = toJSON(artLocation);

//   // The interactor invokes a very specific persistence gateway operation.
//   await applicationContext
//     .getPersistenceGateway()
//     .createArtLocation({ artLocationData, applicationContext });

//   // The interactor invokes a callback (probably in the presenter) to provide results. The
//   // function signature should be at the same semantic level as the interactor.
//   responseCallback({ status: 'success', data: artLocationData });
// };
