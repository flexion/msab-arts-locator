# Introduction

The Minnesota State Arts Board (MSAB) Locator application is an AWS-based cloud-native mobile-friendly web application.

Below is a Deployment Architecture Diagram of the application.

![MSAB Deployment Architecture Diagram](docs/images/MSAB%20Architecture-2.png)

# Getting Started

The MSAB Locator application is designed leveraging the open-source Serverless Framework (https://serverless.com) Infrastructure-as-Code (IaC). However, before starting, some prerequisites must be satisfied and configured in order for the provisioning to be successful. In addition, the project provides an AWS CodeBuild `buildspec.yml` that automates the dependencies and provisioning steps required to deploy the system in AWS once the prerequisites have been satisfied and configured.

## Prerequisites

### TL;DR

In short, you need

- A root domain identified (e.g. `msab.flexion.us`)
- An API Key for the Google Geocoding service
- An API Key (pair) for the Google reCAPTCHA (v2) service
- A working configuration for either AWS SES, GMail, or O365 email services

### Identify your Root Domain

The _Root Domain_ configuration tells the provisioning automation what base DNS will be used to access the deployed system. The deployments are designed to be _namespaced_ allowing for multiple deployments into the same AWS account for development, testing, and production purposes. In a subsequent step, you will pick a `stage` identifier, this will be combined with the _Root Domain_ you identify to form the fully-qualified domain name (FQDN) of the deployment.

e.g. if we identify a _Root Domain_ or `msab.flexion.us` and a `stage` identifier to namespace the deployment of `qa`, then the IaC will provision `qa.msab.flexion.us` as the CloudFront Content Distribution Network (CDN) endpoint hosting the application. This also means that the AWS ACM certificate must cover this FQDN.

### API keys for Google Services

You will need to setup API keys for two Google Cloud services leveraged by the MSAB Locator application, Geocoding and reCAPTCHA v2.

- Google reCAPTCHA - https://developers.google.com/recaptcha/intro
- Google Maps Geocoding - https://developers.google.com/maps/documentation/geocoding/start

These both require that a Google Cloud account is setup with valid billing information. Follow (the documentation)[https://cloud.google.com/apigee/docs/hybrid/v1.3/precog-gcpaccount] to setup an account.

#### Maps Geocoding

Once you've created your Google Cloud account and setup valid billing information, you can find the Geocoding API to enable through the search function or by clicking [here](https://console.cloud.google.com/marketplace/product/google/geocoding-backend.googleapis.com).

1. Click the `Enable` button
2. Navigate to `Credentials` in the left navigation
3. Click `+ Create Credentials` in the top navigation bar, where it should have selected the `Geocoding API`
4. Select the `API Key` option

This will bring up a modal, save your key for future configuration. No restrictions are needed on this key at this time.

#### reCAPTCHA

Access http://www.google.com/recaptcha/admin to setup a key pair (client/server). You'll _Register a new site_, providing

1. Label: anything you want, site URL is a good option if it's descriptive enough
2. reCAPTCHA type: v2
3. Domains: the domains the reCAPTCHA will be served from (base domain should suffice, e.g. msab.flexion.us should enable \*.msab.flexion.us)
4. Owners: email addresses/accounts that can administer
5. Accept the reCAPTCH TOS
6. Send alerts to owners: optional

Submit

You'll receive two keys - a client-side key and a server-side secret. The client-side key is encoded in the React client code (see `src/config/config.js`), the server-side secret is provided in the serverless environment config (see `config/example.yml`).

## AWS Setup

### TL;DR

This project utilizes Infrastructure-as-Code (IaC) to automate the build & deployment (CI/CD) of the application. To utilize this, some things need to be setup in AWS first.

- An AWS Certificate Manager certificate ID that covers the FQDN (e.g. `*.msab.flexion.us` or `www.msab.flexion.us`) of the deployment
- AWS IAM roles defined for _deployment_ and _lambda execution_
- A private AWS S3 bucket for dropping application release archives in
- An AWS CodeBuild configuration for running the `buildspec.yml`, associated with the right AWS IAM permissions

These steps should be completed by an AWS admin with sufficient privileges. Privileges for these operations are _not_ needed after their original setup.

### Create an SSL/TLS certificate in AWS ACM (`us-east-1`)

**Important Note:**

> In order for the FQDN to be served by the CloudFront CDN securely, an SSL/TLS certificate needs to be setup in AWS ACM _**in the `us-east-1` region**_. Since CloudFront is a global service, it _ALWAYS_ looks in `us-east-1` for ACM certificates. Please check what region you're in when setting up the ACM certificate - everything else can be setup in whatever region is desired (e.g. `us-east-2`).

You can have ACM setup a new certificate (recommended) or import an existing 3rd-party certificate (see [import certificate](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html) in the AWS docs). The certificate you setup can be for a particular FQDN (e.g. `qa.msab.flexion.us`) or for a wildcard certificate, which is recommended (e.g. `*.msab.flexion.us`). You can reference the [AWS docs for ACM](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) for the specific steps to create & verify/validate your certificate. Once verified, you will need the `certificate id` for the certificate you want to use for MSAB Locator.

### Create S3 bucket for release archives

If planning to use the AWS CodeBuild IaC (documented below) - create an S3 bucket now to copy release archives into, so that you can setup the correct IAM permissions for the deployer role (next).

Suggested name: `msab-arts-locator-releases`

### Create IAM roles

This project leverages externally created IAM roles for organizations that do not want to provision an AWS account with IAM privileges.

#### Deployer Policy

This role will be need to be active in the session that ultimately runs the `yarn sls deploy ...` command (e.g. AWS CodeBuild). It needs an associated policythat provides the following permissions.

_Note_: `<account-id>` must be filled in with your organization's specific AWS account ID (12-digit number).

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:*"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:List*",
                "cloudformation:Get*",
                "cloudformation:ValidateTemplate"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:CreateStack",
                "cloudformation:CreateUploadBucket",
                "cloudformation:DeleteStack",
                "cloudformation:Describe*",
                "cloudformation:UpdateStack"
            ],
            "Resource": [
                "arn:aws:cloudformation:*:*:stack/msab-arts-locator-*/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:Get*",
                "lambda:List*",
                "lambda:CreateFunction"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
              "apigateway:GET",
              "apigateway:POST",
              "apigateway:PUT",
              "apigateway:DELETE",
              "apigateway:PATCH"
            ],
            "Resource": [
              "arn:aws:apigateway:*::/restapis*",
              "arn:aws:apigateway:*::/apikeys*",
              "arn:aws:apigateway:*::/usageplans*",
              "arn:aws:apigateway:*::/tags*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:List*"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:Create*",
                "s3:Delete*",
                "s3:List*",
                "s3:Put*"
            ],
            "Resource": [
                "arn:aws:s3:::msab-arts-locator-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:*"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:AddPermission",
                "lambda:CreateAlias",
                "lambda:DeleteFunction",
                "lambda:InvokeFunction",
                "lambda:PublishVersion",
                "lambda:RemovePermission",
                "lambda:Update*"
            ],
            "Resource": [
                "arn:aws:lambda:*:*:function:msab-arts-locator-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudwatch:GetMetricStatistics"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DeleteLogGroup"
            ],
            "Resource": [
                "arn:aws:logs:*:*:*"
            ],
            "Effect": "Allow"
        },
        {
            "Action": [
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:*:*:*"
            ],
            "Effect": "Allow"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:DescribeLogStreams",
                "logs:DescribeLogGroups",
                "logs:FilterLogEvents"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "events:Put*",
                "events:Remove*",
                "events:Delete*"
            ],
            "Resource": [
                "arn:aws:events:*:*:rule/msab-arts-locator-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "events:DescribeRule"
            ],
            "Resource": [
                "arn:aws:events:*:*:rule/msab-arts-locator-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket",
                "s3:ListAllMyBuckets"
            ],
            "Resource": [
                "arn:aws:s3:::msab-arts-locator-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "arn:aws:iam::<account-id>:role/msab-arts-locator-*"
        }
    ]
}
```

#### Lambda Execution Role

The `deployer` (above) policy has no `IAM` permissions to create the Lambda execution role, so the project configuration will also need to reference an existing IAM role that will be associated to the Lambda configurations, so they have access to the resources created by the CloudFormation stack.

Create an IAM policy with the contents below as well as an IAM role that is associated to that policy, for Lambda.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "*"
            ],
            "Effect": "Allow"
        },
        {
            "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:BatchWriteItem",
                "dynamodb:PutItem",
                "dynamodb:DescribeTable",
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:Scan",
                "dynamodb:Query",
                "dynamodb:UpdateItem"
            ],
            "Resource": [
                "arn:aws:dynamodb:<region>:<account-id>:table/msab-arts-locator-gis-*"
            ],
            "Effect": "Allow"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::msab-arts-locator-*-images"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject*"
            ],
            "Resource": [
                "arn:aws:s3:::msab-arts-locator-*-images/*"
            ]
        }
    ]
}
```

