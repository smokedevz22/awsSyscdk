import registerPoliza from "./createPoliza";
import detallePoliza from "./detallePoliza";
import getListaPolizas from "./listaPolizas";
 
type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
    numero_poliza:any,
    email:any

  };
  identity: {
    sub: string;
    username: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);

  switch (event.info.fieldName) {

    case "registrarNuevaPoliza":

      let inputParams = event.arguments["input"];

      let polizaObjectforSave = {
        ...inputParams,
      };

      let resultSavePolia = await registerPoliza(polizaObjectforSave);
      console.log("poliza-registrada", resultSavePolia);

      return resultSavePolia;



      case "detallePoliza":

        let idPoliza = event.arguments["numero_poliza"];
         
        let polizaObject = await detallePoliza(idPoliza);
  
        console.log("Detalle-poliza", polizaObject);
        return polizaObject;




      case "listasPolizas":
        let emailUsuario = event.arguments["email"];

        let data = await getListaPolizas(emailUsuario);
        console.log("lista-polizas",data);

        return data;
      

    case "deletePoliza":
      let dataDeletePoliza = event.arguments["input"];
      console.log("data-deletePoliza", dataDeletePoliza);
      return dataDeletePoliza;

    case "startPoliza":
      let startPoliza = event.arguments["input"];
      console.log("data-startPoliza", startPoliza);
      return startPoliza;

    default:
      return null;
  }
};
