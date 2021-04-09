import React from "react";
import { Modal, Icon } from "semantic-ui-react";
import "./BasicModal.scss";

const BasicModal = ({ show, setShow, title, children }) => {
  const handlerClose = () => {
    setShow(false);
  };

  return (
    <Modal
      open={show}
      onClose={handlerClose}
      className="basic-modal"
      size="tiny"
    >
      <Modal.Header>
        <h3>{title}</h3>
        <Icon name="close" onClick={handlerClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default BasicModal;
