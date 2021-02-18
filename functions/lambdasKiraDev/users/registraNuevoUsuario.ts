const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function fnRegistrarNuevoUsuario(userRegister: any) {

  let itemId = randomInteger(1, 100000000);

  userRegister = {
    ...userRegister,
    id: String(itemId),
  };
  const params = {
    TableName: process.env.USER_TABLE,
    Item: userRegister,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("usuario", userRegister);
    await doClient.put(params).promise();
    return userRegister;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default fnRegistrarNuevoUsuario;
