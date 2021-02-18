import registerCotizacion from "./createCotizacion";
import DetalleCotizacion from "./DetalleCotizacion";
import getListaCotizaciones from "./listaCotizaciones";
import getListaCotizacionesEmail from "./listaCotizacionesEmail";
import EliminarCotizacion from "./ElminiarCotizacion";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
    numero_cotizacion: String;
    email: String;

  };
  identity: {
    sub: string;
    username: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);


  let numeroCotizacion = event.arguments["numero_cotizacion"];
  let emailUsuario = event.arguments["email"];
  let datosCotizacion = event.arguments["input"];


  switch (event.info.fieldName) {
    case "registrarNuevaCotizacion":
      let dataCotizacion = datosCotizacion;
      let objectToSaveCotizacion = {
        ...dataCotizacion,
      };
      let responseSave = await registerCotizacion(objectToSaveCotizacion);

      console.log("server-response", responseSave);
      return responseSave;

    case "detalleCotizacion":

      let detalleCotizacionObject = await DetalleCotizacion(numeroCotizacion);

      console.log("Detalle cotizacion: ", detalleCotizacionObject);

      return detalleCotizacionObject;

    case "listasCotizaciones":


      let listaCotizaciones = await getListaCotizaciones();
      console.log("listaCotizaciones", listaCotizaciones);

      return listaCotizaciones;


    case "listasCotizacionesEmail":
      console.log("listaProductos");

      let listaCotizacionesEmail = await getListaCotizacionesEmail(emailUsuario);
      console.log("listaCotizacionesEmail", listaCotizacionesEmail);

      return listaCotizacionesEmail;

      case "eliminarCotizacion":

        let detalleEliminacion = await EliminarCotizacion(numeroCotizacion);
  
        console.log("Detalle cotizacion: ", detalleEliminacion);
  
        return detalleEliminacion;
    default:
      return null;
  }
};
