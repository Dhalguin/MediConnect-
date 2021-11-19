import axios from "axios";
import swal from "sweetalert";
export const logout = (history) => {
  swal("Esta seguro que quiere cerrar sesión", {
    buttons: {
      catch: {
        text: "Cerrar Sesion",
        value: "catch",
      },
      defeat: {
        text: "Cancelar",
        value: "other",
      },
    },
  }).then(async (value) => {
    switch (value) {
      case "catch":
        await axios.get(`http://localhost:3001/login/logout`);
        sessionStorage.clear();
        history.push("/");
        break;
      case "defeat": {
        return;
      }
      default:
        break;
    }
  });
};
