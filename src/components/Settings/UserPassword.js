import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reAuthenticate } from "../../utils/Api";
import { handleErrors } from "../../utils/handleError";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export const UserPassword = ({ setShowModal, setTitleModal, setContentModal }) => {
  const handleChangePassword = (e) => {
    setTitleModal("Actualizar contraseña");
    setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
    setShowModal(true);
  };

  return (
    <div className="user-password">
      <h3>Contraseña: ************</h3>
      <Button circular onClick={handleChangePassword}>
        Actualizar
      </Button>
    </div>
  );
};

const ChangePasswordForm = ({ setShowModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const onSubmit = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.repeatNewPassword) {
      toast.warning("Las contraseñas no pueden estar vacias");
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning("La nueva contraseña no puede ser igual a la actual");
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      toast.warning("Las nuevas contraseñas no son iguales");
    } else if (formData.newPassword.length < 6) {
      toast.warning("La contraseña tiene que tener minimo 6 caracteres");
    } else {
      try {
        setIsLoading(true);
        await reAuthenticate(formData.currentPassword);
        const currentUser = firebase.auth().currentUser;
        await currentUser.updatePassword(formData.newPassword);
        toast.success("Se actualizó la contraseña correctamente");
        setShowModal(false);
        firebase.auth().signOut();
      } catch (error) {
        handleErrors(error?.code);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Contraseña actual"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Nueva contraseña"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Repetir nueva contraseña"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setFormData({ ...formData, repeatNewPassword: e.target.value })}
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Cambiar contraseña
      </Button>
    </Form>
  );
};
