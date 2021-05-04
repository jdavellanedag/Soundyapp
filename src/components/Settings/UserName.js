import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export const UserName = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
}) => {
  const handlerUpdateName = () => {
    setTitleModal("Actualizar nombre de usuario");
    setContentModal(
      <ChangeDisplayName
        displayName={user.displayName}
        setShowModal={setShowModal}
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

const ChangeDisplayName = ({ displayName, setShowModal }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input defaultValue={displayName} />
      </Form.Field>
      <Button type="submit">Actualizar nombre</Button>
    </Form>
  );
};
