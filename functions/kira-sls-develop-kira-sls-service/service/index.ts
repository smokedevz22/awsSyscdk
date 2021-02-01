const loginService = require("./login");

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    clave: String;
    email: String;
  };
  identity: {
    sub: string;
    username: string;
  };
};

module.exports.handler = (event: AppSyncEvent) => {
  console.log("Received event {}", event);

  switch (event.info.fieldName) {
    case "login": {
      let data = event.arguments;
      console.log("inputData", data);

      let clave = event.arguments["clave"];

      const response = loginService(data, clave);
      //  callback(null, response)
      break;
    }
    default:
      // callback("Unknown field, unable to resolve" + event.field, null);
      break;
  }
};
