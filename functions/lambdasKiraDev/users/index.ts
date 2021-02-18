import registerUser from "./createUser";
import getListaUsers from "./listaUsers";

import fnRegistrarNuevoUsuario from "./registraNuevoUsuario";
import fnActualizarNuevoUsuario from "./actualizarNuevoUsuario";
import fnDetalleNuevoUsuario from "./detalleNuevoUsuario";


type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    input: {};
    email: any;
  };
  identity: {
    sub: string;
    username: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT-ARGUMENTS", event);

  switch (event.info.fieldName) {
    case "registerUser":
      let dataUsuario = event.arguments["input"];
      let itemUsuario = {
        ...dataUsuario,
      };
      let responseUsuario = await registerUser(itemUsuario);

      console.log("server-response", responseUsuario);
      return responseUsuario;


      
    case "listasUsers":
      console.log("listaUsers");

      let data = await getListaUsers();
      return data;



      case "registrarNuevoUsuario":
      console.log("registrarNuevoUsuario")
       let bagsetNuevo = {
        ...event.arguments["input"],
      };
      let responseRNU = await fnRegistrarNuevoUsuario(bagsetNuevo);

      return responseRNU;

      
      case "actualizarNuevoUsuario":
        console.log("actualizarNuevoUsaurio")
        let bagsetUpdate = {
          ...event.arguments["input"],
        };
        let responseANU = await fnActualizarNuevoUsuario(bagsetUpdate);

        return responseANU;
       
      case "detalleNuevoUsuario":
        console.log("actualizarNuevoUsaurio")
       
        let responseDNU = await fnDetalleNuevoUsuario(event.arguments["email"]);

        return responseDNU;
 

    default:
      return null;
  }
};
