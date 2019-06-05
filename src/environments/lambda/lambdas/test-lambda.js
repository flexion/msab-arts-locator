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

module.exports.hello = async (event, context) => {
  await myGeoTableManager
    .putPoint({
      RangeKeyValue: { S: '1234' }, // Use this to ensure uniqueness of the hash/range pairs.
      GeoPoint: {
        // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
        latitude: 51.51,
        longitude: -0.13,
      },
      PutItemInput: {
        // Passed through to the underlying DynamoDB.putItem request. TableName is filled in for you.
        Item: {
          // The primary key, geohash and geojson data is filled in for you
          country: { S: 'UK' }, // Specify attribute values using { type: value } objects, like the DynamoDB API.
          capital: { S: 'London' },
        },
        // ... Anything else to pass through to `putItem`, eg ConditionExpression
      },
    })
    .promise()
    .then(function() {
      console.log('Done!');
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
