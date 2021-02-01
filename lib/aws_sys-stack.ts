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

export class AwsSysStack extends cdk.Stack {
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

    //CREACION VPC
    const vpc = new Vpc(this, "Vpc", {
      cidr: "10.0.0.0/16",
      subnetConfiguration: [
        { cidrMask: 22, name: "Public", subnetType: SubnetType.PUBLIC },
        { cidrMask: 22, name: "Private", subnetType: SubnetType.PRIVATE },
      ],
    });

    //CREATE CLUSTER AURORA

    const cluster = new rds.ServerlessCluster(this, "KiraTestCluster", {
      engine: rds.DatabaseClusterEngine.AURORA_MYSQL,
      parameterGroup: rds.ParameterGroup.fromParameterGroupName(
        this,
        "ParameterGroup",
        "default.aurora-mysql5.7"
      ),
      defaultDatabaseName: "kiratestApp",
      vpc,
      scaling: { autoPause: cdk.Duration.seconds(0) }, // Optional. If not set, then instance will pause after 5 minutes
    });


    //API APPSYNC
    const api = new appsync.GraphqlApi(this, "Api", {
      name: "cdk-kira-test",
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
      schema: appsync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool,
            },
          },
        ],
      },
      xrayEnabled: true,
    });

    
    const globalesTable = new ddb.Table(this, "tableGlobales", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const coberturasTable = new ddb.Table(this, "tableCobertura", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const actividadesTable = new ddb.Table(this, "tableActividades", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const cotizacionesTable = new ddb.Table(this, "tableCotizaciones", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const planesTable = new ddb.Table(this, "tablePlanes", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const subplanesTable = new ddb.Table(this, "tableSubPlanes", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const multimediaTable = new ddb.Table(this, "tableMultimedia", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const polizasTable = new ddb.Table(this, "tablePolizas", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

  

    const productosTable = new ddb.Table(this, "tableProductos", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const siniestrosTable = new ddb.Table(this, "tableSiniestros", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const usersTable = new ddb.Table(this, "tableUsers", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    //REGISTRO LAMBDA FUNCTIONS
    const ActividadesFn = new lambda.Function(this, "actividadesFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/actividades"),
      handler: "index.handler",
      memorySize: 1024,
    });

    const CoberturasFn = new lambda.Function(this, "coberturasFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/coberturas"),
      handler: "index.handler",
      memorySize: 1024,
    });

    const CotizacionesFn = new lambda.Function(this, "cotizacionesFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/cotizaciones"),
      handler: "index.handler",
      memorySize: 1024,
    });

    const GlobalesFn = new lambda.Function(this, "globalesFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/globales"),
      handler: "index.handler",
      memorySize: 1024,
    });

    const MultimediaFn = new lambda.Function(this, "multimediaFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/multimedia"),
      handler: "index.handler",
      memorySize: 1024,
    });
    const PlanesFn = new lambda.Function(this, "planesFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/planes"),
      handler: "index.handler",
      memorySize: 1024,
    });
    const PolizasFn = new lambda.Function(this, "polizasFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/polizas"),
      handler: "index.handler",
      memorySize: 1024,
    });
    const ProductosFn = new lambda.Function(this, "productosFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/productos"),
      handler: "index.handler",
      memorySize: 1024,
    });
    const SiniestrosFn = new lambda.Function(this, "siniestrosFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/siniestros"),
      handler: "index.handler",
      memorySize: 1024,
    });
    const UsersFn = new lambda.Function(this, "userFunctions", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions/lambdasKiraDev/users"),
      handler: "index.handler",
      memorySize: 1024,
    });

    globalesTable.grantFullAccess(GlobalesFn);
    coberturasTable.grantFullAccess(CoberturasFn)
    actividadesTable.grantFullAccess(ActividadesFn);
    cotizacionesTable.grantFullAccess(CotizacionesFn);
    multimediaTable.grantFullAccess(MultimediaFn);
    planesTable.grantFullAccess(PlanesFn);
    subplanesTable.grantFullAccess(PlanesFn);
    polizasTable.grantFullAccess(PolizasFn);
    productosTable.grantFullAccess(ProductosFn);
    siniestrosTable.grantFullAccess(SiniestrosFn);
    usersTable.grantFullAccess(UsersFn);

    GlobalesFn.addEnvironment("GLOBAL_TABLE", globalesTable.tableName);
    ActividadesFn.addEnvironment("ACTIVIDAD_TABLE", actividadesTable.tableName);
    CoberturasFn.addEnvironment("COBERTURA_TABLE", coberturasTable.tableName);

    CotizacionesFn.addEnvironment(
      "COTIZACION_TABLE",
      cotizacionesTable.tableName
    );
    MultimediaFn.addEnvironment("MULTIMEDIA_TABLE", multimediaTable.tableName);
    PlanesFn.addEnvironment("PLAN_TABLE", planesTable.tableName);
    PlanesFn.addEnvironment("SUBPLAN_TABLE", subplanesTable.tableName);

    PolizasFn.addEnvironment("POLIZA_TABLE", polizasTable.tableName);
    ProductosFn.addEnvironment("PRODUCTO_TABLE", productosTable.tableName);
    SiniestrosFn.addEnvironment("SINIESTRO_TABLE", siniestrosTable.tableName);
    UsersFn.addEnvironment("USER_TABLE", usersTable.tableName);

    const lambdaGlobales = api.addLambdaDataSource(
      "globalFunctions",
      GlobalesFn
    );
    const lambdaCoberturas = api.addLambdaDataSource(
      "coberturasFunctions",
      CoberturasFn
    );
    const lambdaActividades = api.addLambdaDataSource(
      "actividadesFunctions",
      ActividadesFn
    );
    const lambdaCotizaciones = api.addLambdaDataSource(
      "cotizacionesFunctions",
      CotizacionesFn
    );
    const lambdaMultimedia = api.addLambdaDataSource(
      "multimediaFunctions",
      MultimediaFn
    );
    const lambdaPlanes = api.addLambdaDataSource("planesFunctions", PlanesFn);
    const lambdaPolizas = api.addLambdaDataSource(
      "polizasFunctions",
      PolizasFn
    );
    const lambdaProductos = api.addLambdaDataSource(
      "productosFunctions",
      ProductosFn
    );
    const lambdaSiniestros = api.addLambdaDataSource(
      "siniestrosFunctions",
      SiniestrosFn
    );
    const lambdaUsers = api.addLambdaDataSource("usersFunctions", UsersFn);

    /**

    lambdaGlobales.createResolver({
      typeName: "Mutation",
      fieldName: "createCuentaDepositos",
    });
    lambdaGlobales.createResolver({
      typeName: "Mutation",
      fieldName: "createMedioPago",
    });
    lambdaGlobales.createResolver({
      typeName: "Mutation",
      fieldName: "deleteCuentaDeposito",
    });

    lambdaGlobales.createResolver({
      typeName: "Mutation",
      fieldName: "deleteMedioPago",
    });
    */
     

    //***  ACTIVIDADES */
    lambdaActividades.createResolver({
      typeName: "Mutation",
      fieldName: "registerActividad",
    });
    lambdaActividades.createResolver({
      typeName: "Query",
      fieldName: "listasActividades",
    });
    //***  COBERTURAS */
    lambdaCoberturas.createResolver({
      typeName: "Mutation",
      fieldName: "registerCoberturas",
    });
    lambdaCoberturas.createResolver({
      typeName: "Query",
      fieldName: "listasCoberturas",
    });

    //***  COTIZACIONES */
    lambdaCotizaciones.createResolver({
      typeName: "Mutation",
      fieldName: "registrarNuevaCotizacion",
    });
    lambdaCotizaciones.createResolver({
      typeName: "Query",
      fieldName: "listasCotizaciones",
    });

    lambdaCotizaciones.createResolver({
      typeName: "Query",
      fieldName: "detalleCotizacion",
    });
    //*** MULTIMEDIA */
    lambdaMultimedia.createResolver({
      typeName: "Mutation",
      fieldName: "registerMultimedia",
    });

    //*** PLANES */
    lambdaPlanes.createResolver({
      typeName: "Mutation",
      fieldName: "registerPlan",
    });
    lambdaPlanes.createResolver({
      typeName: "Mutation",
      fieldName: "registerSubPlan",
    });
    lambdaPlanes.createResolver({
      typeName: "Query",
      fieldName: "listasPlanes",
    });
    lambdaPlanes.createResolver({
      typeName: "Query",
      fieldName: "listasSubPlanes",
    });
    //** POLIZAS */
    lambdaPolizas.createResolver({
      typeName: "Mutation",
      fieldName: "startPoliza",
    });
    lambdaPolizas.createResolver({
      typeName: "Mutation",
      fieldName: "registrarNuevaPoliza",
    });
    lambdaPolizas.createResolver({
      typeName: "Query",
      fieldName: "detallePoliza",
    });

    lambdaPolizas.createResolver({
      typeName: "Query",
      fieldName: "listasPolizas",
    });
    lambdaPolizas.createResolver({
      typeName: "Mutation",
      fieldName: "deletePoliza",
    });

    
    //** PRODUCTOS */
    lambdaProductos.createResolver({
      typeName: "Mutation",
      fieldName: "registerProducto",
    });
    lambdaProductos.createResolver({
      typeName: "Query",
      fieldName: "listasProductos",
    });
    //*** SINIESTROS */
    lambdaSiniestros.createResolver({
      typeName: "Mutation",
      fieldName: "registrarNuevoSiniestro",
    });
    lambdaSiniestros.createResolver({
      typeName: "Query",
      fieldName: "listasSiniestros",
    });
    
    lambdaSiniestros.createResolver({
      typeName: "Query",
      fieldName: "detalleSiniestro",
    });



    lambdaSiniestros.createResolver({
      typeName: "Mutation",
      fieldName: "desestimarSiniestro",
    });

    //** USERS */
    lambdaUsers.createResolver({
      typeName: "Mutation",
      fieldName: "registerUser",
    });
    lambdaUsers.createResolver({
      typeName: "Query",
      fieldName: "listasUsuario",
    });

    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl || "",
    });

    new cdk.CfnOutput(this, "GraphQLAPIKEY", {
      value: api.apiKey || "",
    });

    new cdk.CfnOutput(this, "Cognito-Demo-ClientID", {
      value: userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, "stack region", {
      value: this.region,
    });
  }
}
