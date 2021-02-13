import registrarRequerimiento from "./createRequerimiento";
 import getListaRequerimientos from "./listaRequerimientos";

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
    case "registrarNuevoRequerimiento":
      let dataUsuario = event.arguments["input"];
      let itemUsuario = {
        ...dataUsuario,
      };
      let responseUsuario = await registrarRequerimiento(itemUsuario);

      console.log("server-response", responseUsuario);
      return responseUsuario;
 
    case "listaRequerimientos":
      console.log("listaProductos");

      let data = await getListaRequerimientos();
      return data;

    default:
      return null;
  }
};
