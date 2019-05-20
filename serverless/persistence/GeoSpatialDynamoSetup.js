const AWS = require('aws-sdk');
const ddbGeo = require('dynamodb-geo');
const sampleData = require('../../sample-data/sample-data.js');
const msabArtLocationsTableName = 'MsabArtLocationsTable';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // export your aws access key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // export your aws secret key
    region: "US-EAST-1"
});
const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') }); // Local development
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, msabArtLocationsTableName);
const msabArtLocationsTable = new ddbGeo.GeoDataManager(config);
var dynamodb = new AWS.DynamoDB();

function run() {
  createTable();
  queryRadius();
}

/**
* Creates a GeoSpatial DynamoDb table for MSAB Art Locations
*/
function createTable() {

  // Recommended hashKeyLength 3 for 100km radius searches
  config.hashKeyLength = 5;
  const createTableInput = ddbGeo.GeoTableUtil.getCreateTableRequest(config);

  //May need to create our own table; The GeoTableUtil.js helper function hard codes ProvisionedThroughput.
  createTableInput.ProvisionedThroughput.ReadCapacityUnits = 2;

  console.log('Creating table with schema:');
  console.dir(createTableInput, { depth: null });
  ddb.createTable(createTableInput).promise()
      .then(function () { return ddb.waitFor('tableExists', { TableName: config.tableName }).promise() })
      .then(function () {
        sampleData.forEach(function(artEntity) {
          addPoint(artEntity);
        });
      });
}

/**
* Add artEntity to local database
*/
function addPoint(artEntity) {
  msabArtLocationsTable.putPoint({
          RangeKeyValue: { S: artEntity.discipline ? artEntity.discipline : 'default' }, //discipline range key
          GeoPoint: { // random geohash for now until geocode api is implemented
              latitude: Math.floor(Math.random() * 50)+1,
              longitude: Math.floor(Math.random() * 50)+1
          },
          PutItemInput: {
              Item: {
                  city: { S: artEntity.city ? artEntity.city : 'default' },
                  state: { S: artEntity.state ? artEntity.state : 'default' },
                  address_one: { S: artEntity.ad1 ? artEntity.ad1 : 'default' },
                  address_two: {S: artEntity.ad2 ? artEntity.ad2: 'default'},
                  zip: {S: artEntity.zip ? artEntity.zip.toString(): '12345'}
              },
          }
      }).promise()
      .then(function() { console.log('Done!') });
}

function queryRadius() {
  console.log("Querying radius...");
  // Querying 10km from Cambridge, UK
  msabArtLocationsTable.queryRadius({
        RadiusInMeter: 10000,
        CenterPoint: {
            latitude: 51.51,
            longitude: -0.13
        }
    }).then(console.log);
}

run();
