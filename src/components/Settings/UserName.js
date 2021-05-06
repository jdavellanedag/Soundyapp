import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export const UserName = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
  setReloadApp,
}) => {
  const handlerUpdateName = () => {
    setTitleModal("Actualizar nombre de usuario");
    setContentModal(
      <ChangeDisplayName
        displayName={user.displayName}
        setShowModal={setShowModal}
        setReloadApp={setReloadApp}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={handlerUpdateName}>
        Actualizar
      </Button>
    </div>
  );
};

const ChangeDisplayName = ({ displayName, setShowModal, setReloadApp }) => {
  const [formData, setFormData] = useState({
    displayName,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
    } else {
      try {
        setIsLoading(true);
        await firebase
          .auth()
          .currentUser.updateProfile({ displayName: formData.displayName });
        setReloadApp((state) => !state);
        toast.success("Nombre actualizado");
      } catch (error) {
        toast.error("Error al actualizar el nombre");
      } finally {
        setIsLoading(false);
        setShowModal(false);
      }
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => setFormData({ displayName: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar nombre
      </Button>
    </Form>
  );
};
