const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registerCotizacion(cotizacionItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  cotizacionItem = {
    ...cotizacionItem,
    id: String(itemId),
    numero_cotizacion: String(itemId),

  };
  const params = {
    TableName: process.env.COTIZACION_TABLE,
    Item: cotizacionItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("siniestro", cotizacionItem);
    await doClient.put(params).promise();
    return cotizacionItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registerCotizacion;
