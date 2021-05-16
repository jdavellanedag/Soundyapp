import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/storage";

import BannerArtist from "../../components/Artists/BannerArtist/BannerArtist";
import "./Artist.scss";

const db = firebase.firestore(firebase);

export const Artist = ({ match }) => {
  const [artist, setArtist] = useState(null);

  const fetchData = async (id) => {
    try {
      const resp = await db.collection("artist").doc(id).get();
      setArtist(resp.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(match?.params?.id);
  }, [match]);

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <h2>Mas informacion...</h2>
    </div>
  );
};

export default withRouter(Artist);