Note the ARN of the role created above, you'll need to provide this for the IaC configuration.

### Setup AWS CodeBuild

AWS CodeBuild is a build/deployment automation service, much like TFS, Jenkins, GitHub Actions, etc. This project provides a `buildspec.yml` that contains the CodeBuild automation to build & fully deploy the application and any subsequent updates. This process is _idempotent_ - re-running it is fine and will result in the same end-state as a previous run if the same release archive is used.

An alternative to using CodeBuild would be to create a service account with the same role as what we will associate with CodeBuild and leverage that service account from another system, such as TFS, Jenkins, GitHub Actions, etc. Note, the steps in the `buildspec.yml` will need to be translated into another system if CodeBuild isn't used. The steps could also be run manually.

#### CodeBuild Setup

There's a few things to check/setup for CodeBuild, but most of these are defaults. The key things are:

- The S3 bucket where it's going to grab the release archive .ZIP file
- The container image it's going to run the build from
- The environment variables to populate for the build process

**Note**: setup CodeBuild in the same region as the S3 bucket!

Here's the details.

- Project configuration
  - (Yes) Restrict number of concurrent builds this project can start
  - (1) Concurrent build limit
- Source
  - (S3) Source provider
  - Choose bucket previously created, e.g. `msab-arts-locator-releases`
  - Choose path to archive in bucket for this job, e.g. `staging/msab-arts-locator.zip`
  - (Yes) Allow AWS CodeBuild to modify this service role so it can be used with this build project
