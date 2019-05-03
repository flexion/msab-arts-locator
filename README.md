# Development

This project leverages AWS Lambda runtime `nodejs8.10`, so using Node 8 locally is a good idea to avoid accidentally introducing incompatibilities (like `Promise.finally`).
```
nvm use 8.10
```

## AWS Access

To run any `serverless` commands, AWS command-line access is required. When using an IAM user directly, ensure

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`

are set. If using assume-role with MFA or a federated account, ensure

* `AWS_SESSION_TOKEN`

is also set.

Basically, if you can run commands like `aws s3 ls`, then you should be in good shape.

## Prerequisites

Deployment creates secure API endpoints behind a custom domain. In order for this to work, an SSL certificate needs to be configured (uploaded or created) in AWS Certificate Manager (ACM) and a DNS zone needs to be setup in Route53.

| DNS zone | Certificate |
| -------- | ----------- |
| foo.bar.com | *.foo.bar.com |

The build environment needs to be populated with the variables in `sample.env` with values corresponding to the resources setup here.

* `HOSTZONEID` corresponds to the alphanumeric identifier in Route53 (only required if Route53 is being used)
* `CERTIFICATE_ID` is the uuidv4 GUID of the AWS Certificate Manager wildcard certificate created in us-east-1 (required!) for the `DOMAIN_NAME`
* `DOMAIN_NAME` is the DNS zone that corresponds to the SSL/TLS certificate registered that the API & web-app will be hosted under.

## Deploying

The service stack is namespaced to allow multiple concurrent deployments for testing, debugging, etc. E.g.: `sls deploy --stage bdruth --force`
**Note** The env vars need to be properly populated per prerequisites above.

```
sls deploy --stage <namespace> --force
```

## Fullstack / web-app client

This project leverages the `fullstack-serverless` plugin to deploy the single-page client app in `client/`.

Start the app in dev mode

    npm start

Build the app in prod mode

    npm run build

Test the app locally

    npm test

