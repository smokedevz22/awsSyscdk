const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function DetalleCotizacion(identificadorCotizacion: any) {
  console.log("identificador", identificadorCotizacion);

 
  const params = {
    TableName: process.env.COTIZACION_TABLE,
    Key: {
      id:  identificadorCotizacion,
    },
  };
  try {
    console.log("params", params);

    const { Item } = await doClient.get(params).promise();
    console.log("Buscando en base de datos", Item);

    return Item;
  } catch (err) {
    console.log("DynamDb error", err);
    return null;
  }
}

export default DetalleCotizacion;
