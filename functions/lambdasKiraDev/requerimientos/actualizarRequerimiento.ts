const AWS = require("aws-sdk");

const doClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function fnActualizarRequerimiento(infoDataUpdate: any) {


  let numeroPoliza = infoDataUpdate['numero_poliza'];
  let  numeroRequerimiento = infoDataUpdate['id_requerimiento'];

  console.log("numeroPoliza", numeroPoliza);

  const params = {
    TableName: process.env.REQUERIMIENTOS_TABLE,
    Key: {
      id:  numeroRequerimiento,
    },
  };
  try {
    console.log("Paramatros query : ", params);

    const { Item } = await doClient.get(params).promise();
    console.log("Siniestros encontrado : ", Item);

 

    //  return data.Item;

    
      await doClient.update({
        TableName: process.env.REQUERIMIENTOS_TABLE,
        Key: {
          id: Item.id,
        },
        "UpdateExpression": "set #DYNOBASE_user = :data",
        "ExpressionAttributeNames": {
          "#DYNOBASE_user": "data_requerimiento",
        },
        "ExpressionAttributeValues": {
          ":data": infoDataUpdate['data_requerimiento'],
        }

      }).promise();


      let tempItem =  infoDataUpdate;
      Item['data_requerimiento'] = tempItem['data_requerimiento']
      return Item

 
  }
  catch (err) {
    console.log("DynamDb error", err);
    return null;
  }
}

export default fnActualizarRequerimiento;