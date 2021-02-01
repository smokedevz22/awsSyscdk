import createBank from "./createBank";
import getBanks from "./getBanks";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
  };
  identity: {
    sub: string;
    username: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);

  switch (event.info.fieldName) {
    case "createBank":
      let subItem = event.arguments["input"];
      let item = {
        ...subItem,
      };
      let response = await createBank(item);

      console.log("server-response", response);
      return response;

    case "getBanks":
      console.log("getBanks");

      let data = await getBanks();
      return data;
    
    default:
      return null;
  }
};
