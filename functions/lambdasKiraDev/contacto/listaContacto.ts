const AWS = require("aws-sdk");

const doClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function getListaContacto() {
  const params = {
    TableName: process.env.CONTACTO_TABLE,
    
  };


  try {
    console.log("params", params);
    const data = await doClient.scan(params).promise();

    console.log("Buscando en base de datos");
    console.log(data)

    return data.Items;
  } catch (err) {
    console.log("DynamDb error", err);
    return null;
  }
}

export default getListaContacto;
