const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registerProducto(productoItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  productoItem = {
    ...productoItem,
    id: String(itemId),
  };
  const params = {
    TableName: process.env.PRODUCTO_TABLE,
    Item: productoItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("siniestro", productoItem);
    await doClient.put(params).promise();
    return productoItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registerProducto;
