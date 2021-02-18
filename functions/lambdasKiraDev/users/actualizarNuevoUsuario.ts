const AWS = require("aws-sdk");

const doClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function fnActualizarNuevoUsuario(infoDataUpdate: any) {


  let dataUser = infoDataUpdate['email'];

  console.log("emailUSer", dataUser);

  const params = {
    TableName: process.env.USER_TABLE,
    "ScanIndexForward": true,
    "FilterExpression": "#DYNOBASE_email = :email",
    "ExpressionAttributeNames": {
      "#DYNOBASE_email": "email"
    },
    "ExpressionAttributeValues": {
      ":email": dataUser
    }
  };


  try {





    console.log("params", params);
    const data = await doClient.scan(params).promise();

    console.log("Buscando en base de datos");
    console.log(data)

    //  return data.Item;

    for (const item of data.Items || []) {
      console.info(item.id);
      await doClient.update({
        TableName: process.env.USER_TABLE,
        Key: {
          id: item.id,
        },
        "UpdateExpression": "set #DYNOBASE_user = :data",
        "ExpressionAttributeNames": {
          "#DYNOBASE_user": "data_usuario",
        },
        "ExpressionAttributeValues": {
          ":data": infoDataUpdate['data_usuario'],
        }

      }).promise();


      let tempItem =  infoDataUpdate;
      item['data_usuario'] = tempItem['data_usuario']
      return item


    }
  }
  catch (err) {
    console.log("DynamDb error", err);
    return null;
  }
}

export default fnActualizarNuevoUsuario;