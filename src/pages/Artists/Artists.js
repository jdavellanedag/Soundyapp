import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import firebase from "../../utils/Firebase";
import "firebase/storage";

import "./Artists.scss";

const db = firebase.firestore(firebase);

export const Artists = () => {
  const [artists, setArtists] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await db.collection("artist").get();
      const arraryArtists = [];
      map(resp?.docs, (artist) => {
        arraryArtists.push({
          ...artist.data(),
          id: artist.id,
        });
      });
      setArtists(arraryArtists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="artists">
      <h1>Artistas</h1>
      <Grid>
        {map(artists, (artist) => (
          <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
            <Artist artist={artist} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

const Artist = ({ artist }) => {
  const [bannerUrl, setBannerUrl] = useState(null);

  const fetchData = async (banner) => {
    try {
      const resp = await firebase.storage().ref(`artist/${banner}`).getDownloadURL();
      setBannerUrl(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(artist.banner);
  }, [artist]);

  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="artists__item">
        <div className="avatar" style={{ backgroundImage: `url('${bannerUrl}')` }} />
        <h3>{artist.name}</h3>
      </div>
    </Link>
  );
};

export default Artists;
