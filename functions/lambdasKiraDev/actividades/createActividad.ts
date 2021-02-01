const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registerActividad(actividadItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  actividadItem = {
    ...actividadItem,
    id: String(itemId),
  };
  const params = {
    TableName: process.env.ACTIVIDAD_TABLE,
    Item: actividadItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("siniestro", actividadItem);
    await doClient.put(params).promise();
    return actividadItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registerActividad;
