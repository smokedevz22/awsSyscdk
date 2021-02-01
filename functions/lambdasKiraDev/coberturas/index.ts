import registerCobertura from "./createCobertura";
import ListaCoberturas from "./listaCobertura";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
    id_sub_plan: any;
  };
  identity: {
    sub: string;
    username: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);

  switch (event.info.fieldName) {
    case "registerCoberturas":
      let dataUsuario = event.arguments["input"];
      let itemUsuario = {
        ...dataUsuario,
      };
      let responseUsuario = await registerCobertura(itemUsuario);

      console.log("server-response", responseUsuario);
      return responseUsuario;
    case "listasCoberturas":
      console.log("listaProductos");
      
      let detalle = await ListaCoberturas();
      return detalle;
    default:
      return null;
  }
};
