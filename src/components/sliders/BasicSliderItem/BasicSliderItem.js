import React, { useEffect, useState } from "react";
import { map } from "lodash";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import firebase from "../../../utils/Firebase";
import "firebase/storage";

import "./BasicSliderItem.scss";

export const BasicSliderItem = ({ title, data, folderImage, urlName }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: "basic-slider-items__list",
  };

  return (
    <div className="basic-slider-items">
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, (item) => (
          <RenderItem key={item.id} item={item} folderImage={folderImage} urlName={urlName} />
        ))}
      </Slider>
    </div>
  );
};

const RenderItem = ({ item, folderImage, urlName }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const fetchData = async (storageName, storageItem) => {
    try {
      const url = await firebase.storage().ref(`${storageName}/${storageItem}`).getDownloadURL();
      setImageUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(folderImage, item.banner);
  }, [item, folderImage]);

  return (
    <Link to={`/${urlName}/${item.id}`}>
      <div className="basic-slider-items__list-item">
        <div className="avatar" style={{ backgroundImage: `url('${imageUrl}')` }}></div>
        <h3>{item.name}</h3>
      </div>
    </Link>
  );
};

export default BasicSliderItem;
