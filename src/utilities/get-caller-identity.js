const AWS = require('aws-sdk');
let sts = new AWS.STS();
let params = {};
sts.getCallerIdentity(params, function (err) {
  if (err) {
    console.log(err, err.stack);
    console.error(
      'Error accessing AWS environment, please ensure your AWS env vars are setup!',
    );
    process.exit(1);
  }
});
