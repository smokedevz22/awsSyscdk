const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registerSiniestro(siniestroItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  siniestroItem = {
    ...siniestroItem,
    id: String(itemId),
  };
  const params = {
    TableName: process.env.SINIESTRO_TABLE,
    Item: siniestroItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("siniestro", siniestroItem);
    await doClient.put(params).promise();
    return siniestroItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registerSiniestro;