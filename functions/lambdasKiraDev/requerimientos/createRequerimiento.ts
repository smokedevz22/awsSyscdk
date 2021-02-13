const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function createRequerimiento(requerimientoItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  requerimientoItem = {
    ...requerimientoItem,
    id: String(itemId),
    numero_poliza: String(itemId),

  };
  const params = {
    TableName: process.env.REQUERIMIENTOS_TABLE,
    Item: requerimientoItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("requerimiento", requerimientoItem);
    await doClient.put(params).promise();
    return requerimientoItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default createRequerimiento;
