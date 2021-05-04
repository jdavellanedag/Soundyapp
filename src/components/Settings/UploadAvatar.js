import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import NoAvatar from "../../assets/png/user.png";
import firebase from "../../utils/Firebase";
import "firebase/storage";
import "firebase/auth";

export const UploadAvatar = ({ user, setReloadApp }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = async (file) => {
    const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
    await ref.put(file);
    await updateUserAvatar();
  };

  const updateUserAvatar = async () => {
    try {
      const response = await firebase
        .storage()
        .ref(`avatar/${user.uid}`)
        .getDownloadURL();
      await firebase.auth().currentUser.updateProfile({ photoURL: response });
      setReloadApp((state) => !state);
    } catch (error) {
      toast.error("Error al actualizar el avatar");
    }
  };

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
};
