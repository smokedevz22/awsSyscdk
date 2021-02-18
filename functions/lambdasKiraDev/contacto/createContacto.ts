const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registrarContacto(inputItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  inputItem = {
    ...inputItem,
    id: String(itemId),
 
  };
  const params = {
    TableName: process.env.REQUERIMIENTOS_TABLE,
    Item: inputItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("requerimiento", inputItem);
    await doClient.put(params).promise();
    return inputItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registrarContacto;
