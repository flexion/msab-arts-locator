'use strict';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB();
const ddbGeo = require('dynamodb-geo');
const config = new ddbGeo.GeoDataManagerConfiguration(
  ddb,
  process.env.GIS_TABLE,
);
config.hashKeyLength = 5;
const myGeoTableManager = new ddbGeo.GeoDataManager(config);

const saveNewLocationGeo = async ({
  artLocation,
  coords,
  applicationContext,
}) => {
  try {
    await myGeoTableManager
      .putPoint({
        RangeKeyValue: { S: applicationContext.getUniqueId() }, // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: {
          // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
          latitude: coords.lat,
          longitude: coords.lng,
        },
        PutItemInput: {
          Item: {
            name: { S: artLocation.name },
            category: { S: JSON.stringify(artLocation.category) },
            website: { S: artLocation.website },
            street: { S: artLocation.street },
            city: { S: artLocation.city },
            state: { S: artLocation.state },
            zip: { S: artLocation.zip },
            contactName: { S: artLocation.contactName },
            contactEmail: { S: artLocation.contactEmail },
            contactPhone: { S: artLocation.contactPhone },
            description: { S: artLocation.description },
          },
        },
      })
      .promise()
      .then(function() {
        console.log('Done putting new location!');
      });

    return { status: 'success', artLocation };
  } catch (e) {
    console.log('something failed on dynamo put', e);
    return { status: 'save failed' };
  }
};

const getLocationsByGeo = async ({ lat, long, radius }) => {
  try {
    const results = await myGeoTableManager.queryRadius({
      RadiusInMeter: radius,
      CenterPoint: {
        latitude: lat,
        longitude: long,
      },
    });
    return { status: 'success', results };
  } catch (e) {
    console.log('something failed on dynamo get', e);
    return { status: 'get failed' };
  }
};

module.exports = { saveNewLocationGeo, getLocationsByGeo };
