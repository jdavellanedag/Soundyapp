import React, { useState, useEffect } from "react";
import { map } from "lodash";
import BannerHome from "../../components/BannerHome";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import BasicSliderItem from "../../components/sliders/BasicSliderItem";
import "./Home.scss";

const db = firebase.firestore(firebase);

const Home = () => {
  const [artists, setArtists] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await db.collection("artist").get();
      const arrayArtist = [];
      map(resp?.docs, (artist) => {
        const data = artist.data();
        data.id = artist.id;
        arrayArtist.push(data);
      });
      setArtists(arrayArtist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItem
          title="Ultimos artistas"
          data={artists}
          folderImage={"artist"}
          urlName={"artist"}
        />
        <h2>Mas...</h2>
      </div>
    </>
  );
};

export default Home;
