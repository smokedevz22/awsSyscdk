const AWS = require("aws-sdk");
const doClient = new AWS.DynamoDB.DocumentClient();

async function createBank(bank: any) {
  const params = {
    TableName: process.env.BANK_TABLE,
    Item: bank,
  };
  try {
    console.log("Registrando en base de datos");
    console.log("bankk", bank);
    await doClient.put(params).promise();
    return bank;
  } catch (err) {
    console.log("DynamDb error", err);
    return err;
  }
}

export default createBank;
