import { toast } from "react-toastify";

export const handleErrors = (code) => {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("El usuario o la contraseña son incorrectos.");
      break;
    case "auth/too-many-requests":
      toast.warning(
        "Se han enviado muchas solicitudes de reenvio de email de verificacion en poco tiempo."
      );
      break;
    case "auth/user-not-found":
      toast.warning("El usuario o la contraseña son incorrectos.");
      break;
    default:
      toast.error("Error de servicio");
      break;
  }
};
