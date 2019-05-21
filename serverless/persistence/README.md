#GeoSpatialDynamoSetup
This is a temporary script to build a local dynamo db database.
* The sample data comes from `sample-data.js` in the sample-data directory

## Set up:
Node is required to run the script.
Export your aws credentials.
example:
* `export AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID`
* `export AWS_SECRET_ACCESS_KEY=YOUR_AWS_ACCESS_SECRET_KEY`

Set up a local dynamodb instance
See aws docs for further details: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
* install the dynamodb local jar from the link above.
* run `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb` after installing the jar file for dynamodb from the link above. This will be a running instance of dynamodb on your machine.

## To Run the script after set up:
node serverless/persistence/GeoSpatialDynamoSetup.js

## To use the server UI:
Open http://localhost:8000/shell/# in your browser
