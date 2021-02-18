const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function EliminarCotizacion(identificadorCotizacion: any) {
  console.log("identificador", identificadorCotizacion);

 
  const params = {
    TableName: process.env.COTIZACION_TABLE,
    Key: {
      id:  identificadorCotizacion,
    },
  };
  try {
    console.log("params", params);

    const { Item } = await doClient.delete(params).promise();
    console.log("Buscando en base de datos", Item);

    return identificadorCotizacion;
  } catch (err) {
    console.log("DynamDb error", err);
    return null;
  }
}

export default EliminarCotizacion;
