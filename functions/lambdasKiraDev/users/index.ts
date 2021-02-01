import registerUser from "./createUser";
import getListaUsers from "./listaUsers";

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

    default:
      return null;
  }
};
