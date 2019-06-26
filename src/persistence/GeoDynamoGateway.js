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
const documentClient = new AWS.DynamoDB.DocumentClient();
const queryDynamo = (params) => {
  return new Promise(function(resolve, reject) {
    documentClient.query(params, function(err, data) {
      if (err) {
        console.log(err);
        reject({ status: 'failed', data: err });
      } else {
        resolve({ status: 'success', results: data });
      }
    });
  });
};

const saveNewLocationGeo = async ({
  artLocation,
  coords,
  applicationContext,
}) => {
  try {
    let item = {
      name: { S: artLocation.name },
      category: { S: JSON.stringify(artLocation.category) },
      street: { S: artLocation.street },
      city: { S: artLocation.city },
      state: { S: artLocation.state },
      zip: { S: artLocation.zip },
      contactName: { S: artLocation.contactName },
      contactEmail: { S: artLocation.contactEmail },
      contactPhone: { S: artLocation.contactPhone },
      createdAt: { N: `${artLocation.createdAt}` },
      entityId: { S: artLocation.entityId },
      adminId: { S: artLocation.adminId },
      updateId: { S: artLocation.updateId },
      approved: { BOOL: artLocation.approved },
    };

    console.log('image url: ', artlocation.imageURL);
    if (artLocation.imageURL) {
      item.imageURL = { S: artLocation.imageURL };
    }
    if (artLocation.description) {
      item.description = { S: artLocation.description };
    }
    if (artLocation.website) {
      item.website = { S: artLocation.website };
    }
    console.log('item being inserted: ', item);
    await myGeoTableManager
      .putPoint({
        RangeKeyValue: { S: applicationContext.getUniqueId() }, // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: {
          // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
          latitude: coords.lat,
          longitude: coords.lng,
        },
        PutItemInput: {
          Item: item,
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

const getLocationsInCity = async ({ city }) => {
  var params = {
    TableName: process.env.GIS_TABLE,
    IndexName: 'cityName-index',
    KeyConditionExpression: 'city = :c',
    ExpressionAttributeValues: {
      ':c': city,
    },
  };
  const results = await queryDynamo(params);
  return results;
};

module.exports = { saveNewLocationGeo, getLocationsByGeo, getLocationsInCity };
