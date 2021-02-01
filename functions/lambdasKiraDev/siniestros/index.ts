import registerSiniestro from "./createSiniestro";
import detalleSiniestro from "./detalleSiniestro";
import getListaSiniestros from "./listaSiniestros";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
    numero_siniestro:any;
  };
  identity: {
    sub: string;
    username: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);

  switch (event.info.fieldName) {
    case "registrarNuevoSiniestro":
      let dataItem = event.arguments["input"];
      let itemSiniestro = {
        ...dataItem,
      };
      let responseSiniestro = await registerSiniestro(itemSiniestro);

      console.log("server-response", responseSiniestro);
      return responseSiniestro;
      
      case "detalleSiniestro":

        let idSiniestro = event.arguments["numero_siniestro"];

        let siniestroObejct = await detalleSiniestro(idSiniestro);
  
        console.log("detalle-siniestro", siniestroObejct);
        return siniestroObejct;
  
    case "desestimarSiniestro":
      console.log("data-desestimar-siniestro", event.arguments["input"]);
      return responseSiniestro;

    case "listasSiniestros":
      console.log("listaProductos");

      let data = await getListaSiniestros();
      return data;

    default:
      return null;
  }
};
