import registrarContacto from "./createContacto";
  import getListaContacto from "./listaContacto";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
 
  };
  identity: {
    sub: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);


  let inputContacto =  event.arguments["input"];
 

  switch (event.info.fieldName) {

    case "registrarNuevoContacto":

      let dataContacto = inputContacto;
      let itemToSave = {
        ...dataContacto,
      };
      let responseSave = await registrarContacto(itemToSave);

      console.log("server-response", responseSave);
      return responseSave;
 
    case "listaContacto":

      let listaContacto = await getListaContacto();
      
      console.log("listaContacto",listaContacto);
      return listaContacto;


    
      return null;
  }
};
