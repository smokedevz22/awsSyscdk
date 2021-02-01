import registerProducto from "./createProducto";
import getListaProductos from "./listProductos";

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
    case "registerProducto":
      let dataUsuario = event.arguments["input"];
      let itemUsuario = {
        ...dataUsuario,
      };
      let responseUsuario = await registerProducto(itemUsuario);

      console.log("server-response", responseUsuario);
      return responseUsuario;
      case "listasProductos":
        console.log("listaProductos");
  
        let data = await getListaProductos();
        return data;
      
    default:
      return null;
  }
};
