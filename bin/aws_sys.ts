#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { AwsSysStack } from "../lib/aws_sys-stack";
import { UsersSysStack } from "../lib/user_sys-stack";
import { DatabaseSysStack } from "../lib/database_sys-stack";

const app = new cdk.App();

new AwsSysStack(app, "AwsSysStack", {
  env: {
    account: "640968704174",
    region: "us-east-2",
  },
});

/*
new UsersSysStack(app, "AwsSysStack", {
  env: {
    account: "640968704174",
    region: "us-east-2",
  },
});

new DatabaseSysStack(app, "AwsSysStack", {
  env: {
    account: "640968704174",
    region: "us-east-2",
  },
});
*/
