const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registerMultimedia(multimediaItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  multimediaItem = {
    ...multimediaItem,
    id: String(itemId),
  };
  const params = {
    TableName: process.env.MULTIMEDIA_TABLE,
    Item: multimediaItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("siniestro", multimediaItem);
    await doClient.put(params).promise();
    return multimediaItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registerMultimedia;