- Environment
  - Choose the CodeBuild standard image (`aws/codebuild/standard:5.0`) to run builds/deploy jobs on
    - Managed image
    - (Ubuntu) Operating System
    - (Standard) Runtime(s)
    - (aws/codebuild/standard:5.0) Image
    - (Always use latest) Image version
    - (Linux) Environment type
  - Use built-in service role
  - Additional configuration (keep all defaults)
    - Environment variables
      - `DOMAIN_NAME_ROOT` (whatever you picked before, e.g. `msab.flexion.us`)
      - `AWS_TLS_CERTIFICATE_ID` (whatever you setup before, looks like a GUID)
      - `EMAIL_USERNAME` (used to configure the email gateway)
      - `EMAIL_PASSWORD` (used to configure the email gateway)
      - `GOOGLE_CAPTCHA_KEY` (whatever you saved from the reCAPTCHA setup before)
      - `GOOGLE_GEOCODING_API_KEY` (whatever you saved from the geocoder setup before)
      - `STAGE` (the namespace for this job to deploy to, e.g. `staging` or `live` or anything you want it to be)
- Buildspec
  - (Select) Use a buildspec file
- No artifacts or batch configuration (skip)
- Logs
  - (Yes) Cloudwatch logs (optional)

**Important**: Once this setup is completed, the IAM `deployer` policy needs to be associated with the CodeBuild role that AWS generates for you.
