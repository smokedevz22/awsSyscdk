const AWS = require("aws-sdk");

const doClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function getListaSiniestrosPoliza(numero_poliza:any) {
  const params = {
    TableName: process.env.SINIESTRO_TABLE,
    "ScanIndexForward": true,
    "FilterExpression": "#DYNOBASE_numero_poliza = :numero_poliza",
    "ExpressionAttributeNames": {
      "#DYNOBASE_numero_poliza": "numero_poliza"
    },
    "ExpressionAttributeValues": {
      ":numero_poliza": numero_poliza
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

export default getListaSiniestrosPoliza;
