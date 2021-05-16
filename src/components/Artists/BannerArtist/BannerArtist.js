import React, { useEffect, useState } from "react";
import firebase from "../../../utils/Firebase";
import "firebase/storage";

import "./BannerArtist.scss";

export const BannerArtist = ({ artist }) => {
  const [bannerUrl, setBannerUrl] = useState(null);

  const fetchData = async (url) => {
    try {
      const resp = await firebase.storage().ref(`artist/${url}`).getDownloadURL();
      setBannerUrl(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(artist?.banner);
  }, [artist]);

  return (
    <div className="banner-artist" style={{ backgroundImage: `url('${bannerUrl}')` }}>
      <div className="banner-artist__gradient" />
      <div className="banner-artist__info">
        <h4>ARTISTA</h4>
        <h1>{artist.name}</h1>
      </div>
    </div>
  );
};

export default BannerArtist;
