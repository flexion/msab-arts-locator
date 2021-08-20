<p align="center">
  <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/flexion/msab-arts-locator/main">
  <a href="https://deepscan.io/dashboard#view=project&tid=8969&pid=17228&bid=388480"><img src="https://deepscan.io/api/teams/8969/projects/17228/branches/388480/badge/grade.svg" alt="DeepScan grade"></a>
  <img alt="Libraries.io dependency status for GitHub repo" src="https://img.shields.io/librariesio/github/flexion/msab-arts-locator">
</p>

## IAM setup

To run the serverless deploy (e.g. `yarn sls deploy --verbose --stage pre --force`), certain prerequisites need to be setup in IAM first.

### Deployer

The `deployer` account will be active in the session that runs the `yarn sls deploy ...` command. It needs an associated policy or role that provides the following permissions.

_Note_: `<account-id>` must be filled in with your AWS account ID (12-digit number).

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

### Lambda Execution Role

The `deployer` (above) policy has no `IAM` permissions to create the Lambda execution role, so the project configuration will also need to reference an existing IAM role that will be associated to the Lambda configurations, so they have access to the resources created by the CloudFormation stack.

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

Update the `.env.dev` configuration with the ARN of the role created above.

## Fullstack / web-app client

This project leverages `nodejs14.x` and the `fullstack-serverless` plugin to deploy the single-page client app in `client/`.

Change to the `src/` subdirectory and install dependencies

    npm i

Start the app in dev mode

    npm start

Build the app in prod mode

    npm run build

Test the app locally

    npm test
