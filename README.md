# Development

This project leverages AWS Lambda runtime `nodejs8.10`, so using Node 8 locally is a good idea to avoid accidentally introducing incompatibilities (like `Promise.finally`).
```
nvm use 8.10
```
## Prerequisites

Deployment creates secure API endpoints behind a custom domain. In order for this to work, an SSL certificate needs to be configured (uploaded or created) in AWS Certificate Manager (ACM) and a DNS zone needs to be setup in Route53.

| DNS zone | Certificate |
| -------- | ----------- |
| foo.bar.com | *.foo.bar.com |

In addition, a namespace Route53 entry needs to be created. E.g.: `serverless create_domain --stage bdruth`
```
serverless create_domain --stage <namespace>
```
## Deploying

The service stack is namespaced to allow multiple concurrent deployments for testing, debugging, etc. E.g.: `sls deploy --stage bdruth`
```
sls deploy --stage <namespace>
```

Start the app in dev mode

    npm start

Build the app in prod mode

    npm run build
