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
const queryDynamo = params => {
  return new Promise(function (resolve, reject) {
    documentClient.query(params, function (err, data) {
      if (err) {
        console.log(err);
        reject({ data: err, status: 'failed' });
      } else {
        resolve({ results: data, status: 'success' });
      }
    });
  });
};

const updateDynamo = params => {
  return new Promise(function (resolve, reject) {
    documentClient.update(params, function (err, data) {
      if (err) {
        console.log(err);
        reject({ data: err, status: 'failed' });
      } else {
        resolve({ results: data, status: 'success' });
      }
    });
  });
};

const deleteDynamo = params => {
  return new Promise(function (resolve, reject) {
    documentClient.delete(params, function (err, data) {
      if (err) {
        console.log(err);
        reject({ data: err, status: 'failed' });
      } else {
        resolve({ results: data, status: 'success' });
      }
    });
  });
};

const saveNewLocationGeo = async ({
  applicationContext,
  artLocation,
  coords,
}) => {
  try {
    let item = {
      adminId: { S: artLocation.adminId },
      approved: { BOOL: artLocation.approved },
      category: { S: JSON.stringify(artLocation.category) },
      city: { S: artLocation.city },
      contactEmail: { S: artLocation.contactEmail },
      contactName: { S: artLocation.contactName },
      contactPhone: { S: artLocation.contactPhone },
      createdAt: { N: `${artLocation.createdAt}` },
      entityId: { S: artLocation.entityId },
      name: { S: artLocation.name },
      state: { S: artLocation.state },
      street: { S: artLocation.street },
      updateId: { S: artLocation.updateId },
      zip: { S: artLocation.zip },
    };

    if (artLocation.imageURL) {
      item.imageURL = { S: artLocation.imageURL };
    }
    if (artLocation.description) {
      item.description = { S: artLocation.description };
    }
    if (artLocation.website) {
      item.website = { S: artLocation.website };
    }
    console.log('Location being inserted: ', item);
    await myGeoTableManager
      .putPoint({
        // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: {
          // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
          latitude: coords.lat,
          longitude: coords.lng,
        },
        PutItemInput: {
          Item: item,
        },
        RangeKeyValue: { S: applicationContext.getUniqueId() },
      })
      .promise()
      .then(function () {
        console.log('Done putting new location!');
      });

    return { artLocation, status: 'success' };
  } catch (e) {
    console.log('something failed on dynamo put', e);
    return { status: 'save failed' };
  }
};

const getLocationsByGeo = async ({ lat, long, radius }) => {
  try {
    const results = await myGeoTableManager.queryRadius({
      CenterPoint: {
        latitude: lat,
        longitude: long,
      },
      RadiusInMeter: radius,
    });
    return { results, status: 'success' };
  } catch (e) {
    console.log('something failed on dynamo get', e);
    return { status: 'get failed' };
  }
};

const getLocationsInCity = async ({ city }) => {
  let params = {
    ExpressionAttributeValues: {
      ':c': city,
    },
    IndexName: 'cityName-index',
    KeyConditionExpression: 'city = :c',
    TableName: process.env.GIS_TABLE,
  };
  console.log('params for query: ', params);
  const results = await queryDynamo(params);
  return results;
};

const getLocationById = async ({ actionType, entityId }) => {
  console.group('entityid, action', entityId, actionType);
  const indexName = `${actionType}Id-index`;
  const columnName = `${actionType}Id`;
  let params = {
    ExpressionAttributeValues: {
      ':id': entityId,
    },
    IndexName: indexName,
    KeyConditionExpression: `${columnName} = :id`,
    TableName: process.env.GIS_TABLE,
  };
  console.log('params', params);
  const results = await queryDynamo(params);
  console.log('results: ', results);
  return results;
};

const updateLocationApproval = async ({ artLocationData }) => {
  let results = null;
  const id = artLocationData.update.entityId;
  const { approved } = artLocationData;
  results = await getLocationById({ actionType: 'admin', entityId: id });

  if (results.results.Items.length > 0) {
    const item = results.results.Items[0];

    let params = {
      ExpressionAttributeValues: {
        ':a': approved,
      },
      Key: { hashKey: item.hashKey, rangeKey: item.rangeKey },
      TableName: process.env.GIS_TABLE,
      UpdateExpression: 'set approved = :a',
    };

    console.log('params', params);
    await updateDynamo(params);

    results = { artLocation: item, status: 'success' };
    console.log('update results: ', results);
  }
  return results;
};

const deleteLocation = async ({ requestData }) => {
  let results = null;
  const { hashKey } = requestData;
  const { rangeKey } = requestData;

  let params = {
    Key: { hashKey, rangeKey },
    TableName: process.env.GIS_TABLE,
  };

  console.log('params', params);
  results = await deleteDynamo(params);
  console.log('delete results: ', results);

  return results;
};
module.exports = {
  deleteLocation,
  getLocationById,
  getLocationsByGeo,
  getLocationsInCity,
  saveNewLocationGeo,
  updateLocationApproval,
};
