import registerSiniestro from "./createSiniestro";
import detalleSiniestro from "./detalleSiniestro";
import getListaSiniestros from "./listaSiniestros";
import getListaSiniestrosPoliza from "./listaSiniestrosPoliza";
import getListaSiniestrosPolizaEmail from "./listaSiniestrosEmail";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
    numero_siniestro: any;
    numero_poliza: any;
    email: any;

  };
  identity: {
    sub: string;
    username: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);

  let idSiniestro = event.arguments["numero_siniestro"];
  let numeroPoliza = event.arguments["numero_poliza"];
  let emailPoliza = event.arguments["email"];

  let infoSiniestro = event.arguments["input"]


  switch (event.info.fieldName) {
    case "registrarNuevoSiniestro":
      let dataItem = infoSiniestro;
      let itemSiniestro = {
        ...dataItem,
      };
      let responseSiniestro = await registerSiniestro(itemSiniestro);

      console.log("Siniestro por guardar: ", responseSiniestro);
      return responseSiniestro;

    case "detalleSiniestro":


      let siniestroObejct = await detalleSiniestro(idSiniestro);

      console.log("Detalle siniestro: ", siniestroObejct);
      return siniestroObejct;

    case "desestimarSiniestro":
      console.log("data-desestimar-siniestro", infoSiniestro);
      return responseSiniestro;

    case "listasSiniestros":

      let listaSiniestros = await getListaSiniestros();
      console.log("listaProductos",listaSiniestros);

      return listaSiniestros;


    case "listasSiniestrosPoliza":
      console.log("listaProductos");

      let listaSiniestrosPoliza = await getListaSiniestrosPoliza(numeroPoliza);
      console.log("listaProductosPoliza",listaSiniestrosPoliza);

      return listaSiniestrosPoliza;

      case "listaSiniestrosEmail":
      console.log("listaProductos");

      let listaSiniestrosEmail = await getListaSiniestrosPolizaEmail(emailPoliza);
      console.log("listaProductosPoliza",listaSiniestrosEmail);

      return listaSiniestrosEmail;

    default:
      return null;
  }
};
