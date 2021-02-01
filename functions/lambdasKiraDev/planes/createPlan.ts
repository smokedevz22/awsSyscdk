const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function registerPlan(planItem: any) {
  
  let itemId = randomInteger(1, 100000000);

  planItem = {
    ...planItem,
    id: String(itemId),
  };
  const params = {
    TableName: process.env.PLAN_TABLE,
    Item: planItem,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("siniestro", planItem);
    await doClient.put(params).promise();
    return planItem;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default registerPlan;
