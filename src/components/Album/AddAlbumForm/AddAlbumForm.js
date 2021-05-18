import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";

import NoImage from "../../../assets/png/no-image.png";
import "./AddAlbumForm.scss";

const db = firebase.firestore(firebase);

export const AddAlbumForm = ({ setShowModal }) => {
  const [albumImage, setAlbumImage] = useState(null);
  const [file, setFile] = useState(null);
  const [artists, setArtists] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await db.collection("artist").get();
      const artistArray = [];
      map(resp?.docs, (artist) => {
        artistArray.push({
          key: artist.id,
          value: artist.id,
          text: artist.data().name,
        });
      });
      setArtists(artistArray);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setAlbumImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, iamge/png",
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {};

  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="avatar"
            style={{ backgroundImage: `url('${albumImage}')` }}
          />
          <input {...getInputProps()} />
          {!albumImage && <Image src={NoImage} />}
        </Form.Field>
        <Form.Field className="album-inputs">
          <Input placeholder="Nombre del album" />
          <Dropdown
            placeholder="El album pertenece..."
            fluid
            search
            selection
            options={artists}
            lazyLoad
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit">Crear album</Button>
    </Form>
  );
};

export default AddAlbumForm;
