import React, { useState, useEffect } from "react";
import firebase from "../../utils/Firebase";
import "firebase/storage";

import "./BannerHome.scss";

export const BannerHome = () => {
  const [bannerUrl, setBannerUrl] = useState(null);

  const fetchData = async () => {
    try {
      const url = await firebase.storage().ref("other/banner-home.jpg").getDownloadURL();
      setBannerUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!bannerUrl) {
    return null;
  }

  return <div className="banner-home" style={{ backgroundImage: `url('${bannerUrl}')` }} />;
};

export default BannerHome;
