const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function getListaProductos() {
  const params = {
    TableName: process.env.PRODUCTO_TABLE,
  };
  try {
    console.log("params", params);

    const data = await doClient.scan(params).promise();
     console.log("Buscando en base de datos"+data);

    return data.Items;
  } catch (err) {
    console.log("DynamDb error", err);
    return null;
  }
}

export default getListaProductos;
