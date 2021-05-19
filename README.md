<p align="center">
  <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/flexion/msab-arts-locator/main">
  <a href="https://deepscan.io/dashboard#view=project&tid=8969&pid=17228&bid=388480"><img src="https://deepscan.io/api/teams/8969/projects/17228/branches/388480/badge/grade.svg" alt="DeepScan grade"></a>
  <img alt="Libraries.io dependency status for GitHub repo" src="https://img.shields.io/librariesio/github/flexion/msab-arts-locator">
</p>

# Development

This project leverages AWS Lambda runtime `nodejs12.x`, so using Node 12 locally is a good idea to avoid accidentally introducing incompatibilities.

```
nvm i 12
npm i -g yarn
```

## AWS Access

To run any `serverless` commands, AWS command-line access is required. When using an IAM user directly, ensure

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

are set. If using assume-role with MFA or a federated account, ensure

- `AWS_SESSION_TOKEN`

is also set.

Basically, if you can run commands like `aws s3 ls`, then you should be in good shape.

## GOOGLE Access

To use the various google apis, you will need to get api keys for:
Google reCAPTCHA - https://developers.google.com/recaptcha/intro
Google Maps - https://developers.google.com/maps/documentation/geocoding/start

The environment variables for these keys are:
GOOGLE_CAPTCHA_KEY (server-side secret)
GOOGLE_GEOCODING_API_KEY

### reCAPTCHA

Access http://www.google.com/recaptcha/admin to setup a key pair (client/server). You'll _Register a new site_, providing 

1. Label: anything you want, site URL is a good option if it's descriptive enough
2. reCAPTCHA type: v2
3. Domains: the domains the reCAPTCHA will be served from (base domain should suffice, e.g. msab.flexion.us should enable *.msab.flexion.us)
4. Owners: email addresses/accounts that can administer
5. Accept the reCAPTCH TOS
6. Send alerts to owners: optional

Submit

You'll receive two keys - a client-side key and a server-side secret. The client-side key is encoded in the React client code (see `src/config/config.js`), the server-side secret is provided in the serverless environment config (see `config/example.yml`).

## Prerequisites

Deployment creates secure API endpoints behind a custom domain. In order for this to work, an SSL certificate needs to be configured (uploaded or created) in AWS Certificate Manager (ACM) and a DNS zone needs to be setup in Route53.

| DNS zone    | Certificate    |
| ----------- | -------------- |
| foo.bar.com | \*.foo.bar.com |

The build environment needs to be populated with the variables in `sample.env` with values corresponding to the resources setup here.

- `HOSTZONEID` corresponds to the alphanumeric identifier in Route53 (only required if Route53 is being used)
- `CERTIFICATE_ID` is the uuidv4 GUID of the AWS Certificate Manager wildcard certificate created in us-east-1 (required!) for the `DOMAIN_NAME`
- `DOMAIN_NAME` is the DNS zone that corresponds to the SSL/TLS certificate registered that the API & web-app will be hosted under.

## Deploying

The service stack is namespaced to allow multiple concurrent deployments for testing, debugging, etc. E.g.: `yarn sls deploy --stage bdruth --force`
**Note** The env vars need to be properly populated per prerequisites above.

```
yarn sls deploy --stage <namespace> --force
```

## Fullstack / web-app client

This project leverages the `fullstack-serverless` plugin to deploy the single-page client app in `client/`.

Start the app in dev mode

    yarn start

Build the app in prod mode

    yarn build

Test the app locally

    yarn test
