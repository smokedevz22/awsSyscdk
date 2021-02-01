import getListaUsers from "../users/listaUsers";
import registerPlan from "./createPlan";
import registerSubPlan from "./createSubPlan";
import getListaPlanes from "./listaPlanes";
import getListaSubPlanes from "./listaSubPlanes";

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
    case "registerPlan":
      let dataUsuario = event.arguments["input"];
      let itemUsuario = {
        ...dataUsuario,
      };
      let responseUsuario = await registerPlan(itemUsuario);

      console.log("server-response", responseUsuario);
      return responseUsuario;

      case "listasPlanes":
        console.log("listaProductos");
  
        let data = await getListaPlanes();
        return data;
      

      case "registerSubPlan":
        let dataSubPlan = event.arguments["input"];
        let itemSubPlan = {
          ...dataSubPlan,
        };
        let responsePlan = await registerSubPlan(itemSubPlan);
  
        console.log("server-response", responsePlan);
        return responsePlan;
   
        case "listasSubPlanes":
          console.log("listaSubPlanes");
    
          let dataSubPlanes = await getListaSubPlanes();
          return dataSubPlanes;
        
    default:
      return null;
  }
};
