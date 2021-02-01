import registerCotizacion from "./createCotizacion";
import DetalleCotizacion from "./DetalleCotizacion";
import getListaCotizaciones from "./listaCotizaciones";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
    numero_cotizacion: String;
  };
  identity: {
    sub: string;
    username: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);

  switch (event.info.fieldName) {
    case "registrarNuevaCotizacion":
      let dataUsuario = event.arguments["input"];
      let itemUsuario = {
        ...dataUsuario,
      };
      let responseUsuario = await registerCotizacion(itemUsuario);

      console.log("server-response", responseUsuario);
      return responseUsuario;

    case "detalleCotizacion":
      console.log("listaProductos");
     
      let detalle = await DetalleCotizacion(event.arguments["numero_cotizacion"]);
      return detalle;

    case "listasCotizaciones":
      console.log("listaProductos");

      let data = await getListaCotizaciones();
      return data;

    default:
      return null;
  }
};
