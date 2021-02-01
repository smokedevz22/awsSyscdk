const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registerPoliza(polizaItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  polizaItem = {
    ...polizaItem,
    id: String(itemId),
  };
  const params = {
    TableName: process.env.POLIZA_TABLE,
    Item: polizaItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("siniestro", polizaItem);
    await doClient.put(params).promise();
    return polizaItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registerPoliza;
