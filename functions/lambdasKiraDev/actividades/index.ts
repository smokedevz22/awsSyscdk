import registerActividad from "./createActividad";
import getListaActividades from "./listActividad";

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
    case "registerActividad":
      let dataUsuario = event.arguments["input"];
      let itemUsuario = {
        ...dataUsuario,
      };
      let responseUsuario = await registerActividad(itemUsuario);

      console.log("server-response", responseUsuario);
      return responseUsuario;

    case "listasActividades":
      console.log("listaActividades");

      let data = await getListaActividades();
      return data;
    default:
      return null;
  }
};
