import React, { useCallback, useState } from "react";
import { Form, Input, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import "firebase/firestore";

import NoImage from "../../../assets/png/no-image.png";
import "./AddArtistForm.scss";

const initValueForm = () => {
  return {
    name: "",
  };
};

const db = firebase.firestore(firebase);

export const AddArtistForm = ({ setShowModal }) => {
  const [formData, setFormData] = useState(initValueForm());
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    setBanner(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (fileName) => {
    const ref = firebase.storage().ref().child(`artist/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = async () => {
    if (!formData.name) {
      toast.warning("Se debe añadir el nombre del artista");
    } else if (!file) {
      toast.warning("Se debe añadir la imagen del artista");
    } else {
      try {
        setIsLoading(true);
        const fileName = uuid();
        await uploadImage(fileName);
        await db.collection("artist").add({ name: formData.name, banner: fileName });
        toast.success("Artista creado correctamente");
        resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Error al crear el artista");
      } finally {
        setIsLoading(false);
        setShowModal(false);
      }
    }
  };

  const resetForm = () => {
    setFormData(initValueForm());
    setFile(null);
    setBanner(null);
  };

  return (
    <Form className="add-artist__form" onSubmit={onSubmit}>
      <Form.Field className="artist-banner">
        <div
          {...getRootProps()}
          className="banner"
          style={{ backgroundImage: `url('${banner}')` }}
        />
        <input {...getInputProps()} />
        {!banner && <Image src={NoImage} />}
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${banner ? banner : NoImage}')` }}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Nombre del artista"
          onChange={(e) => setFormData({ name: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Crear Artista
      </Button>
    </Form>
  );
};
