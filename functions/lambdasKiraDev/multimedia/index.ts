import registerMultimedia from "./createMultimedia";

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
    case "registerMultimedia":
      let dataUsuario = event.arguments["input"];
      let itemUsuario = {
        ...dataUsuario,
      };
      let responseUsuario = await registerMultimedia(itemUsuario);

      console.log("server-response", responseUsuario);
      return responseUsuario;

    default:
      return null;
  }
};
