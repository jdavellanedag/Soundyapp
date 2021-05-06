import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reAuthenticate } from "../../utils/Api";
import { handleErrors } from "../../utils/handleError";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export const UserEmail = ({ user, setShowModal, setTitleModal, setContentModal }) => {
  const handlerUpdateEmail = (e) => {
    setTitleModal("Actualizar email");
    setContentModal(<ChangeEmailForm email={user.email} setShowModal={setShowModal} />);
    setShowModal(true);
  };
  return (
    <div className="user-email">
      <h3>Email: {user.email}</h3>
      <Button circular onClick={handlerUpdateEmail}>
        Actualizar
      </Button>
    </div>
  );
};

const ChangeEmailForm = ({ email, setShowModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || email === formData.email) {
      toast.warning("El email es el mismo");
    } else {
      setIsLoading(true);
      try {
        await reAuthenticate(formData.password);
        const currentUser = firebase.auth().currentUser;
        await currentUser.updateEmail(formData.email);
        toast.success("Email actualizado correctamente");
        setShowModal(false);
        await currentUser.sendEmailVerification();
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
          defaultValue={email}
          type="text"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Contraseña"
          type={showPassword ? "text" : "password"}
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Button type="submit" loading={isLoading}>
          Actualizar email
        </Button>
      </Form.Field>
    </Form>
  );
};
