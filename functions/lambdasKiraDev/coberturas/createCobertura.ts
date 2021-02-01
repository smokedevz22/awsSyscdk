const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registerCobertura(coberturaItem: any) {
  let itemId = randomInteger(1, 100000000);

  coberturaItem = {
    ...coberturaItem,
    id: String(itemId),
  };
  const params = {
    TableName: process.env.COBERTURA_TABLE,
    Item: coberturaItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("siniestro", coberturaItem);
    await doClient.put(params).promise();
    return coberturaItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registerCobertura;
