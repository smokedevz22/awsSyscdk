import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as rds from "@aws-cdk/aws-rds";
import * as ddb from "@aws-cdk/aws-dynamodb";

import { SubnetType, Vpc } from "@aws-cdk/aws-ec2";
import { AuthorizationType, FieldLogLevel } from "@aws-cdk/aws-appsync";
import { UserPool } from "@aws-cdk/aws-cognito/lib/user-pool";
import { StringAttribute } from "@aws-cdk/aws-cognito/lib/user-pool-attr";
import { PolicyStatement, Effect } from "@aws-cdk/aws-iam";
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
} from "@aws-cdk/custom-resources/lib/aws-custom-resource/aws-custom-resource";
import { UserPoolClient } from "@aws-cdk/aws-cognito/lib/user-pool-client";

export class UsersSysStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, "kira-userpool-test", {
      userPoolName: "kira-userpool-test",
      selfSignUpEnabled: true,
      customAttributes: {
        member_status: new StringAttribute(),
      },
      signInAliases: {
        email: true,
        phone: true,
        username: true,
      },
    });

    const userPoolClient = new UserPoolClient(this, "UserPoolClient", {
      userPool,
    });

    //CREACION DE USUARIO DEMO
    new AwsCustomResource(this, "UserPoolDomainNameCustomResource", {
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ["cognito-idp:*"],
          resources: ["*"],
        }),
      ]),
      onCreate: {
        service: "CognitoIdentityServiceProvider",
        action: "adminCreateUser",
        parameters: {
          UserPoolId: userPool.userPoolId,
          Username: "kiraadminuser",
          TemporaryPassword: "Kiraxyz123@",
          UserAttributes: [
            { Name: "email", Value: "kira@microsystem.com" },
            { Name: "email_verified", Value: "True" },
            { Name: "custom:member_status", Value: "gold_member_status" },
          ],
          MessageAction: "SUPPRESS",
        },
        physicalResourceId: {
          id: "userpoolcreateid" + Date.now().toString(),
        },
      },
    });

    new cdk.CfnOutput(this, "Cognito-Demo-ClientID", {
      value: userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, "stack region", {
      value: this.region,
    });
  }
}
