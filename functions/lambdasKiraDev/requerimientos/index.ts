import fnActualizarRequerimiento from "./actualizarRequerimiento";
import registrarRequerimiento from "./createRequerimiento";
import getListaRequerimientos from "./listaRequerimientos";
import getListaRequerimientosSiniestro from "./listaRequerimientosSiniestros";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
    numero_siniestro: string;

  };
  identity: {
    sub: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);


  let inputRequerimiento = event.arguments["input"];
  let numeroSiniestro = event.arguments["numero_siniestro"]


  switch (event.info.fieldName) {
    case "registrarNuevoRequerimiento":
      let dataRequerimiento = inputRequerimiento;
      let itemToSave = {
        ...dataRequerimiento,
      };
      let responseSave = await registrarRequerimiento(itemToSave);

      console.log("server-response", responseSave);
      return responseSave;

    case "listaRequerimientos":

      let listaRequerimientos = await getListaRequerimientos();

      console.log("listaRequerimientos", listaRequerimientos);
      return listaRequerimientos;




    case "listasRequerimientosSiniestro":
      let listaRequerimientosSiniestro = await getListaRequerimientosSiniestro(numeroSiniestro);

      return listaRequerimientosSiniestro;



    case "actualizarRequerimientoSiniestro":
      let dataRequerimientoPoliza = inputRequerimiento;
      let itemToUpdate= {
        ...dataRequerimientoPoliza,
      };
      let listaRequerimientosSiniestroPoliza = await fnActualizarRequerimiento(itemToUpdate);

      return listaRequerimientosSiniestroPoliza;
    default:
      return null;
  }
};
