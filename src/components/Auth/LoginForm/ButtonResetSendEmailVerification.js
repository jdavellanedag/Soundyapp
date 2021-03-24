import React from "react";
import { toast } from "react-toastify";

import { handleErrors } from "../../../utils/handleError";

export const ButtonResetSendEmailVerification = ({
  user,
  setIsLoading,
  setUserActive,
}) => {
  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado el email de verificación.");
      })
      .catch((err) => {
        handleErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(false);
      });
  };

  return (
    <div className="resend-verification-email">
      <p>
        Si no has recibido un email de verificación puedes volver a enviar
        haciendo click <span onClick={resendVerificationEmail}>aquí.</span>
      </p>
    </div>
  );
};
