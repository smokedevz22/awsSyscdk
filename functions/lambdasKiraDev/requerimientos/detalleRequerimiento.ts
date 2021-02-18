const AWS = require("aws-sdk");

const doClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function listaRequerimientosPoliza(numeroPoliza:any) {
  const params = {
    TableName: process.env.REQUERIMIENTOS_TABLE,
    "ScanIndexForward": true,
    "FilterExpression": "#DYNOBASE_poliza = :numero_poliza",
    "ExpressionAttributeNames": {
      "#DYNOBASE_poliza": "numero_poliza"
    },
    "ExpressionAttributeValues": {
      ":numero_poliza": numeroPoliza
    }
  };


  try {
    console.log("params", params);
    const data = await doClient.scan(params).promise();

    console.log("Buscando en base de datos");
    console.log(data)

    return data.Items;
  } catch (err) {
    console.log("DynamDb error", err);
    return null;
  }
}

export default listaRequerimientosPoliza;
