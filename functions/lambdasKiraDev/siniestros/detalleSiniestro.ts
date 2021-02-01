const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function DetalleSiniestro(idElemento: any) {
  console.log("ID-Siniestro", idElemento);

 
  const params = {
    TableName: process.env.SINIESTRO_TABLE,
    Key: {
      id:  idElemento,
    },
  };
  try {
    console.log("Paramatros query : ", params);

    const { Item } = await doClient.get(params).promise();
    console.log("Siniestros encontrado : ", Item);

    return Item;
  } catch (err) {
    console.log("DynamDb error", err);
    return null;
  }
}

export default DetalleSiniestro;
